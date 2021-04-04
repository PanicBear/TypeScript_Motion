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
    function Component(section) {
        this.section = section;
        this.state = {
            componentType: "IMAGE",
            titleInput: "",
            valueInput: "",
        };
    }
    Component.prototype.setState = function (param) {
        this.state = __assign(__assign({}, this.state), param);
    };
    Component.prototype.addComponent = function (input) {
        var _this = this;
        var _a;
        var newComponent = document.createElement("div");
        newComponent.classList.add("component");
        this.setState(input);
        this.section.appendChild(this.parseValue(input, newComponent));
        (_a = newComponent.querySelector(".btn--close")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            if (confirm("해당 요소를 삭제하시겠습니까?")) {
                _this.section.removeChild(newComponent);
            }
        });
    };
    Component.prototype.parseValue = function (param, componentWrapper) {
        var html = "";
        var title = param.titleInput;
        var value = param.valueInput;
        switch (this.state.componentType) {
            case "IMAGE":
                componentWrapper.classList.add("component--media");
                html = "<div class=\"media\">\n          <img src=\"" + value + "\" alt=\"img\" />\n        </div>\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + title + "</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>";
                break;
            case "VIDEO":
                componentWrapper.classList.add("component--media");
                var videoId = "";
                var regex1 = /(?:https?\/\/)?(?:www\.)?youtu.be\/([a-zA-z0-9-]{11})/;
                var regex2 = /(?:https?\/\/)?(?:www\.)?youtube.com\/watch\?v=([a-zA-z0-9-]{11})/;
                if (value.match(regex1)) {
                    var result = value.match(regex1);
                    videoId = result[1];
                }
                else if (value.match(regex2)) {
                    var result = value.match(regex2);
                    videoId = result[1];
                }
                else {
                    throw new Error("not a youtube url");
                }
                console.log(videoId);
                html = "<div class=\"media\">\n        <iframe id=\"ytplayer\" type=\"text/html\"\n        src=\"https://www.youtube.com/embed/" + videoId + "?autoplay=0&origin=http://example.com\"\n        frameborder=\"0\"></iframe>\n        </div>\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + title + "</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>";
                break;
            case "NOTE":
                componentWrapper.classList.add("component--text");
                html = "<div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + title + "</p>\n            <p class=\"text--list\">" + value + "</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>";
                break;
            case "TASK":
                componentWrapper.classList.add("component--text");
                html = "<div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + title + "</p>\n            <input type=\"checkbox\" name=\"checkbox\" />\n            <label class=\"text--list\" for=\"checkbox\">" + value + "</label>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>";
                break;
            default:
                throw new Error("unable to parse Value");
        }
        componentWrapper.innerHTML = html;
        return componentWrapper;
    };
    return Component;
}());
var Modal = /** @class */ (function () {
    function Modal(MODAL_BG, component) {
        this.MODAL_BG = MODAL_BG;
        this.component = component;
        this.state = {
            componentType: "IMAGE",
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
                _this.setState({
                    titleInput: _this.titleInput.value,
                    valueInput: _this.valueInput.value,
                });
                console.log(_this.state);
                _this.component.addComponent(_this.state);
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
        this.titleInput.value = this.state.titleInput;
        this.valueInput.value = this.state.valueInput;
    };
    Modal.prototype.showModal = function (component) {
        this.resetModal();
        switch (component) {
            case "IMAGE":
            case "VIDEO":
                this.setState({ componentType: component, valueTitle: "URL" });
                break;
            case "NOTE":
            case "TASK":
                this.setState({ componentType: component, valueTitle: "Body" });
                break;
            default:
                throw new Error("error with create modal");
        }
        this.valueLabel.textContent = this.state.valueTitle;
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
    var COMPONENT = new Component(document.querySelector(".components"));
    // const MODAL_BTN_ADD: Element | null = document.querySelector(".btn--add");
    // const MODAL_BTN_CLOSE: Element | null = document.querySelector(".btn--close");
    var modal = new Modal(MODAL_BG, COMPONENT);
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        if (element.classList.contains("btn--add")) {
            console.log(element.textContent);
            modal.showModal(element.textContent);
        }
    });
});
//# sourceMappingURL=motion.js.map