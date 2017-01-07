var desen = CreateCanvas('season-tree');
// 实例化一个canvas对象
var paused = false;
var one;
var two;
var three;
var four;
var five;
var grass;
var isSnow = false;
var isSun = false;
var isGrow = false;
var crackgrow = false;

//树干节点对象
function nod(){
  this.x = 0;
  this.y = 0;
  this.length = 0;
  this.parent = null;
  this.left = null;
  this.right = null;
}

function clickpos() {
  this.x = 0;
  this.y = 0;
}

//树叶粒子效果
function frunza(){
  this.x = 0;
  this.y = 0;
  this.size = 0;
  this.momx = 0;
  this.momy = 0;
}

var copac = new Array;
//父子容器关系设置
copac[0] = new nod;
copac[1] = new nod;
copac[1].parent = copac[0];
//nod[0]是nod[1]的父容器

var temp = new Array;

temp[0] = new clickpos;

//模拟风效果参数设置
var center = 0;
var momentum = 0;
var curent = 0;

function armon_wind(){
  momentum -= (curent-center) * 0.0008 * Math.random();
  curent += momentum;
  momentum *= 0.997;
}

function randomized_wind(){
  center = (Math.random() - 1/2);
}

//特征参数的设置
var gamma = 0.86;
var wind = 0;
var wind_dev = (Math.random()-0.5)*0.1;
var wind_strength = 0.1;

//初始化加载执行动画
window.onload = function(e) {
  copac[0].x = 320;
  copac[0].y = 570;
  copac[1].x = 320;
  copac[1].y = 550;
  init();
  console.log(copac[0]);
}

//鼠标点击生成树的位置
onmousedown = function (event){
  var loc = getMousePos(desen.canvas, event);
  if(loc.x > 120 && loc.y > 50){
    copac[0].x = loc.x;
    copac[0].y = loc.y;
    copac[1].x = loc.x;
    copac[1].y = loc.y-10;
  } else {
  //自动记录上一次鼠标点击的位置，恢复运动的时候回到原位
    copac[0].x = 320;
    copac[0].y = 570;
    copac[1].x = 320;
    copac[1].y = 550;
  }  
}

// 鼠标移动模拟风速
onmousemove =  huricane;
//鼠标移动模拟加大风速动画
function huricane(event){
  //鼠标点击，设置离窗口下部分的高度，鼠标往下，风力越小
  if(window.innerHeight - event.clientY < 300 || window.innerWidth -event.clientX < 200){
    wind_dev =- ((event.clientX/window.innerWidth)-1/2)*0.2;
  }
}
 
//鼠标点击交互
function getMousePos(canvas, evt) { 
   var rect = canvas.getBoundingClientRect(); 
   return { 
     x: evt.clientX - rect.left * (canvas.width / rect.width),
     y: evt.clientY - rect.top * (canvas.height / rect.height)
   }
}

