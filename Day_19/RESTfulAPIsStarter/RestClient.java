import java.net.*;  //for connection
import java.io.*;   //for handling response
import java.util.*; //collections, event model, date/time, i18n, misc utilities

import org.apache.commons.httpclient.*;
import org.apache.commons.httpclient.methods.*;

public class RestClient {
   
   public static void main(String[] args) {
      try {
         String baseUrl = "http://simon.ist.rit.edu:8080/AreaDemo/resources/AreaCalculator/";
         String rectangleResource = "Rectangle?width=2&length=4";
         String circleResource = "Circle?radius=3";
         String helloResouce = "Hello";
         String helloNameResource = "Hello/Dean"; //from URI Template
         
         //connect using HttpUrlConnection
         URL url = new URL(baseUrl + circleResource);
             url = new URL(baseUrl + rectangleResource);
             url = new URL(baseUrl + helloNameResource);
             url = new URL(baseUrl + helloResouce);
         
         System.out.println( "URL: " + url );
         
         // If a proxy was needed, this is what it'd look like, and `proxy` would be passed to openConnection()
         Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 8888));
         
         // Returns a URLConnection instance that represents a connection to the remote object referred to by the URL.
         // Caste as HttpURLConection for HTTP-specific features
         HttpURLConnection con = (HttpURLConnection)url.openConnection();        
         
         // wrong method returns 405 method not allowed (try POST, DELETE)
         con.setRequestMethod("GET");
         
         // "Accept" value needs to match WADL
         // wrong type returns 406 unacceptable
         //con.addRequestProperty("Accept", "text/plain");                                
         //con.addRequestProperty("Accept", "application/json");
         
         con.connect();
         
         //read
         InputStream in = con.getInputStream();
         //process
         BufferedReader br = new BufferedReader( new InputStreamReader( in ) );
         System.out.println(br.readLine());
         
         //cleanup
         in.close();
         con.disconnect();
         
         //---------------------------------
         
         //using HttpClient
      HttpClient client = new HttpClient();

      // set Get Mehtod
      GetMethod method = new GetMethod(baseUrl+rectangleResource);
      int statusCode = client.executeMethod(method);
      System.out.println(statusCode);

      if (statusCode!=HttpStatus.SC_OK){
         System.err.println("Error");

         }
      else{
            InputStream resStream = null;
            resStream = method.getResponseBodyAsStream();
            br = new BufferedReader(new InputStreamReader(resStream));

            String line;
            while((line = br.readLine()) !=null){
               System.out.println(line);
            }
            br.close();
         }
      }
      catch(Exception e) {
         e.printStackTrace();
      }
   }
}