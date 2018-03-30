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

const setCookieVal = () => {
    // Mark:check ccode
    var para = location.search.substring(1);
    var pattern = /ccode/g;
    if(pattern.test(para)){
        document.cookie = 'ccode = ' + paraArr[0] ;
        // SetCookie('ccode', paraArr[0] , false , null , null)
    }
};
setCookieVal();

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
    var previewHTML = '<div id="payment-shadow" class="o-overlay-shadow fadeIn"></div><div id="payment-box" class="rightanswer show o-overlay__arrow-top fadeInRight"><div class="payment-title">欢迎订阅FT会员服务</div><div class="payment-way"><div class="payment-name"><span>会员类型：</span><span class="payment-type"><strong>'+memberType+'</strong></span></div><div class="payment-method"><span>支付方式：</span><label class="mode"><input name="pay" type="radio" value="ali" checked /><span id="pay-ali"></span> </label><label class="wxpay-mode" style="display:none;"><input name="pay" type="radio" value="wxpay" /><span id="pay-wxpay"></span></label></div></div><div class="pay-action"><label>支付金额 '+price+'</label><button  class="to-pay" id="to-pay">确定支付</button></div></div>';
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
        if(pays[j].checked){
            payWay = pays[j].value;
        }
    }
 
    //满足2个条件：1.支付方式  2.会员类型
    if (memberType==='高端会员' && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d','_self');
    }else if (memberType==='标准会员' && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b','_self');
    }else if (memberType==='高端会员' && payWay==='wxpay') {
        window.open('#','_self');
    }else if (memberType==='标准会员' && payWay==='wxpay') {
        window.open('#','_self');
    }else{

    }
  

    paymentPage.innerHTML = '';
    memberType = '';
    payWay = '';
    
};
var closePayment = function(event){
    paymentPage.innerHTML = '';
};
let dataObj = {};

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
            dataObj = JSON.parse(data);
            updateUI(dataObj);
        } else {
            
        }
    };
    xhrpw.send(JSON.stringify(cookieVal));
}

 if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {
        var paraArr = parseUrlSearch();//(2) ["premium=0", "standard=1"]
        for(let j=0;j<paraArr.length;j++){
            var arr = paraArr[j].split('=');
            dataObj[arr[0]]=Number(arr[1]);
        }
        updateUI(dataObj);
}else{
    postUE();
}


function updateUI(dataObj){
     
    var premiumBtn = document.getElementById('premium-btn');
    var standardBtn = document.getElementById('standard-btn');
    // var paraArr = parseUrlSearch();
    
    if (isWeiXin()){
        EventObject.addHandler(standardBtn,"click",function(){return false;});
        EventObject.addHandler(premiumBtn,"click",function(){return false;});
    }else{
        if ((dataObj.standard === 1 && dataObj.premium === 0)){
        // if (paraArr.includes('premium=0')&&paraArr.includes('standard=1')){

            standardBtn.innerText = '已订阅';
            premiumBtn.innerText = '现在升级';
            EventObject.addHandler(standardBtn,"click",function(){return false;});
            EventObject.addHandler(premiumBtn,"click",openPayment);
           
        }else if (dataObj.standard === 1 && dataObj.premium === 1){
        // }else if (paraArr.includes('standard=1')&&paraArr.includes('premium=1')){
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


function parseUrlSearch(){
    var para = location.search.substring(1);
    var paraArr = para.split('&');
    return paraArr;
}








/**
 * 问题区域
 */

// var expanders = document.querySelectorAll('.o-expander');
// for (let i = 0; i < expanders.length; i++) { 
//     let ariaExpanded = expanders[i].getAttribute('aria-expanded');
//     let ariaHidden = expanders[i].getAttribute('aria-hidden');
//     var firstChild = expanders[i].children[0];
    
//     EventObject.addHandler(firstChild,"click", expandToggle(ariaExpanded,ariaHidden));

    
// }

// function expandToggle(ariaExpanded,ariaHidden){ 
    
    // let bbb = this.children[0].children[0];
            // let bb = this.children[0].children[0];
        // console.log(bb); 
        // if (ariaExpanded==='false'){
        //     this.parentNode.setAttribute('aria-expanded','true'); 
        //     bb.style.animation = "arrowRotateDown 0.25s 1 forwards ease-in";
        // }else{
        //     this.parentNode.setAttribute('aria-expanded','false');
        //     bb.style.animation = "arrowRotateUp 0.25s forwards ease-out";
        // }

        // let nextSbl = this.nextSibling;
        // if (ariaHidden==='false'){
        //     console.log('ff'+aa);
        //     nextSbl.setAttribute('aria-hidden','true'); 
        //     nextSbl.style.maxHeight = '615px';
        //     nextSbl.style.transition = "max-height 0.25s ease";
        // }else{
        //     nextSbl.setAttribute('aria-hidden','false');
        //     nextSbl.style.maxHeight = '0px';
        //     nextSbl.style.transition = "max-height 0.25s ease";

        // }

// }

// var toggleTags = document.querySelectorAll('.toggle');
// var expanderContents = document.querySelectorAll('.o-expander__content');
// for (let i = 0; i < toggleTags.length; i++) {   
//     EventObject.addHandler(toggleTags[i],"click",expanderToggle);
// }
// function expanderToggle(){  
//     let aa = this.children[0].getAttribute('aria-expanded');
//     console.log('expanderToggle'+aa);
//     let bb = this.children[0].children[0].children[0];
//     // console.log('bb:'+bb.innerHTML);
//     if (aa==='false'){
//         console.log('ff'+aa);
//         this.children[0].setAttribute('aria-expanded','true'); 
//         bb.style.animation = "arrowRotateDown 0.25s 1 forwards ease-in";
//     }else{
//         this.children[0].setAttribute('aria-expanded','false');
//         bb.style.animation = "arrowRotateUp 0.25s forwards ease-out";
//     }
// }


// for (let i = 0; i < expanderContents.length; i++) {   
//     EventObject.addHandler(expanderContents[i],"click",expanderContent);
// }
// function expanderContent(){  
//     let aa = this.getAttribute('aria-hidden');
//     console.log('expanderContent:--'+aa);
//     if (aa==='false'){
//         console.log('ff'+aa);
//         this.setAttribute('aria-hidden','true'); 
//         this.style.maxHeight = '615px';
//         this.style.transition = "max-height 0.25s ease";
//     }else{
//         this.setAttribute('aria-hidden','false');
//         this.style.maxHeight = '0px';
//         this.style.transition = "max-height 0.25s ease";

//     }
// }



//     max-height: 615px;
//     -webkit-transition: max-height 0.25s ease,border-top 0.10s ease;
//     transition: max-height 0.25s ease,border-top 0.10s 
//    border-top: 1px solid #cec6b9;

//    transition: property duration timing-function delay;

//      max-height: 0;
//     -webkit-transition: max-height 0.25s ease,border-top 0.75s ease;
//     transition: max-height 0.25s ease,border-top 0.75s ease;
//     border-top: 1px solid transparent;