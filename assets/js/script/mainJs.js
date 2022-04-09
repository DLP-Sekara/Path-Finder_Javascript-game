for (var i=0;i<132;i++){
    $("#grid").append("<div></div>");
}
var targetBox=[
    0,1,2,3
];
var pathBox=[
    44,46,47,48,49,51,52,53,54,56,57,60,61,62,65,66,67,69,70,72,74,76,78,80,81,84,85,87,88,90,91,93,94,96,98,99,100,101,
    102,103,104,106,107,108,109,110,111,113,115,116,117,119,120,121,123,124,125,126,128,129,131
];
var bombBox=[
    45,50,55,58,59,63,64,68,71,73,75,77,79,82,83,86,89,92,95,97,105,112,114,118,122,127,130
];
const allDiv = Array.from($("#grid div"));

setTarget();
function setTarget() {
    for (var i=0;i<targetBox.length;i++){
        allDiv[targetBox[i]].classList.add("target");
    }
}

setBomb();
function setBomb() {
    for (var i=0;i<bombBox.length;i++){
        allDiv[bombBox[i]].classList.add("bomb");
    }
}
setPath();
function setPath() {
    for (var i=0;i<pathBox.length;i++){
        allDiv[pathBox[i]].classList.add("path");
    }
}
