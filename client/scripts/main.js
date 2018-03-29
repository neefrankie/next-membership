/*jshint esversion: 6 */

const GetCookie = (name) => {
    var start = document.cookie.indexOf(name+'='),
        len = start+name.length+1,
        end = document.cookie.indexOf(';',len);
    if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
    if (start === -1) {return null;}
    if (end === -1) {end = document.cookie.length; }
    return decodeURIComponent(document.cookie.substring(len,end));
};
// const SetCookie = (name, value , sec , path , domain) => {
//     var argv = SetCookie.arguments,
//         argc = SetCookie.arguments.length,
//         expires = new Date(),
//         secure = (argc > 5) ? argv[5] : false;
//     path = (argc > 3) ? argv[3] : null;
//     domain = (argc > 4) ? argv[4] : null;
//    if(sec === null || sec === '') {sec = 600 * (24 * 60 * 60 * 1000);}
//     else {sec = 1000*sec;}
//     expires.setTime (expires.getTime() + sec);
//     document.cookie = name + '=' + escape (value) +((expires === null) ? '' : ('; expires=' + expires.toGMTString())) +((path === null) ? '/' : ('; path=' + path)) +((domain === null) ? '' : ('; domain=' + domain)) +((secure === true) ? '; secure' : '');  
// };

const DeleteCookie = (name) => {
    var exp = new Date(),cval = GetCookie (name);
    exp.setTime (exp.getTime() - 1);
    document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString();
};
// Mark:判断是什么浏览器和什么设备，仅仅微信提醒用safari打开，其它都不用
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
        return true;
    } else {
        return false;
    }
}


let hint = document.getElementById('hint');
let hintWord = document.getElementById('hint-word');

if (isWeiXin()){
    var uaString = navigator.userAgent || navigator.vendor || '';
    if(/Android/i.test(uaString)){
        hintWord.innerHTML = '请点击右上角，使用手机浏览器打开';
    }else{
        hintWord.innerHTML = '请点击右上角，使用Safari打开';
    }
    hint.style.display = "block";
}else{
    hint.style.display = "none";
}


var EventObject = {
    addHandler:function(element,type,handler){
        if (element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if (element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if (element.attachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] = null;
        }
    }
};

var toPay = '';
var paymentShadow = '';
// var aLi = document.querySelectorAll('.openSub');
var paymentPage = document.getElementById('payment-page');
var price = '';
var memberType = '';
var openPayment = function(event){
    var childNodes = this.parentNode.children;
    price = childNodes[2].value;
    var parentsNode = this.parentNode.parentNode.children;
    memberType = parentsNode[0].innerHTML;
    var previewHTML = '<div id="payment-shadow" class="o-overlay-shadow fadeIn"></div><div id="payment-box" class="rightanswer show o-overlay__arrow-top fadeInRight"><div class="payment-title">欢迎订阅FT会员服务</div><div class="payment-way"><div class="payment-name"><span>会员类型：</span><span class="payment-type"><strong>'+memberType+'</strong></span></div><div class="payment-method"><span>支付方式：</span><label class="mode"><input name="pay" type="radio" value="ali" /><span id="pay-ali"></span> </label><label class="wxpay-mode"><input name="pay" type="radio" value="wxpay" /><span id="pay-wxpay"></span></label></div></div><div class="pay-action"><label>支付金额 '+price+'</label><button  class="to-pay" id="to-pay">确定支付</button></div></div>';
    paymentPage.innerHTML = previewHTML;

    toPay = document.getElementById('to-pay');
    paymentShadow = document.getElementById('payment-shadow');
    EventObject.addHandler(paymentShadow,"click",closePayment);
    EventObject.addHandler(toPay,"click",toPayAction);
};

// for (let i = 0; i < aLi.length; i++) {   
//     var para = location.search;
//     if(para){
//         EventObject.addHandler(aLi[i],"click",function(){return false;});
//     } else{
//         EventObject.addHandler(aLi[i],"click",openPayment);
//     }
// }
var payWay = '';
var pays = document.getElementsByName('pay');

var toPayAction = function(event){
    for(let j = 0; j < pays.length; j++){
        if(pays[j].checked === true){
            payWay = pays[j].value;
        }
    }
 
    //满足2个条件：1.支付方式  2.会员类型
    if (memberType==='高端会员' && payWay==='ali') {
        window.open('http://premium.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d');
    }else if (memberType==='普通会员' && payWay==='ali') {
        window.open('http://premium.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b');
    }else if (memberType==='高端会员' && payWay==='wxpay') {
        window.open('#');
    }else if (memberType==='普通会员' && payWay==='wxpay') {
        window.open('#');
    }else{

    }
  

    paymentPage.innerHTML = '';
    memberType = '';
    payWay = '';
    
};
var closePayment = function(event){
    paymentPage.innerHTML = '';
};
// standard=0（非会员，默认premium=0）
// standard=1（已经是标准会员，默认premium=0）
// premium=1（已经是高端会员，默认standard=1）
function updateUI(){
    var premiumBtn = document.getElementById('premium-btn');
    var standardBtn = document.getElementById('standard-btn');
    var paraArr = parseUrlSearch();
    if (isWeiXin()){
        EventObject.addHandler(standardBtn,"click",function(){return false;});
        EventObject.addHandler(premiumBtn,"click",function(){return false;});
    }else{
        if (paraArr.includes('premium=0')&&paraArr.includes('standard=1')){
            console.log(paraArr);
            standardBtn.innerText = '已订阅';
            premiumBtn.innerText = '现在升级';
            EventObject.addHandler(standardBtn,"click",function(){return false;});
            EventObject.addHandler(premiumBtn,"click",openPayment);
        }else if (paraArr.includes('standard=1')&&paraArr.includes('premium=1')){
            standardBtn.innerText = '已订阅';
            premiumBtn.innerText = '已订阅';
            EventObject.addHandler(standardBtn,"click",function(){return false;});
            EventObject.addHandler(premiumBtn,"click",function(){return false;});
        }else{  
            standardBtn.innerText = '立即订阅';
            premiumBtn.innerText = '立即订阅';   
            EventObject.addHandler(standardBtn,"click",openPayment);
            EventObject.addHandler(premiumBtn,"click",openPayment);
        }
    }

}
updateUI();

function parseUrlSearch(){
    var para = location.search.substring(1);
    var paraArr = para.split('&');
    return paraArr;
}





const postUE = () => {
    let cookieVal = {
        uCookieVal : GetCookie('U'),
        eCookieVal : GetCookie('E')
    }
    let xhrpw = new XMLHttpRequest();
    xhrpw.open('post','/index.php/jsapi/paywall');
    xhrpw.onreadystatechange = function() {
        if (xhrpw.readyState==4 && xhrpw.status==200){
            var data = xhrpw.responseText;
            // var dataObj = JSON.parse(data); 
        } else {
            console.log('fail to post');
        }
    };
    xhrpw.send(cookieVal);
}

const setCookieVal = () => {
    // Mark:check referrer
    let referer = document.referrer;
    if (referer!==''){
        document.cookie = 'R = ' + referer ;
        // SetCookie('R', referer , false , null , null)
    }
    // Mark:check ccode
    var para = location.search.substring(1);
    var pattern = /ccode/g;
    if(pattern.test(para)){
        document.cookie = 'ccode = ' + paraArr[0] ;
        // SetCookie('ccode', paraArr[0] , false , null , null)
    }
};
setCookieVal();
postUE();