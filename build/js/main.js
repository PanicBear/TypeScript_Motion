"use strict";
var headerBtnWrapper = document.querySelector(".header--btns");
var clickedBtnText;
headerBtnWrapper === null || headerBtnWrapper === void 0 ? void 0 : headerBtnWrapper.addEventListener("click", function (e) {
    var element = e.target;
    clickedBtnText = element.textContent;
    addElement(clickedBtnText);
});
function addElement(el) {
    console.log(typeof el);
}
//# sourceMappingURL=main.js.map