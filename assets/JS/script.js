var pf = new petfinder.Client({
  apiKey: "rfKtqLNMX2qtPkyR7cDRNWJgJwJ3kxAyzoJzYFwvt1S7IB3Hnb",
  secret: "NGBUpIOll0vatwymXSITahluWEoK6W0hWyyBSvCN"
});

//Geolocation functions
//ADD CODE to alert "allow browser to know your location" just once
var coordinates;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else {
    alert("Geolocation is not supported by this browser.");
  }
}

getLocation();

function showPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  coordinates = lat + "," + lon;
}

// Navbar Hamburger 

$(document).ready(function() {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});
    

// Title Page

function displayTitlePage (){
  var mainEl = $("<div class='container has-text-centered' id='title-page-div'><h1 id='welcome-to-matchmaker' class='title is-1 sriracha'>Welcome to MATCHMAKER</h1><hr/><p id='title-page-subtext' class='subtitle mali'>Do you long-for companionship? Find it here at MATCHMAKER, where we connect you with your future soulmate based on our 5 minute questionaire. Press the START button below to begin your odyssey of love.</p><button class='button is-danger is-size-2 has-text-weight-bold sriracha' id='start-button'>START</button></div>")
  $('#main-body').append(mainEl);
  $(document).on('click', '#start-button', displayQuestionOneAtATime);
}
displayTitlePage();



// Slideshow

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}




// Questions 

var questionsArray = [
  {
    title: "What fits you best:",
    choices: ["Man looking for a woman", "Woman looking for a man", "Man looking for a man", "Woman looking for a woman"],
    //object.animals.0.colors.gender[2] "male"
  },
  {
    title: "What are your thoughts on children?",
    choices: ["Want someday", "Don't want", "Have and want more", "Have and don't want more"],
    //object.animals.0.envirenment: {children: true, dogs: true, cats: null}
  },
  {
    title: "What is your preferred style?",
    choices: ["Preppy", "Hipster", "Casual", "Trendy"],
    //object.animals.0.photos.status: "adoptable"
  },
  {
    title: "What is your preferred body type?",
    choices: ["Slender", "Big and beautiful", "About average", "Athletic and toned"],
    //object.animals.0.attributes: house-trained: "true"
  },
  {
    title: "What song fits you best?",
    choices: ["Billie Eilish - bad guy", "Lil Bow Wow - Bow Wow (That's My Name) ft. Snoop Dogg", "Alicia Keys - Underdog", "Baha Men - Who Let The Dogs Out "],
    
  }
];
//object.animals.0.contact:{all info} for display with approved match


// question display functions

var questionNumber=0;

function displayQuestionOneAtATime(){
  $('#main-body').empty();
  $('#big-slideshow-div').remove();
  if (questionNumber<questionsArray.length){
  var headingQuestionEl = $("<div id='display-div' class='container'><h2 class='title has-text-centered sriracha'>"+ questionsArray[questionNumber].title +"</h2><div id='answer-columns' class='columns'></div></div>")
  $("#main-body").append(headingQuestionEl)

  for (var i=0; i<questionsArray[questionNumber].choices.length; i++){
    var answerDiv = $("<div class='column has-text-centered div-within-answer-div'><div class='column is-danger has-text-weight-bold mali answer-button'>"+ questionsArray[questionNumber].choices[i] +"</div></div>")
    $(".columns").append(answerDiv);
  }
  
}else{

  // Add Code that moves to Match Page
  

}
    
}

$(document).on('click', '.answer-button', click);

var answers = [];
function click(event){
  event.preventDefault();
  questionNumber++;
  answers.push(this.textContent);
   
  displayQuestionOneAtATime();
  filter();
};



