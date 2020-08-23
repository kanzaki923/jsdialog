import Size from "./size.js";
export default class Point {
    constructor(val1, val2) {
        this.X = 0;
        this.Y = 0;
        if (typeof val1 === "number" && typeof val2 === "number") {
            this.X = val1;
            this.Y = val2;
        }
    }
    static add(val1, val2) {
        let res = new Point();
        if (val2 instanceof Point) {
            res = new Point(val1.X + val2.X, val1.Y + val2.Y);
        }
        else if (val2 instanceof Size) {
            res = new Point(val1.X + val2.width, val1.Y + val2.height);
        }
        return res;
    }
    /**
     * `a` - `b`の値を返す
     * @param a
     * @param b
     */
    static sub(a, b) {
        return new Point(a.X - b.X, a.Y - b.Y);
    }
}
