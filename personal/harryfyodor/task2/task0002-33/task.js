// 写于2016/4/3 by harryfyodor
(function(){
	var square = document.getElementById("square");
	
	var squareCtrl = {
		face: 0, // 旋转角度
		currentDirection: "up" // 方向
	}
	
	squareCtrl.prototype = {
		// 控制走动的方法，通过定时器模拟动画。
		go: function(direciton, distance) {

			var distance;
			var count = 0;
			var step = distance/10;
		
			var mov = setInterval(function(){
				square.style[direciton] = parseInt(square.style[direciton],10) + step + "px";
				count++;
				if (count == 10) {
					clearInterval(mov);
					count = 0;
				}
			},50);
		},
		// 控制转向的方法，通过定时器模拟动画。
		turn: function(direction) {
			this.reDirect();
			var deg, degSec, count = 0;
			if (direction == "right") {
				deg = 90;
			} else if (direction == "left") {
				deg = -90;
			} else if (direction == "back") {
				deg = 180;
			}
			degSec = deg/30;
			var rot = setInterval(function(){
				var current = parseInt(squareCtrl.face,10) + degSec;
				square.style.transform = "rotate(" + current + "deg)";
				count++;
				squareCtrl.face += degSec; 
				if (count == 30) {
					clearInterval(rot);
				}
			},20);
			this.reDirect();
		} ,
		// 重新定向，让角度限定在一定的范围内，并判断当前的转向。
		reDirect: function() {
			while(squareCtrl.face > 360) {
				squareCtrl.face -= 360;
			}
			while(squareCtrl.face < 0) {
				squareCtrl.face += 360;
				
			}
			if (squareCtrl.face == 360 || squareCtrl.face == 0) {
				squareCtrl.currentDirection = "up";
			} else if (squareCtrl.face == 270) {
				squareCtrl.currentDirection = "left";
			} else if (squareCtrl.face == 180) {
				squareCtrl.currentDirection = "down";
			} else if (squareCtrl.face == 90) {
				squareCtrl.currentDirection = "right";
			}
		}
	}
	
	// 按键函数，把得到的数据传给处理函数
	var btn = document.getElementsByTagName("button")[0];
	btn.onclick = function(){
		var inputArea = document.getElementsByTagName("input")[0];
		var content = inputArea.value;
		handling(content);
	}
	
	// 事件处理函数，通过输入来判断指令，并做出应答。
	function handling(content) {
		squareCtrl.prototype.reDirect();
		var identify = true;
		content = content.trim().toUpperCase();
		if (content == "GO") {
			var dis, dir;
			if (squareCtrl.currentDirection == "left") {
				dis = -40;
				dir = "left";
				// 判断是否出界了
				if (parseInt(square.style.left,10) <= 60) {
					identify = false;
				}
			} else if (squareCtrl.currentDirection == "right") {
				dis = 40;
				dir = "left";
				if (parseInt(square.style.left,10) >= 420) {
					identify = false;
				}
			} else if (squareCtrl.currentDirection == "up") {
				dis = -40;
				dir = "top";
				if (parseInt(square.style.top,10) <= 60) {
					identify = false;
				}
			} else if (squareCtrl.currentDirection == "down") {
				dis = 40;
				dir = "top";
				if (parseInt(square.style.top,10) >= 360) {
					identify = false;
				}
			} 
			if (identify) {
				squareCtrl.prototype.go(dir, dis);
			} else {
				console.log("Out of range");	
			}
		} else {
			if (content == "TUN LEF") {
				squareCtrl.prototype.turn("left");
			} else if (content == "TUN RIG") {
				squareCtrl.prototype.turn("right");
			} else if (content == "TUN BAC") {
				squareCtrl.prototype.turn("back");
			}
			squareCtrl.prototype.reDirect();
		}
	}
})();