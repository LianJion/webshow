#### 绘制裂缝的时候出现了点问题

*1* window.onload失效了
    
    window.onload = function() {
        console.log("aaa");
        stone();
    }
    //刷新页面后没有出现图片，连aaa都没有出现。

###### 那应该怎么先画作为背景的石头呢？
    //再加一个按钮控制石头的绘制
    var animatestoneButton = document.getElementById("animationstonebutton");
    animationstonebutton.onclick = function(e) {
      stone();
    }


###### 但是又有新的问题了，一点击按钮就会重新绘制石头，那么会把原本在石头上的裂纹覆盖。

###### 万能的开挂主啊！ 谁也不认识谁啊，我把绘制石头的按钮给隐藏了，哈哈哈哈！
###### 天不生仲尼，万古如长夜！


*2* 我想整合代码的时候，发现了问题，路径动画不用刷新的啊！一刷路径都没了啊！

