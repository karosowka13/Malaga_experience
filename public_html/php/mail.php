<?php

require "../vendor/autoload.php";

$robo = 'robot@example.com';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$developmentMode = true;
$mailer = new PHPMailer($developmentMode);
// getting variables from form


$name = trim($_REQUEST['name']);
$emailFrom = trim($_REQUEST['email']);
$message = $_REQUEST['message'];

try {
    $mailer->SMTPDebug = 2;
    $mailer->isSMTP();

    if ($developmentMode) {
    $mailer->SMTPOptions = [
        'ssl'=> [
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        ]
    ];
    }


    $mailer->Host = 'smtp.gmail.com';
    $mailer->SMTPAuth = true;
    $mailer->Username = 'southtoursmailer@gmail.com';
    $mailer->Password = 'zaq1@WSX';
    $mailer->SMTPSecure = 'tls';
    $mailer->Port = 587;

    $mailer->setFrom($emailFrom, $name);
    $mailer->addAddress('mikekarigani31@gmail.com', 'Sout tours');

    $mailer->isHTML(true);
    $mailer->Subject = 'Malaga website contact form';
    $mailer->Body = $message;

    $mailer->send();
    $mailer->ClearAllRecipients();
    echo "MAIL HAS BEEN SENT SUCCESSFULLY";

} catch (Exception $e) {
    echo "EMAIL SENDING FAILED. INFO: " . $mailer->ErrorInfo;
}