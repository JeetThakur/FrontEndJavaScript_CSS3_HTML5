var http = new XMLHttpRequest(),   // We create the HTTP Object
url = "https://people.rit.edu/dmgics/proxy/https://icanhazdadjoke.com/";

handleHttpResponse();

function handleHttpResponse()
{

var Element = document.getElementsByClassName("div_1")[0];

http.open("GET",url, true)

http.setRequestHeader("Accept","text/plain");

http.send(null);

http.onreadystatechange = function(){
if (http.readyState === 4 && http.status===200)
    {
    let data = http.response;
    if (Element.hasChildNodes()) 
        Element.removeChild(Element.childNodes[0]); 
    var textNode = document.createTextNode(data);
    
    Element.appendChild(textNode);
    }
}
setTimeout(function(){
    handleHttpResponse();
}, 10000);
}