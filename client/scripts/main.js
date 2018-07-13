/*jshint esversion: 6 */
/*esversion: 6 */

import {EventObject,GetCookie,SetCookie,DeleteCookie,isWeiXin,parseUrlSearch,getUrlParams,isEmptyObj,getDeviceType} from './subscribe_api';

const standardType = '标准会员';
const premiumType = '高端会员';

let dataObj = {};
let isStandard = false;
let isPremium = false;
let upgradePrice = '';
let standardPriceValue = '';
let premiumPriceValue = '';


const setCookieVal = () => {
    // Mark:check ccode
    var para = location.search.substring(1);
    var pattern = /ccode/g;
    if(pattern.test(para)){
        var ccodeValue = getUrlParams('ccode');
        var SELabel = SetCookie('ccode',ccodeValue,'',null,'.ftacademy.cn',false);
    }
    if(/utm_code/g.test(para)){
        var utmccodeValue = getUrlParams('utm_code');
        var SELabel = SetCookie('ccode',utmccodeValue,'',null,'.ftacademy.cn',false);
    }
};
setCookieVal();



let toPay = document.getElementById('to-pay');
let paymentShadow = document.getElementById('payment-shadow');
let paymentPage = document.getElementById('payment-page');
let price = '';
let memberType = '';

const closePayment = function(event){
    paymentPage.style.display = 'none'; 
};

if(paymentShadow){
    EventObject.addHandler(paymentShadow,"click",closePayment);
}

function relevantDataInPayment(memberType,price){
    let memberTypeId = document.getElementById('memberType');
    let priceId = document.getElementById('price');
    memberTypeId.innerHTML = memberType;
    priceId.innerHTML = price;
}

function selectPayWay(memberType){
    if(memberType===standardType){
        window.location='http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=2';
    }else if(memberType===premiumType){
        window.location='http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2';
    }
}

var openPayment = function(event){

    var attribute = this.getAttribute('id');
    var childNodes = this.parentNode.children;
    price = childNodes[2].value;
    var parentsNode = this.parentNode.parentNode.children;
    memberType = parentsNode[0].innerHTML;
    var newAttribute = '';
    console.log(':'+memberType);
    if (isPremium){
        return;
    }else if(isStandard){
        if(attribute==='standard-btn'){
            return;
        }
        price = upgradePrice;
    }
    // Mark:打折活动
    let fPara = getUrlParams('from'); 
    let sponsorCookie = GetCookie('sponsor');
    if(fPara === 'ft_discount' || sponsorCookie){
        if(attribute==='standard-btn'){
            price = standardPriceValue;
        }else if(attribute==='premium-btn'){
            price = upgradePrice;
        }
    }

    if(isWeiXin()){
        selectPayWay(memberType);
    }else{    
        relevantDataInPayment(memberType,price);
        paymentPage.style.display = 'block'; 
    } 

    // 使支付窗口除于页面正中央
    var winheight = window.innerHeight;
    var paymentBox = document.getElementById('payment-box');
    if(paymentBox){
        var eleHeight = paymentBox.offsetHeight;
        var top = (winheight - eleHeight)/2;
        paymentBox.style.top = top + "px";
    }

    if(attribute==='standard-btn'){
        newAttribute = 'Standard';
    }else if(attribute==='premium-btn'){
        newAttribute = 'Premium';
    }

    var SELabel = GetCookie('SELabel');
    var eventAction = 'Buy: ' + newAttribute;

 // Mark:ios付费跟踪
    let cPara = isFromIos();
    if(cPara){
        if(SELabel.indexOf('/IOSCL/')>-1){
            let clParaArr = SELabel.split('/IOSCL/');
            ga('send','event',cPara, eventAction, clParaArr[1]); 
        }
        // console.log('isFromIos:'+SELabel);
    }else{
        console.log('isFromWeb');
        ga('send','event','Web Privileges', eventAction, SELabel);
    }

};



const openExchange = function(event){
    window.open('https://user.ftchinese.com/?offerId=992374d8e2e24f17bebc50a6e57becd6&platform=8','_self');
}

