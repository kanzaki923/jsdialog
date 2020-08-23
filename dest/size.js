export default class Size {
    constructor(val1, val2) {
        this.width = 0;
        this.height = 0;
        if (typeof val1 === "number" && typeof val2 === "number") {
            this.width = val1;
            this.height = val2;
        }
    }
    static add(val1, val2) {
        return new Size(val1.width + val2.width, val1.height + val2.height);
    }
    /**
     * `a` - `b`の値を返す
     * @param a
     * @param b
     */
    static sub(a, b) {
        return new Size(a.width - b.width, a.height - b.height);
    }
}
