
// const a=3;
// function clickSub(value) {
//     console.log("value:"+value)
//     console.log("a2:"+a)

// }
// const clickSub1 = (value) => {
//     console.log("value1:"+value)
//     console.log("a1:"+a)
// }
// clickSub1(5);
// clickSub(5);
// 不能使用id，不然重复使用
let openSub = document.getElementById('openSub');
openSub.onclick=function(){
    console.log("11");
    window.open('payment.html', '_blank','"menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,width=200,height=100,left=300');
};