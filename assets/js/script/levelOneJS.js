$(function () {
    $(".home").css('display','none')
});
$(window).on('load',function() {
    $(".home").css('display','block')
    $(".load").css('display','none')
    $(".load>img").fadeOut(1000)
});

$(".main").css('display','none');
$(".winMsg").css('display','none');
$(".blast").css('display','none');
$(".timeOut").css('display','none');
var audio ;
$(".btn1").click(function () {
    $(".home").css('display','none');
    $(".main").css('display','block');
    $(".level1").css('background-color',"green");
    $(".level1").css('color','white');
    audio = $("#audio")[0];
    audio.play();

    restartInRetry();
    restartInNewGame()
})
$(".exit").click(function () {
    $(".home").css('display','block');
    $(".main").css('display','none');

    audio.pause();
    audio.currentTime = 0;
})

for (var i = 0; i < 132; i++) {
    $("#grid").append("<div></div>");
}

//content areas=================================
var challengeBox = [
    11, 32, 33
];
var pathBox = [
    44, 46, 47, 48, 49, 51, 52, 53, 54, 56, 57, 60, 61, 62, 65, 66, 67, 69, 70, 72, 74, 76, 78, 80, 81, 84, 85, 87, 88, 90, 91, 93, 94, 96, 98, 99, 100, 101,
    102, 103, 104, 106, 107, 108, 109, 110, 111, 113, 115, 116, 117, 119, 120, 121, 123, 124, 125, 126, 128, 129, 131
];
var bombBox = [
    45, 50, 55, 58, 59, 63, 64, 68, 71, 73, 75, 77, 79, 82, 83, 86, 89, 92, 95, 97, 105, 112, 114, 118, 122, 127, 130
];
var otherBoxes = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43
]
var target=5;
//other parameters=================================
var height = 12;
var width = 11;
var currentLocation = 121;
var challengeBox1 = 11;
var challengeBox2 = 32;
var challengeBox3 = 33;
const allDiv = Array.from($("#grid div"));
var frontTimer;
var backTimer;
var timeOut;
var tempTimingCount;
var startingCount;



//set items and classes=================================
setChallange();

function setChallange() {
    for (var i = 0; i < challengeBox.length; i++) {
        allDiv[challengeBox[i]].classList.add("challenge");
    }
}

setBomb();

function setBomb() {
    for (var i = 0; i < bombBox.length; i++) {
        allDiv[bombBox[i]].classList.add("bomb");
    }
}

setPath();

function setPath() {
    for (var i = 0; i < pathBox.length; i++) {
        allDiv[pathBox[i]].classList.add("path");
    }
}

setother()

function setother() {
    for (var i = 0; i < otherBoxes.length; i++) {
        allDiv[otherBoxes[i]].classList.add("other");
    }
}

allDiv[currentLocation].classList.add("runner");
allDiv[target].classList.add("target");



//runner movement =================================

$(".body").keydown(function (event) {
    if(tempTimingCount===20) {
        switch (event.key) {
            case 'ArrowLeft':
                if (width < 11) {
                    width++;
                    if (width <= 11) {
                        allDiv[currentLocation].classList.remove("runner");
                        allDiv[currentLocation - 1].classList.add("runner");
                        currentLocation = currentLocation - 1;
                        if (checkBomb(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".blast").css('display', 'block');
                        }
                        if (checkTarget(currentLocation)) {
                            /*  $(".level1").css('background-color','none');
                              $(".level1").css('color','#979ca5');

                              $(".level2").css('background-color','green');
                              $(".level2").css('color','white');*/
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".winMsg").css('display', 'block');
                        }
                    }

                }
                console.log("left");
                break;
            case 'ArrowRight':
                if (width > 0 & width !== 1) {
                    width--;
                    if (width > 0) {
                        allDiv[currentLocation].classList.remove("runner");
                        allDiv[currentLocation + 1].classList.add("runner");
                        currentLocation = currentLocation + 1;
                        if (checkBomb(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".blast").css('display', 'block');
                        }
                        if (checkTarget(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".winMsg").css('display', 'block');
                        }
                    }
                }
                console.log("right");
                break;
            case 'ArrowUp' :
                if (height > 0 & height !== 1) {
                    height--;
                    if (height > 0) {
                        allDiv[currentLocation].classList.remove("runner");
                        allDiv[currentLocation - 11].classList.add("runner");
                        currentLocation = currentLocation - 11;
                        if (checkBomb(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".blast").css('display', 'block');
                        }
                        if (checkTarget(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".winMsg").css('display', 'block');
                        }
                    }
                }
                console.log("top");
                break;
            case 'ArrowDown' :
                if (height < 12) {
                    height++;
                    if (height <= 12) {
                        allDiv[currentLocation].classList.remove("runner");
                        allDiv[currentLocation + 11].classList.add("runner");
                        currentLocation = currentLocation + 11;
                        if (checkBomb(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".blast").css('display', 'block');
                        }
                        if (checkTarget(currentLocation)) {
                            clearInterval(timeOut);
                            $(".innerTimer").stop(true);
                            $(".winMsg").css('display', 'block');
                        }
                    }
                }
                console.log("bottom");
                break;

        }
    }
})

