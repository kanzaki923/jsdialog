import { ButtonTypes } from "./buttons.js";

export default class DialogResult{

    private _button:ButtonTypes;
    private _data: unknown;

    public get button():ButtonTypes{
        return this._button | ButtonTypes.None;
    }
    public set button(val:ButtonTypes){
        this._button = val;
    }

    public get data():unknown{
        return this._data;
    }
    public set data(val:unknown){
        this._data = val;
    }
}