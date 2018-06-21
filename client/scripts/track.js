  /*jshint esversion: 6 */
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

    if(SELabel.indexOf('/IOSCL/')>-1){
        var clParaArr = SELabel.split('/IOSCL/');
        ga('send','event',clParaArr[0], 'Buy Success:'+eventAction, clParaArr[1]);
    }else{
        ga('send','event','Web Privileges', 'Buy Success:'+eventAction, SELabel);
    }
    // TODO:get actual price
    var price = '';
    price = (eventAction === 'Premium') ? '1998' : '199';
    var randomVal = Math.round(Math.random()*899)+100;
    ga('ecommerce:addTransaction', {
    'id': randomVal,                     // Transaction ID. Required.
    'affiliation': SELabel,   // Affiliation or store name.
    'revenue': price,               // Grand Total.
    'shipping': '0',                  // Shipping.
    'tax': '0' ,
    'currency': 'RMB'                     // Tax.
    });

    ga('ecommerce:addItem', {
    'id': randomVal,                     // Transaction ID. Required.
    'name': eventAction,    // Product name. Required.
    'sku': eventAction,                 // SKU/code.
    'category': 'Subscription',         // Category or variation.
    'price': price,                 // Unit price.
    'quantity': '1'                   // Quantity.
    });

    ga('ecommerce:send');
    

    
   
   