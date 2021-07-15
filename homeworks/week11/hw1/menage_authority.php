<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (!empty($_SESSION['account'])) {
    $authority = get_authority_from_account($_SESSION['account']);
    if ($authority != 0){
      header('location: index.php');
      die();
    }
  } else {
    header('location: index.php');
    die();
  }

  // get username, account, authority from Yu_users
  $sql = "SELECT id, username, account, Authority FROM Yu_users";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute(); 

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

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
    <div class="panel__nav">
      <div class="panel__title"> 後台管理 </div>
      <a class="panel__btn" href="index.php"> 回留言板 </a>
    </div>

    <?php while ($row = $result->fetch_assoc()) { ?>
      <form class="panel__user-info" method="POST" action="handle_authority.php">
        <div class="panel__username"> <?php echo escape($row['username']) . ' (@' . $row['account'] . ')';?> </div>
        <select name="authority-options">
          <option value="0" <?php if ($row['Authority'] == "0") echo "selected='selected'";?>>管理員</option>
          <option value="1" <?php if ($row['Authority'] == "1") echo "selected='selected'";?>>一般使用者</option>
          <option value="2" <?php if ($row['Authority'] == "2") echo "selected='selected'";?>>遭停權使用者</option>
        </select>
        <input type="hidden" name="id" value="<?php echo $row['id'];?>"/>
        <input type="submit" class="panel__btn" value="儲存更變"/>
      </form>
    <?php } ?>
  </div>
</body>
</html>