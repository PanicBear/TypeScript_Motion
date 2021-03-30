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
    function Modal(MODAL_BG) {
        this.MODAL_BG = MODAL_BG;
        this.state = {
            switch: "HIDE",
            titleInput: "",
            valueTitle: "URL",
            valueInput: "",
        };
        this.valueLabel = this.MODAL_BG.querySelector(".window--value__label");
        this.titleInput = this.MODAL_BG.querySelector(".window--title__input");
        this.valueInput = this.MODAL_BG.querySelector(".window--value__textarea");
        this.initBtnEvent();
    }
    Modal.prototype.initBtnEvent = function () {
        var _this = this;
        this.MODAL_BG.addEventListener("click", function (e) {
            var target = e.target;
            var filters = ["modal--bg", "btn--close", "fa-times"];
            var isCancled = filters.some(function (filter) {
                return target.classList.contains(filter);
            });
            if (isCancled) {
                _this.hideModal();
            }
            else if (target.classList.contains("btn--add")) {
                _this.addComponent();
                _this.hideModal();
            }
        });
    };
    Modal.prototype.setState = function (param) {
        this.state = __assign(__assign({}, this.state), param);
    };
    Modal.prototype.resetModal = function () {
        // switch는 show & hide 있고
        // valueTitle은 띄울 때 초기화되기에 상관없음
        this.setState({
            titleInput: "",
            valueInput: "",
        });
        this.valueLabel.textContent = this.state.valueTitle;
        this.titleInput.value = this.state.titleInput;
        this.valueInput.value = this.state.valueInput;
    };
    Modal.prototype.addComponent = function () {
        console.log("add Component");
    };
    Modal.prototype.showModal = function (valueTitle) {
        this.resetModal();
        this.setState({ switch: "SHOW", valueTitle: valueTitle });
        this.MODAL_BG.classList.remove("modal-hide");
        this.MODAL_BG.classList.add("modal-show");
    };
    Modal.prototype.hideModal = function () {
        this.MODAL_BG.classList.add("modal-hide");
        this.MODAL_BG.classList.remove("modal-show");
    };
    return Modal;
}());
document.addEventListener("DOMContentLoaded", function () {
    var HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
    var MODAL_BG = document.querySelector(".modal--bg");
    // const MODAL_BTN_ADD: Element | null = document.querySelector(".btn--add");
    // const MODAL_BTN_CLOSE: Element | null = document.querySelector(".btn--close");
    var modal = new Modal(MODAL_BG);
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        if (element.classList.contains("btn--add")) {
            console.log(element.textContent);
            switch (element.textContent) {
                case "IMAGE":
                case "VIDEO":
                    modal.showModal("URL");
                    break;
                case "NOTE":
                case "TASK":
                    modal.showModal("Body");
                    break;
                default:
                    throw new Error("unexpected click event");
            }
        }
    });
});
//# sourceMappingURL=motion.js.map