//鼠标点击抬起后跳转页面
onmouseup = function (event){
  var loc = getMousePos(desen.canvas, event);
  if(loc.x > stonebgPos.x && loc.y > stonebgPos.y){
    window.location.href = "../crack/crack.html";
  }
}


    
//绘制生长树动画
function recalculate(){
  // console.log(copac[0]);
  //遍历一波copac
  for(x in copac){
    if(!(copac[x].parent == null)){
      //还没有父亲
      if(copac[x].length > 10){
        //长度大于10
        if((copac[x].left == null) && (copac[x].right == null)){
          //左边右边都为空
          copac[x].left = new nod;
          copac[x].right = new nod;
          //左边的长度是 长度-2的随机值向下取整然后加1
          copac[x].left.length = Math.floor(Math.random()*(copac[x].length-2))+1;
          //右边的长度是总长度减去左边的长度
          copac[x].right.length = copac[x].length-copac[x].left.length;
          //copac[x]是他左边右边的长度的父亲容器
          copac[x].left.parent = copac[x];
          copac[x].right.parent = copac[x];
          copac.push(copac[x].left);
          copac.push(copac[x].right);
        }
      }
    }
  }
    
  // stack压栈
  var stack = new Array;
  stack.push(copac[1]);
  //第一个元素是copac[1]
  while(stack.length > 0){
    var temp = stack.pop();
    // console.log(temp);
    //很多nod对象
    if(!(temp.left == null)){
      // atan2() 方法可返回从 x 轴到点 (y,x) 之间的角度
      var angle = Math.atan2(temp.parent.y-temp.y, temp.x-temp.parent.x) + gamma*(temp.length-temp.left.length)/temp.length;
      //abs取绝对值，大于90°
      if(Math.abs(angle) > Math.PI/2){
        angle += (Math.PI-Math.abs(angle))*angle/Math.abs(angle)*wind;
      }else{
        angle += angle*wind;
      }
      
      
      var len=1;
      if((!(temp.left.left == null))&&(!(temp.left.right == null))){
        //左边都有值的情况下
        len = Math.sqrt(2*(temp.left.left.length*temp.left.right.length)/(temp.left.left.length+temp.left.right.length));
      }
      
      temp.left.x = temp.x + len*Math.cos(angle);
      temp.left.y = temp.y - len*Math.sin(angle);
      //将temp.leftpush到stack里
      stack.push(temp.left);
    }
    
    if(!(temp.right == null)){
      var angle = Math.atan2(temp.parent.y-temp.y,temp.x-temp.parent.x)-gamma*(temp.length-temp.right.length)/temp.length;
        
      if(Math.abs(angle) > Math.PI/2){
        angle += (Math.PI-Math.abs(angle))*angle/Math.abs(angle)*wind;
      }else{
        angle += angle*wind;
      }
        
      var len=1;
      if((!(temp.right.left == null))&&(!(temp.right.right == null))){
        len = Math.sqrt(2*(temp.right.left.length*temp.right.right.length)/(temp.right.left.length+temp.right.right.length));
      }
      temp.right.x = temp.x + len*Math.cos(angle);
      temp.right.y = temp.y - len*Math.sin(angle);
      //将temp.rightpush到stack里
      stack.push(temp.right);
    }
  }
}

//添加父子节点关系
function add(x,to){
  //参数to的父元素 不为空
  while(!(to.parent == null)){
    to.length += x;
    to = to.parent;
  }
  to.length += x;
}

var run_interval = null;

//运行函数
function run(){
  wind = curent + wind_dev;
  //遍历copac数组的left和right是否为空
  for(i in copac){
    if((copac[i].left == null)&&(copac[i].right == null)){
      // 随机值<0.07
      if(Math.random() < 0.07){
        //add() copac[i].length随机增加（0,3）
        add(Math.random()*3,copac[i]);
      }
    }
  }
  // 重新计算，重新压入栈
  recalculate();
  if(copac.length > 2000) clearInterval(run_interval);
}
    
//碎片小圆点粒子动画效果
var debri = new Array;

function new_debri(){
  //如果随机产生一（0，1）之间的数，大于0.8
  if(Math.random() > 0.8){
    var temp = copac[Math.floor(Math.random()*copac.length)];
    //树叶对象
    var leaf = new frunza;
    //出现黄点
    leaf.size = Math.random() * 10;
    leaf.x = temp.x;
    leaf.y = temp.y;
    debri.push(leaf);
  }
}
var debri_gen = null;
function run_debri(){
  // 遍历数组或者对象的属性
  for(i in debri){
    debri[i].momx += (-wind * 3 * Math.random());
    debri[i].momy += (Math.random()-6/13) * 40 * (Math.abs(wind));
    debri[i].x += debri[i].momx - wind * 30 * (Math.random()+1);
    debri[i].y += debri[i].momy;
    if(debri[i].y > 600){
      // splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目，这里是删除
      //是黄色的那些粒子
      debri.splice(i,1);
    }
  }
}

