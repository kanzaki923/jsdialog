import WindowBase from "./window-base.js";
export default class ObjectEditBox extends WindowBase {
    init() {
        this.isSubItemEdit = true;
        this.after = this.content;
    }
    makeContentElem() {
        const r = document.createElement("div");
        const t = document.createElement("table");
        t.classList.add("dialog-table");
        const obj = this.after;
        if (obj === undefined) {
            r.innerHTML = "編集可能なオブジェクトがセットされていません。";
            return r;
        }
        const obj_list = Object.entries(Object.getOwnPropertyDescriptors(obj));
        for (const item of obj_list) {
            const [name, value] = item;
            t.appendChild(this.makeTr(name, value));
        }
        r.appendChild(t);
        return r;
    }
    makeTr(name, value) {
        var _a;
        const tr = document.createElement("tr");
        const nameTd = document.createElement("th");
        const valueTd = document.createElement("td");
        let edit;
        const valType = typeof value.value;
        if (valType === "string") {
            const tbox = document.createElement("textarea");
            tbox.textContent = value.value.toString();
            tbox.addEventListener("change", e => {
                value.value = tbox.value;
                Object.defineProperty(this.after, name, value);
            });
            edit = tbox;
        }
        else if (valType === "number") {
            const nbox = document.createElement("input");
            nbox.setAttribute("type", "number");
            nbox.setAttribute("value", Number(value).toString());
            nbox.value = ((_a = value.value) === null || _a === void 0 ? void 0 : _a.toString()) || "0";
            nbox.addEventListener("change", e => {
                value.value = Number(nbox.value);
                Object.defineProperty(this.after, name, value);
            });
            edit = nbox;
        }
        else if (valType === "boolean") {
            const cbox = document.createElement("input");
            cbox.setAttribute("type", "checkbox");
            if (value.value) {
                cbox.setAttribute("checked", "checked");
            }
            cbox.addEventListener("change", e => {
                value.value = !!cbox.checked;
                Object.defineProperty(this.after, name, value);
            });
            edit = cbox;
        }
        else if (valType === "undefined") {
            edit = document.createElement("span");
            edit.textContent = "undefined";
            edit.style.color = "#777";
        }
        else if (valType === "object") {
            edit = document.createElement("button");
            edit.textContent = "オブジェクト";
            edit.title = "クリックで編集";
            edit.addEventListener("click", e => {
                (async () => {
                    const subDialog = new ObjectEditBox(this.title + " > " + name, value.value, this.position, this.size);
                    const res = await subDialog.asyncShow();
                    value.value = res.data;
                    Object.defineProperty(this.after, name, value);
                })();
            });
        }
        else if (valType === "function") {
            edit = document.createElement("span");
            edit.textContent = "(Function)";
        }
        else {
            edit = document.createElement("p");
            edit.title = "不明なタイプ: " + valType;
            edit.textContent = (value === null || value === void 0 ? void 0 : value.toString()) || "undefined";
        }
        nameTd.textContent = name;
        if (!value.writable || !value.configurable) {
            edit.style.backgroundColor = "#888";
        }
        valueTd.appendChild(edit);
        tr.appendChild(nameTd);
        tr.appendChild(valueTd);
        return tr;
    }
    getResult() {
        return this.after;
    }
}
