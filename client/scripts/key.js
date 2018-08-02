import {GetCookie,getUrlParams} from './subscribe_api';
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m); a.onload = function () { if (typeof clearEvents === 'function') { clearEvents() } }
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

var userIdForGA = GetCookie('U') || GetCookie('USER_ID') || '';
var clientId;
try {
    clientId = getUrlParams('clientId')|| GetCookie('clientId') || '';
} catch(ignore) {}
var gaMore = {hasValue: false};
if (userIdForGA !== null) {
    gaMore.userId = userIdForGA;
    gaMore.hasValue = true;
}
if (clientId !== '') {
    gaMore.clientId = clientId;
    gaMore.hasValue = true;
}
if (gaMore.hasValue) {
    ga('create', 'UA-1608715-1', 'auto', gaMore);
} else {
    ga('create', 'UA-1608715-1', 'auto');
}

ga('require', 'displayfeatures');
ga('require', 'ec');
try {
    ga('send', 'pageview', window.location.href);
} catch (err) {

}