//绘制树叶和掉落的叶子
function draw(){
  //绘制分叉
  for(x=2; x<copac.length; x++){

    desen.context.beginPath();
    desen.context.moveTo(copac[x].x,copac[x].y);
    //二次贝塞尔曲线，parent所在位置作为控制点，parent.parent的所住位置作为终点
    desen.context.quadraticCurveTo(copac[x].parent.x,copac[x].parent.y,copac[x].parent.parent.x,copac[x].parent.parent.y);
    desen.context.moveTo(copac[x].parent.parent.x,copac[x].parent.parent.y);
    //移动到新的点开始绘制
    desen.context.closePath();
    //自动变细
    desen.context.lineWidth = Math.sqrt(copac[x].length)*0.1;
    // lineCap 属性设置或返回线条末端线帽的样式 ,"round" 和 "square" 会使线条略微变长
    // desen.context.lineCap = "square";
    desen.context.stroke(); 
  }
  
  desen.context.fillStyle = color;
  for(x in copac){
    if(copac[x].length < 10){
      //当生长时候的长度小于10的时候,开始绘制椭圆 就是树叶
      desen.context.beginPath();
      desen.context.ellipse(copac[x].x,copac[x].y, copac[x].length/6*s_size, copac[x].length/4*s_size, Math.PI/180,0, Math.PI*2, true); 
      desen.context.closePath();
      desen.context.fill();
    }
  }
    
  desen.context.fillStyle = "yellow";
  for(i in debri){
    desen.context.beginPath();
    //绘制掉落的叶子
    desen.context.ellipse(debri[i].x,debri[i].y, debri[i].size/6, debri[i].size/4, Math.PI/180,0, Math.PI*2, true); 
    desen.context.closePath();
    desen.context.fill();
  }
  desen.context.lineWidth=0.4;
}
  
//绘制草
var stackGrass  = [],
    pausedGrass = false,
    w = window.innerWidth,
    h = window.innerHeight;
    desen.width = w;
    desen.height = h;

function anim_grass(){

  //设置x,y的参数
  var x = 0, y = 0;
  //高度
  var maxTall = Math.random()*(h/8)+(h/8);
  //厚度
  var maxSize = Math.random()*(h/100)+5;
  //草生长速度
  var speed = Math.random()*1;  
  var position = Math.random()*w-w/2;


  return function(){
    
    //绘制草背部弧度
    var deviation = Math.cos(x/50)*Math.min(x/4,50),
        tall = Math.min(x/2,maxTall),
        size = Math.min(x/50,maxSize);
    //x值进行变化
    x += speed;
    desen.context.save();
    
      desen.context.strokeWidth=10;
      desen.context.translate(w/2+position, h+40);
      //草的颜色基本能够和树同步起来
      desen.context.fillStyle = grassColor;
      desen.context.beginPath();
      desen.context.lineTo(-size,0);
      //一个控制点，一个描点
      //哈哈哈哈哈，这个草好看多了，三次贝塞尔曲线太给力！
      desen.context.bezierCurveTo(-size,0, -size-1,-tall-tall/4, deviation,-tall);
      desen.context.bezierCurveTo(deviation,-tall, -size-1, -tall-1-tall/4, -size+3,0 );
      //使用路径显示不了，要用fill()
      desen.context.fill();
    desen.context.restore();

  }    
};

for(var x = 0; x<(w/7);x++) {
  //把anim_grass()都放到stack里了
  stackGrass.push(anim_grass());
}

function drawergrass () {
  //开始遍历stack里面的anim函数
  stackGrass.forEach(function(el){
    el();  
  })
}

//绘制下雪效果  雪花粒子
var mp = 50; 
//粒子数量
var particles = [];
var angle = 0;
//更新粒子属性
for(var i = 0; i < mp; i++) {
  particles.push({
    x: Math.random()*desen.width, 
    //x坐标
    y: Math.random()*desen.height, 
    //y坐标
    r: Math.random()*4+1, 
    //半径
    d: Math.random()*mp 
    //密度
  })
}

