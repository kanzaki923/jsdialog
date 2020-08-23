export default class Size{
    public width:number;
    public height:number;

    constructor();
    constructor(width:number, height:number);
    constructor(val1?:number, val2?:number){
        this.width = 0;
        this.height = 0;

        if (typeof val1 === "number" && typeof val2 === "number"){
            this.width = val1;
            this.height = val2;
        }
    }

    public static add(val1:Size, val2:Size):Size{
        return new Size(val1.width + val2.width, val1.height + val2.height);
    }

    /**
     * `a` - `b`の値を返す
     * @param a 
     * @param b 
     */
    public static sub(a:Size, b:Size):Size{
        return new Size(a.width - b.width, a.height - b.height);
    }
}