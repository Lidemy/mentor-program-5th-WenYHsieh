## 交作業流程
1. 將 mentor-program-5th repository 從 Lidemy GitHub clone 到自己電腦裡
	`git clone https://github.com/Lidemy/mentor-program-5th-WenYHsieh.git`
	
2. 進到 mentor-program-5th-WenYHsieh 資料夾
	`cd mentor-program-5th-WenYHsieh`
	
3. 開啟新 branch，假設現在要寫 Week1 作業，就開一個叫做 week1 的 branch
	`git branch week1`
	
4. 切換到 week1 作業 branch
	`git checkout week1`
	
5. 寫作業直接寫在 hw.md

6. 都寫好後 add, commit 到 week1 的 branch
	`git checkout week1`
	`git add hw.md`
	`git commit -m '交作業'`
	
7. 把這個 week1 branch push 到 mentor-program-5th repository
	`git push origin week1`
	
8. 發出 pull request (week1 branch to master)。這時打一些說明文字、發問或隨時更動作業內容。

9. 都確定自我檢測、檢查過作業的格式等等，就可以複製網址，到學習系統去繳交作業。

10. 等待批改完後，就可以切換到 master branch
	
	`git checkout master`
	
11. 把 merge 過後的 master pull 回到本地
    `git pull origin master`

12. 這樣電腦就擁有最新的版本，可以把 week1 branch 刪除
    `git branch -d week1`

13. 交作業就完成

