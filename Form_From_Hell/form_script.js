
// Changes the cursor to type wait and also checks if Background color radio button has been pressed or not 
function changeCursor(){
    result = checkForBackgroundColour();
    justDoIt = rateForm();
    if (result)
    {
    document.body.style.cursor="wait";
    document.getElementById("button_submit").style.cursor="wait";
    window.alert("Lets see how good you were with this form...");

    // The time-out functionality on the check-form before submit feature 
    setTimeout( function(){
        document.getElementsByClassName("hide_me")[0].style.display="block";
        document.body.style.cursor="default";
        document.getElementById("button_submit").style.cursor="default";
        document.getElementsByClassName("hide_me_1")[0].style.display="none";
    },5000);  
    }
}

// function to change color to Dark 
function changeColorLight(){
    
        document.getElementById("lightColor").checked=true;
        document.body.style.backgroundColor="#000";
        document.body.style.color="#509111"

        list = document.getElementsByClassName("labels");
        for (i = 0; i < list.length; i++) {
        list[i].disabled = false;
        }
}  

// Function to change color to light
function changeColorDark(){
  
    document.body.style.backgroundColor="#999";
    document.body.style.color="#000"
    document.getElementById("darkColor").checked=true;
    list = document.getElementsByClassName("labels");
        for (i = 0; i < list.length; i++) {
        list[i].disabled = false;
        }
    
}

// To check whether or not radio buttons have been checked or not -- if not freezes the entire form till they arent checked 
function checkForBackgroundColour(){
    lColor = document.getElementById("lightColor");
    dColor = document.getElementById("darkColor");

    if (lColor.checked == false){
        if (dColor.checked == false){
            window.alert("YOU THINK YOU CAN SKIP A FORM FIELD ON MY FORM PAGE /? -- CHANGE BACKGROUND COLOUR RIGHT NOW ");
            list = document.getElementsByClassName("labels");
        
            for (i = 0; i < list.length; i++) {
                list[i].disabled = true;
            }
            return false; 
        }
        
    }
    else if (dColor.checked == false)
    { if (lColor.checked == false)
        {
            window.alert("YOU THINK YOU CAN SKIP A FORM FIELD ON MY FORM PAGE /? -- CHANGE BACKGROUND COLOUR RIGHT NOW ");
            list = document.getElementsByClassName("labels");
        
            for (i = 0; i < list.length; i++) {
                list[i].disabled = true;
            }
            return false;
        }
        
    }
    
    return true;
    
}

// function to check name -- min len 5 max len 6
function checkName(){
    var nameField = document.getElementsByName("name")[0];
    var value = nameField.value;
    var bool = false;
    if (checkForBackgroundColour())
    {
       
        if (value.length < 5)
        {
            var stringMess = "Length criteria not achieved for the :- Name Field ";
            document.getElementsByClassName("Error")[0].style.display="block";
            document.getElementById("ErrorMessages").innerHTML= stringMess;
            
            
            return false;
        }
        else if (value.length > 6)
        {
            var stringMess = "I did not like your name, please update the field ";
            //document.getElementById("ErrorMessages").innerHTML= stringMess;
            window.alert(stringMess);
            
           
            
            return false;    
        }
        else{
            // regex checker 
            if (/^[A-Za-z]{5,6}/.test(value))
            {
                document.getElementsByClassName("Error")[0].style.display="none";
                return true;
            }
            else{
                var stringMess = "I did not like your name, please update the field ";
                //document.getElementById("ErrorMessages").innerHTML= stringMess;
                window.alert(stringMess);

                return false;

            }
        }
        
        
    }
}

// to check email
function checkEmail(){
    var stringMess = "Is this a valid Email Addr ?";
    var nameVal = document.getElementsByName("name")[0].value;
    var nameField = document.getElementsByName("email")[0].value;
    var bool = false;
    
    if (checkForBackgroundColour())
    {
        // regex checker
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameField))
        {
            document.getElementsByClassName("Error")[0].style.display="none";
            return true;
        }
        
        document.getElementsByClassName("Error")[0].style.display="block";
        document.getElementById("ErrorMessages").innerHTML= stringMess;    
                 
        return false;    
    }
}

// counter to check how many times did someone try inputing the website addr, after a sufficient number of attempts the hint is thrown to the user
var countForWeb = 0;

