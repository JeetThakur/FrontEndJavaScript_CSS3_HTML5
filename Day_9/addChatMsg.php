<?php
// Connect to Database
require "../../../db_conn.php";
$mysqli = new mysqli( $db_host, $db_user, $db_pass, $db_name );


if ( $mysqli->connect_errno ) {
	$error = "Database error: " . $mysqli->connect_errno . " " . $mysqli->connect_error;
}
else {
	// If a new name has been sent, add it to the database
	if ( isset( $_GET['msg'] ) ) {
	  $sani_data = $_GET['msg'];
	  
	  // Strip out all unicode control chars and closing CDATA tags
	  $pattern = array( '/[\x00-\x1F]/', '/[\x7f-\x9f]/', '/\]\]>/' );
    $sani_data = preg_replace( $pattern, '', $sani_data);
	  
	  // Strip out all HTML tags and trim whitespace
	  $sani_data =  trim( strip_tags( $sani_data ) );
	  
	  if ( $sani_data != "" ) {
  		if ( $stmt = $mysqli->prepare( "INSERT INTO ajaxClass SET msg=?" ) ) {
  			if ( $stmt->bind_param( "s", $sani_data ) ) {
  				$stmt->execute();
  			}
  		}
  	}
	}
	// Get all existing names in the database and generate an XML document
	$result = $mysqli->query( "SELECT msg FROM ajaxClass ORDER BY id DESC LIMIT 20" );
	$return = "<?xml version='1.0' standalone='yes'?>\n<messages>\n";
	if ( $result->num_rows > 0 ) {
		while ( $row = $result->fetch_assoc() ) {
			$records[] = $row;
			// Wrap all data in CDATA tags so they're ignored by the XML parser
			$return .= "\t<msg><![CDATA[" . $row['msg'] . "]]></msg>\n";
		}
	}
	else {
		$return .= "<msg>No messages</msg>\n";
	}
	$return .= "</messages>";
}


// Allow access from any client
// CORS: Cross Origin Resource Sharing
header( "Access-Control-Allow-Origin: *" );

// Prevent caching
header( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
header( "Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . " GMT" );
header( "Cache-Control: no-store, no-cache, must-revalidate" );
header( "Cache-Control: post-check=0, pre-check=0", false );
header( "Pragma: no-cache" );

// Specify XML for the content type
header( "Content-Type: text/xml" ); 

// This will become the response value for the XMLHttpRequest object
echo $return;   
?>