function update() {
  angle += 0.01;
  for(var i = 0; i < mp; i++)
  {
    var p = particles[i];
    p.y += Math.cos(angle+p.d) + 1 + p.r/2;
    p.x += Math.sin(angle) * 2;
    if(p.x > desen.width+5 || p.x < -5 || p.y > desen.height)
    {
      if(i%3 > 0) 
      {
        particles[i] = {x: Math.random()*desen.width, y: -10, r: p.r, d: p.d};
      }
      else
      {
        if(Math.sin(angle) > 0)
        {
          //从左边出现雪花
          particles[i] = {x: -5, y: Math.random()*desen.height, r: p.r, d: p.d};
        }
        else
        {
          //从右边出现雪花
          particles[i] = {x: desen.width+5, y: Math.random()*desen.height, r: p.r, d: p.d};
        }
      }
    }
  }
}

function drawsnow() {
  desen.context.fillStyle = "rgba(255, 255, 255, 0.8)";
  desen.context.beginPath();
  for(var i = 0; i < mp; i++) {
    var p = particles[i];
    desen.context.font = p.r*5 + 'px Arial, sans serif';
    desen.context.fillText("❄", p.x, p.y);
  }
  desen.context.fill();
  update();
}


//绘制太阳
var sunexp = 10;
var sun = {
  x: -50,
  y: 300,
  r: 50
}

function drawSun() {
  sun.x += sunexp;
  sun.y -= sunexp;
  if (sun.x >= 200) {
    sun.x = 200;
    sun.y = 50; 
  }
  desen.context.fillStyle = sunColor;
  desen.context.beginPath();
  desen.context.arc(sun.x, sun.y, sun.r, 0, Math.PI*2, false);    
  desen.context.fill();
}

function drawPath() {
  desen.context.beginPath();
  desen.context.lineTo(-50,300);
  desen.context.quadraticCurveTo(100,50,200,50);
  desen.context.stroke();
}


//绘制石头背景
var stonePos = {
  x: 150,
  y: 450
}

var stone = new Image();
stone.src = "img/stone.png";
var pool = new Image();
pool.src = "img/pool.png";
var bird = new Image();
bird.src = "img/bird2.png";
function drawStone() {
  desen.context.drawImage(pool, stonePos.x + 130, stonePos.y + 60, pool.width, pool.height);
  desen.context.drawImage(stone, stonePos.x, stonePos.y, stone.width, stone.height);
  desen.context.drawImage(bird, stonePos.x + 100, stonePos.y - 5, bird.width, bird.height);
}


//绘制月亮效果
var moonPos = {
  x: 1300,
  y: 10
}
var moon = false;
function drawMoon() {
  desen.context.beginPath();
  desen.context.fillStyle = moonColor;
  desen.context.lineTo(moonPos.x, moonPos.y);
  desen.context.bezierCurveTo(moonPos.x+100,moonPos.y+80,moonPos.x+50,moonPos.y+150,moonPos.x-50,moonPos.y+150);
  desen.context.bezierCurveTo(moonPos.x,moonPos.y+140,moonPos.x+50,moonPos.y+80,moonPos.x,moonPos.y);
  desen.context.fill();
}

//绘制裂缝石头背景
var stonebgPos = {
  x:desen.width/2,
  y:desen.height/4
};

var stonebg = new Image();
stonebg.src = "img/stonebg.png";

function drawstonebg(){
  desen.context.drawImage(stonebg,stonebgPos.x,stonebgPos.y,stonebg.width,stonebg.height);
}



