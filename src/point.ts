import Size from "./size.js";

export default class Point{
    public X:number;
    public Y:number;

    constructor();
    constructor(x:number, y:number);
    constructor(val1?:any, val2?:any){
        this.X = 0;
        this.Y = 0;

        if (typeof val1 === "number" && typeof val2 === "number"){
            this.X = val1;
            this.Y = val2;
        }
    }

    public static add(val1:Point, val2:Size):Point;
    public static add(val1:Point, val2:Point):Point;
    public static add(val1:Point, val2:Size | Point):Point{
        let res:Point = new Point();
        
        if (val2 instanceof Point){
            res = new Point(val1.X + val2.X, val1.Y + val2.Y);
        }else if (val2 instanceof Size){
            res = new Point(val1.X + val2.width, val1.Y + val2.height);
        }
        return res;
    }

    /**
     * `a` - `b`の値を返す
     * @param a 
     * @param b 
     */
    public static sub(a:Point, b:Point):Point{
        return new Point(a.X - b.X, a.Y - b.Y);
    }
}