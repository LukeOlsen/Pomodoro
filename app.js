var minArea = document.getElementById("minutes");
var secArea = document.getElementById("seconds");
var timeLimit = document.querySelector("#timeLimit");
var breakLimit = document.querySelector("#breakLimit");
var upWork = document.querySelector("#upWork");
var downWork = document.querySelector("#downWork");
var upBreak = document.querySelector("#upBreak");
var downBreak = document.querySelector("#downBreak");
var start = document.querySelector("#startThisThing");
var headerText = document.querySelector(".headerText");
var resetButton = document.querySelector("#reset");
var audio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var onBreak = true;
var restTime = false;
var stopThisTrain = false;

var mins = timeLimit.innerHTML;
var sec = mins * 60;

function goTime() {
  setTimeout(downTime, 1000);
}

function minuteTime() {
  mins = Math.floor(sec / 60);
  return mins;
}

function secTime() {
  return sec - Math.round(mins * 60);
}

var goOnBreak = function() {
  if (onBreak === false) {
    downTime();
    onBreak = true;
  } else if (onBreak === true) {
    onBreak = false;
  }
};

var downTime = function() {
  if (onBreak == false) {
    if (sec > 0) {
      if (secArea < 59) {
        secArea.innerHTML = sec;
      } else {
        minArea.innerHTML = minuteTime();
        secArea.innerHTML = secTime();
      }
      sec--;
      goTime();
    } else if (sec === 0 && restTime === false) {
      audio.play();
      min = breakLimit.innerHTML;
      sec = min * 60;
      restTime = true;
      headerText.innerHTML = "Come back in a few.";
      goTime();
    } else if (sec === 0 && restTime === true) {
      min = timeLimit.innerHTML;
      headerText.innerHTML = "FOCUS!";
      sec = min * 60;
      restTime = false;
      goTime();
    }
  }
};

var playPause = () => {
  if (onBreak == true) {
    onBreak = false;
    downTime();
    start.innerHTML = "PAUSE";
    headerText.innerHTML = "FOCUS!";
  } else if (onBreak == false) {
    onBreak = true;
    start.innerHTML = "START";
    headerText.innerHTML = "breathe.";
  }
};

var resetTheClock = () => {
  mins = timeLimit.innerHTML;
  sec = mins * 60;
  restTime = false;
  onBreak = true;
  minArea.innerHTML = timeLimit.innerHTML;
  secArea.innerHTML = "00";
  headerText.innerHTML = "Get Ready To Focus!";
  startThisThing.innerHTML = "START";
};

upWork.addEventListener("click", function() {
  if (mins > 0) {
    timeLimit.innerHTML++;
    minutes.innerHTML = timeLimit.innerHTML;
    mins++;
    sec = mins * 60;
  }
});

downWork.addEventListener("click", function() {
  if (mins > 0) {
    timeLimit.innerHTML--;
    minutes.innerHTML = timeLimit.innerHTML;
    mins--;
    sec = mins * 60;
  }
});

upBreak.addEventListener("click", function() {
  if (breakLimit.innerHTML > 1) {
    breakLimit.innerHTML++;
  }
});

downBreak.addEventListener("click", function() {
  if (breakLimit.innerHTML > 1) {
    breakLimit.innerHTML--;
  }
});

start.addEventListener("click", playPause);
resetButton.addEventListener("click", resetTheClock);
