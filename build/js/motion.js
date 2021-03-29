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
var Component = /** @class */ (function () {
    function Component(data) {
        this.data = data;
    }
    Component.prototype.getData = function () {
        if ("body" in this.data) {
            console.log("MEDIA");
            return this.data;
        }
        else if ("url" in this.data) {
            console.log("TEXT");
            return this.data;
        }
        else {
            throw new Error("undefined component");
        }
    };
    return Component;
}());
var Modal = /** @class */ (function () {
    function Modal(MODAL_WINDOW) {
        this.MODAL_WINDOW = MODAL_WINDOW;
        this.state = {
            switch: "HIDE",
            titleInput: "",
            valueTitle: "URL",
            valueInput: "",
        };
    }
    Modal.prototype.resetModal = function () {
        // switch는 show & hide 있고
        // valueTitle은 띄울 때 초기화되기에 상관없음
        var resetParam = {
            titleInput: "",
            valueInput: "",
        };
        this.state = __assign(__assign({}, this.state), resetParam);
    };
    Modal.prototype.setModalState = function (modifyParam) {
        this.state = __assign(__assign({}, this.state), modifyParam);
    };
    Modal.prototype.showModal = function (valueTitle) {
        this.resetModal();
        this.setModalState({ switch: "SHOW", valueTitle: valueTitle });
        var valueLabel = this.MODAL_WINDOW.querySelector(".window--value__label");
        var titleInput = this.MODAL_WINDOW.querySelector(".window--title__input");
        var valueInput = this.MODAL_WINDOW.querySelector(".window--value__textarea");
        this.MODAL_WINDOW.classList.remove("modal-hide");
        this.MODAL_WINDOW.classList.add("modal-show");
        valueLabel.textContent = this.state.valueTitle;
        titleInput.value = this.state.titleInput;
        valueInput.value = this.state.valueInput;
    };
    Modal.prototype.hideModal = function () {
        this.MODAL_WINDOW.classList.add("modal-hide");
        this.MODAL_WINDOW.classList.remove("modal-show");
        var modalInputTitle = this.MODAL_WINDOW.querySelector(".window--title__input");
        var modalInputValue = this.MODAL_WINDOW.querySelector(".window--value__input");
        modalInputTitle.value = "";
        modalInputValue.value = "";
    };
    return Modal;
}());
document.addEventListener("DOMContentLoaded", function () {
    var HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
    var MODAL_WINDOW = document.querySelector(".modal--bg");
    var MODAL_CLOSE_BTN = document.querySelector(".btn--close");
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        var component;
        var modal = new Modal(MODAL_WINDOW);
        if (element.classList.contains("btn--add")) {
            console.log(element.textContent);
            switch (element.textContent) {
                case "IMAGE":
                case "VIDEO":
                    console.log(modal.showModal((component = new Component({ title: "title", url: "URL" })), MODAL_WINDOW));
                    break;
                case "NOTE":
                case "TASK":
                    console.log(showModal((component = new Component({ title: "title", body: "BODY" })), MODAL_WINDOW));
                    showModal((component = new Component({ title: "title", body: "BODY" })), MODAL_WINDOW);
                    break;
                default:
                    throw new Error("unexpected click event");
            }
        }
    });
});
//# sourceMappingURL=motion.js.map