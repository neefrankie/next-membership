const pify = require('pify');
const fs = require('fs-jetpack');
const path = require('path');
const loadJsonFile = require('load-json-file');
const inline = pify(require('inline-source'));
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const cssnext = require('postcss-cssnext');
const browserSync = require('browser-sync').create();
const rollup = require('rollup').rollup;
let cache;
const buble = require('rollup-plugin-buble');
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
  noCache: true,
  watch: false
});
const render = pify(nunjucks.render);

process.env.NODE_ENV = "development"
gulp.task('prod', () => {
  return Promise.resolve(process.env.NODE_ENV = 'production');
});

gulp.task('dev', () => {
  return Promise.resolve(process.env.NODE_ENV = 'development');
});

gulp.task('build-page', () => {
  const env = {
    isProduction: process.env.NODE_ENV === 'production'
  };
  return loadJsonFile('./views/data.json')
    .then(data => {
      return render('index.html', {
        products: data,
        env
      });
    })
    .then(html => {
// If `production`, inline css and js      
      if (process.env.NODE_ENV === 'production') {
        return inline(html, {
          compress: true,
          rootpath: path.resolve(process.cwd(), '.tmp')
        });
      }    
      return html;
    })
    .then(html => {
      return fs.writeAsync('.tmp/index.html', html);
    })
    .then(() => {
      browserSync.reload('*.html');
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);
    });
});

gulp.task('styles', function styles() {
  const DEST = '.tmp/styles';

  return gulp.src('client/main.scss')
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return rollup({
    entry: 'client/main.js',
    plugins: [
      buble()
    ],
    cache: cache
  }).then(function(bundle) {
    // Cache for later use
    cache = bundle;

    return bundle.write({
      dest: '.tmp/scripts/main.js',
      format: 'iife',
      sourceMap: true
    });
  })
  .then(() => {
    browserSync.reload();
    return Promise.resolve();
  })
  .catch(err => {
    console.log(err);
  });
});

gulp.task('serve', gulp.parallel('build-page', 'styles', 'scripts', () => {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(['views/*.{html,json}'], 
    gulp.parallel('build-page')
  );

  gulp.watch(['client/**/*.scss'],
    gulp.parallel('styles')
  );

  gulp.watch(['client/**/*.js'],
    gulp.parallel('scripts')
  );
}));

gulp.task('build', gulp.series('prod', 'styles', 'scripts', 'build-page', 'dev'));

const destDir = 'dev_www/frontend/tpl/next/html';

gulp.task('copy:test', () => {
  const src = path.resolve(__dirname, '.tmp/index.html')
  const dest = path.resolve(__dirname, `../testing/${destDir}`);
  console.log(`Copy index.html to ${dest}`);
  return gulp.src(src)
    .pipe($.rename('membership.html'))
    .pipe(gulp.dest());
});

gulp.task('copy:prod', () => {
  const src = path.resolve(__dirname, '.tmp/index.html');
  const dest = path.resolve(__dirname, `../${destDir}`);
  console.log(`Copy index.html to ${dest}`);
  return gulp.src(src)
    .pipe($.rename('membership.html'))
    .pipe(gulp.dest(dest));  
});

gulp.task('deploy:test', gulp.series('build', 'copy:test'));
gulp.task('deploy', gulp.series('build', 'copy:prod'));