function filter() {
  // ADD BACK-END CODE HERE that captures filter criteria
var answer1 = answers[0];  
var answer2 = answers[1];
var answer3 = answers[2];
var answer4 = answers[3];
var answer5 = answers[4];
var searchGender;
var goodWithChildren;
var dogSize;
var coatType;
var goodWithCats;

//["Man looking for a woman", "Woman looking for a man", "Man looking for a man", "Woman looking for a woman"],
if (answer1 === "Man looking for a woman" || answer1 === "Woman looking for a woman") {
  searchGender = "female";
} else {searchGender = "male"}

//["Want someday", "Don't want", "Have and want more", "Have and don't want more"]
if (answer2 === "Don't want") {
  goodWithChildren = false;
} else {goodWithChildren = true}


// "What is your preferred style?",choices: [short, medium, long, wire,"Preppy" medium, "Hipster" wire, "Casual" short hair, "Trendy" long ]
if (answer3 === "Preppy") {
  coatType = "medium";
} 
// else if (answer3 === "Hipster") {
//   coatType = "wire";
// } 
else if (answer3 === "Casual") {
  coatType = "short";
} else if (answer3 === "Trendy") {
  coatType = "long";
}

//["Slender", "Big and beautiful" xlarge, "About average" large, "Athletic and toned" medium: small, medium, large, xlarge]
if (answer4 === "Slender") {
  dogSize = "small";
} else if (answer4 === "Big and beautiful") {
  dogSize = "xlarge";
} else if (answer4 === "About average") {
  dogSize = "large";
} else if (answer4 === "Athletic and toned") {
  dogSize = "medium";
}

//["Billie Eilish - bad guy", "Lil Bow Wow - Bow Wow (That's My Name) ft. Snoop Dogg", "Alicia Keys - Underdog", "Baha Men - Who Let The Dogs Out "]
if (answer5 === "Billie Eilish - bad guy") {
  goodWithCats = true;
} else {
  goodWithCats = false;
}

if (questionNumber === questionsArray.length){
  buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);
  console.log(searchGender)
}
// buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);
}


function buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats) {

  pf.animal.search({ type: "dog", location: coordinates, gender: searchGender, good_with_children: goodWithChildren, coat: coatType, size: dogSize, good_with_cats: goodWithCats})
  .then(function (response) {
      var responseArr = response.data;
      var acceptedDogIds = [];
      // for (var i = 0; i < responseArr.length; i++)
      // console.log(response.data.animals[0].contact);
      //console.log(response.data)
      console.log(response.data);
      var dogId;
      var i = 0;
      function displayMatch(){
      
        function dogBreed(){
        dogId = (response.data.animals[i].id);
        var dogBreedPrimary = (response.data.animals[i].breeds.primary); 
        var dogBreedSecondary = (response.data.animals[i].breeds.secondary);
        var dogBreedMixed = (response.data.animals[i].breeds.mixed);
        if (dogBreedPrimary && dogBreedSecondary && dogBreedMixed === true) {
             return "This cutiepie is a " + dogBreedPrimary + " and " + dogBreedSecondary + " mix";
         }
        if (dogBreedPrimary && dogBreedSecondary === null && dogBreedMixed === true) {
             return "This cutiepie is mainly a " + dogBreedPrimary + " mix";
        }
        if (dogBreedPrimary && dogBreedSecondary === null && dogBreedMixed === false) {
            return "This cutiepie is a " + dogBreedPrimary;
        }
        }

        $('#match-main-display').remove();
        var matchDisplay = $("<div id='match-main-display' class='container has-text-centered'><img id='match-img' src="+ response.data.animals[i].photos[0].medium +"> <h1 id='match-name' class='title is-3 sriracha'>"+ response.data.animals[i].name +"</h1><h2 id='match-dog-breed' class='subtitle is-4 sriracha'>"+dogBreed()+"</h2><p id='match-description' class='is-size-4 mali'>"+response.data.animals[i].description +"</p><button id='accept-match' class='button is-danger is-size-2 has-text-weight-bold sriracha'>Accept Match!!!</button><br/><button id='decline-match' class='button is-dark is-size-4 sriracha'>Decline Match</button></div>");
        $('#main-body').append(matchDisplay);
        i++;
        }
        displayMatch();
        
        $(document).on('click', '#decline-match', displayMatch);
  
        //create event listener for button id"accept-match" and push IDs into array there.
             
        $("#accept-match").on('click', function() {
        
          acceptedDogIds.push(dogId);
          console.log(dogId);
          displayMatch();
        })
        

  })
  .catch(function (error) {
      // console.log(error);
  });

}

if (questionNumber === questionsArray.length) {
buildRequest(searchGender, goodWithChildren, coatType, dogSize, goodWithCats);

}
// Match History

// function renderMatchHistory(event) {
//   event.preventDefault();
//   let matchStorage = JSON.parse(localStorage.getItem("matchStorage")) 

//   if(matchStorage){
//     matchStorage.sort(function(/* ADD HERE */){
//       // ADD HERE
//     })
//     for (var i=0; i < matchStorage.length; i++){
//       // ADD HERE
//     }
//   }

// }

// function saveToLocalStorage(event){
//   event.preventDefault();
//   $("").empty();
 
//   var matchStorage = JSON.parse(localStorage.getItem("matchStorage"))
//   var intials = document.getElementById("intials");

//   if (!matchStorage){matchStorage = []};
//   var matchObject = {/*Fill with key value pairs*/}
   
//   matchStorage.push(matchObject);
//       localStorage.setItem("matchStorage", JSON.stringify(matchStorage))
//       window.location.replace("./match-history.html")
      
