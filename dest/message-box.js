import WindowBase from "./window-base.js";
export default class MessageBox extends WindowBase {
    init() { }
    getResult() {
        return null;
    }
    makeContentElem() {
        const elem = document.createElement("div");
        elem.textContent = this.content ? this.content.toString() : "";
        return elem;
    }
}
