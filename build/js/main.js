"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var headerBtnWrapper = document.querySelector(".header--btns");
var clickedBtnType;
var modal = { title: "", content: "URL", value: "" };
headerBtnWrapper === null || headerBtnWrapper === void 0 ? void 0 : headerBtnWrapper.addEventListener("click", function (e) {
    var element = e.target;
    clickedBtnType = element.textContent;
    addElement(clickedBtnType, modal);
});
function addElement(clickedBtnType, modal) {
    console.log(modal);
    switch (clickedBtnType) {
        case "IMAGE":
            setModal(modal, { content: "URL" });
            break;
        case "VIDEO":
            setModal(modal, { content: "URL" });
            break;
        case "NOTE":
            setModal(modal, { content: "Body" });
            break;
        case "TASK":
            setModal(modal, { content: "Body" });
            break;
        default:
            new Error("Multiple Elements were selected");
    }
}
function setModal(modal, fieldsToUpdate) {
    return __assign(__assign({}, modal), fieldsToUpdate);
}
//# sourceMappingURL=main.js.map