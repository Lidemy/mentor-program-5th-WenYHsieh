<?php
  session_start();
  require_once('conn.php');

  if (empty($_POST['account']) ||
      empty($_POST['password'])) {
    header('Location: login.php?errMsg=1');
    die('資料不齊全！');
  }

  $account = $_POST['account'];
  $password = $_POST['password'];

  $sql = sprintf(
    "SELECT * FROM Yu_users WHERE account = '%s' and password = '%s'",
      $account, $password
  );

  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  if ($result->num_rows) { // 沒有找到會回傳 0
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