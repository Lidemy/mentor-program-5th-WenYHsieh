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
  }

  $sql="SELECT * FROM Yu_blog_articles WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $_GET['id']);
  $result = $stmt->execute();

  if (!$result){
    die($conn->error());
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">
  <title>Yu's Blog</title>
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
      <?php } else { ?>
        <a href="login.php" class="nav__option"> 登入 </a>
      <?php } ?>
    </div>
  </nav>
  <div class="article">
    <div class="article__latest-wrapper">
      <div class="article__latest">
        <div>
          <div class="article__title"><?php echo escape($row['title']);?></div>
          <div class="article__latest-info"> 
            <span class="article__time"><?php echo escape($row['created_at'])?></span>
            <div>
              <?php if ($is_login) {?>
              <a href="edit_article.php?id=<?php echo escape($row['id'])?>" class="article__edit">編輯</a>
              <a href="handle_delete_article.php?id=<?php echo escape($row['id'])?>" class="article__edit">刪除</a>
              <?php }?>
            </div>
          </div>
        </div>
        <div class="article__content"><?php echo escape($row['content'])?></div>
      </div>
    </div>
  </div>
</body>
</html>