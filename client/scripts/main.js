/*jshint esversion: 6 */

import {EventObject,GetCookie,DeleteCookie,isWeiXin,parseUrlSearch,isEmptyObj} from './subscribe_api.js';

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
    hint.style.display = "block";
}else{
    hint.style.display = "none";
}




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
    var attribute = this.getAttribute('id');
    console.log(attribute);

    ga('send', 'event','subscription click',attribute);
 
};


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
let isReqSuccess = false;
let i = 0;
const postUE = () => {
    if(!isReqSuccess && i<3){
        let cookieVal = {
            uCookieVal : GetCookie('U'),
            eCookieVal : GetCookie('E')
        }
        let xhrpw = new XMLHttpRequest();
        xhrpw.open('post','/index.php/jsapi/paywall');
        xhrpw.onload = function() {
            if (xhrpw.status==200){               
                var data = xhrpw.responseText;
                dataObj = JSON.parse(data);
                isReqSuccess = true;
                updateUI(dataObj);
                console.log('success'+i);
            } else {
                isReqSuccess = false;
                i++;
                setTimeout(function() {
                    postUE(); 
                }, 500); 
                // console.log('fali'+i);
            }
        };
        xhrpw.send(JSON.stringify(cookieVal));
    }

}


var premiumBtn = document.getElementById('premium-btn');
var standardBtn = document.getElementById('standard-btn');

function updateUI(dataObj){
     
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


// function parseUrlSearch(){
//     var para = location.search.substring(1);
//     var paraArr = para.split('&');
//     return paraArr;
// }

 if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {
        var paraArr = parseUrlSearch();//(2) ["premium=0", "standard=1"]
        for(let j=0;j<paraArr.length;j++){
            var arr = paraArr[j].split('=');
            dataObj[arr[0]]=Number(arr[1]);
        }
        // postUE();
        updateUI(dataObj);
}else{
    postUE();
    if (isEmptyObj(dataObj)){
        updateUI(dataObj);
    }
}




/**
 * 问题区域
 * 思路：
 * 1.从json中读取数据，当点击更新当前问题，显示当前问题，目前需要解决是需要获取当前元素
 * 2.tab就直接放在一个div中，当点击哪个div显示里面的内容，这个容易
 */

let expanders = document.querySelectorAll('.o-expander');

let expandToggle = function(event){
        let ariaExpanded= this.getAttribute('aria-expanded');
        let ii = this.children[0].children[0];

        let nextSbl = this.parentNode.children[1];
        let ariaHidden = nextSbl.getAttribute('aria-hidden');
        // console.log(ii); 
        if (ii){
            if (ariaExpanded == 'false'){
                this.setAttribute('aria-expanded','true'); 
                ii.style.animation = "arrowRotateDown 0.25s 1 forwards ease-in";
            }else{
                this.setAttribute('aria-expanded','false');
                ii.style.animation = "arrowRotateUp 0.25s forwards ease-out";
            }
        }

        // 为什么不能用nextSibling，是不支持么
        if (nextSbl){
            if (ariaHidden == 'true'){
                console.log('bbb'+ii); 
                // nextSbl.style.color = "#ff0000";
                nextSbl.setAttribute('aria-hidden','false'); 
                nextSbl.style.maxHeight = '615px';
                nextSbl.style.transition = "max-height 0.25s ease";
                // nextSbl.style.display = 'none';
            }else{
                console.log(nextSbl);
                // nextSbl.style.color = "blue";
                nextSbl.setAttribute('aria-hidden','true');
                nextSbl.style.maxHeight = '0px';
                nextSbl.style.transition = "max-height 0.25s ease";
                // nextSbl.style.display = 'block';

            }
        }


};
for (let i = 0,len=expanders.length; i < len; i++) { 
    var firstChild = expanders[i].children[0];
    // 不点击也会触发运行expandToggle函数，这是为什么?因为不能写成expandToggle（）
    EventObject.addHandler(firstChild,"click", expandToggle);  
}

// Mark:点击切换内容
let tabContentLabel = document.querySelectorAll('.tabContent-label');
var tabContentContainer = document.getElementById('tabContentContainer');
let tabSwitch = function(event){
    let id = this.getAttribute('id').replace('-label','');
    var tabContentLabel = document.getElementById(id);
    
    let idd = ''
    for(let i = 1; i <= 3; i++){
        idd = 'tabContent'+i;
        if(id==idd){
            document.getElementById(idd).style.display = 'block';
        }else{
            document.getElementById(idd).style.display = 'none';
        }

    }

};

for (let i = 0; i <= 2; i++) { 
    EventObject.addHandler(tabContentLabel[i],"click",tabSwitch);  
}



