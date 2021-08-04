const path = require('path');
module.exports = {
    mode: 'development',
    entry:'./src/index.js', // 程式進入點  
    output:{
        filename: 'main.js', // 輸出的檔案名稱
        path: path.resolve(__dirname, 'dist'), // 輸出的path, 以path.resolve串接路徑
        library: 'commentPlugin' // 幫你把進入點那檔案 export 的 function 宣告，創建這個 global variable, 讓其他使用者可以透過這個變數來存取到你寫的功能
    },
    module:{
        rules:[{
            test:/\.s[ac]ss$/i, // 如果看到已.css結尾的檔案
            use:['style-loader', 'css-loader'] // 就用這兩個額外的工具來讀 -> 是需要額外安裝的
        }]
    } // 原生webpack只支援js, 如果要讀懂css，要額外到設定檔中加入這段設定
};