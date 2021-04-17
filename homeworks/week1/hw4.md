## 跟你朋友介紹 Git

>你必須教他 Git 的基本概念以及基礎的使用，例如說 add 跟 commit，若是還有時間的話可以連 push 或是 pull 都講，菜哥能不能順利成為電視笑話冠軍，就靠你了！



## 版本控制，a piece of cake?

設想一個情境，老師要你跟 h0w 組隊，一起交一篇 command line 簡介及使用的教學報告。  一周的努力過去，你發現你們之間來往的 ppt 版本多到你自己幾乎快要分辨不出來，大概是像這樣:

> CLI 基礎入門_ 第0組_修正版.ppt_
>
> CLI 基礎入門_ 第0組_再次修正版.ppt_
>
> CLI 基礎入門_ 第0組_最後修正版.ppt_
>
> CLI 基礎入門_ 第0組_真的最後修正版.ppt
>
> ....
>
> CLI 基礎入門_ 第0組_真的最後修正版誰再改誰就是小豬.ppt

而這時候，你可愛的隊友 h0w 不小心手滑把你辛辛苦苦，花了一個下午整理的資料刪除了，還不小心按到存檔。

你憤怒地約了 h0w 哥出來，本想教訓他一頓，但看到本人時卻萌生了惻隱之心，只好裝作淡定。崩潰的你暗自在心裡吶喊: 

### 好想要一台時光機呀！！！

## Git: 人類呀～ 我聽見你的訴求了

版本控制的訴求，在個人的電腦中我們可以靠以下來完成

1. 想要控管的檔案依照資料夾管理
2. 不想控管的檔案不加入控管的自料夾
3. 為了避免資料夾檔名和他人發生衝突，以亂數代替流水號
4. 用一個檔案來描述各版本包括最新版本

>  Git 是一個版本控制軟體，代替手動管理，並提供包羅萬象的功能去協助你做資料的版本控管。



## 開始在本地端使用 Git 吧！

**初始化**

`git init`

假設今天有個有個資料夾我希望用 git 來做版本控制，打開 CLI 進入到該資料夾，以`git init`指令，來做初始化，此時資料夾會增加一個隱藏檔案叫做`.git`，裡面裝著 git 做版本控制時所需要用到的所有資源。因此若是將`.git` 刪除，這個資料夾將不再受 git 控制。



**將檔案加入/解除版本控制**

- `git add fileName` 

可將檔案加入版本控制，轉變為 staged 狀態。

- `git add .` 

將資料夾下的所有檔案都加入版本控制。

- `git rm --cached fileName` 

可取消 staged 狀態，變回 untrack。



**建立新版本**
`git commit -m 'message you want to comment on'`
將已加入控管的檔案建立新版本，利用 -m 參數來去加上對於新版本的敘述。在這個階段版本會被加上亂數編號 (版本號)。

> 每一次要建立新版本的流程：
> 修改檔案 -> 修改過的檔案加入控管 (add) -> 建立新版本 (commit)



**查看版本歷史紀錄**

`git log` or `git log --oneline` (簡化輸出資訊)
查看每次 commit，每次建立新版本的**版本號**時間、建立人以及版本描述。



**查看 Git 狀態**
`git status`

- untrack files: 資料夾內尚未加入版本控制的檔案

- changes to commit: 被加入控管的檔案 (staged 狀態)

  

**回到過去的版本**

- `git checkout 版本號 (亂數)` 

將目前的版本回復到版本號所代指的版本。

- `git checkout 你正在工作的 branch` 

將目前的版本回歸到你在工作的 branch 的最新版本。 (如果沒有開立新分支，預設為 master)



**忽略檔案**
若今天有個檔案我永遠都不想加入版本控制 (例如: 帳號密碼或者其他和 project 無關的東西)，可以新增 `touch .gitignore`，在這個檔案紀錄那些想忽略的檔案，當你每次想忽略一個檔案時就不必一直做 `git rm --cached`。

**查看更動過的檔案有哪裡不一樣**
`git diff`

## 開始和別人一起設計笑話吧

**Git v.s. GitHub**
Git:  一個版本控管的程式。
GitHub: 線上主要功能為存放 Git repository 的地方，提供各種圖像化介面操作。
一人作業時，Git 可提供足夠的功能; *多人協作*時就需要 GitHub 來存取及下載共同開發的 Git repository。
註：Git repository 指在 Git 控管之下的專案資料夾

### 將本地的 repository 放到 GitHub repository

1. 申請 GitHub 帳號

2. 在個人 GitHub 新建立一個 repository

3. 回到 git.bash 做連動設定，將工作路徑切換到你想存放 repository 的地方

   `git remote add origin https://github.com/WenYHsieh/test.git `

   新增遠端的位置 (remote add), origin (代稱), url (遠端 repository)

   `git push -u origin master `

   -u 代表 push 到的地方, 這邊是 origin (remote repository) 的 master。

4. 此連動只需要做一次接下來，每一次在本地端更動檔都只需要將更動的內容同步更新就好。
   - 檔案增減內容
   - `git add`,  `git commit -m "更新資訊"`
   - `git push origin master`

### 抓下在別人 git repository 當中不錯的笑話

1. 到有興趣的 repository GitHub 頁面點選 **clone or download**
2. `git clone Https link`
3. 這時候這個 repository 已經進到你的電腦裡了。可以自由修改及 commit，但因為在遠端 repository 的擁有者是別人，會遇到權限問題，所以我不能將他 commit 到我的 GitHub。

   (如果想要弄一分到我自己的遠端 repository，可以使用 fork，此時就可以任意同步，或者該 repository 擁有者更動權限)





















































