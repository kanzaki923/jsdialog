export var ButtonTypes;
(function (ButtonTypes) {
    //肯定系を上に、否定形を下に
    // types
    ButtonTypes[ButtonTypes["None"] = 0] = "None";
    ButtonTypes[ButtonTypes["Ok"] = 1] = "Ok";
    ButtonTypes[ButtonTypes["Yes"] = 2] = "Yes";
    ButtonTypes[ButtonTypes["Save"] = 4] = "Save";
    ButtonTypes[ButtonTypes["Show"] = 8] = "Show";
    ButtonTypes[ButtonTypes["Retry"] = 16] = "Retry";
    ButtonTypes[ButtonTypes["No"] = 32] = "No";
    ButtonTypes[ButtonTypes["Ignore"] = 64] = "Ignore";
    ButtonTypes[ButtonTypes["Delete"] = 128] = "Delete";
    ButtonTypes[ButtonTypes["Cancel"] = 256] = "Cancel";
    ButtonTypes[ButtonTypes["Close"] = 512] = "Close";
    //ex
    ButtonTypes[ButtonTypes["OkNo"] = 33] = "OkNo";
    ButtonTypes[ButtonTypes["YesNo"] = 34] = "YesNo";
    ButtonTypes[ButtonTypes["OkCancel"] = 257] = "OkCancel";
    ButtonTypes[ButtonTypes["SaveCancel"] = 260] = "SaveCancel";
    ButtonTypes[ButtonTypes["DeleteCancel"] = 384] = "DeleteCancel";
})(ButtonTypes || (ButtonTypes = {}));
export function getLabelFromButtonTypes(type) {
    const lang = 1;
    const table = [
        [0, ""],
        [1 << 0, "OK"],
        [1 << 1, "はい"],
        [1 << 2, "保存"],
        [1 << 3, "表示"],
        [1 << 4, "再試行"],
        [1 << 5, "いいえ"],
        [1 << 6, "無視"],
        [1 << 7, "削除"],
        [1 << 8, "キャンセル"],
        [1 << 9, "閉じる"],
    ];
    const res = [];
    for (const val of table) {
        if ((type & Number(val[0])) == Number(val[0])) {
            res.push(val[lang].toString());
        }
    }
    return res;
}
