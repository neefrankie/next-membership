
function GetCookie(name){
    var start = document.cookie.indexOf(name+'='),
        len = start+name.length+1,
        end = document.cookie.indexOf(';',len);
    if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
    if (start === -1) {return null;}
    if (end === -1) {end = document.cookie.length; }
    return decodeURIComponent(document.cookie.substring(len,end));
}

function SetCookie (name, value , sec , path , domain) {  
    var argv = SetCookie.arguments,
        argc = SetCookie.arguments.length,
        expires = new Date(),
        secure = (argc > 5) ? argv[5] : false;
    path = (argc > 3) ? argv[3] : null;
    domain = (argc > 4) ? argv[4] : null;
   if(sec === null || sec === '') {sec = 600 * (24 * 60 * 60 * 1000);}
    else {sec = 1000*sec;}
    expires.setTime (expires.getTime() + sec);
    document.cookie = name + '=' + escape (value) +((expires === null) ? '' : ('; expires=' + expires.toGMTString())) +((path === null) ? '/' : ('; path=' + path)) +((domain === null) ? '' : ('; domain=' + domain)) +((secure === true) ? '; secure' : '');  
}

function DeleteCookie (name) {  
    var exp = new Date(),cval = GetCookie (name);
    exp.setTime (exp.getTime() - 1);
    document.cookie = name + '=' + cval + '; expires=' + exp.toGMTString();
}
export function testIm(){
    console.log('test');
}
// export {GetCookie, SetCookie, DeleteCookie};

// function postUEPro(isReqSuccess){
//     return new Promise((resolve, reject) => {
        
//         let cookieVal = {
//             uCookieVal : GetCookie('U'),
//             eCookieVal : GetCookie('E')
//         }
        
//         let xhrpw = new XMLHttpRequest();
//         xhrpw.open('post','/index.php/jsapi/paywall');
//         xhrpw.onreadystatechange = function() {
//             if (xhrpw.status==200){
//                 isReqSuccess = true;
//                 resolve(isReqSuccess);
//                 var data = xhrpw.responseText;
//                 dataObj = JSON.parse(data);
//                 updateUI(dataObj);
//                 console.log('success request');
//             } else {
//                 console.log('fail request');
//             }
//         };
//         xhrpw.send(JSON.stringify(cookieVal));

//     });
// }


// postUEPro(false).then(function(isReqSuccess){
//     if (isReqSuccess){
//         console.log('success');
//     }else{
//         console.log('fail');
//         postUEPro(isReqSuccess);
//     }
    
// })

// Mark:写法备份

//     max-height: 615px;
//     -webkit-transition: max-height 0.25s ease,border-top 0.10s ease;
//     transition: max-height 0.25s ease,border-top 0.10s 
//    border-top: 1px solid #cec6b9;

//    transition: property duration timing-function delay;

//      max-height: 0;
//     -webkit-transition: max-height 0.25s ease,border-top 0.75s ease;
//     transition: max-height 0.25s ease,border-top 0.75s ease;
//     border-top: 1px solid transparent;