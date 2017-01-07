var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight; 
ctx.strokeStyle = 'rgba(255,255,255,0.5)';
ctx.lineWidth = 1;
ctx.lineCap = 'round';
var paused = false;
var pausedRain = false;
var hasFired = false;

//执行闪电动画
function lightning() {
  setInterval("drawFractalLightning()",2500); 
  setInterval("fire()",2602);
}


//按钮控制闪电动画的执行
var animateLightningButton = document.getElementById('animateLightningButton');
animateLightningButton.onclick = function (e) {
  paused = paused ? false : true;
  lightning();
  if (paused) {
    animateLightningButton.value = '闪电';
  }
  else {
    animateLightningButton.value = '停止';
  }
};


//绘制分形闪电
function drawFractalLightning (){
  var randomAngle = Math.random()*90 + 45;
  var randomX = Math.random()*1000+ 200;
  var randomY = Math.random()-100 ;
  ctx.clearRect(0, 0, w, h);
  // clearScreen();
  console.log("aaaa");
  drawLightning1(randomX, randomY, randomAngle, 7);
}

function drawLightning1(x1, y1, angle, depth){

  var BRANCH_LENGTH = random(0,50);
  if (depth != 0){
      var x2 = x1 + (cos(angle) * depth * BRANCH_LENGTH);
      var y2 = y1 + (sin(angle) * depth * BRANCH_LENGTH);
      
      setTimeout(function(){
        var frame = 0;
        frame ++ ;
        var x3 = x1 + frame*(cos(angle) * depth * BRANCH_LENGTH);
        var y3 = y1 + frame*(sin(angle) * depth * BRANCH_LENGTH);
        if(x3 >= x2 || y3 >= y2) {
          x3 = x2;
          y3 = y2;
          hasFired = true;
        }
        else {
          hasFired = false;
        }
        ctx.strokeStyle = 'rgb(255,255, 255)'; //Green
        ctx.lineWidth = depth * 0.5;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x3,y3);
        ctx.closePath();
        ctx.stroke();
    
      },1000);

      drawLightning1(x2, y2, angle - random(15,20), depth - 1);
      drawLightning1(x2, y2, angle + random(15,20), depth - 1);
  }
}

function cos (angle) {
  return Math.cos(deg_to_rad(angle));
}

function sin (angle) {
  return Math.sin(deg_to_rad(angle));
}

function deg_to_rad(angle){
  return angle*(Math.PI/180.0);
}

function random(min, max){
  return min + Math.floor(Math.random()*(max+1-min));
}

function drawLine(x1, y1, x2, y2, thickness){
  ctx.strokeStyle = 'rgb(255,255, 255)'; //Green
  ctx.lineWidth = thickness * 0.5;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.closePath();
  ctx.stroke();
}

//闪屏
function fire() {
  ctx.fillStyle = '#313131';
  ctx.fillRect(0, 0, w, h);
}



//rain 下雨动画
var animateRainButton = document.getElementById('animateRainButton');
animateRainButton.onclick = function (e) {
  pausedRain = pausedRain ? false : true;
  draw();
  if (pausedRain) {
    animateRainButton.value = '下雨';
  }
  else {
    animateRainButton.value = '雨停';
  }
};


//rain 设置下雨粒子的参数
var init = [];
var maxParts = 200;
for(var a = 0; a < maxParts; a++) {
  init.push({
    x: Math.random() * w,
    y: Math.random() * h,
    l: Math.random() * 1,
    xs: -4 + Math.random() * 4 + 2,
    ys: Math.random() * 10 + 10
  })
}

var particles = [];
for(var b = 0; b < maxParts; b++) {
  particles[b] = init[b];
}

function rand(rMi, rMa) {
  {return ~~((Math.random()*(rMa-rMi+1))+rMi);};
}

//闪电与下雨动画共存效果，清屏
function clearScreen() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(255,0,0,'+rand(1, 30)/100+')';
  ctx.fillRect(0,0,w,h);
  ctx.globalCompositeOperation = 'source-over';
}
  
//绘制下雨
function draw() {
  if(pausedRain) {
    var randomAngle = Math.random()*90 + 45;
    var randomX = Math.random()*1000+ 200;
    var randomY = Math.random()-100 ;
    //闪电和雨水同时出现
    clearScreen();
    // drawTree(randomX, randomY, randomAngle, 7);
    for(var a = 0; a < particles.length; a++) {
      var p = particles[a];
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
      ctx.stroke();
    }
    move();
  } 
  requestNextAnimationFrame(draw);
}
//粒子下落动画
function move() {
  for(var b = 0; b < particles.length; b++) {
    var p = particles[b];
    p.x += p.xs;
    p.y += p.ys;
    if(p.x > w || p.y > h) {
      p.x = Math.random() * w;
      p.y = -20;
    }
  }
}

//跳转四季动画页面
var animateGrassButton = document.getElementById('animateGrassButton');
animateGrassButton.onclick = function (e) {
  window.location.href = "../tree/tree.html";
}






