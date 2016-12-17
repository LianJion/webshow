#### Math.random(): 生成[0,1)的值
     var randomAngle = Math.random()*90;
      console.log(randomAngle);
      var randomX = Math.random()*1000+ 200;
      var randomY = Math.random()*200 + 100;

####  Math.PI ：π
    
    // 弧度转换为角度
     function deg_to_rad(angle){
      return angle*(Math.PI/180.0);
    }


####  clearInterval 停止setInterval函数

    var sh;
    sh=setInterval(show,1000);
    clearInterval(sh);