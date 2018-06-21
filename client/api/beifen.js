// Mark:判断是什么浏览器和什么设备，仅仅微信提醒用safari打开，其它都不用

let hint = document.getElementById('hint');
let hintWord = document.getElementById('hint-word');

if (isWeiXin()){
    var uaString = navigator.userAgent || navigator.vendor || '';
    if(/Android/i.test(uaString)){
        hintWord.innerHTML = '请点击右上角，使用手机浏览器打开';
    }else{
        hintWord.innerHTML = '请点击右上角，使用Safari打开';
    }
    hint.style.display = "none";
}else{
    hint.style.display = "none";
}

/**
 * 
 * @param 在微信调用微信支付 ；n代表第几个按钮
 */
function inWechat(n)
{
    console.log(n);
    var e=window.navigator.userAgent.toLowerCase();
    var w=!!/micromessenger/.test(e);
    if(w && n===1){
        window.location='http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=2';
    } else if(w && n===2){
        window.location='http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2';
    }
}

// if(isMobile()){
            // window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2','_blank');
        // }else{
        //     openWXCode();
        // }



// Mark: 3秒自动跳转
  //  function GetCookie(name){
  //       var start = document.cookie.indexOf(name+'='),
  //           len = start+name.length+1,
  //           end = document.cookie.indexOf(';',len);
  //       if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
  //       if (start === -1) {return null;}
  //       if (end === -1) {end = document.cookie.length; }
  //       return decodeURIComponent(document.cookie.substring(len,end));
  //  };

  //  var s;
  //  function countDown(){
  //       var objTime = document.getElementById("time");
  //       var time = objTime.innerText;
  //       time = time-1;
  //       objTime.innerText = time;
  //       if(time == 0){
  //         var rCookie = GetCookie('R')||'';
  //         if(rCookie){
  //             var referUrl = decodeURIComponent(rCookie);
  //             window.location.href = referUrl;
  //         }else{
  //             window.location.href = 'http://www.ftchinese.com';
  //         }
  //         window.clear(s);
  //       }
  //   }

  // function time(){
  //   s = window.setInterval("countDown()",1000);
  // }



    // function GetCookie(name){
    //     var start = document.cookie.indexOf(name+'='),
    //         len = start+name.length+1,
    //         end = document.cookie.indexOf(';',len);
    //     if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
    //     if (start === -1) {return null;}
    //     if (end === -1) {end = document.cookie.length; }
    //     return decodeURIComponent(document.cookie.substring(len,end));
    // };

    // function parseUrlSearch(){
    //     var para = location.search.substring(1);
    //     para = decodeURIComponent(para);
    //     var paraArr = para.split('&');
    //     return paraArr;
    // }
    
    // var eventAction = '';
    // var paraArr = parseUrlSearch();
    // if (paraArr && paraArr.length>0){
    //       var arr = paraArr[0].split('=');
    //       eventAction = arr[1] ;
    // }

    // var SELabel = GetCookie('SELabel')||'';

    // if(SELabel.indexOf('/IOSCL/')>-1){
    //     var clParaArr = SELabel.split('/IOSCL/');
    //     ga('send','event',clParaArr[0], 'Buy Success:'+eventAction, clParaArr[1]);
    // }else{
    //     ga('send','event','Web Privileges', 'Buy Success:'+eventAction, SELabel);
    // }
    // // TODO:get actual price
    // var price = '';
    // price = (eventAction === 'Premium') ? '1998' : '199';
    // var randomVal = Math.round(Math.random()*899)+100;
    // ga('ecommerce:addTransaction', {
    // 'id': randomVal,                     // Transaction ID. Required.
    // 'affiliation': SELabel,   // Affiliation or store name.
    // 'revenue': price,               // Grand Total.
    // 'shipping': '0',                  // Shipping.
    // 'tax': '0' ,
    // 'currency': 'RMB'                     // Tax.
    // });

    // ga('ecommerce:addItem', {
    // 'id': randomVal,                     // Transaction ID. Required.
    // 'name': eventAction,    // Product name. Required.
    // 'sku': eventAction,                 // SKU/code.
    // 'category': 'Subscription',         // Category or variation.
    // 'price': price,                 // Unit price.
    // 'quantity': '1'                   // Quantity.
    // });

    // ga('ecommerce:send');
    
    // function returnTo(){
    //     var rCookie = GetCookie('R')||'';
    //     if(rCookie){
    //         var referUrl = decodeURIComponent(rCookie);
    //         window.open(referUrl,'_self');
    //     }else{
    //         window.open('http://www.ftchinese.com/','_self');
    //     }
        
    // }

    // onload="time()" 