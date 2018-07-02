import {EventObject,GetCookie,getUrlParams,isEmptyObj} from './subscribe_api.js';


let tokenVal = getUrlParams('token');
let tokenId = document.getElementById('token');
tokenId.value = tokenVal;

let conform = document.querySelector('.conform');

EventObject.addHandler(conform,"click", function(){
    let userId = GetCookie('USER_ID') || '';
    let exchange = document.querySelector('[name="exchange"]');
    let exchangeVal = exchange.value;
    // console.log('exchangeVal'+exchangeVal);
    if(exchangeVal === ''){
        alert('请输入信息！');
    }else if(exchangeVal.length < 16){
        alert('请正确输入兑换码！！！');
    }else{
        if (!!userId){
            var xhrpw = new XMLHttpRequest();
            xhrpw.open('post', '/users/setting/binding');
            xhrpw.setRequestHeader('Content-Type', 'application/text');
            var exchangeInfo = {
                exchange:exchangeVal,
                token:tokenVal
            }
            xhrpw.onload = function() {
                if (xhrpw.status === 200) {
                    var data = xhrpw.responseText;
                    if(JSON.parse(data)){
                        var dataObj = JSON.parse(data);
                        if(!dataObj.errcode){
                            alert('兑换成功！');
                            window.open('/','_self');
                        }else{
                            alert('请正确输入兑换码!!!');
                        }
                    }else{
                        alert('请正确输入兑换码！');
                    }
                } else {
                    alert('请正确输入兑换码！！');
                }
            };     
            xhrpw.send(JSON.stringify(exchangeInfo));
        }
    }
    

});  

