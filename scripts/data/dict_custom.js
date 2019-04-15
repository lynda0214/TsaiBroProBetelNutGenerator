_custom_dict = [
    ["漫畫", 99999999, "n"],
    ["財哥", 99999999, "n"],
    ["檳友", 99999999, "n"],
    ["檳動", 99999999, "n"],
    ["臉友", 99999999, "n"],
    ["檳果", 99999999, "n"],
    ["貝才哥", 99999999, "n"]
];

// 引用設定檔案，以下不用變更
if (typeof(define) === "function") {
    define(function (require) {
        return _custom_dict;
    });
}
else {
    module.exports = _custom_dict;
}