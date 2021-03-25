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
window.addEventListener("DOMContentLoaded", function () {
    var MODAL = { title: "", content: "URL", value: "" };
    var headerBtnWrapper = document.querySelector(".header--btns");
    var closeBtnWrapper = document.querySelector(".btn--close");
    var clickedBtnType;
    var modalWindow = document.querySelector(".modal--bg");
    var addBtn = modalWindow.querySelector(".btn--add");
    headerBtnWrapper === null || headerBtnWrapper === void 0 ? void 0 : headerBtnWrapper.addEventListener("click", function (e) {
        var element = e.target;
        clickedBtnType = element.textContent;
        headerBtnClicked(clickedBtnType, modalWindow, MODAL);
    });
    closeBtnWrapper === null || closeBtnWrapper === void 0 ? void 0 : closeBtnWrapper.addEventListener("click", function (e) {
        return switchModal(modalWindow);
    });
    addBtn.addEventListener("click", function () {
        console.log("add Elements");
        hideModal(modalWindow);
    });
});
function headerBtnClicked(clickedBtnType, modalWindow, modal) {
    var newModal = modal;
    var modalValueLabel = document.querySelector(".window--value__label");
    console.log(clickedBtnType);
    switch (clickedBtnType) {
        case "IMAGE":
        case "VIDEO":
            newModal = setModalData(modal, { content: "URL" });
            break;
        case "NOTE":
        case "TASK":
            newModal = setModalData(modal, { content: "Body" });
            break;
        default:
            new Error("Multiple Elements were selected");
    }
    mapModalData(newModal, modalValueLabel);
    switchModal(modalWindow);
}
function setModalData(modal, fieldsToUpdate) {
    return __assign(__assign({}, modal), fieldsToUpdate);
}
function mapModalData(data, modalValueLabel) {
    modalValueLabel.textContent = data["content"];
}
function switchModal(modalWindow) {
    modalWindow.classList.contains("modal-hide")
        ? showModal(modalWindow)
        : hideModal(modalWindow);
}
function showModal(modalWindow) {
    console.log("showModal");
    modalWindow.classList.remove("modal-hide");
    modalWindow.classList.add("modal-show");
}
function hideModal(modalWindow) {
    console.log("hideModal");
    modalWindow.classList.remove("modal-show");
    modalWindow.classList.add("modal-hide");
}
//# sourceMappingURL=main.js.map