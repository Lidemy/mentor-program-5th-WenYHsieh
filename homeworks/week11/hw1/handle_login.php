<?php
  session_start();
  require_once('conn.php');

  // 驗證有無都輸入
  if (empty($_POST['account']) ||
      empty($_POST['password'])) {
    header('Location: login.php?errMsg=1');
    die('資料不齊全！');
  }

  // use account to get password in DB
  $account = $_POST['account'];
  $sql_get_hash_password = "SELECT password FROM Yu_users WHERE account = ?";
  $stmt = $conn->prepare($sql_get_hash_password);
  $stmt->bind_param('s', $account);
  $stmt->execute(); // 回傳成功或失敗
  $result = $stmt->get_result(); // 取回資料

  if (!$result) {
    die($conn->error);
  }

  $password = $_POST['password']; // 使用者傳的密碼
  $row = $result->fetch_assoc();
  $hash_password = $row['password'];

  if (password_verify($password, $hash_password)) { // 沒有找到會回傳 0
    // 登入成功
    /*
      1. 產生亂數的 session id (token)
      2. 把 account 連結到 session id，寫入一的檔案存起來
      3. set-cookie: session id。把 session id 帶到 response 的 header，並在瀏覽器設定 cookie 
    */
    $_SESSION['account'] = $account; // 使用 php 內建 session 機制，把 account 用 Session 機制存起來
    header("Location: index.php");
  }else {
    header('Location: login.php?errMsg=2');
  }

?>