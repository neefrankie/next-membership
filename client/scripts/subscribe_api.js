
// import {testIm,testExport} from '../api/event1.js';
// testIm();
// testExport();

// import testIm from '../api/event.js';


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

const GetCookie = (name) => {
    var start = document.cookie.indexOf(name+'='),
        len = start+name.length+1,
        end = document.cookie.indexOf(';',len);
    if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
    if (start === -1) {return null;}
    if (end === -1) {end = document.cookie.length; }
    return decodeURIComponent(document.cookie.substring(len,end));
};

const DeleteCookie = (name) => {
    var exp = new Date(),cval = GetCookie1 (name);
    exp.setTime (exp.getTime() - 1);
    document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString();
};
const SetCookie = (name, value , sec , path , domain, secure) => {
   var expires = new Date();
   if(sec === null || sec === '') {sec = 600 * (24 * 60 * 60 * 1000);}
    else {sec = 1000*sec;}
    expires.setTime (expires.getTime() + sec);
    document.cookie = name + '=' + escape (value) +((expires === null) ? '' : ('; expires=' + expires.toGMTString())) +((path === null) ? '/' : ('; path=' + path)) +((domain === null) ? '' : ('; domain=' + domain)) +((secure === true) ? '; secure' : '');  
}


function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (/micromessenger/.test(ua)) {
        return true;
    } else {
        return false;
    }
}


function parseUrlSearch(){
    var para = location.search.substring(1);
    para = decodeURIComponent(para);
    var paraArr = para.split('&');
    return paraArr;
}

function isEmptyObj(dataObj){
     var arr = Object.keys(dataObj);    
     if (arr.length > 0){
        return false;
     }else{
        return true;
     }
}

export {
    EventObject,
    GetCookie,
    SetCookie,
    DeleteCookie,
    isWeiXin,
    parseUrlSearch,
    isEmptyObj
}