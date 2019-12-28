<?php
  error_reporting(0);
  define ('HOSTNAME', 'http://simon.ist.rit.edu:8080/AreaDemo/resources/');
  
  if ( $_POST['path'] ) {
  	$hold = explode( '?', $_POST['path'] );
  	$path = $hold[0];
  	$post = $hold[1] . "&ip=" . $_SERVER['REMOTE_ADDR'];
  	$url = HOSTNAME . $path;
  	$session = curl_init($url);
  	curl_setopt( $session, CURLOPT_POST, 1 );
  	curl_setopt( $session, CURLOPT_POSTFIELDS, $post );
  }
  else {
  	$url = HOSTNAME.$_GET['path'];
  	$session = curl_init($url);
  }
  
  // don't include the headers in the payload of the response
  curl_setopt( $session, CURLOPT_HEADER, false );
  
  // print out the response so it can be accessed by the client app
  curl_setopt( $session, CURLOPT_RETURNTRANSFER, true );
  
  // specify the content types to accept
  curl_setopt( $session, CURLOPT_HTTPHEADER, array( "Accept: " . $_SERVER["HTTP_ACCEPT"] ) );
  $xml = curl_exec( $session );
  $info = curl_getinfo( $session );

  http_response_code( $info["http_code"] );
  header( "Content-Type: " . $info["content_type"] );
  header( "Access-Control-Allow-Origin: *" );
  header( "Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT" );
  echo $xml;
  curl_close($session);
?>
