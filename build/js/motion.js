"use strict";
var ComponentImpl = /** @class */ (function () {
    function ComponentImpl() {
    }
    ComponentImpl.prototype.setData = function (data) {
        this.data = data;
    };
    ComponentImpl.prototype.getData = function () {
        if (this.data) {
            return this.data;
        }
        else {
            throw new Error("Empty Data");
        }
    };
    return ComponentImpl;
}());
document.addEventListener("DOMContentLoaded", function () {
    var HEADER_BTN_WRAPPER = document.querySelector(".header--btns");
    var COMPONENT = new ComponentImpl();
    // const MODAL_WINDOW: Element | null = document.querySelector(".modal--bg");
    HEADER_BTN_WRAPPER === null || HEADER_BTN_WRAPPER === void 0 ? void 0 : HEADER_BTN_WRAPPER.addEventListener("click", function (e) {
        var element = e.target;
        if (element.classList.contains("btn--add")) {
            switch (element.textContent) {
                case "IMAGE":
                case "VIDEO":
                    //showModal(
                    COMPONENT.setData({ title: "title", value: "URL" });
                    // MODAL_WINDOW as Element
                    //);
                    break;
                case "NOTE":
                case "TASK":
                    // showModal(
                    COMPONENT.setData({ title: "title", value: "BODY" });
                    // MODAL_WINDOW as Element
                    // );
                    break;
                default:
                    throw new Error("unexpected click event");
            }
        }
    });
});
// function showModal<D>(data: D, MODAL_WINDOW: Element) {}
//# sourceMappingURL=motion.js.map