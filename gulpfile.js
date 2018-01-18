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
const nodeResolve = require('rollup-plugin-node-resolve');
let cache;
const buble = require('rollup-plugin-buble');
const babel = require('rollup-plugin-babel');
const nunjucks = require('nunjucks');
const del = require('del');
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
return gulp.src(['client/styles/*.scss'])
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

gulp.task('jshint', function () {
  // return gulp.src('client/main.js')
  return gulp.src('client/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});


gulp.task('scripts', async () => {
  async function rollupOneJs() {
    try {
      const bundle = await rollup({
        input:'client/scripts/main.js',
        plugins:[
          babel({//这里需要配置文件.babelrc
            exclude:'node_modules/**'
          }),
          nodeResolve({
            jsnext:true,
          })
        ]
      }) ;
      await bundle.write({//返回promise，以便下一步then()
          file: '.tmp/scripts/main.js',
          format: 'iife',
          sourcemap: true
      });
    }catch (err) {
      console.log(err);
    };
  } 
  rollupOneJs()
  browserSync.reload();
});

// gulp.task('script2', () => {
//   return gulp.src('client/scripts/**/*.js')
//     .pipe($.plumber())  //自动处理全部错误信息防止因为错误而导致 watch 不正常工作
//     .pipe($.sourcemaps.init({loadMaps:true})) 
//     .pipe($.babel())
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('.tmp/scripts'))
//     .pipe(browserSync.reload({stream: true}));
// });
// gulp.task('scripts1', () => {
//   return rollup({
//     input: 'client/scripts/subscribe.js',   
//     // input:'client/main.js',    //entry改成input
//     plugins: [
//       babel({//这里需要配置文件.babelrc
//           exclude:'node_modules/**'
//       }),
//       // buble()
//       nodeResolve({
//         jsnext:true,
//       })
//     ]
//     // cache: cache   //先注释看有什么问题？
//   }).then(function(bundle) {
//     // Cache for later use
//     // cache = bundle;

//     return bundle.write({
//       dest: '.tmp/scripts/sub.js',
//       format: 'iife',
//       sourceMap: true
//     });
//   })
//   .then(() => {
//     browserSync.reload();
//     return Promise.resolve();
//   })
//   .catch(err => {
//     console.log(err);
//   });
// });

gulp.task('clean', function() {
  return del(['.tmp/**']);
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