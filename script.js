///Card set up
///Creating cart constructor
var card = function(image, clas){
  this.image = image;
  this.class = clas;
  // awesome use of a constructor function!
  // Typically, people use uppercase letters
  // to name a constructor function, but this works
  // just as well.
}
//////////////////////setting the card images/////////////////////
var cards = [
  new card("images/earth.jpg", "earth"),
  new card("images/Jupiter.jpg","jupiter"),
  new card("images/planet.jpg","planet"),
  new card("images/rings.jpg", "rings"),
  new card("images/saturn.jpg", "saturn"),
  new card("images/sun.jpg", "sun"),
  new card("images/venus.jpg","venus"),
  new card("images/alien.png","alien"),
  new card("images/purpleplanet.jpg","purplep")
]

///////////////////Memory Game////////////////
var game = function(){
  //Shuffles an object and returns that object
  function Shuffle(o) {
  	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  	return o;
  };
  //Displays the corresponding image for the div that was clicked using its class
  function setImage(event){
    for(var i = 0; i < cardArray.length; i++){
      if(cardArray[i].class == classClicked){
        //return cardArray[i].image;
        $(event.target).css("background-image", "url('" + cardArray[i].image + "')");
      }
    }
  };
  //Gets two cards that were clicked in an array so they can be compared
  function getTwoCards(event){
    if(numClicks <= 2){
      classClicked = $(event.target).attr("class")
      compareArray.push(classClicked);
      setImage(event)
    }
  };
  //Checks for a match using the class names of clicked divs
  function cardsMatch(array){
    console.log(array);
    var match = false;
    if(array[0] === array[1]){
      console.log("It's a match!");
      match = true;
    }
      return match;
  }
  // clicking clickly on several cards will keep a third card present. 
  // I'm not sure which code here is allowing that - do you?
    //setting up variables
  var cardNameArray = Object.keys(cards); //awesome use of .keys!
  var numClicks = 0;
  var cardArray = [];
  var classClicked;
  var compareArray = [];
  var sleeve = "url('https://pbs.twimg.com/profile_images/588424740223627264/oshWYgF9.jpg')"
  // remember to download external images so this link won't 404

  //populate card Array
  for(var i = 0; i < cardNameArray.length; i++){ //creates an array of objects
    cardArray.push(cards[cardNameArray[i]]) //how to access the card objects
    cardArray.push(cards[cardNameArray[i]]) //creates a double for every card
    // why create a double for every card?
  }

  Shuffle(cardArray);
  ///I need to access class cards.cardA.class
  //Append my cards to the game board
  for(var i = 0; i < cardArray.length; i++){
    $(".table").append("<div class =" + cardArray[i].class + "></div>")
  }

  //attach a click event to cards that will reveal it's bakcground image
  $("div").on("click", function(event){
    numClicks++
    //Easter Egg: plays an Alien sound when the alien card is clicked
    if($(event.target).attr("class") == "alien"){
      var audio = new Audio('sound/alien.m4a');
      audio.play();
      // nice!!
    }
    getTwoCards(event)
    if(numClicks == 2){ //this forbids clicking on more than 2 cards at a time
      // maybe, but something else is allowing a third click in here.
      if(cardsMatch(compareArray) === false){ //cards don't match
        //need to use compare array to target class
        console.log("nope");
        //resets flipped cards to it's sleeve image after a 5ms delay
        var timeout = setTimeout(function(){
          $("." + compareArray[0]).css("background-image", sleeve)
          $("." + compareArray[1]).css("background-image", sleeve)
          compareArray = [];
        },500)
      }
      else if(cardsMatch(compareArray) === true){ //cards match
        //removes event listener from matched cards
        $("." + compareArray[0]).off() // nice!
        //resets the compare array so it can be used again
        compareArray = [];
      }
      //resets the number of clicks so unmatched cards can be flipped over
      numClicks = 0;
    }
  })
}

game()

////buttons////
$(".reset").on("click",function(){
  $(".table").empty()
  game()
})

$("h1").on("click", function(){
  $("h2").toggle("class")
})

$(".heart").on("mouseover", function(){
  $("nav").html("<ul><li>Coming Soon!</li></ul>")
  $("nav").show()
  var delay = setTimeout(function(){
    $("nav").hide()
  },1500)
})

// Overall
// Excellent OOJS Solution!!! Your code comments are very useful and make
// your code very readable. I would encourage you to think about how you can reduce
// the amount of global variables in your code. One popular option is to wrap
// all of your code in a self-invoking anonymous function.
