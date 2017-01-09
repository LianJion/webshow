var PI = Math.PI;
var paused = false;
//获得[min, max-min+1) 的随机值。 比如说，max=10,min=5, 那么就是[5,6)的一个值
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var c = document.querySelector("#c");
var cw = c.width = window.innerWidth;
var ch = c.height = window.innerHeight;
var ctx = c.getContext("2d");
var animateButton = document.getElementById("animationbutton");
var animatestoneButton = document.getElementById("animationstonebutton");
var change = document.getElementById("change");

//返回四季生长页面
change.onclick = function(e) {
  window.location.href = "../tree/tree.html";
}

//触发点击事件，控制裂缝动画
animateButton.onclick = function (e) {
  paused = paused ? false : true;
  if (paused) {
    draw();
    animateButton.value = '生长';
  }
  else {
    animateButton.value = '停止';
    //通过这个控制裂缝的生长。
    clearInterval(id);
  }
}


//绘制岩石背景
var stonePos = {
  x:0,
  y:0
}

var stonebg = new Image();
stonebg.src = "images/stonebg.png";

function stone(){
  ctx.drawImage(stonebg,stonePos.x,stonePos.y,stonebg.width,stonebg.height);
}

window.onload = function() {
  stone();
}

//裂缝渐变颜色
var colors = ["#653C31", "#562D2A", "#442321", "#351B1A", "#2B1615"];
//绘制裂缝
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
  var amp = .05;
  // draw 绘制曲线
  ctx.beginPath();
  ctx.moveTo(x, y);
  //控制生长方向
  x += Math.random()*Math.cos(angle)* width;
  y -= Math.random()*(-Math.sin(angle))* width;

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
    angle -= 2*amp;
  } else {
    angle += 2*amp;
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
//执行动画
function draw() {

  var ci = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  branch({
    //固定裂缝生长初始位置
    // x: cw / 2 - 50,
    // y: ch / 2 - 70,
    x: 620,
    y: 250,
    thickness: 5,
    width: 100,
    loss: 0.7,
    // 大范围的值
    direction: randInt(6,8),
    //随机角度
    angle: randInt(4,8)*PI/18,
    color: colors[ci]
  });

  

  //setTimeout ，控制裂缝绘制时间
  var id = setTimeout(function() {
    if (ci === colors.length) {
      draw();
    }
    else {
      draw(++ci);
    }
  }, 6000);
  //暂停生长
  if(!paused) {
    clearInterval(id);
  }
}


