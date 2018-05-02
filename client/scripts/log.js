var a2428tf = "ftstatlog",
    a2428pu = "",
    a2428pf = "ftstatlog",
    a2428su = window.location,
    a2428sf = document.referrer,
    a2428of = "",
    a2428op = "",
    a2428ops = 1,
    a2428ot = 1,
    a2428d = new Date,
    a2428color = "";
a2428color = "Netscape" == navigator.appName ? screen.pixelDepth : screen.colorDepth, "undefined" == typeof FTStoryid && (FTStoryid = "");
var lainframe = null;
"undefined" == typeof FTAdch && (FTAdch = "");
try {
    a2428tf = top.document.referrer
} catch (e) {}
try {
    a2428pu = window.parent.location
} catch (e) {}
try {
    a2428pf = window.parent.document.referrer
} catch (e) {}
try {
    a2428ops = document.cookie.match(new RegExp("(^| )FTSTAT_ok_pages=([^;]*)(;|$)")), a2428ops = null == a2428ops ? 1 : parseInt(unescape(a2428ops[2])) + 1;
    var a2428oe = new Date;
    a2428oe.setTime(a2428oe.getTime() + 36e5), document.cookie = "FTSTAT_ok_pages=" + a2428ops + ";path=/;expires=" + a2428oe.toGMTString() + ";domain=.ftchinese.com", a2428ot = document.cookie.match(new RegExp("(^| )FTSTAT_ok_times=([^;]*)(;|$)")), null == a2428ot ? a2428ot = 1 : (a2428ot = parseInt(unescape(a2428ot[2])), a2428ot = 1 == a2428ops ? a2428ot + 1 : a2428ot), a2428oe.setTime(a2428oe.getTime() + 31536e6), document.cookie = "FTSTAT_ok_times=" + a2428ot + ";path=/;expires=" + a2428oe.toGMTString() + ";domain=.ftchinese.com"
} catch (e) {}
a2428of = a2428sf, "ftstatlog" !== a2428pf && (a2428of = a2428pf), "ftstatlog" !== a2428tf && (a2428of = a2428tf), a2428op = a2428pu;
try {} catch (e) {
    a2428op = a2428su
}
var logurl = "http://www1.ftchinese.com/log/new_log.php?id=" + FTStoryid + "&adch=" + escape(FTAdch) + "&tpages=" + a2428ops + "&ttimes=" + a2428ot + "&tzone=" + (0 - a2428d.getTimezoneOffset() / 60) + "&tcolor=" + a2428color + "&sSize=" + screen.width + "," + screen.height + "&refer=" + escape(a2428of) + "&vpage=" + escape(a2428op),
    unique = function() {
        var e = (new Date).getTime() + "-",
            o = 0;
        return function() {
            return e + o++
        }
    }(),
    imgLog = function(e) {
        var o = window.imgLogData || (window.imgLogData = {}),
            a = new Image,
            t = unique();
        a.onload = a.onerror = function() {
            a.onload = a.onerror = null, a = null, delete o[t]
        }, a.src = e + "&_uid=" + t
    };
imgLog(logurl);


// Mark:备份cookie函数
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


    // Mark: 获取Notice值
    // function getNoticeValue(){
    //     var noticeValue = '';
    //     var paraArr = parseUrlSearch();
    //     if (paraArr && paraArr.length>0){
    //       var arr = '';
    //         if (!!paraArr[1]){
    //            arr = paraArr[1].split('=');
    //            if(arr[1]){
    //              noticeValue = arr[1];
    //            }else{
    //              noticeValue = '请求中';
    //            }
               
    //         }else{
    //           noticeValue = '请求中';
    //         }
    //     }
    //     var hintContent = document.querySelector('.hint-content');
    //     if(noticeValue){
    //         hintContent.innerHTML = noticeValue;
    //     }
        
    // }
    // getNoticeValue();