// to check webaddr
function checkWeb(){
    // regex tester
    var pattern = /^w{3}\.\w{20}\.(net|com|in)/
    var valField = document.getElementsByName("website")[0].value;
    var bool = false, stringMess="I dont like your website";
    if (checkForBackgroundColour())
    {
        if (!pattern.test(valField))
        {
            // counter increases only when 10 char are passed into the field so simple bypassing the field is avoided
            if (valField.length>10)
                countForWeb+=1
            alert(stringMess);         
            return false;            
        }
        document.getElementsByClassName("Error")[0].style.display="none";
        return true;
    }
}
// counter for userName just like website
var counter=0;

// to check userName
function checkUserName(){
    if (checkForBackgroundColour())
    {
        // regex pattern
        var pattern = /jbt1234MYNAMEIS_WHOCAREs/
        var valField = document.getElementsByName("userName")[0].value;
        if (!pattern.test(valField)){
            if (valField.length>5)
                counter+=1;
            return false;
        }
        return true;
    }
    return false;
}

// To check phone number only 585 starters are accepted
function checkNumber(){
    if (checkForBackgroundColour()){
        // regex pattern
        var pattern = /^585+\d*/
        var valField = document.getElementsByName("phNumber")[0].value;
        if (pattern.test(valField)){
            if (valField.length == 10)
                return true;
            return false;
        }
        return false;
    }
    return false;
}

// to check drop down
function checkDropDown(){
    var valField =document.getElementsByTagName("select")[0].value;
    var status = checkNumber();
    if (status)
        {
            // has to be a mobile type selected
            if (valField != "mobile")
            {
                return false
            }

            var val = document.getElementsByTagName("select")[0];
        val.onclick = function(){
            val.style.background='white';
        }

        return true;
        }
    return false;
}

// function to rate form the number input type
function rateForm(){
    var marksVal = document.getElementsByName("marks")[0].value;
    if (marksVal<=8){
        document.getElementById("change-me").innerHTML="Why so less ?";
        return false;
    }
    if (marksVal > 8){
        document.getElementById("change-me").innerHTML="Thanks !";
        return true;
    }
}


// Main validation function for form
function formValidation(){
    document.getElementsByClassName("hide_me")[0].style.disabled=true;
    var resultCheckName = checkName();
    var resultCheckEmail = checkEmail();
    var resultCheckWeb = checkWeb();
    var resultCheckUserName = checkUserName();
    var resultCheckNumber = checkNumber();
    var resultCheckPhD = checkDropDown();
    var resultRate = rateForm();    
    if (resultCheckName)
        if (resultCheckEmail)
            if (resultCheckWeb)
                if (resultCheckUserName)
                    if (resultCheckNumber)
                        if (resultCheckPhD)
                        {
                            setTimeout(function(){
                                document.getElementsByClassName("submit")[1].disabled=true;
                                alert("Successful ... hope you enjoyed the devil");
                                return true;
                            }, 5000); 
                                
                        }
    document.getElementById("button_submit").style.cursor="wait";
    setTimeout( function(){
        if (!resultCheckName){
            alert("Something wrong with your name try changing the number of characters");
        }
        if (!resultCheckWeb){
            if (countForWeb>=10){
                alert("You need 20 characters of words after www.  before using .com/.net/.in ");
            }
        }
        if (!resultCheckEmail){
            alert("Error in email");
        }
    
        if (!resultCheckUserName){
            if (counter>=10)
                alert("the only user name available and valid right now is : jbt1234MYNAMEIS_WHOCAREs");
            alert("user name taken please change");
            var valField = document.getElementsByName("userName")[0].value="";
        }
        if (!resultCheckNumber){
            alert("Only use valid Rochester Mobile Number");
            var valField = document.getElementsByName("phNumber")[0].value="";
        }
        if (!resultCheckPhD){
            document.getElementsByTagName("select")[0].style.background="red";
            // alert("The number looks like a mobile change the drop down");
        }
        
        document.getElementsByClassName("hide_me")[0].style.display="none";
        document.body.style.cursor="default";
        document.getElementById("button_submit").style.cursor="default";
        document.getElementsByClassName("hide_me_1")[0].style.display="block";
        document.getElementsByClassName("hide_me")[0].style.disabled=false;
    },50);  
    return false;
}

// to clear the red background....
var val = document.getElementsByTagName("select")[0];
val.onclick = function(){
    val.style.background='white';
}
