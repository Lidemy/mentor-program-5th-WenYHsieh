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

  $sql="SELECT * FROM Yu_blog_articles WHERE is_deleted != 1 ORDER BY created_at DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();

  if (!$result){
    die($conn->error());
  }

  $result = $stmt->get_result();
?>

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
      <a href="#" class="nav__option"> 分類專區 </a>
      <a href="#" class="nav__option"> 關於我 </a>
    </div>
    <div class="nav__option-wrapper">
      <?php if ($is_login) { ?>
        <div class="nav__welcome"> 歡迎回來！ <?php echo escape($nickname); ?></div> 
        <div class="author__avatar-small"></div>
        <a href="post_article.php" class="nav__option"> 發佈文章 </a>
        <a href="logout.php" class="nav__option"> 登出 </a>
        <div class="nav__option"> 管理後台 </div>
      <?php } else {?>
        <a href="login.php" class="nav__option"> 登入 </a>
      <?php } ?>
    </div>
  </nav>
  <section class="article-list__wrapper">
    <div class="article__recent-banner"> 管理後台 </div>
    <?php while ($row = $result->fetch_assoc()) {?>
      <div class="article-list__block">
        <div class="article__title"> <?php echo escape($row['title'])?> </div>
        <div>
          <span class="article__time"> <?php echo escape($row['created_at'])?> </span>
          <a href="edit_article.php?id=<?php echo escape($row['id'])?>" class="article__edit">編輯</a>
          <a href="handle_delete_article.php?id=<?php echo escape($row['id'])?>" class="article__edit">刪除</a>
        </div>
      </div>
    <?php } ?>
  </section>

</body>
</html>