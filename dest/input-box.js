import WindowBase from "./window-base.js";
export default class InputBox extends WindowBase {
    set maxLength(val) {
        if (!this.textBox)
            return;
        this.textBox.maxLength = Math.max(val, this.textBox.minLength !== -1 ? this.textBox.minLength : val);
    }
    set minLength(val) {
        if (!this.textBox)
            return;
        this.textBox.minLength = Math.min(val, this.textBox.maxLength !== -1 ? this.textBox.maxLength : val);
    }
    set placeholder(val) {
        if (!this.textBox)
            return;
        this.textBox.placeholder = val;
    }
    set text(val) {
        if (!this.textBox)
            return;
        this.textBox.value = val;
    }
    set isHintShow(val) {
        this._isHintShow = val;
    }
    init() {
        const tbox = document.createElement("input");
        tbox.setAttribute("type", "text");
        tbox.style.cssText = `
            width:100%;
            margin:.35rem 0;
            margin-bottom:0;
            padding: .5rem .5rem;
            border-radius: 5px;
            border: solid 1px #555;
            box-sizing: border-box;
            background-color: #fff;
        `;
        tbox.title = "テキスト入力欄";
        this.textBox = tbox;
        tbox.addEventListener("input", () => { this.check(); });
        this._isHintShow = false;
    }
    check() {
        if (this._isHintShow) {
            const val = this.textBox.value;
            let isOk = true;
            if (this.textBox.minLength !== -1 && val.length < this.textBox.minLength)
                isOk = false;
            else if (this.textBox.maxLength !== -1 && val.length > this.maxLength)
                isOk = false;
            if (!isOk) {
                this.textBox.style.backgroundColor = "pink";
            }
            else {
                this.textBox.style.backgroundColor = "#fff";
            }
        }
    }
    makeContentElem() {
        const c = document.createElement("div");
        const head = document.createElement("div");
        head.textContent = this.content;
        let notes;
        if (this._isHintShow && this.textBox) {
            notes = document.createElement("div");
            notes.style.cssText = `font-size: .7rem; color:#666`;
            notes.textContent = `
            最小文字数: ${this.textBox.minLength === -1 ? "制限なし" : this.textBox.minLength},  
            最大文字数: ${this.textBox.maxLength === -1 ? "制限なし" : this.textBox.maxLength}
            `;
        }
        this.check();
        c.appendChild(head);
        c.appendChild(this.textBox);
        if (notes)
            c.appendChild(notes);
        return c;
    }
    getResult() {
        var _a;
        return (_a = this.textBox) === null || _a === void 0 ? void 0 : _a.value;
    }
}