//绘制总场景四季渐变背景
var lerpTime = 10000;    
//渐变过渡时间
var nextLerpTime = 15000;  
//再次渐变开始时间
var interval = null;
var gradient;
var time;
var lerpindex = 0;
// 设置背景的渐变
var ambient ;
var ambients= [ 1, 0.35, 0.05, 0.5 ];
//颜色替换
var colors = [ 
          [ 0x00, 0x00, 0x3f, 
            0x00, 0x3f, 0x7f,
            0x1f, 0x5f, 0xc0,
            0x3f, 0xa0, 0xff ],

          [ 0x00, 0x3f, 0x7f, 
            0xa0, 0x5f, 0x7f,
            0xff, 0x90, 0xe0,
            0xff, 0x90, 0x00 ],
            
          [ 0x00, 0x00, 0x00,
            0x00, 0x2f, 0x7f,
            0x00, 0x28, 0x50,
            0x00, 0x1f, 0x3f ],
            
          [ 0x1f, 0x00, 0x5f,
            0x3f, 0x2f, 0xa0,
            0xa0, 0x1f, 0x1f,
            0xff, 0x7f, 0x00 ] 
        ];

//控制背景的更替
function lerp( time, last ) {
  gradient= desen.context.createLinearGradient(0,0,0,desen.height);
  
  var i0= lerpindex%colors.length;
  var i1= (lerpindex+1)%colors.length;
  
  for( var i=0; i<4; i++ )  {
    var rgb='rgb(';
    for( var j=0; j<3; j++ ) {
      rgb+= Math.floor( (colors[i1][i*3+j]-colors[i0][i*3+j])*time/last + colors[i0][i*3+j]);
      if ( j<2 ) rgb+=',';
    }
    rgb+=')';
    gradient.addColorStop( i/3, rgb );
  }
  ambient = (ambients[i1]-ambients[i0])*time/last + ambients[i0];
}


//seasons：四季的更替
var color = "rgba(0,255,0,1)";
var s_size = 1;
var seasons_frame = 0;
var grassColor;
var sunColor;
var moonColor;

//季节更替函数，控制物体变化，设置固定帧数
function seasons(){
  seasons_frame++;
  if (seasons_frame <= 1000) {
    isSun = true;
    isGrow = true;
    //从绿色到黄色
    color = "rgba(" + Math.floor(seasons_frame*200/1050) + ",200,0,1)";
    grassColor = "rgba(" + Math.floor(seasons_frame*200/1050) + ",200,0,1)";
    var sunaphla = 1-seasons_frame/1000; 
    sunColor = "rgba(241,141,75,"+ sunaphla+")";
    if(sunaphla == 0){
      moon = true;
      moonColor =  "rgba(255,204,0,1)";
    }
  }else if(seasons_frame > 1000 &&seasons_frame < 1050){
    //表示开始脱落树叶
    isSun = false;
    for(x in copac){
      // console.log(seasons_frame);
      if(copac[x].length < 10 && Math.random() < 0.015*((1050-seasons_frame)/50)){
        var temp = copac[x];
        var leaf = new frunza;
        leaf.size = temp.length;
        leaf.x = temp.x;
        leaf.y = temp.y;
        debri.push(leaf);
      }
    }
    color = "rgba("+Math.floor(seasons_frame*200/1050)+",200,0,"+((1050-seasons_frame)/50)+")";
    grassColor = "rgba("+Math.floor(seasons_frame*200/1050)+",200,0,1)";
    //透明度渐渐减低
  }else if(seasons_frame == 1050){
    // clearInterval() 方法可取消由 setInterval() 设置的 timeout。
    clearInterval(debri_gen);
  }else if(seasons_frame > 1050 && seasons_frame <= 1800){
    isSun = false;
    if(seasons_frame > 1200) {
      isSnow = true;
    }
   

    //红梅花的效果好看
    color = "rgba(251,9,10,"+((1800-seasons_frame)/650)+" )";
    var test = 316-Math.floor(seasons_frame*200/1800);
    var test2 = test - 20;   
    var moonaphla = (1800-seasons_frame)/750;
    console.log(moonaphla);
    moonColor = "rgba(255,204,0,"+moonaphla+")";
    console.log(moonColor);
    var grassaphla = (1800-seasons_frame)/750;
    
    grassColor = "rgba("+test+","+test2+",0,"+grassaphla+")";
    // grassColor = "rgba("+test+","+test2+",5,1)";
    // "rgba("+Math.floor(seasons_frame*200/1050)+",200,0,1)";
    // console.log("red:" + grassColor);
    // 可以作为下雪的空档
    // s_size = 1;
    //控制树叶大小
    s_size = (seasons_frame-1050)/400;

  }else if(seasons_frame > 1800 && seasons_frame <= 1976){
    isSnow = false;
    isSun = true;
    color = "rgba(0,200,0,1)";
    var test3 = 116-(seasons_frame-1800) ;
    var test4 = 96+(seasons_frame-1800) ;
    sunaphla2 = (seasons_frame-1800)/176;
    if(sunaphla2 >0) {
      moon = false;
    }
    grassColor = "rgba("+test3+","+test4+",0,"+sunaphla2+")";
    sunColor = "rgba(241,141,75,"+ sunaphla2+")";
    // 绿色
    s_size = (seasons_frame-1800)/200;
  }else if(seasons_frame > 1976){
    seasons_frame = 0;
    debri_gen = setInterval(new_debri,30);
  }
}


