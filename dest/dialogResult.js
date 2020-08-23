import { ButtonTypes } from "./buttons.js";
export default class DialogResult {
    get button() {
        return this._button | ButtonTypes.None;
    }
    set button(val) {
        this._button = val;
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
    }
}
