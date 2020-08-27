var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Point from "./point.js";
import Size from "./size.js";
import { ButtonTypes as Types, getBtnDataFromButtonTypes } from "./buttons.js";
import DialogResult from "./dialogResult.js";
import { DialogStartPosition } from "./dialogStartPosition.js";
export default class WindowBase {
    constructor(val1, val2, val3, val4) {
        // スタイルシートを書き出す(一度のみ)
        if (!WindowBase.IsStyleWrited) {
            WindowBase.WriteStyle();
        }
        // 初期化
        this._position = new Point(20 * WindowBase.WindowCount % 300, 20 * WindowBase.WindowCount % 300);
        this.size = new Size(300, 200);
        this._title = "ダイアログ";
        this._content = undefined;
        this._buttons = Types.Close;
        this._isMouseDown = false;
        this._isMovable = true;
        this._clickPoint = new Point();
        this._topMost = false;
        this.startPosition = new DialogStartPosition("Default");
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
        if (val3 instanceof DialogStartPosition) {
            this.startPosition = val3;
            if (val3.value == "Default") {
                //
            }
            else if (val3.value == "Manual") {
                this._position = new Point(0, 0);
            }
            else if (val3.value == "CenterMouse") {
                this._position = new Point(window.innerWidth / 2 - this._size.width / 2, window.innerHeight / 2 - this._size.height / 2);
            }
            else if (val3.value == "CenterWindow") {
                this._position = new Point(window.innerWidth / 2 - this._size.width / 2, window.innerHeight / 2 - this._size.height / 2);
            }
        }
        if (val4 instanceof Size) {
            this.size = val4;
        }
        WindowBase.WindowCount++;
        this.init();
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
    static WriteStyle() {
        const style = document.createElement("style");
        style.innerHTML = `
            .dialog-main{
                animation: .2s cubic-bezier(.18,.89,.32,1.28) forwards fadein-1, .2s cubic-bezier(.18,.89,.32,1.28) forwards zoomin-1;
                animation-iteration-count: 1;
            }

            @keyframes fadein-1{
                0% { opacity: 0; }
                100% { opacity: 1;}
            }
            @keyframes zoomin-1{
                0% { transform: scale(.98); }
                100% { transform: scale(1); }
            }
        `;
        document.body.append(style);
    }
    get title() { return this._title; }
    set title(val) { this._title = val; }
    get content() { return this._content; }
    set content(val) { this._content = val; }
    get buttons() { return this.buttons; }
    set buttons(types) { this._buttons = types; }
    get size() { return this._size; }
    set size(size) {
        let width = size.width;
        let height = size.height;
        if (width > window.innerWidth) {
            width = window.innerWidth;
        }
        else if (width < WindowBase.MinWidth) {
            width = WindowBase.MinWidth;
        }
        if (height > window.innerHeight) {
            height = window.innerHeight;
        }
        else if (height < WindowBase.MinHeight) {
            height = WindowBase.MinHeight;
        }
        this._size = new Size(width, height);
        if (this._element) {
            this._element.style.width = this._size.width + "px";
            this._element.style.height = this._size.height + "px";
        }
    }
    get position() { return this._position; }
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
            }
            else {
                this._element.style.zIndex = "999";
            }
        }
    }
    show() {
        var _a;
        if (((_a = this.startPosition) === null || _a === void 0 ? void 0 : _a.value) == "CenterMouse") {
            const ev = window.event;
            this.position = new Point(ev.x - this._size.width / 2, ev.y - this._size.height / 2);
        }
        const elem = this.makeElement();
        const dest = document.querySelector("body");
        if (dest) {
            dest.append(elem);
            WindowBase.SetActive(this);
        }
    }
    asyncShow() {
        return __awaiter(this, void 0, void 0, function* () {
            this.show();
            const promise = new Promise((resolve, reject) => {
                this.closing = () => {
                    resolve(this.result);
                };
            });
            return promise;
        });
    }
    moveElem(e) {
        if (this._isMouseDown) {
            const clientPos = new Point(e.clientX, e.clientY);
            this.position = Point.sub(clientPos, this._clickPoint);
            console.log(clientPos);
        }
    }
    makeElement() {
        // dialog
        const d = document.createElement("div");
        d.classList.add("dialog-main");
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
            min-height: 5px;
            max-height: 3rem;
            background-color: #828495;
            color: #fff;
            font-weight: 700;
            padding: .2rem 1rem;
            box-sizing: border-box;
            flex-shrink: 0;
        `;
        d.addEventListener("mousedown", e => {
            WindowBase.SetActive(this);
        });
        if (this._isMovable) {
            t.addEventListener("mousedown", e => {
                this._isMouseDown = true;
                // ドラッグ開始要素
                const src = e.srcElement;
                src.style.cursor = "move";
                // 縁ギリギリをクリックしてドラッグを開始するとドラッグが終了できない対策
                let safeMargin = 3;
                safeMargin = Math.min(safeMargin, src.clientHeight / 2 - 1, src.clientWidth / 2 - 1);
                console.log("SafeMargin: " + safeMargin);
                const x = (e.offsetX < safeMargin) ? safeMargin :
                    (e.offsetX > src.clientWidth - safeMargin) ? src.clientWidth - safeMargin : e.offsetX;
                const y = (e.offsetY < safeMargin) ? safeMargin :
                    (e.offsetY > src.clientHeight - safeMargin) ? src.clientHeight - safeMargin : e.offsetY;
                this._clickPoint = new Point(x, y);
            });
            t.addEventListener("mouseup", e => {
                this._isMouseDown = false;
                e.srcElement.style.cursor = "";
            });
            window.addEventListener("mousemove", e => this.moveElem(e));
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
            max-height: 90vh;
            width:100%;
            overflow: auto;
            flex-grow: 10;
            flex-shrink: 10;
        `;
        // content -> c_area
        const c_area = document.createElement("div");
        c_area.classList.add("dialog-content");
        c_area.style.cssText = `
            padding: 1rem 2rem;
        `;
        // button area
        const b = document.createElement("div");
        b.classList.add("dialog-button");
        b.style.cssText = `
            padding: .5rem 1rem 1rem 1rem;
            display: flex;
            flex-wrap:nowrap;
            justify-content: center;
            flex-shrink: 0;
            overflow-y: auto;
        `;
        t_str.textContent = this.getTitle();
        c_area.appendChild(this.makeContentElem());
        b.appendChild(this.makeButtonsElem());
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
    makeButtonsElem() {
        const btns = document.createDocumentFragment();
        const btnDatas = getBtnDataFromButtonTypes(this._buttons);
        for (const btn of btnDatas) {
            if (btn.text.trim().length === 0) {
                continue;
            }
            btns.appendChild(this.makeButton(btn.text, btn.key));
        }
        return btns;
    }
    makeButton(text, type) {
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
            box-sizing: border-box;
        `;
        btn.style.flexBasis = "250px";
        btn.innerHTML = text || " - ";
        btn.addEventListener("click", e => {
            var _a;
            if (!this.result) {
                this.result = new DialogResult();
            }
            this.result.button = type;
            this.result.data = this.getResult();
            (_a = this._element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this._element);
            this._element = undefined;
            if (this.closing) {
                this.closing();
            }
        });
        return btn;
    }
}
///////// static
WindowBase.WindowCount = 0;
WindowBase.MinWidth = 150;
WindowBase.MinHeight = 150;
WindowBase.IsStyleWrited = false;
