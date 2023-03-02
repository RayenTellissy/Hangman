// styling the reset button
$("#reset").css({
    cursor: "pointer",
    border: "none",
    display: "inline-block",
    backgroundColor: "inherit",
    fontFamily: "Franklin Gothic",
    color: "white"
})
// styling the hidden word
$("p").css({
    color: "gray",
    fontSize: "22px"
})

var $body=$("body")
$body.css({
    background: "url('pictures/background.jpg')",
})
$("fieldset").css({                     // styling the fieldset
    backgroundColor: "#808080",
    color: "white",
    fontFamily: "Franklin Gothic"
})
//creating a welcoming text
var title=$("<h1 id='title'>Welcome to hangman</h1>")     // adding a title to body
$body.append(title)

$("#title").css({
    color: "gray",
    textAlign: "center",
    fontFamily: "Constantia"
})

var choose=$("<h4 id='choose'>please choose a catergory:</h4>") // adding choose a category text
$body.append(choose)
// styling the text
$("#choose").css({
    color: "gray",
    textAlign: "center"
})

var div=$("<div id='original'></div>")
$body.append(div)         // adding a div tag to body


var divb=$("<div id='buttonsdiv'></div>")
$("#original").append(divb)
// creating buttons for the user to choose the category
var buttons=$("<button class='category' id='gaming' onclick='gaming()'>Gaming</button> <button class='category' id='sports' onclick='sports()'>Sports</button> <button class='category' id='cars' onclick='cars()'>Cars</button> <button class='category' id='music' onclick='music()'>Music</button> <button class='category' id='animals' onclick='animals()'>Animals</button>")
$("#buttonsdiv").append(buttons)
//styling the buttons
$("#buttonsdiv").css({
    textAlign: "center"
})
$(".category").css({
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    border: "1px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333333",
    cursor: "pointer",
    width: "150px",
  })

// adding animations if any button is clicked
$(".category").click(function(){
    $("#title").slideUp(200,function(){$("#choose").slideUp(200,function(){
        $(".category").slideUp()
    })})  // adds a 0.2 sec delay between each slide for extra smoothness
})

$(".category").click(function(){
    var picture=$("<img id='hangman'src='pictures/0.png'>")
    $body.append(picture)

    //centering the image
    $("#hangman").css({
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "50%",
        border: "15px solid",
        borderRadius: "50px",
        borderColor: "gray"
    })

    //creating a div to store the textfield in
    var start=$("<div id='start'></div>")
    $body.append(start)
    var textfield=$("<input type='text' id='field' placeholder='type a letter'>")
    start.append(textfield)

    //styling
    
    $("#start").css({
        textAlign: "center"
    })
    $("#field").css({
        textAlign: "center",
        border: "none",
        background: "transparent",
        borderBottom: "1px solid #ccc",
        padding: "10px",
        color: "#666",
        fontSize: "16px",
        fontFamily: "Franklin Gothic"
    })

// creating a button to check if letter written by the player is correct
    var check=$("<button id='check' onclick='check()'>check letter</button>")
    $body.append(check)
    $("#field").keypress(function(event){  // added an eventlistener, if i press enter it will press the button
        if(event.keyCode===13){
            $("#check").click()
        }
   })

//styling the button
    $("#check").css({
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "12px 20px",
        fontFamily: "Corbel",
        fontSize: "20px",
        cursor: "pointer",
        color: "black",
        backgroundColor: "gray",
        borderRadius: "15px",
        boxShadow: "0 9px #333333"
    })

// button's background color will be changed if the user hovers over the button
$("#check").hover(function(){
    $(this).css({
        backgroundColor: "#333333"
    })
},function(){
    $(this).css({
        backgroundColor: "gray"  // second parameter returns to background color to its initial value (gray)
    })
})
})




