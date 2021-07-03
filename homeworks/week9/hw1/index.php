<?php
  session_start();
  require_once('conn.php');

  $result = $conn->query('SELECT * FROM Yu_comments ORDER BY id DESC');
  if (!$result) {
    die($conn->error);
  }

  // 確認有無登入
  /*
    $_SESSION['account']
    1. 從 cookie 裡面讀取 PHPSESSID (token)
    2. 從檔案裏面讀取 session id 的內容
    3. 放到 $_SESSION 
  */
  $isLogin = false;
  if (!empty($_SESSION['account'])) {
    $isLogin = true;
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
  <title>留言板</title>
</head>
<body>
  <div class="warning">
  注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號密碼。
  </div>
  <div class="panel">
    <div class="panel__membership-btn-wrapper">
      <?php
        if (!$isLogin) {
      ?>
        <a class="panel__btn" href="register.php"> 註冊 </a>
        <a class="panel__btn" href="login.php"> 登入 </a>
      <?php } else { ?>
        <a class="panel__btn" href="logout.php"> 登出 </a>
      <?php } ?>
    </div>
    <?php
        if (!$isLogin) {
      ?>
        <div class="panel__title"> 你有什麼想說的話嗎？ </div>
        <h3>免費註冊，登入後即可和大家討論！</h3>
      <?php } else { ?>
        <div class="panel__title"> 你有什麼想說的話嗎？ <?php echo $_SESSION['account']; ?></div>
        <form method="POST" action="./handle_add_comments.php">
          <textarea name="content" rows="5" placeholder="請輸入留言..."></textarea>
          <input type="submit" class="panel__btn" value="提交"/>
        </form>
      <?php } ?>
    <?php
      if (!empty($_GET['errMsg'])) {
        echo '<span class="err">錯誤：請填寫後再提交</span>';
      }
    ?>
    <hr>
    <?php
      while ($row = $result->fetch_assoc()) {
    ?>
      <div class="card">
        <div class="card__avatar"></div>
        <section class="card__body">
          <div class="card__body-username"> <?php echo $row['username']; ?> </div><sapn class="card__body-date"> <?php echo $row['created_at']; ?></span>
          <p class="card__body-content"> <?php echo $row['content']; ?></p>
        </section>
      </div>
    <?php } ?>
  </div>
</body>
</html>