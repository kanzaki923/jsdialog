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
    Cancel  = 1 << 7,
    Close   = 1 << 8,

    //ex
    OkNo    = Ok | No,
    YesNo   = Yes | No,
    OkCancel = Ok | Cancel,
    SaveCancel = Save | Cancel,
}

export function getLabelFromButtonTypes(type:ButtonTypes):string[]{
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
        [1 << 7 , "キャンセル"],
        [1 << 8 , "閉じる"],
    ];

    const res:string[] = [];
    for (const val of table) {
        if ((type & Number(val[0])) == Number(val[0])){
            res.push(val[lang].toString());
        }
    }

    return res;
}