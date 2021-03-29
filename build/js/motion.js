"use strict";
// class Component {
//   constructor(private data: COMPONENT_DATA) {}
//   getData(): MEDIA_COMPONENT | TEXT_COMPONENT {
//     if ("body" in this.data) {
//       console.log("MEDIA");
//       return this.data as MEDIA_COMPONENT;
//     } else if ("url" in this.data) {
//       console.log("TEXT");
//       return this.data as TEXT_COMPONENT;
//     } else {
//       throw new Error("undefined component");
//     }
//   }
// }
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
document.addEventListener("DOMContentLoaded", function () {
    var HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
    var MODAL_WINDOW = document.querySelector(".modal--bg");
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        var component;
        if (element.classList.contains("btn--add")) {
            console.log(element.textContent);
            switch (element.textContent) {
                case "IMAGE":
                case "VIDEO":
                    console.log(showModal((component = new Component({ title: "title", url: "URL" })), MODAL_WINDOW));
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
function showModal(data, MODAL_WINDOW) {
    var MODAL_VALUE_LABLE = MODAL_WINDOW.querySelector(".window--value__label");
    MODAL_VALUE_LABLE.textContent = "url" in data ? "URL" : "Body";
    return data;
}
//# sourceMappingURL=motion.js.map