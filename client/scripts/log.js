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