//相当于清屏功能函数，还给它加了背景渐变效果
function bg_change(){

  //绘制背景框
  //直接基于背景框绘制

  desen.context.fillStyle="#666ECA";
  desen.context.fillStyle = gradient;
  desen.context.fillRect(0, 0, desen.width, desen.height);

  wind = curent*wind_strength + wind_dev;
  recalculate();
  drawstonebg();
  if(moon) {
    drawMoon();
  } 
  
  //树干的颜色
  desen.context.strokeStyle = "#4A2A16";
  desen.context.save();
  desen.context.translate(-200,-270);
  desen.context.scale(1.5,1.5);
  desen.context.translate(0,-60);
  
  draw();
  if(isGrow) {
    desen.context.save();
      desen.context.translate(160,300);
      desen.context.scale(0.5,0.5);
      drawStone();
      desen.context.restore();
    drawergrass();
  }
  desen.context.restore();
  
  if(isSnow){
    drawsnow();
  }

  if(isSun) {
    drawSun();
  }

  var ntime = new Date().getTime();
  var elapsed = ntime-time;

  if ( elapsed > nextLerpTime ) {
    lerpindex = Math.floor((elapsed-nextLerpTime)/nextLerpTime);
    if ( (elapsed-nextLerpTime)%nextLerpTime < lerpTime ) {
      lerp( (elapsed-nextLerpTime)%nextLerpTime, lerpTime );
    }
  } 
}
    
//初始化动画执行
function init(){
  one = setInterval(armon_wind, 1);
  two = setInterval(randomized_wind, 30);
  three = setInterval(seasons,10);
  //这句功能是让第一次树生长的时候就出现黄色的碎片点
  setTimeout("debri_gen = setInterval(new_debri,30);",2000);
  four =  setInterval(run_debri,30);
  run_interval = setInterval(run,1);
  time = new Date().getTime();
  //每隔60s执行一次five函数
  five = setInterval(bg_change,60);
}
   
//动画总执行按钮
var animateButton = document.getElementById('animateButton');
animateButton.onclick = function (e) {
  paused = paused ? false : true;

  if (paused) {
    animateButton.value = '暂停';
    //通过这个控制树的生长。
    clearInterval(run_interval);
    clearInterval(one);
    clearInterval(two);
    clearInterval(three);
    clearInterval(four);
    clearInterval(five);
    //   init();
    // animateButton.value = '长';
  }
  else {
    // animateButton.value = '停';
    // //通过这个控制树的生长。
    // clearInterval(run_interval);
    // clearInterval(one);
    // clearInterval(two);
    // clearInterval(three);
    // clearInterval(four);
    // clearInterval(five);

     init();
    animateButton.value = '生长';
   
  }
};
