// //浏览器滚动条宽度
// DSE.window.scrollbarWidth = (function () {
//     var oP = document.createElement('p'), styles = {width: '100px', height: '100px', overflowY: 'scroll'}, i,
//         scrollbarWidth;
//     for (i in styles) {
//         oP.style[i] = styles[i]
//     }
//     document.body.appendChild(oP);
//     scrollbarWidth = oP.offsetWidth - oP.clientWidth;
//     DSE.remove(oP);
//     return scrollbarWidth
// })();
// document.body.style.visibility = 'visible';
