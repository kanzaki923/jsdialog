export enum ButtonTypes{
//肯定系を上に、否定形を下に

    // types
    None    = 0,
    Ok      = 1 << 0, 
    Yes     = 1 << 1,
    Save    = 1 << 2,
    Show    = 1 << 3,
    Retry   = 1 << 4,
    No      = 1 << 5,
    Ignore  = 1 << 6,
    Delete  = 1 << 7,
    Cancel  = 1 << 8,
    Close   = 1 << 9,

    //ex
    OkNo    = Ok | No,
    YesNo   = Yes | No,
    OkCancel = Ok | Cancel,
    SaveCancel = Save | Cancel,
    DeleteCancel = Delete | Cancel,
}

export function getBtnDataFromButtonTypes(type:ButtonTypes):{key:number, text:string}[]{
    const lang = 1;
    const table = [
        [0 , ""],
        [1 << 0 , "OK"],
        [1 << 1 , "はい"],
        [1 << 2 , "保存"],
        [1 << 3 , "表示"],
        [1 << 4 , "再試行"],
        [1 << 5 , "いいえ"],
        [1 << 6 , "無視"],
        [1 << 7 , "削除"],
        [1 << 8 , "キャンセル"],
        [1 << 9 , "閉じる"],
    ];

    const res:{key:number, text:string}[] = [];
    
    for (const val of table) {
        const n = Number(val[0]);
        const label = val[lang].toString();
        if ((type & n) == n){
            res.push({key: n, text: label});
        }
    }

    return res;
}

export function getLabelFromButtonTypes(type:ButtonTypes):string[]{

    const datas = getBtnDataFromButtonTypes(type);
    const res:string[] = [];
    for (const val of datas) {
        res.push(val.text);
    }

    return res;
}