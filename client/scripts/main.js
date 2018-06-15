/*jshint esversion: 6 */


import {EventObject,GetCookie,SetCookie,DeleteCookie,isWeiXin,parseUrlSearch,isEmptyObj} from './subscribe_api.js';

let dataObj = {};
let isStandard = false;
let isPremium = false;
let upgradePrice = '';


function parseUrlSearch1(){
    var para = location.search;
    if(para){
        para = para.substring(1);
        para = decodeURIComponent(para);
        var paraArr = para.split('&');
        return paraArr;
    }
    return undefined;
}


function getUrlParams(key){
    var value = '';
    var paraArr = parseUrlSearch1();
    if (paraArr && paraArr.length>0){
        var arr = [];
        for(var i=0,len=paraArr.length; i<len; i++){
            if(paraArr[i].indexOf(key)>-1){
                arr = paraArr[i].split('=');
                if(arr.length>1){
                    value = arr[1];
                }
            }
        }
        return value;
    }
    return value;
}


const setCookieVal = () => {
    // Mark:check ccode
    var para = location.search.substring(1);
    var pattern = /ccode/g;
    if(pattern.test(para)){
        var ccodeValue = getUrlParams('ccode');
        // document.cookie = 'ccode = ' + ccodeValue ;
        var SELabel = SetCookie('ccode',ccodeValue,'',null,'.ftacademy.cn',false);
    }
};
setCookieVal();

var toPay = '';
var paymentShadow = '';
var paymentPage = document.getElementById('payment-page');
var price = '';
var memberType = '';

var openPayment = function(event){

    var attribute = this.getAttribute('id');
    var childNodes = this.parentNode.children;
    price = childNodes[2].value;
    var parentsNode = this.parentNode.parentNode.children;
    memberType = parentsNode[0].innerHTML;
    var newAttribute = '';

    if (isPremium){
        return;
    }else if(isStandard){
        if(attribute==='standard-btn'){
            return;
        }
        price = upgradePrice;
    }

    if(isWeiXin()){
        if(attribute==='standard-btn'){
            window.location='http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=2';
        }else if(attribute==='premium-btn'){
            window.location='http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2';
        }
    }else{

        var previewHTML = '<div id="payment-shadow" class="o-overlay-shadow fadeIn"></div><div id="payment-box" class="rightanswer show o-overlay__arrow-top fadeInRight"><div class="payment-title">欢迎订阅FT会员服务</div><div class="payment-way"><div class="payment-name"><span>会员类型：</span><span class="payment-type"><strong>'+memberType+'</strong></span></div><div class="payment-method"><span>支付方式：</span><label class="mode"><input name="pay" type="radio" value="ali" checked /><span id="pay-ali"></span> </label><label class="wxpay-mode" style="display:inline-block"><input name="pay" type="radio" value="wxpay" /><span id="pay-wxpay"></span></label></div></div><div class="pay-action"><label>支付金额 '+price+'</label><button  class="to-pay" id="to-pay">确定支付</button></div></div>';
        paymentPage.innerHTML = previewHTML;

        toPay = document.getElementById('to-pay');
        paymentShadow = document.getElementById('payment-shadow');
        EventObject.addHandler(paymentShadow,"click",closePayment);
        EventObject.addHandler(toPay,"click",toPayAction);

    } 

    var winheight = window.innerHeight;
    var paymentBox = document.getElementById('payment-box');
    var eleHeight = paymentBox.offsetHeight;
    var top = (winheight - eleHeight)/2
    paymentBox.style.top = top + "px";

    // var rCookie = GetCookie('R');
    // var referUrl = decodeURIComponent(rCookie);

    if(attribute==='standard-btn'){
        newAttribute = 'Standard';
    }else if(attribute==='premium-btn'){
        newAttribute = 'Premium';
    }

    var SELabel = GetCookie('SELabel');
    var eventAction = 'Buy: ' + newAttribute;

    let cPara = isFromIos();
    if(cPara){
        if(SELabel.indexOf('/IOSCL/')>-1){
            let clParaArr = SELabel.split('/IOSCL/');
            ga('send','event',cPara, eventAction, clParaArr[1]); 
        }
        // ga('send','event',cPara, eventAction, SELabel);
        // console.log('isFromIos:'+SELabel);
    }else{
        // console.log('isFromWeb');
        ga('send','event','Web Privileges', eventAction, SELabel);
    }

};

