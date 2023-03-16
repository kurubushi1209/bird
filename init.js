let can = document.getElementById("can");
let ctx = can.getContext("2d");
let inf = document.getElementById('can').getContext('2d');

can.width=600;//900
can.height=700;//700
//let displaySize=prompt("16:9");
//if(displaySize!=""){can.width=960;can.height=540;}
can.style.border = "2px solid #555";
//let com=JSON.stringify;//これを使うと配列を比較できる

let fps=60;

let pixelSize=4;

let cusualAlive=240;//aliveの標準時間

let vects = [];

let timer=0;

let keyCode;

let frames=[];

//let n = `${}`

////////////////////////////////////
let mouse = {x:300, y:560, size:1}

can.addEventListener('mousemove', mouseMove, true);
can.addEventListener('mousedown', mouseDown, true);
window.addEventListener('keypress', keyPress, true);
//window.addEventListener('keyup', keyUp, true)
//window.addEventListener('keydown', keyDown, true);


function keyPress(event){
    frames[0].key();
    keyCode = event.keyCode;
    //player.damage((i)=>{i.hp=0;});
}


function mouseMove(event){
    mouse.x = event.clientX - can.offsetLeft;
    mouse.y = event.clientY - can.offsetTop ;
}

function mouseDown(){
   frames[0].mouse();
}
////////////////////////////////////



