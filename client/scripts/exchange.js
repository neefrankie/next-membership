import {EventObject,getUrlParams,isEmptyObj} from './subscribe_api.js';


let tokenVal = getUrlParams('token');
let tokenId = document.getElementById('token');
tokenId.value = tokenVal;
// console.log(tokenId.value);

// let cancel = document.querySelector('.cancel');

// EventObject.addHandler(cancel,"click", function(){
//     let exchange = document.querySelector('[name="exchange"]');
//     exchange.value = '';
// });  