function isMobile(){
    let deviceType = getDeviceType();
    if (deviceType=='PC'){
        return false;
    }else{
        return true;
    }
}

let payWay = '';
let pays = document.getElementsByName('pay');

const toPayAction = function(event){
    getMemberTypeFromUpdate();
    console.log(memberType);
    for(let j = 0; j < pays.length; j++){
        if(pays[j].checked){
            payWay = pays[j].value;
        }
    }
    
    var newmemberType = (memberType===premiumType) ? 'Premium' : 'Standard';

    //满足2个条件：1.支付方式  2.会员类型
    if (memberType===premiumType && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=1','_self');
    }else if (memberType===standardType && payWay==='ali') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=1','_self');
    }else if (memberType===premiumType && payWay==='wxpay') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=8d5e7e72f12067991186cdf3cb7d5d9d&platform=2','_blank');
    }else if (memberType===standardType && payWay==='wxpay') {
        window.open('http://www.ftacademy.cn/index.php/pay?offerId=eb6d8ae6f20283755b339c0dc273988b&platform=2','_blank');   
    }

    let SELabel = GetCookie('SELabel');
    let eventAction = 'Buy way: ' + payWay;


    let cPara = isFromIos();
    
    if(cPara){
        if(SELabel.indexOf('/IOSCL/')>-1){
            let clParaArr = SELabel.split('/IOSCL/');
            ga('send','event',cPara, eventAction, clParaArr[1]); 
        }     
    }else{
        ga('send','event','Web Privileges', eventAction, SELabel);
    }
    
    memberType = '';
    payWay = '';
    
};


if(toPay){
    EventObject.addHandler(toPay,"click",toPayAction);
}

// 打开微信
const openWXCode = function(){
    var paymentBox = document.getElementById('payment-box');
    var wxImg = '<div id="wxImg"></div><div class="wxScanHint">微信扫码支付</div>';
    paymentBox.innerHTML = wxImg;
}; 



