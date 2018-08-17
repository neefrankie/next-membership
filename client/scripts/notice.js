/*jshint esversion: 6 */
import {EventObject,GetCookie,SetCookie,parseUrlSearch} from './subscribe_api';
import {addTransaction} from './track';
   
var eventAction = '';
var paraArr = parseUrlSearch();
if (paraArr && paraArr.length>0){
        var arr = paraArr[0].split('=');
        eventAction = arr[1] ;
}

var SELabel = GetCookie('SELabel') || 'other from web';
if(SELabel.indexOf('/IOSCL/')>-1) {
    var clParaArr = SELabel.split('/IOSCL/');
    ga('send','event',clParaArr[0], 'Buy Success:'+eventAction, clParaArr[1], {'nonInteraction':1});
} else {
    // var ccode = SELabel.replace(/From:/g,'').replace(/\/.*$/g,'');
    // if (SELabel.indexOf('From:') === 0 && ccode !== '') {
    //     ga('set', 'AllowAnchor', true);
    //     ga('set', 'campaignName', ccode);
    //     ga('set', 'campaignSource', 'marketing');
    //     ga('set', 'campaignMedium', 'campaign');
    // }
    ga('send','event','Web Privileges', 'Buy Success:'+eventAction, SELabel, {'nonInteraction':1});
}
// TODO:get actual price
var price = '';
price = (eventAction === 'Premium') ? '1998' : '198';

let randomVal = Math.round(Math.random()*89999)+10000;

let tradeNo = GetCookie('trade_no')||randomVal;

function getClientIdPar(clientId,url){
    var clientIdPar = '';
    var connector = (url.indexOf('?') > 0) ? '&' : '?';
    if(clientId){
        clientIdPar = connector+'clientId=' + clientId;
    }else{
        clientIdPar = '';
    }
    return clientIdPar;
}  

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
            var jumpUrl = '';
            // 当跳转的时候获取客户端 ID
            ga(function(tracker) {
                var clientId = tracker.get('clientId');
                var clientIdPar = '';
                if(rCookie){
                    var referUrl = decodeURIComponent(rCookie);
                    clientIdPar = getClientIdPar(clientId,referUrl);
                    if(referUrl.indexOf('tapPara')>-1){
                        jumpUrl = referUrl+'&buy=success'+clientIdPar;
                    }else{
                        jumpUrl = referUrl+clientIdPar;
                    }
                
                }else{
                    var defaultJumpUrl = 'http://www.ftchinese.com';
                    clientIdPar = getClientIdPar(clientId,defaultJumpUrl);
                    jumpUrl = defaultJumpUrl+clientIdPar;
                }

                window.location.href = jumpUrl;
            }); 

            
            window.clear(s);//清空s，防止再次调用a()。即防止time减为负数
        }
     },1000);

}

function returnTo(){
    var jumpUrl = '';
    var rCookie = GetCookie('R')||'';
    ga(function(tracker) {
        var clientId = tracker.get('clientId');
        var clientIdPar = '';
        if(rCookie){
            var referUrl = decodeURIComponent(rCookie);
            clientIdPar = getClientIdPar(clientId,referUrl);
            jumpUrl = referUrl+clientIdPar;
        }else{
            jumpUrl = 'http://www.ftchinese.com';
            clientIdPar = getClientIdPar(clientId,jumpUrl);
            jumpUrl = jumpUrl+clientIdPar;
        }
        window.open(jumpUrl,'_self');
    });
}

let returnToId = document.getElementById("returnTo");

EventObject.addHandler(returnToId,"click",function(){ 
    returnTo();
});

window.onload = function(){
    jump();
}

// 放入交易成功页面
let affiliation =  SELabel;
addTransaction(tradeNo, eventAction, price, affiliation);
    
   


