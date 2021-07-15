<?php
  require_once('conn.php');

  function get_user_from_username($username) {
    global $conn;
    $sql = "SELECT * FROM Yu_blog_users WHERE username=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $stmt->execute(); 
    $result = $stmt->get_result();

    if (!$result) {
      die($conn->error);
    }

    return $result->fetch_assoc();
  }

  function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES);
  }

?>