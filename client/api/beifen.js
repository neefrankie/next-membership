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

