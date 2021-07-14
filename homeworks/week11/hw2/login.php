<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">
  <link rel="stylesheet" href="style.css">
  <title>Yu's Blog</title>
</head>
<body>
  <nav>
    <div class="nav__option-wrapper">
      <a href="index.php" class="nav__title">Yu's Blog</a>
      <a href="archive.php" class="nav__option"> 文章列表 </a>
      <div class="nav__option"> 分類專區 </div>
      <div class="nav__option"> 關於我 </div>
    </div>
  </nav>
  <form method="POST" action="handle_login.php" class="login">
    <div class="form__panel">
      <div class="form__title"> 登入 </div>
      <div class="form__info">
        <input type="account" name="username" placeholder="帳號"/>
        <div class="block"></div>
        <input type="password" name="password" placeholder="密碼"/>
      </div>
      <input type="submit" value="提交">
      <?php
        if (!empty($_GET['errMsg'])) {
          if ($_GET['errMsg'] == 1) {
            echo '<div class="err-message"> 錯誤：資料不齊全，請再次檢查後提交 </div>';
          }
          if ($_GET['errMsg'] == 2) {
            echo '<div class="err-message"> 錯誤：帳號或密碼不正確，請再次檢查後提交 </div>';
          }
        }
      ?>
    </div>
  </form>
</body>
</html>