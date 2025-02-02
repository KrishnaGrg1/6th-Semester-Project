<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    $to="xyz@gmail.com";
    $headers="From: abc@gmail.com";
    $subject="Testing mail";
    $message="Hello!, message is for test cases";
    if(mail($to,$headers,$subject,$message)){
        echo("success");
    }else{
        echo("Error");
    }
    ?>
</body>
</html>