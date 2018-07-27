/*jshint esversion: 6 */
import {EventObject,GetCookie,SetCookie,parseUrlSearch} from './subscribe_api';
import {addTransaction} from './track';
   
var eventAction = '';
var paraArr = parseUrlSearch();
if (paraArr && paraArr.length>0){
        var arr = paraArr[0].split('=');
        eventAction = arr[1] ;
}

var SELabel = GetCookie('SELabel') || '';
if(SELabel.indexOf('/IOSCL/')>-1) {
    var clParaArr = SELabel.split('/IOSCL/');
    ga('send','event',clParaArr[0], 'Buy Success:'+eventAction, clParaArr[1]);
} else {
    var ccode = SELabel.replace(/From:/g,'').replace(/\/.*$/g,'');
    if (SELabel.indexOf('From:') === 0 && ccode !== '') {
        ga('set', 'AllowAnchor', true);
        ga('set', 'campaignName', ccode);
        ga('set', 'campaignSource', 'marketing');
        ga('set', 'campaignMedium', 'campaign');
    }
    ga('send','event','Web Privileges', 'Buy Success:'+eventAction, SELabel);
}
// TODO:get actual price
var price = '';
price = (eventAction === 'Premium') ? '1998' : '198';

let randomVal = Math.round(Math.random()*89999)+10000;
// var randomVal = Math.round(Math.random()*899)+100;
let tradeNo = GetCookie('trade_no')||randomVal;
// ga('ecommerce:addTransaction', {
// 'id': tradeNo,                     // Transaction ID. Required.
// 'affiliation': SELabel,   // Affiliation or store name.
// 'revenue': price,               // Grand Total.
// 'shipping': '0',                  // Shipping.
// 'tax': '0' ,
// 'currency': 'CNY'                     // Tax.
// });

// ga('ecommerce:addItem', {
// 'id': tradeNo,                     // Transaction ID. Required.
// 'name': eventAction,    // Product name. Required.
// 'sku': eventAction,                 // SKU/code.
// 'category': 'Subscription',         // Category or variation.
// 'price': price,                 // Unit price.
// 'quantity': '1'                   // Quantity.
// });

// ga('ecommerce:send');

// 5秒自动跳转
function jump(){
    // Mark: 5秒自动跳转
     let s = window.setInterval(function(){
        var objTime = document.getElementById("time");//获得time的对象
        var time = objTime.innerText;//获得time的值
        time = time-1;
        objTime.innerText = time;//把新time赋给objTime里面
        if(time == 0){
            var rCookie = GetCookie('R')||'';
            if(rCookie){
                var referUrl = decodeURIComponent(rCookie);
                if(referUrl.indexOf('tapPara')>-1){
                    window.location.href = referUrl+'&buy=success';
                }else{
                    window.location.href = referUrl;
                }
                
            }else{
                window.location.href = 'http://www.ftchinese.com';
            }
            window.clear(s);//清空s，防止再次调用a()。即防止time减为负数
        }
     },1000);

}

function returnTo(){
    console.log('nn');
    var rCookie = GetCookie('R')||'';
    if(rCookie){
        var referUrl = decodeURIComponent(rCookie);
        window.open(referUrl,'_self');
    }else{
        window.open('http://www.ftchinese.com/','_self');
    }
    
}

let returnToId = document.getElementById("returnTo");

EventObject.addHandler(returnToId,"click",function(){ 
    returnTo();
});

window.onload = function(){
    jump();
}

// 放入交易成功页面
let affiliation = 'web IAP:' + SELabel;
addTransaction(tradeNo, eventAction, price, affiliation);
    
   
   

