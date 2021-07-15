<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $sql = "SELECT C.id, C.content as content, C.created_at as created_at," .
          "U.username as username, U.account as account " .
          "FROM Yu_comments as C LEFT JOIN Yu_users as U ON C.account = U.account " .
          "WHERE C.is_deleted IS NULL " .
          "ORDER BY C.id DESC " . 
          "limit ? offset ?";

  $item_per_page = 5;
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $offset = ($page-1)*$item_per_page;

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result = $stmt->execute(); 

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

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
    $username = get_username_from_account($_SESSION['account']);
    $authority = get_authority_from_account($_SESSION['account']);
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap" rel="stylesheet">
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
        <span class="panel__btn update-username">更變暱稱</span>
      <?php } ?>
      <?php
        // 登入且為管理員
        if ($isLogin && $authority == 0) { ?>
          <a class="panel__btn" href="menage_authority.php"> 後台管理 </a>
      <?php } ?>
    </div>
    <?php
        if (!$isLogin) {
      ?>
        <div class="panel__title"> 你有什麼想說的話嗎？ </div>
        <h3>免費註冊，登入後即可和大家討論！</h3>
      <?php } else { ?>
        <div class="panel__title"> 你有什麼想說的話嗎？ <?php echo escape($username); ?> </div>
        <form class="panel__update-username-form hide" method="POST" action="./update_username.php">
          新暱稱： <input name="new_username" class="form__username"/>
          <input type="submit" class="panel__btn" value="提交"/>
        </form>
        <form method="POST" action="./handle_add_comments.php">
          <textarea name="content" rows="5" placeholder="請輸入留言..." <?php if ($authority == '2') echo "disabled"; ?> ></textarea>
          <input type="submit" class="panel__btn" value="提交" <?php if ($authority == '2') echo "disabled"; ?>/>
          <?php if ($authority == '2') echo '<span class="err">錯誤： 你已被停權！</span>'; ?>
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
          <div class="card__body-username"> <?php echo escape($row['username']); ?> (@ <?php echo escape($row['account'])?>) </div>
          <span class="card__body-date"> <?php echo $row['created_at']; ?></span>
          <p class="card__body-content"> <?php echo escape($row['content']); ?></p>
        </section>
        <?php
          // 確認是現在登入的使用者，且非管理員: 只可以 編輯/刪除 自己的留言
          if ($username === $row['username'] && $authority != 0) { ?> 
          <div class="icon-wrapper">
            <a class="far fa-edit" href="update_comment.php?id=<?php echo $row['id'];?>"></a>
            <a class="far fa-trash-alt" href="handle_delete_comment.php?id=<?php echo $row['id'];?>"></a>
          </div>
        <?php } ?>
        <?php
          // 確認有登入，且為管理員:可以 編輯/刪除 所有人的留言
          if ($isLogin && $authority == 0) { ?>
          <div class="icon-wrapper">
            <a class="far fa-edit" href="update_comment.php?id=<?php echo $row['id'];?>"></a>
            <a class="far fa-trash-alt" href="handle_delete_comment.php?id=<?php echo $row['id'];?>"></a>
          </div>
        <?php } ?>

      </div>
    <?php } ?>
    <hr>
    <?php
      $sql = "SELECT count(id) as count FROM Yu_comments WHERE is_deleted IS NULL";
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute(); 

      if (!$result) {
      die($conn->error);
      }

      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count/$item_per_page);
    ?>
    <div class="page-info"> 總共有 <?php echo $count; ?> 則留言。頁數：<?php echo $page; ?> / <?php echo $total_page; ?></div>
    <div class="page_navigator">
      <?php if ($page != 1) {?>
        <a href="index.php?page=1">首頁</a>
        <a class="fas fa-backward" href="index.php?page= <?php echo $page - 1;?>"></a>
      <?php } ?>
      <?php if ($page != $total_page) {?>
        <a class="fas fa-forward" href="index.php?page= <?php echo $page + 1;?>"></a>
        <a href="index.php?page=<?php echo $total_page; ?>">最後一頁</a>
      <?php } ?>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>