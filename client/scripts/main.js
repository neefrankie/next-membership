
// const clickSub1 = (value) => {
//     console.log("value1:"+value)
//     console.log("a1:"+a)
// }
// clickSub1(5);
// 不能使用id，不然重复使用
// let openSub = document.getElementById('openSub');
// openSub.onclick=function(){
    // console.log("11");
//     window.open('payment.html', '_blank','"menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,width=200,height=100,left=300');
// };
var aLi = document.querySelectorAll('.openSub');

let previewOverlay = document.getElementById('preview-overlay');
let previewShadow = document.getElementById('preview-shadow');

var handler = function(event){

    var previewHTML = '<div id="preview-shadow" class="o-overlay-shadow fadeIn"></div><div id="preview-box" class="rightanswer show o-overlay__arrow-top fadeInRight"><div>欢迎订阅FT会员服务</div><div><span>商品名称：</span><span>FT会员</span></div><div><span>支付方式：</span><label class="mode"><input name="pay" type="radio" value="" /><img src="https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:tick?tint=26747a&format=svg&source=ftchinese" style="width: 1.5em"/>支付宝 </label><label><input name="pay" type="radio" value="微信支付" /><img src="https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:tick?tint=26747a&format=svg&source=ftchinese" style="width: 1.5em"/></label></div><div><label>支付金额 ￥198/年</label><input type="button" id="to-pay" value ="确定支付"/></div></div>';
    previewOverlay.innerHTML = previewHTML;
};

for (var i = 0; i < aLi.length; i++) {
    if (window.addEventListener){
        aLi[i].addEventListener("click",handler,false);
    }else if (window.attachEvent){
        aLi[i].attachEvent("onclick",handler);
    }
}

    // $('body').on('click', '#button-preview-main', function () {
    //     $('#preview-overlay').html(previewHTML);
    //     tidyup();
    // });

    // function tidyup() {
    //     $('.animated').removeClass('animated');
    // }

    
    // 使用jquery异步方式可行，但是原生的id找不到，为null
    var toPay = document.getElementById('to-pay');
    
    // toPay.addEventListener("click",function(){
    //     console.log("toPay")
    //     previewOverlay.innerHTML = '';
    // },false);
    $('body').on('click', '#to-pay', function () {
        console.log(toPay)
        $('#preview-overlay').empty();
    });
