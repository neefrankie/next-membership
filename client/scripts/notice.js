       function GetCookie(name){
        var start = document.cookie.indexOf(name+'='),
            len = start+name.length+1,
            end = document.cookie.indexOf(';',len);
        if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
        if (start === -1) {return null;}
        if (end === -1) {end = document.cookie.length; }
        return decodeURIComponent(document.cookie.substring(len,end));
    };

    function parseUrlSearch(){
        var para = location.search.substring(1);
        para = decodeURIComponent(para);
        var paraArr = para.split('&');
        return paraArr;
    }
    
    var eventAction = '';
    var paraArr = parseUrlSearch();
    if (paraArr && paraArr.length>0){
          var arr = paraArr[0].split('=');
          eventAction = arr[1] ;
    }

    var SELabel = GetCookie('SELabel')||'';
    ga('send','event','Web Privileges', 'Buy Success:'+eventAction, SELabel);

    function returnTo(){
        var rCookie = GetCookie('R')||'';
        if(rCookie){
            var referUrl = decodeURIComponent(rCookie);
            window.open(referUrl,'_self');
        }else{
            window.open('http://www.ftchinese.com/','_self');
        }
        
    }


