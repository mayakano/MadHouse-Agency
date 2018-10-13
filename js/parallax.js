// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var touchSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to touch screen scroll
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;
var touchY;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      scrollDown();
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      scrollUp();
    }
  }
}

function setTouchY(evt){
	touchY = parseInt(evt.touches[0].clientY);
}

function parallaxTouch(evt){
  var touchDelta = parseInt(evt.changedTouches[0].clientY) - touchY;
  if (touchDelta <= -touchSensitivitySetting) {
    //Down scroll
    scrollDown();
  }
  if (touchDelta >= touchSensitivitySetting) {
    //Up scroll
    scrollUp();
  }
}

function scrollDown(){
  ticking = true;
  if (currentSlideNumber !== totalSlideNumber - 1) {
    currentSlideNumber++;
    nextItem();
  }
  slideDurationTimeout(slideDurationSetting);
}

function scrollUp(){
   ticking = true;
   if (currentSlideNumber !== 0) {
     currentSlideNumber--;
   }
   previousItem();
   slideDurationTimeout(slideDurationSetting);
}
	
// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
window.addEventListener('touchstart', _.throttle(setTouchY,60), false);
window.addEventListener('touchend',_.throttle(parallaxTouch,60),false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  var textColors = ["#bebebe","#8582b7","#bfcacc", "#205545"];
  var lineColors = ["#ffffff","#8582b7","#bfcacc", "#205545"];
  document.getElementsByClassName("three")[0].style.backgroundColor = lineColors[currentSlideNumber];
  document.getElementsByClassName("two")[0].style.backgroundColor = lineColors[currentSlideNumber];
  document.getElementsByClassName("one")[0].style.backgroundColor = lineColors[currentSlideNumber];
  document.getElementById("open-pg").style.color = textColors[currentSlideNumber];
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
  
  if ((currentSlideNumber == totalSlideNumber - 1) && (!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i))) {
    document.getElementsByClassName("menu-toggle")[0].style.transform = "translateY(-60px)";
  }
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  var textColors = ["#bebebe","#8582b7","#bfcacc", "#205545"];
  var lineColors = ["#ffffff","#8582b7","#bfcacc", "#205545"];
  document.getElementById("open-pg").style.color = textColors[currentSlideNumber];
  document.getElementsByClassName("one")[0].style.backgroundColor = lineColors[currentSlideNumber];
  document.getElementsByClassName("two")[0].style.backgroundColor = lineColors[currentSlideNumber];
  document.getElementsByClassName("three")[0].style.backgroundColor = lineColors[currentSlideNumber];
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  if ((currentSlideNumber == totalSlideNumber - 2) && (!navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i))) {
    document.getElementsByClassName("menu-toggle")[0].style.transform = "translateY(0px)";
  }
}