function getDeviceType() {
    var uaString = navigator.userAgent || navigator.vendor || '';
    var deviceType = 'PC';
    if (/iPad/i.test(uaString)) {
        deviceType = 'iPad';
    } else if (/OS [0-9]+\_/i.test(uaString) && (/iPhone/i.test(uaString) || /iPod/i.test(uaString))) {
        deviceType = 'iPhone';
    } else if (/Android|micromessenger/i.test(uaString) ) {
        deviceType = 'android';
    }
    return deviceType;
}

function isMobile(){
    let deviceType = getDeviceType();
    if (deviceType=='PC'){
        return false;
    }else{
        return true;
    }
}
var payWay = '';
var pays = document.getElementsByName('pay');

var toPayAction = function(event){
    for(let j = 0; j < pays.length; j++){
        if(pays[j].checked){
            payWay = pays[j].value;
        }
    }
    
    var newmemberType = (memberType==='高端会员') ? 'Premium' : 'Standard';

    //满足2个条件：1.支付方式  2.会员类型
    if (memberType==='高端会员' && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=1','_self');
    }else if (memberType==='标准会员' && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=1','_self');
    }else if (memberType==='高端会员' && payWay==='wxpay') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2','_blank');
    }else if (memberType==='标准会员' && payWay==='wxpay') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=2','_blank');   
    }
    // 没有r跳回到首页，有r跳到r指定的链接；有alert
    
    // var rCookie = GetCookie('R');
    // var referUrl = decodeURIComponent(rCookie);
    

    var SELabel = GetCookie('SELabel');
    var eventAction = 'Buy way: ' + payWay;


    let cPara = isFromIos();
    if(cPara){
        if(SELabel.indexOf('/IOSCL/')>-1){
            let clParaArr = SELabel.split('/IOSCL/');
            ga('send','event',cPara, eventAction, clParaArr[1]); 
        }     
    }else{
        ga('send','event','Web Privileges', eventAction, SELabel);
    }
    
    // else if(getUrlParams('ccode')){
    //     ga('send','event','Web Privileges', eventAction, SELabel);
    // }
    // paymentPage.innerHTML = '';
    memberType = '';
    payWay = '';
    
};
// 打开微信
var openWXCode = function(){
    var paymentBox = document.getElementById('payment-box');
    var wxImg = '<div id="wxImg"></div><div class="wxScanHint">微信扫码支付</div>'
    paymentBox.innerHTML = wxImg;
}; 

var closePayment = function(event){
    paymentPage.innerHTML = '';
};

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
            } else {
                isReqSuccess = false;
                i++;
                setTimeout(function() {
                    postUE(); 
                }, 500); 
            }
        };
        xhrpw.send(JSON.stringify(cookieVal));
    }

}


var premiumBtn = document.getElementById('premium-btn');
var standardBtn = document.getElementById('standard-btn');
var premiumPrice = document.getElementById('premium_price');


function updateUI(dataObj){

    if ((dataObj.standard === 1 && dataObj.premium === 0)){
        isStandard = true;
        standardBtn.innerText = '已订阅';
        premiumBtn.innerText = '现在升级';
        upgradePrice = '¥'+dataObj.v+'.00/年';
        premiumPrice.innerHTML = upgradePrice;
        
        // EventObject.addHandler(standardBtn,"click",function(){return false;});
        EventObject.addHandler(premiumBtn,"click",openPayment);
        
    }else if (dataObj.standard === 1 && dataObj.premium === 1){
        isPremium = true;
        standardBtn.innerText = '已订阅';
        premiumBtn.innerText = '已订阅';
    }else{  
        isStandard = false;
        isPremium = false;
        standardBtn.innerText = '立即订阅';
        premiumBtn.innerText = '立即订阅';   
        EventObject.addHandler(standardBtn,"click",openPayment);
        EventObject.addHandler(premiumBtn,"click",openPayment);
    }
        
}

window.onunload = function closeWindow(){
    DeleteCookie('U');
    DeleteCookie('E');
    DeleteCookie('R');
}




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
        if (ii){
            if (ariaExpanded == 'false'){
                this.setAttribute('aria-expanded','true'); 
                ii.style.animation = "arrowRotateDown 0.25s 1 forwards ease-in";
            }else{
                this.setAttribute('aria-expanded','false');
                ii.style.animation = "arrowRotateUp 0.25s forwards ease-out";
            }
        }

        if (nextSbl){
            if (ariaHidden == 'true'){       
                nextSbl.setAttribute('aria-hidden','false'); 
                nextSbl.style.maxHeight = '715px';
                nextSbl.style.transition = "max-height 0.25s ease";
            }else{
                nextSbl.setAttribute('aria-hidden','true');
                nextSbl.style.maxHeight = '0px';
                nextSbl.style.transition = "max-height 0.25s ease";

            }
        }


};
for (let i = 0,len=expanders.length; i < len; i++) { 
    var firstChild = expanders[i].children[0];
    EventObject.addHandler(firstChild,"click", expandToggle);  
}


