import Point from "./point.js";
import Size from "./size.js";
import { ButtonTypes as Types, getLabelFromButtonTypes } from "./buttons.js";
export default class WindowBase {
    constructor(val1, val2, val3, val4) {
        this._position = new Point(20 * WindowBase.WindowCount % 300, 20 * WindowBase.WindowCount % 300);
        this.size = new Size(300, 200);
        this._title = "ダイアログ";
        this._content = undefined;
        this._buttons = Types.Close;
        this._isMouseDown = false;
        this._isMovable = true;
        this._clickPoint = new Point();
        this._topMost = false;
        if (typeof val1 === "string") {
            this._title = val1;
        }
        if (val1 instanceof Point) {
            this._position = val1;
        }
        if (typeof val2 === "string") {
            this._content = val2;
        }
        if (val2 instanceof Size) {
            this.size = val2;
        }
        if (val3 instanceof Point) {
            this._position = val3;
        }
        if (val4 instanceof Size) {
            this.size = val4;
        }
        console.log(this._position);
        WindowBase.WindowCount++;
    }
    static SetActive(dialog) {
        if (!WindowBase.ActiveInstance) {
            WindowBase.ActiveInstance = dialog;
            dialog.topMost = true;
            return;
        }
        WindowBase.ActiveInstance.topMost = false;
        WindowBase.ActiveInstance = dialog;
        dialog.topMost = true;
    }
    get title() { return this._title; }
    get content() { return this._content; }
    get buttons() { return this.buttons; }
    set buttons(types) { this._buttons = types; }
    set size(size) {
        let width = size.width;
        let height = size.height;
        if (width > window.innerWidth) {
            width = window.innerWidth;
        }
        if (height > window.innerHeight) {
            height = window.innerHeight;
        }
        this._size = new Size(width, height);
        if (this._element) {
            this._element.style.width = this._size.width + "px";
            this._element.style.height = this._size.height + "px";
        }
    }
    set position(pos) {
        let top = pos.Y;
        let left = pos.X;
        if (top < 0) {
            top = 0;
        }
        if (top > window.innerHeight - this._size.height / 2) {
            top = window.innerHeight - this._size.height / 2 - 1;
        }
        if (left < 0) {
            left = 0;
        }
        if (left > window.innerWidth - this._size.width / 2) {
            left = window.innerWidth - this._size.width / 2 - 1;
        }
        this._position = new Point(left, top);
        if (this._element) {
            this._element.style.left = this._position.X + "px";
            this._element.style.top = this._position.Y + "px";
        }
    }
    get topMost() { return this._topMost; }
    set topMost(val) {
        this._topMost = val;
        if (this._element) {
            if (this._topMost) {
                this._element.style.zIndex = "1000";
                console.log("top");
            }
            else {
                this._element.style.zIndex = "999";
            }
        }
    }
    show() {
        const elem = this.makeElement();
        const dest = document.querySelector("body");
        if (dest) {
            dest.append(elem);
            WindowBase.SetActive(this);
        }
    }
    elemMove(e) {
        if (this._isMouseDown) {
            const clientPos = new Point(e.clientX, e.clientY);
            this.position = Point.sub(clientPos, this._clickPoint);
        }
    }
    makeElement() {
        // dialog
        const d = document.createElement("div");
        d.style.cssText = `
            z-index: 999;
            position: fixed;
            display: block;
            left: ${this._position.X}px;
            top: ${this._position.Y}px;
            width: ${this._size.width}px;
            height: ${this._size.height}px;
            border: solid 1px #828495;
            background-color: #fff;
            padding: 0;
            box-shadow: 0px 0px 6px -3px #555;
        `;
        // dialog -> wrap
        const dw = document.createElement("div");
        dw.style.cssText = `
            display: flex;
            height: 100%;
            padding: 0;
            flex-direction: column;
            flex-wrap: nowrap;
        `;
        // title
        const t = document.createElement("div");
        t.style.cssText = `
            display:block;
            width: 100%;
            max-height:3rem;
            background-color: #828495;
            color: #fff;
            font-weight: 700;
            padding: .2rem 1rem;
            box-sizing: border-box;
        `;
        d.addEventListener("mousedown", e => {
            WindowBase.SetActive(this);
        });
        if (this._isMovable) {
            t.addEventListener("mousedown", e => {
                this._isMouseDown = true;
                e.srcElement.style.cursor = "move";
                this._clickPoint = new Point(e.offsetX, e.offsetY);
            });
            t.addEventListener("mouseup", e => {
                this._isMouseDown = false;
                e.srcElement.style.cursor = "";
            });
            window.addEventListener("mousemove", e => this.elemMove(e));
        }
        // title -> t_str
        const t_str = document.createElement("span");
        t_str.classList.add("dialog-title");
        t_str.style.cssText = `
            max-width:100%;
            
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            
        `;
        // content
        const c = document.createElement("div");
        c.style.cssText = `
            display:block;
            min-height:2rem;
            max-height: 80vh;
            width:100%;
            overflow: auto;
            flex-grow: 10;
        `;
        // content -> c_area
        const c_area = document.createElement("div");
        c_area.classList.add("dialog-content");
        c_area.style.cssText = `
            padding: 1rem 2rem;
        `;
        // button
        const b = document.createElement("div");
        b.classList.add("dialog-button");
        b.style.cssText = `
            padding: .5rem 1rem 1rem 1rem;
            display: flex;
            flex-wrap:nowrap;
            justify-content: center;
        `;
        t_str.textContent = this.getTitle();
        c_area.appendChild(this.makeContentElem());
        b.appendChild(this.makeButtonElem());
        t.appendChild(t_str);
        c.appendChild(c_area);
        dw.appendChild(t);
        dw.appendChild(c);
        dw.appendChild(b);
        d.appendChild(dw);
        this._element = d;
        return d;
    }
    getTitle() {
        return this._title;
    }
    makeButtonElem() {
        const btns = document.createDocumentFragment();
        const labels = getLabelFromButtonTypes(this._buttons);
        for (const label of labels) {
            if (label.trim().length == 0) {
                continue;
            }
            btns.appendChild(this.makeButton(label.trim()));
        }
        return btns;
    }
    makeButton(text) {
        const btn = document.createElement("button");
        btn.style.cssText = `
            display: inline-block;
            border: none;
            background-color: #828495;
            color: #fff;
            font-weight: 700;
            text-align: center;
            padding: .5rem 1.5rem;
            cursor: pointer;
            margin: .2rem;
            border-radius: 5px;
        `;
        btn.style.flexBasis = "250px";
        btn.innerHTML = text || " - ";
        btn.addEventListener("click", e => {
            var _a;
            (_a = this._element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this._element);
            this._element = undefined;
        });
        return btn;
    }
}
///////// static
WindowBase.WindowCount = 0;