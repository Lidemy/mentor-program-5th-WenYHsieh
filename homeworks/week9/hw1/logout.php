<?php
  session_start();
  session_destroy();
  // setcookie('account', '', time()-3600);
  header("Location: index.php");
?>