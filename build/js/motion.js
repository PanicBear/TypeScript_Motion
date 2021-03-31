"use strict";
// type COMPONENT_DATA = {
//   readonly title: string;
//   readonly url?: string;
//   readonly body?: string;
// };
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
// class Component<D> {
//   constructor(private data: D) {}
//   getData(): D {
//     if ("body" in this.data) {
//       console.log("MEDIA");
//       return this.data as D;
//     } else if ("url" in this.data) {
//       console.log("TEXT");
//       return this.data as D;
//     } else {
//       throw new Error("undefined component");
//     }
//   }
// }
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
        this.setState(input);
        this.section.innerHTML += this.parseValue(input); // << URL 파싱
        //   this.section.innerHTML += `
        //   <div class="component component--text">
        //     <div class="text">
        //       <div class="text--wrapper">
        //         <p class="text--title title">${input.titleInput}</p>
        //         <input type="checkbox" name="checkbox" />
        //         <label class="text--list" for="checkbox">${input.valueInput}</label>
        //       </div>
        //       <div class="btn--close">
        //         <i class="fas fa-times"></i>
        //       </div>
        //     </div>
        //   </div>
        // `;
    };
    Component.prototype.parseValue = function (input) {
        var html = "";
        switch (this.state.componentType) {
            case "IMAGE":
                html = "<div class=\"component component--media\">\n        <div class=\"media\">\n          <img src=\"" + this.state.valueInput + "\" alt=\"img\" />\n        </div>\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">Dream Coding</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>\n      </div>";
                break;
            case "VIDEO":
                html = "<div class=\"component component--media\">\n        <div class=\"media\">\n          <iframe src=\"" + this.state.valueInput + "\" alt=\"video thumbnail\" />\n        </div>\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">Dream Coding</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>\n      </div>";
                break;
            case "NOTE":
                html = "<div class=\"component component--text\">\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + this.state.titleInput + "</p>\n            <p class=\"text--list\">" + this.state.valueInput + "</p>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>\n      </div>";
                break;
            case "TASK":
                html = "<div class=\"component component--text\">\n        <div class=\"paragraph\">\n          <div class=\"text--wrapper\">\n            <p class=\"text--title title\">" + this.state.titleInput + "</p>\n            <input type=\"checkbox\" name=\"checkbox\" />\n            <label class=\"text--list\" for=\"checkbox\">" + this.state.valueInput + "</label>\n          </div>\n          <div class=\"btn--close\">\n            <i class=\"fas fa-times\"></i>\n          </div>\n        </div>\n      </div>";
                break;
            default:
                throw new Error("unable to parse Value");
        }
        return html;
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