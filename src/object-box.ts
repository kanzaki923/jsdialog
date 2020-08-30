import WindowBase from "./window-base.js";

// eslint-disable-next-line @typescript-eslint/ban-types
type OBJ = Object;
export default class ObjectBox extends WindowBase<OBJ>{

    public isFunctionShow:boolean;
    public showItemLimit:number;

    init(): void {
        this.isFunctionShow = false;
        this.showItemLimit = 300;
     }
    makeContentElem(): HTMLElement | DocumentFragment {
        const elem = document.createElement("div");
        console.log(this.content);
        if (this.content === undefined){
            elem.innerHTML = "(オブジェクトがセットされていません。)";
            elem.style.color = "darkred";
            return elem;
        }
        const obj = this.content;
        elem.innerHTML = obj.toString();
        return this.makeObjectTable(obj);
        
    }


    public makeObjectTable(obj:OBJ):HTMLElement{
        this._limit = 0;
        const t = document.createElement("table");
        t.classList.add("dialog-table");
        t.style.cssText = "border: solid 1px #333";t
        t.style.borderCollapse = "collapse";

        // t.appendChild(this.makeTr("＝＝Variable＝＝", "＝＝Variable＝＝"));

        t.appendChild(this.makeTr("オブジェクト",obj));
        // const descriptors = Object.getOwnPropertyDescriptors(obj);
        // const list = Object.entries(descriptors);
        // for (const item of list) {
        //         const [name, {value}] = item;
        //         t.appendChild(this.makeTr(name,value));
        // }

        if (this.isFunctionShow){
            let ms = this.getMethods(obj);
            ms = ms.map(val => val + "()")
            if (ms.length >= 1){
                t.appendChild(this.makeTr("＝＝Function＝＝", "＝＝Function＝＝"));
            }
            for (const m of ms) {
                t.appendChild(this.makeTr("(function)", m))
            }
        }
        
        
        return t;
    }
    
    private _limit = 0;
    public makeTr(name:string ,value:OBJ):HTMLElement{
        const tr = document.createElement("tr");
        const thName = document.createElement("th");
        const tdValeu = document.createElement("td");
        
        if (this._limit++ > this.showItemLimit && name !== value){
            name = value = "＝＝オブジェクト数が多すぎるため省略されました＝＝";
        }
        if (name === value){
            const temp = name.replace(/＝＝/g, " - ");
            if (temp.length !== name.length){
                thName.textContent = temp;
                thName.colSpan = 2;
                thName.style.textAlign = "center";
                tr.appendChild(thName);
                return tr;
            }
        }

        tdValeu.textContent = "";
        thName.textContent = name;
        if (typeof value !== "object"){
            let text = "undefined"
            if (value !== undefined){
                text = (<OBJ>value).toString();
            }
            tdValeu.textContent = text;
        }else{
            const descriptors = Object.getOwnPropertyDescriptors(value);
            const list = Object.entries(descriptors);
            for (const item of list) {
                const [name, {value}] = item;
                
                tdValeu.appendChild(this.makeTr(name, value));
            }
        }
        
        
        tr.appendChild(thName);
        tr.appendChild(tdValeu);

        return tr;
    }

    private getMethods = (obj: OBJ): string[] => {
        const getOwnMethods = (obj: OBJ) =>
          Object.entries(Object.getOwnPropertyDescriptors(obj))
            .filter(([name, {value}]) => typeof value === 'function' && name !== 'constructor')
            .map(([name]) => name)
        const _getMethods = (o: OBJ, methods: string[]): string[] =>
          o === Object.prototype ? methods : _getMethods(Object.getPrototypeOf(o), methods.concat(getOwnMethods(o)))
        return _getMethods(obj, [])
      }


    protected getResult(): unknown {
        return null;
    }


}