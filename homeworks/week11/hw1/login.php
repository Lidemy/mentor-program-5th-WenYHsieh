<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">
  <title>留言板</title>
</head>
<body>
  <div class="warning">
  注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號密碼。
  </div>
  <div class="panel">
    <div class="panel__membership-btn-wrapper">
      <a class="panel__btn" href="index.php"> 留言板 </a>
      <a class="panel__btn" href="register.php"> 註冊 </a>
    </div>
    <div class="panel__title"> 登入 </div>
    <form method="POST" action="./handle_login.php">
      帳號： <input name="account" class="form__username"/> <br>
      密碼： <input type="password" name="password" class="form__username"/> <br>
      <input type="submit" class="panel__btn" value="提交"/>
    </form>
    <?php
      if (!empty($_GET['errMsg'])) {
        if ($_GET['errMsg'] === '1') {
          echo '<span class="err">錯誤：資料不齊全</span>';
        }else if ($_GET['errMsg'] == '2') {
          echo '<span class="err">錯誤：帳號或密碼輸入錯誤，請先註冊或再次確認！</span>';
        }
        
      }
    ?>
  </div>
</body>
</html>