function clickTab(){
    let tabContentLabel = document.querySelectorAll('.tabContent-label');
    let tabContentContainer = document.getElementById('tabContentContainer');
    let selectedIndex = 0;
    let tabSwitch = function(event){
        let id = this.getAttribute('id');
        let cutId = id.replace('-label','');
        
        let answerId = '';
        let canSelectedId = '';
        for(let i = 1; i <= 3; i++){
            answerId = 'tabContent'+i;
            canSelectedId = 'tabContent'+i+'-label';
            if(cutId ==answerId){
                selectedIndex = i;
                document.getElementById(answerId).style.display = 'block';
                this.setAttribute('aria-selected','true');
            }else{
                document.getElementById(answerId).style.display = 'none';
                document.getElementById(canSelectedId).setAttribute('aria-selected','false');
            }

        }
    };

    for (let i = 0; i <= 2; i++) { 
        EventObject.addHandler(tabContentLabel[i],"click",tabSwitch);  
    }
}

clickTab()

function clickTabForm(){

    let tabSelect = document.getElementById('o-tab__select');
    let tabSwitch = function(event){
        var optionValue = tabSelect.value;
        let answerId = '';
        for(let i = 1; i <= 3; i++){
            answerId = 'tabContent'+i;
            if(optionValue == answerId){
                document.getElementById(answerId).style.display = 'block';
            }else{
                document.getElementById(answerId).style.display = 'none';
            }
        }
    };

    EventObject.addHandler(tabSelect,"change",tabSwitch); 
}

clickTabForm();




function hasUtmCampaign(){
    if(window.location.search.indexOf('utm_campaign')>=0){
        
        var campaign = '';
        var paraArr = parseUrlSearch();
        if (paraArr && paraArr.length>0){
              for(let j=0;j<paraArr.length;j++){
                if(paraArr[j].indexOf('utm_campaign')>=0){
                        var arr = paraArr[j].split('=');
                        campaign = arr[1];
                        SetCookie('campaign_code',campaign,86400,null,null,false)
                        // document.cookie = 'campaign_code = ' + campaign;
                }

              }
        }


    }

}

hasUtmCampaign();

function isFromIos(){
    let c = getUrlParams('c');
    if (!!c){
        return c;
    }else{
        return undefined;
    }
}

function elabelToIos(){
    let lPara = getUrlParams('l');
    let elabel = '';
    if(lPara){
        elabel = lPara;
    }else{
        elabel = 'no l value';
    } 
    return elabel;
}

function hasLpara(){
    let l = getUrlParams('l');
    if (!!l){
        return true;
    }else{
        return false;
    }
}

/**
 * // Mark: ios track section
 * cPara:判断来自ios设备
 * lPara:跟踪来源信息
 * 既在ios设备上打开，又在网页上打开，会出现2个cookie，怎么区分？
 * 当关闭时，重新进入，所以可以让cookie关闭浏览器即失效
 * 出现现象：当出现.ftacademy.cn  和 www.ftacademy.cn时，会读取www.ftacademy.cn的值。当直接在前端js文件中设置cookie，domian是包含www(子域)
 * 
 * 发现，在php和js文件设置cookie，默认expire时间不一样
 * 
 * 如果没有l，也设置SetCookie
 * 
 * 支付成功，用什么来判断是否来自于ios
 */

function iosTrack(){
    let cPara = isFromIos();
    let lPara = getUrlParams('l'); 
    if(cPara){   
        let elabel = '';
        let eLabelCookie = cPara+'/IOSCL/';
        if(lPara){
            eLabelCookie += lPara;
            elabel = lPara;
        }else{
            eLabelCookie += 'no l value';
            elabel = 'no l value';
        } 
        SetCookie('SELabel',eLabelCookie,86400,null,'.ftacademy.cn',false);
        ga('send','event',cPara, 'display', elabel);
    }
}
iosTrack();


function ccodeTrack(){
    let ccodePara = getUrlParams('ccode');
    if(ccodePara){
        var fromUrl = 'From:'+ccodePara + '/' + document.referrer;
        SetCookie('SELabel',ccodePara,86400,null,'.ftacademy.cn',false);
        ga('send','event','Web Privileges', 'Display', fromUrl);
    }
}

ccodeTrack();