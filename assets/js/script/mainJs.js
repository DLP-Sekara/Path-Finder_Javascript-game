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
    0,1,2,3
];
const allDiv = Array.from($("#grid div"));

setTarget();
function setTarget() {
    for (var i=0;i<targetBox.length;i++){
        allDiv[targetBox[i]].classList.add("target");
    }
}

