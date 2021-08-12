
<?php
error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_STRICT);

require_once "Mail.php";

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
            $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "<h6>Oops! There was a problem with your submission.</h6> <p>Please complete the form and try again.</p>";
        exit;
    }
    
    $host = "ssl://smtp.dreamhost.com";
    $username = "admin@joshuagraber.com";
    $password = "zRQ$4J7D";
    $port = "465";
    $to = "joshua@joshuagraber.com";
    $email_from = "admin@joshuagraber.com";
    $email_subject = "Email from $name <$email>" ;

    $headers = array ('From' => $email_from, 'To' => $to, 'Subject' => $email_subject, 'Reply-To' => $email);
    $smtp = Mail::factory('smtp', array ('host' => $host, 'port' => $port, 'auth' => true, 'username' => $username, 'password' => $password));
    $mail = $smtp->send($to, $headers, $message);


    if (PEAR::isError($mail)) {
    echo("<h6>Oops! An error occured!</h6> <p>Your message could not be sent. Please try again.</p>");
    } else {
    echo("<h6>Thank You!</h6> <p>Your message has been sent.</p>");
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "<h6>There was a problem with your submission, please try again.</h6>";
}
?>