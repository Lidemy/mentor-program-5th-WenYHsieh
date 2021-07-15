<?php
    session_start();
    require_once('conn.php');
    require_once('utils.php');
  
    $authority = $_POST['authority-options'];
    $id = $_POST['id'];

    // 找符合 id 的那個使用者把權限改掉
    $sql = "UPDATE Yu_users SET Authority=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $authority, $id);
    $result = $stmt->execute();
  
    if (!$result) {
      die($conn->error);
    }

    header("Location: menage_authority.php")

?>