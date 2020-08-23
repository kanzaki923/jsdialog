import WindowBase from "./window-base.js";

export default class MessageBox extends WindowBase<string>{
    protected getResult(): unknown {
        return null;
    }
    makeContentElem(): HTMLElement {
        const elem = document.createElement("div");
        elem.textContent = this.content ? this.content.toString() : "";
        return elem;
    }
    
}