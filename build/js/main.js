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
// later
// class Component {
//   constructor(private )
// }
window.addEventListener("DOMContentLoaded", function () {
    var MODAL = { title: "", content: "URL", value: "" };
    var HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
    var MODAL_WINDOW = document.querySelector(".modal--bg");
    var CLOSE_BTN_WRAPPER = document.querySelector(".btn--close");
    var ADD_BTN = MODAL_WINDOW.querySelector(".btn--add");
    var COMPONENT_WRAPPER = document.querySelector(".components");
    var clickedBtnType;
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        clickedBtnType = element.textContent;
        headerBtnClicked(clickedBtnType, MODAL_WINDOW, MODAL);
    });
    CLOSE_BTN_WRAPPER === null || CLOSE_BTN_WRAPPER === void 0 ? void 0 : CLOSE_BTN_WRAPPER.addEventListener("click", function (e) {
        return switchModal(MODAL_WINDOW);
    });
    ADD_BTN.addEventListener("click", function () {
        console.log("add Elements");
        addComponent(COMPONENT_WRAPPER, MODAL, COMPONENT); // TODO
        hideModal(MODAL_WINDOW);
    });
    window.addEventListener("click", function (e) {
        var target = e.target;
        if (target.classList.contains("modal-show")) {
            hideModal(MODAL_WINDOW);
        }
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
function addComponent(targetElement, modalData) { }
//# sourceMappingURL=main.js.map