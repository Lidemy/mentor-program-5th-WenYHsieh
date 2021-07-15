<?php
  require_once('conn.php');

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function get_username_from_account($account) {
    global $conn;
    $sql_get_username = "SELECT username FROM Yu_users WHERE account=?";
    $stmt = $conn->prepare($sql_get_username);
    $stmt->bind_param('s', $account);
    $stmt->execute(); // 回傳成功或失敗
    $result_get_username = $stmt->get_result(); // 取回

    if (!$result_get_username) {
      die($conn->error);
    }

    $row = $result_get_username->fetch_assoc();
    return $row['username'];
  }

  function get_authority_from_account($account) {
    global $conn;
    $sql = "SELECT Authority FROM Yu_users WHERE account=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $account);
    $result = $stmt->execute(); 
  
    if (!$result) {
      die($conn->error);
    }
  
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['Authority'];
  }
?>