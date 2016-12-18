"use strict";

var PI = Math.PI;

var paused = false;
//这个函数也经常看见 ,获得[min, max-min+1) 的随机值。 比如说，max=10,min=5, 那么就是[5,6)的一个值
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var c = document.querySelector("#c");
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight;
var ctx = c.getContext("2d");
var animateButton = document.getElementById("animationbutton");
// console.log(animateButton);

animateButton.onclick = function (e) {
  // console.log(paused);
  paused = paused ? false : true;

  if (paused) {
    draw();
    animateButton.value = '长';
  }
  else {
    animateButton.value = '停';
    //通过这个控制树的生长。
    // clearInterval(id);
    // console.log(id);

  }
}


var colors = ["#653C31", "#562D2A", "#442321", "#351B1A", "#2B1615"];

//props是个对象啊
/* props = {
    x,
    y,
    thickness,
    width,
    loss,
    direction,
    angle,
    color
 }*/


function branch(props) {
  var x = props.x;
  var y = props.y;
  var thickness = props.thickness;
  var width = props.width;
  var loss = props.loss;
  var direction = props.direction;
  var angle = props.angle;
  var color = props.color;

  var proba = .1;
  //发现新大陆了！ 
  var amp = .05;


  // draw
  ctx.beginPath();
  ctx.moveTo(x, y);
  //绘制曲线

  // x += Math.cos(angle) * width;
  // y += -Math.sin(angle) * width;

  x += Math.random() * width;
  y -= Math.random() * width;

  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  //厚度减小
  thickness *= loss;
  //宽度减小
  width *= loss;

  if (direction) {
    angle -= amp;
  } else {
    angle += amp;
  }

  if (Math.random() >= proba) {
    branch({
      x: x,
      y: y,
      //厚度不变
      thickness: thickness,
      width: 0.5 * width,
      loss: loss,
      //取反方向
      direction: !direction,
      angle: angle,
      color: color
    });
  }
  // console.log(width);
  if (width > 1 ) {
    setTimeout(function() {
      branch({
        x: x,
        y: y,
        thickness: thickness,
        width: width,
        loss: loss,
        direction: direction,
        angle: angle,
        color: color
      });
    }, 100);
  }
}



function draw() {

  var ci = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  branch({
    x: cw / 2-205,
    y: ch / 2+131,
    thickness: 2,
    width: 100,
    loss: 0.7,
    // [-1, 1）的值
    direction: randInt(7,8),
    //[3,11)的一个随机值
    angle: randInt(9,12)*PI/18,
    color: colors[ci]
  });

  

  //这里好像只能用setTimeout ,里面放的是代码片段。
  var id = setTimeout(function() {
    if (ci === colors.length) {
      draw();
    }
    else {
      draw(++ci);
    }
  }, 5000);
  console.log(id);

  if(!paused) {
    console.log(paused);
    clearInterval(id);
  }
  // drawpeacock();
  
}

// window.onload = function(){
//   stone();
// }

// function drawpeacock() {
//   ctx.beginPath();
//   ctx.fillStyle = "#0364A5";
//   ctx.lineWidth = 10;
//   ctx.moveTo( cw / 2,ch - 10);
//   ctx.lineTo(cw/2-25,ch-10);
//   ctx.lineTo(cw/2-50,ch-20);
//   ctx.lineTo(cw/2-10,ch - 200);
//   ctx.lineTo(cw/2+10,ch - 200);
//   ctx.lineTo(cw/2+50,ch-20);
//   ctx.lineTo(cw/2+25,ch - 10);
//   ctx.lineTo(cw/2,ch-10);


//   ctx.fill();
// }




// function stone(){

//   var stonePos = {
//     x:0,
//     y:100
//   }
//   var stonebg = new Image();
//   stonebg.src = "images/stonebg.png";
//   ctx.drawImage(stonebg,stonePos.x,stonePos.y,stonebg.width,stonebg.height);
// }

// function line(props){
//   var x = props.x;
//   var y = props.y;
//   var thickness = props.thickness;
//   var width = props.width;
//   // var loss = props.loss;
//   var angle = props.angle;
//   var color = props.color;
//   // draw
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     //绘制曲线
//     x += Math.random() * width;
//     y -= Math.random() * width;

//     ctx.strokeStyle = color;
//     ctx.lineWidth = thickness;
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.closePath();


//     if (width > 1 ) {
//     setTimeout(function() {
//       branch({
//         x: x,
//         y: y,
//         thickness: 0.5*thickness,
//         width: width,
//         loss: loss,
//         direction: direction,
//         angle: angle,
//         color: color
//       });
//     }, 100);
//   }
// }

