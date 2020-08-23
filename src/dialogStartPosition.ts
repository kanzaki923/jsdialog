type START_POS_VALUE = "Default" | "CenterMouse" | "CenterWindow" | "Manual";
export class DialogStartPosition{
    private _val:START_POS_VALUE;
    public set value(val:START_POS_VALUE){ this._val = val;}
    public get value():START_POS_VALUE {return this._val;}

    constructor(val?:START_POS_VALUE){
        this._val = "Default";
        if (val){
            this._val = val;
        }

    }

    public static Default = new DialogStartPosition("Default");
    public static CenterMouse = new DialogStartPosition("CenterMouse");
    public static CenterWindow = new DialogStartPosition("CenterWindow");
    public static Manual = new DialogStartPosition("Manual");    

}