let isReqSuccess = false;
let i = 0;
const postUE = (url) => {
    if(!isReqSuccess && i<3){
        let cookieVal = {
            uCookieVal : GetCookie('U'),
            eCookieVal : GetCookie('E')
        };
        let xhrpw = new XMLHttpRequest();
        xhrpw.open('post',url);
        xhrpw.onload = function() {
            if (xhrpw.status==200){               
                var data = xhrpw.responseText;
                dataObj = JSON.parse(data);
                isReqSuccess = true;
                updateUI(dataObj);
                fromUpdate();
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

};


let premiumBtn = document.getElementById('premium-btn');
let standardBtn = document.getElementById('standard-btn');
let premiumPrice = document.getElementById('premium_price');
let standardPrice = document.getElementById('standard_price');

function updateUI(dataObj){
    let fPara = getUrlParams('from'); 
    let sponsorCookie = GetCookie('sponsor');

    let standardBtnInnerText = '';
    let premiumBtnInnerText = '';
    let standardPriceInnerText = '';
    let premiumPriceInnerText = '';
  

    if ((dataObj.standard === 1 && dataObj.premium === 0)){
        isStandard = true;
        standardBtnInnerText = '已订阅';
        premiumBtnInnerText = '现在升级';
        if(fPara === 'ft_exchange'){
            EventObject.addHandler(standardBtn,"click",openExchange);
            EventObject.addHandler(premiumBtn,"click",openExchange);
        }else{
            EventObject.addHandler(premiumBtn,"click",openPayment);
        }
        
    }else if (dataObj.standard === 1 && dataObj.premium === 1){
        isPremium = true;
        standardBtnInnerText = '已订阅';
        premiumBtnInnerText = '已订阅';
    }else{  
        isStandard = false;
        isPremium = false;
        standardBtnInnerText = '立即订阅';
        premiumBtnInnerText = '立即订阅';   
        if(fPara === 'ft_exchange'){
            EventObject.addHandler(standardBtn,"click",openExchange);
            EventObject.addHandler(premiumBtn,"click",openExchange);
        }else{
            EventObject.addHandler(standardBtn,"click",openPayment);
            EventObject.addHandler(premiumBtn,"click",openPayment);
        }
        
    }



    // Mark:不写在dataObj条件下，是因为默认得显示169
    if(fPara === 'ft_discount' || sponsorCookie){
        if ((dataObj.standard === 1 && dataObj.premium === 0)){
            upgradePrice = '¥'+dataObj.v+'.00/年';
            standardPriceValue = '¥169.00/年';
        }else{
            upgradePrice  = '¥1699.00/年';
            standardPriceValue = '¥169.00/年';
        }
        standardPrice.innerHTML = standardPriceValue;
        premiumPrice.innerHTML = upgradePrice;
    }else{
        if ((dataObj.standard === 1 && dataObj.premium === 0)){    
            upgradePrice = '¥'+dataObj.v+'.00/年';
            premiumPrice.innerHTML = upgradePrice;
        }
    }
    
   // 点击之后跟其它的行为也不一样
    if(fPara === 'ft_exchange'){
        standardBtnInnerText = '输兑换码';
        premiumBtnInnerText = '输兑换码';
        standardPrice.style.display = 'none';  
        premiumPrice.style.display = 'none'; 
    }

    standardBtn.innerText = standardBtnInnerText;
    premiumBtn.innerText = premiumBtnInnerText;
}

window.onunload = function closeWindow(){
    DeleteCookie('U');
    DeleteCookie('E');
    DeleteCookie('R');
};




if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {
        var xhrpw1 = new XMLHttpRequest();
        xhrpw1.open('get','api/paywall.json');
        xhrpw1.onload = function() {
            if (xhrpw1.status==200){               
                var data = xhrpw1.responseText;
                dataObj = JSON.parse(data);
                updateUI(dataObj);
                fromUpdate();
            } 
        };
        xhrpw1.send(null);

        if (isEmptyObj(dataObj)){
            updateUI(dataObj);
        }
}else{
    postUE('/index.php/jsapi/paywall');
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

clickTab();

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
                        SetCookie('campaign_code',campaign,86400,null,null,false);
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
        ga('send','event',cPara, 'Display', elabel);
    }
}
iosTrack();

// Mark:url参数中带有ccode和utm_code，设置cookie，因为这是从活动中直接链接过来的，所以在此页面设置来源。暂时不使用document.referrer
function ccodeTrack(){
    let ccodePara = getUrlParams('ccode') || getUrlParams('utm_code');
    if(ccodePara){
        var fromUrl = 'From:'+ccodePara  ;
        SetCookie('SELabel',fromUrl,86400,null,'.ftacademy.cn',false);
        ga('send','event','Web Privileges', 'Tap', fromUrl);
    }
}

ccodeTrack();



// Mark：从升级高端会员进入，url中带有tap参数，当购买成功之后跳转来源并附加上参数buy=success
// 第一次打开执行这里，当再次点击的时候，memberType为空
function fromUpdate(){
    let tapPara = getUrlParams('tap');
    if(tapPara){    
        if(tapPara==='standard'){
            relevantDataInPayment(standardType,'¥198.00/年');
        }else if(tapPara==='premium'){
            if (!isEmptyObj(dataObj) && (dataObj.standard === 1 && dataObj.premium === 0)){
                upgradePrice = upgradePrice;
            }else{
                // console.log('upgradePrice:'+upgradePrice);
                upgradePrice = '¥1,998.00/年';
            }
            relevantDataInPayment(premiumType,upgradePrice);
        } 
        paymentPage.style.display = 'block';  
    }
}

if (isEmptyObj(dataObj)){
    fromUpdate();
}


function getMemberTypeFromUpdate(){
    let tapPara = getUrlParams('tap');
    if(tapPara){    
        if(tapPara==='standard'){
            memberType = standardType;
        }else if(tapPara==='premium'){
            memberType = premiumType;
        }  
    }
}