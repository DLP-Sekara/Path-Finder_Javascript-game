for (var i=0;i<132;i++){
    $("#grid").append("<div></div>");
}
var targetBox=[
    0,1,2,3
];
var pathBox=[
    0,1,2,3
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
