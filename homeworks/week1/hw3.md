## 教你朋友 CLI

## 什麼是 Command Line？

 一般使用電腦的時候我們通常都是透過 **Graphic User Interface (GUI) **，也就是**圖形化介面**。例如：我們右鍵新增資料夾的動作就是在點按 GUI 來達到跟電腦互動，請他幫我們建立資料夾的目的；而寫程式時有許多工具並**不一定提供 GUI**，那麼這時候我們就可以透過 **Command Line Interface (CLI)** 這個方式，利用純文字去下指令操控電腦。

## CLI 建置

這邊我要以 **Git bash** 來教你一些基礎的指令，以及達成你的目的。如果你是用 Windows 電腦 ， 可以Google 搜尋 "git"，安裝屬於你作業系統的版本；如果是 MacOS 就直接打開內建終端機，指令是相通的。

## CLI 基礎指令

1. Print Working Directory (pwd)

    印出目前所在工作路徑 (資料夾)。

    例如：`/c/Users/H0wFan`

2. List (ls)
    列出目前所在工作目錄底下的所有檔案。

  例如：我在`/c/Users/H0wFan` 下 `ls` 指令，就會看到在這個目錄底下的所有檔案。

3. Change Directory (cd)
    切換資料夾。

  例如：h0wFan 底下有個資料夾叫做 happyEveryDay，我想進到資料夾裡面看看，就可以 `cd happyEveryDay` ；如果想退回上一層可以 `cd ..`。 

4. touch 

  `touch 不存在的檔案.txt`，不存在的檔案.txt 將被新增到你的工作目錄下。
5. Remove (rm)

  `rm 要刪除的檔案.txt`，要刪除的檔案.txt 將被刪除。
6. Make Directory (mkdir)

   `mkdir 不存在的資料夾名稱`，這個資料夾就會被新增到路徑底下。
## 建立一個叫做wifi 的資料夾，並且在裡面建立一個叫afu.js 的檔案

學會了基本指令，也已經能夠達成這個目的了。

1.  首先 `pwd` 確認自己的工作路徑
2.  利用`cd`切換到你想要建立 wifi 這個資料夾的路徑。
3.  `mkdir wifi`，建立 wifi 資料夾。
4.  `cd wifi` 進入 wifi 裡面。
5.  `touch afu.js`，即可建立 afu.js 檔案。





