<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $is_login = false;
  if (!empty($_SESSION['username'])) {
    $is_login = true;
    $username = $_SESSION['username'];
    $user = get_user_from_username($username);
    $nickname = $user['nickname'];
  } else {
    header('location: index.php');
    die();
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">
  <title></title>
</head>
<body>
  <nav>
    <div class="nav__option-wrapper">
      <a href="index.php" class="nav__title">Yu's Blog</a>
      <a href="archive.php" class="nav__option"> 文章列表 </a>
      <a href="#" class="nav__option"> 分類專區 </a>
      <a href="#" class="nav__option"> 關於我 </a>
    </div>
    <div class="nav__option-wrapper">
      <?php if ($is_login) { ?>
        <div class="nav__welcome"> 歡迎回來！ <?php echo escape($nickname); ?></div> 
        <div class="author__avatar-small"></div>
        <a href="post_article.php" class="nav__option"> 發佈文章 </a>
        <a href="logout.php" class="nav__option"> 登出 </a>
        <a href="menage_articles.php" class="nav__option"> 管理後台 </a>
      <?php } else {
        header("location: index.php");
        exit();
        }?>
    </div>
  </nav>
  <form class="new-article__wrapper" method="POST" action="handle_post_article.php">
    <input type="text" name="title" class="new-article__title" placeholder="標題">
    <textarea name="content" rows="10"></textarea>
    <br><input type="submit" value="發佈"/></input>
    <?php
        if (!empty($_GET['errMsg'])) {
          if ($_GET['errMsg'] == 1) {
            echo '<div class="err-message"> 錯誤：資料不齊全，請再次檢查後提交 </div>';
          }
        }
      ?>
  </form>
</body>
</html>