setTimeout(starTimer,3000);
function starTimer() {
    clearInterval(timeOut); // off the previous timer
    timeOut = setInterval(incrementValue, 900);
}
let count = 20;
function incrementValue() {
    $(".timer>h1").text(count+ " s");
    count--;
    if(count===-1){
        clearInterval(timeOut)
    }
    if(count===-1){
        $(".timeOut").css('display','block');
    }
}
$(".innerTimer").delay(3100).animate({"height":"0%"},20000,);

//setInterval(makeCount,1000);
makeCount();
function makeCount() {
    clearInterval(startingCount); // off the previous timer
    startingCount = setInterval(incrementCount, 900);
}
var tempCount=3
function incrementCount() {
    $(".goIndicator").text(tempCount);
    tempCount--;
    if(tempCount===-1){
        clearInterval(startingCount)
        tempTimingCount=20;
        $(".goIndicator").text("Go>>>>");
        //$(".goIndicator").css('color','red');
    }

}

function checkBomb(currentLocation) {
    for (var i = 0; i < bombBox.length; i++) {
        if (currentLocation === bombBox[i]) {
            return true;
        }
    }
}
function checkTarget(currentLocation) {
    console.log(currentLocation)
    if (currentLocation === target) {
        return true;
    }

}

$(".retryBtn").click(function () {
    restartInRetry();

})
function restartInRetry() {
    $(".blast").css('display','none');
    $(".timeOut").css('display','none');
    allDiv[currentLocation].classList.remove("runner");
    count = 20;
    $(".timer>h1").text("00 s");
    setTimeout(starTimer,3000);
    $(".innerTimer").css('height','100%');
    $(".innerTimer").delay(3100).animate({"height":"0px"},20000,);

    tempCount=3
    $(".goIndicator").text("Ready..");
    makeCount()
    tempTimingCount=0;

    currentLocation=121
    height=12;
    width=11;
    allDiv[currentLocation ].classList.add("runner");
}
$("#newGameBtn").click(function () {
    restartInNewGame()
})
function restartInNewGame() {
    $(".winMsg").css('display','none');
    allDiv[currentLocation].classList.remove("runner");
    count = 20;
    $(".timer>h1").text("00 s");
    setTimeout(starTimer,3000);
    $(".innerTimer").css('height','100%');
    $(".innerTimer").delay(3100).animate({"height":"0px"},20000,);

    tempCount=3
    $(".goIndicator").text("Ready..");
    makeCount()
    tempTimingCount=0;

    currentLocation=121
    height=12;
    width=11;
    allDiv[currentLocation ].classList.add("runner");
}


//challenging item movement =================================

function challengeMove1() {
    if (challengeBox1 !== 21 & challengeBox2 !== 22) {
        allDiv[challengeBox1].classList.remove("challenge");
        allDiv[challengeBox3].classList.remove("challenge");
        allDiv[challengeBox2].classList.remove("challenge");

        allDiv[challengeBox1 + 1].classList.add("challenge");
        allDiv[challengeBox3 + 1].classList.add("challenge");
        allDiv[challengeBox2 - 1].classList.add("challenge");

        challengeBox1 = challengeBox1 + 1;
        challengeBox3 = challengeBox3 + 1;
        challengeBox2 = challengeBox2 - 1;

        if (checkRunner(challengeBox1, challengeBox3, challengeBox2)) {
            $(".blast").css('display','block');
            clearInterval(timeOut);
            $(".innerTimer").stop(true);
        }

    } else {
        clearInterval(frontTimer)
        backTimer = setInterval(challengeMove2, 150)
    }


}

function challengeMove2() {
    if (challengeBox1 !== 11 & challengeBox2 !== 32) {
        allDiv[challengeBox1].classList.remove("challenge");
        allDiv[challengeBox3].classList.remove("challenge");
        allDiv[challengeBox2].classList.remove("challenge");

        allDiv[challengeBox1 - 1].classList.add("challenge");
        allDiv[challengeBox3 - 1].classList.add("challenge");
        allDiv[challengeBox2 + 1].classList.add("challenge");

        challengeBox1 = challengeBox1 - 1;
        challengeBox3 = challengeBox3 - 1;
        challengeBox2 = challengeBox2 + 1;
        if (checkRunner(challengeBox1, challengeBox3, challengeBox2)) {
            $(".blast").css('display','block');
            clearInterval(timeOut);
            $(".innerTimer").stop(true);
        }
    } else {
        clearInterval(backTimer)
        frontTimer = setInterval(challengeMove1, 150)
    }

}

function checkRunner(challengeBox1, challengeBox3, challengeBox2) {
    if (currentLocation === challengeBox1 | currentLocation===challengeBox2 | currentLocation===challengeBox3) {
        return true;
    }

}

frontTimer = setInterval(challengeMove1, 150)