/* ||||||||||||||||||||||||||||||||| GAME MECHANICS |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
var attemps=0  // number of failed attempts
var word=""   // the random word, soon to assigned using the topic functions
var hidden=""  // the random word, but each character is replaced with a dash ("-")

/*      TOPIC FUNCTIONS    */ // word generating depending on the topic chosen(each function represents a topic)
// topic function will do the same thing, they just iterate over different arrays
function gaming(){
    var c=Math.ceil((Math.random()*gamingWords.length)-1)  // gets a random number and stores in variable c
    word=gamingWords[c].toLowerCase()                     //  sets word to a random index in the topic's array
    for(var i=0 ; i<word.length ; i++){                    // iterates over the word and replaces each index with a dash in another variable (hidden)
        hidden+="-"
    }
    $("p").text(hidden)
}

function sports(){
    var c=Math.ceil((Math.random()*sportWords.length)-1)
    word=sportWords[c].toLowerCase()
    for(var i=0 ; i<word.length ; i++){
        hidden+="-"
    }
    $("p").text(hidden)
}

function cars(){
    var c=Math.ceil((Math.random()*carWords.length)-1)
    word=carWords[c].toLowerCase()
    for(var i=0 ; i<word.length ; i++){
        hidden+="-"
    }
    $("p").text(hidden)
}

function music(){
    var c=Math.ceil((Math.random()*musicWords.length)-1)
    word=musicWords[c].toLowerCase()
    for(var i=0 ; i<word.length ; i++){
        hidden+="-"
    }
    $("p").text(hidden)
}

function animals(){
    var c=Math.ceil((Math.random()*animalWords.length)-1)
    word=animalWords[c].toLowerCase()
    for(var i=0 ; i<word.length ; i++){
        hidden+="-"
    }
    $("p").text(hidden)
}


//function to check the letter written
function check(){
    var w=($("#field").val()).toLowerCase()  // assiging the character the player wrote
    $("#field").val("")  // removes the character written after pressing the button, to improve player's experience
    if(w.length!==1 || !isNaN(w) || w<"a" || w>"z"){  // checks if the the value is a single character
        alert("please type a letter")
    }
    else if(word.includes(w)){           //checks if the letter is present in the random word
        for(var i=0 ; i<hidden.length ; i++){
            if(word[i]===w){
                hidden=hidden.split("")
                hidden.splice(i,1,w)
                hidden=hidden.join("")
                $("p").text(hidden)
                if(hidden===word){
                    $("p").text("CONGRATULATIONS!!! YOU WON!")
                    $("#field").hide()
                    $("#check").hide()
                    $("#hangman").attr({
                        src: "pictures/win.png"
                    })
                    var go=$("<button id='go'onclick='reset()'>GO AGAIN</button>").get(0)
                    start.append(go)
                    $("#go").css({
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: "12px 20px",
                        fontFamily: "Corbel",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "black",
                        backgroundColor: "gray",
                        borderRadius: "15px",
                        boxShadow: "0 9px #333333"
                    })
                
                // button's background color will be changed if the user hovers over the button
                $("#go").hover(function(){
                    $(this).css({
                        backgroundColor: "#333333"
                    })
                },function(){
                    $(this).css({
                        backgroundColor: "gray"  // second parameter returns to background color to its initial value (gray)
                    })
                })
                }
            }
        }
    }   
    else{
        attemps++  // increments the number of attempts due to not guessing a correct character
        if(attemps===6){
            $("#hangman").attr({
                src: "pictures/6.png"  // adding a body part, due to failed attempt
            })
            $("#check").hide()
            $("#field").hide()
            $("p").text("You Lost :(")
            var go=$("<button id='go'onclick='reset()'>GO AGAIN</button>").get(0)
                    start.append(go)
                    $("#go").css({
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: "12px 20px",
                        fontFamily: "Corbel",
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "black",
                        backgroundColor: "gray",
                        borderRadius: "15px",
                        boxShadow: "0 9px #333333"
                    })
        }
        $("#hangman").attr({
            src: "pictures/"+String(attemps)+".png"  // adding a body part, due to failed attempt
        })
    }
}

function reset(){  // a reset function
    location.reload()
}