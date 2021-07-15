<?php
  require_once('conn.php');

  if (empty($_POST['title']) || 
      empty($_POST['content'])) {
    header('location: post_article.php?errMsg=1');
    die('資料不齊全!');
  }

  $title = $_POST['title'];
  $content = $_POST['content'];

  $sql = "INSERT INTO Yu_blog_articles(title, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $content);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  }

  header('location: post_article.php');
?>