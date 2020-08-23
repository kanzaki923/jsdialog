export class DialogStartPosition {
    constructor(val) {
        this._val = "Default";
        if (val) {
            this._val = val;
        }
    }
    set value(val) { this._val = val; }
    get value() { return this._val; }
}
DialogStartPosition.Default = new DialogStartPosition("Default");
DialogStartPosition.CenterMouse = new DialogStartPosition("CenterMouse");
DialogStartPosition.CenterWindow = new DialogStartPosition("CenterWindow");
DialogStartPosition.Manual = new DialogStartPosition("Manual");
