/*jshint esversion: 6 */
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

function updateUI(){
    var premiumBtn = document.getElementById('premium-btn');
    var standardBtn = document.getElementById('standard-btn');
    var paraArr = parseUrlSearch();
    if (paraArr.includes('premium=1')&&paraArr.includes('standard=0')){
        console.log(paraArr);
        premiumBtn.innerText = '已订阅';
        standardBtn.innerText = '现在升级';
        EventObject.addHandler(premiumBtn,"click",function(){return false;});
        EventObject.addHandler(standardBtn,"click",openPayment);
    }else if (paraArr.includes('standard=1')){
        premiumBtn.innerText = '已订阅';
        standardBtn.innerText = '已订阅';
        EventObject.addHandler(premiumBtn,"click",function(){return false;});
        EventObject.addHandler(standardBtn,"click",function(){return false;});
    }else{
        premiumBtn.innerText = '立即订阅';
        standardBtn.innerText = '立即订阅';
        EventObject.addHandler(premiumBtn,"click",openPayment);
        EventObject.addHandler(standardBtn,"click",openPayment);
    }
}
updateUI();

function parseUrlSearch(){
    var para = location.search.substring(1);
    var paraArr = para.split('&');
    return paraArr;
}




