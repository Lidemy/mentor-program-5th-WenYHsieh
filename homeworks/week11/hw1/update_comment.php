<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  
  $id = $_GET['id'];
  $sql = "SELECT * from Yu_comments WHERE id = ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute(); 

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

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
    <div class="panel__title"> 編輯留言</div>
    <form method="POST" action="./handle_update_comment.php">
      <textarea name="content" rows="5" placeholder="請輸入留言..."> <?php echo $row['content'];?></textarea>
      <input type="hidden" name="id" value="<?php echo $row['id'];?>"/>
      <input type="submit" class="panel__btn" value="提交"/>
    </form>
    <?php
      if (!empty($_GET['errMsg'])) {
        echo '<span class="err">錯誤：請填寫後再提交</span>';
      }
    ?>
  </div>
  <script src="app.js"></script>
</body>
</html>