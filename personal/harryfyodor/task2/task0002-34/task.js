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
		mov : function(direction){
			var that = this;
			this.reDirect();
			var deg = {
				"top": 0,
				"left": -90,
				"right": 90,
				"bottom": 180
			};
			if (direction != squareCtrl.currentDirection) {
				var diff = deg[direction] - squareCtrl.face;
				var count = 0;
				var degSec = diff/30;
				var rot = setInterval(function(){
					var current = parseInt(squareCtrl.face,10) + degSec;
					square.style.transform = "rotate(" + current + "deg)";
					count++;
					squareCtrl.face += degSec; 
					if (count == 30) {
						that.reDirect(); // 重新定向从而使得走动方向正常
						count = 0;
						goOrTra(squareCtrl.currentDirection);
						clearInterval(rot);
					}
				},20);
			} else {
				goOrTra(squareCtrl.currentDirection);
			}
		},
		// 重新定向，让角度限定在一定的范围内，并判断当前的转向。
		reDirect: function() {
			while(squareCtrl.face > 360) {
				squareCtrl.face -= 360;
			}
			while(squareCtrl.face < 0) {
				squareCtrl.face += 360;
			}
			if (squareCtrl.face == 360 || squareCtrl.face == 0) {
				squareCtrl.currentDirection = "top";
			} else if (squareCtrl.face == 270) {
				squareCtrl.currentDirection = "left";
			} else if (squareCtrl.face == 180) {
				squareCtrl.currentDirection = "bottom";
			} else if (squareCtrl.face == 90) {
				squareCtrl.currentDirection = "right";
			}
		}
	}
	
	// 按键函数，把得到的数据传给处理函数
	var btn = document.getElementsByTagName("button")[0];
	var inputArea = document.getElementsByTagName("input")[0];
	var btnHandler = function(e) {
		handling(inputArea.value);
		btn.onclick = null;
		var stopEnter = setTimeout(function() {
			btn.onclick = function(e){
				btnHandler(e);
			}
		}, 1000);
	}
	
	btn.onclick = function(e){
		btnHandler(e);
	}
	
	var keyDownHandler = function(e) {
		var event = e || window.srcElement;
		var content = inputArea.value;
		
		if (event.keyCode == 13) {
			handling(content);
			inputArea.onkeydown = null;
			// 暴力防止重复出发
			var stopEnter = setTimeout(function() {
				inputArea.onkeydown = function(e){
					keyDownHandler(e);
				}
			}, 1000);
		}
	}
	inputArea.onkeydown = function(e){
		keyDownHandler(e);
	}
	
	// 事件处理函数，通过输入来判断指令，并做出应答。
	function handling(content) {
		squareCtrl.prototype.reDirect();
		// 判断是否越界
		content = content.trim().toUpperCase();
		// Go
		if (content.toUpperCase() == "GO") {
			goOrTra(squareCtrl.currentDirection);
		}
		// TRA
		if (content.slice(0,3).toLowerCase() == "tra") {
			goOrTra(content.slice(4,7).toLowerCase());
		}
		// TUN
		if (content.toUpperCase() == "TUN LEF") {
			squareCtrl.prototype.turn("left");
		} else if (content.toUpperCase() == "TUN RIG") {
			squareCtrl.prototype.turn("right");
		} else if (content.toUpperCase() == "TUN BAC") {
			squareCtrl.prototype.turn("back");
		}
		// MOV
		if (content.slice(0,3).toLowerCase() == "mov") {
			mov(content.slice(4,7).toLowerCase());
		}
		
		squareCtrl.prototype.reDirect();
	}
	
	
	function goOrTra(command) {
		var dis = 0, 
			dir = "", 
			identify = true; 
		switch(command.slice(0,3)) {
			case "lef":
				dis = -40;
				dir = "left";
				// 判断是否出界了
				if (parseInt(square.style.left,10) <= 60) {
					identify = false;
					square.style.left = 60 + "px";
				}
				break;
			case "rig":
				dis = 40;
				dir = "left";
				if (parseInt(square.style.left,10) > 380) {
					identify = false;
					square.style.left = 420 + "px";
				}
				break;
			case "top":
				dis = -40;
				dir = "top";
				if (parseInt(square.style.top,10) <= 60) {
					identify = false;
					square.style.top = 60 + "px";
				}
				break;
			case "bot":
				dis = 40;
				dir = "top";
				if (parseInt(square.style.top,10) > 380) {
					identify = false;
					square.style.top = 420 + "px";
				}
				break;
			default:
				break;
		}
		
		if (identify) {
			squareCtrl.prototype.go(dir, dis);
		} else {
			console.log("Out of range");
		}

	}
	
	function mov(command) {
		switch(command) {
			case "lef":
				squareCtrl.prototype.mov("left");
				break;
			case "rig":
				squareCtrl.prototype.mov("right");
				break;
			case "top":
				squareCtrl.prototype.mov("top");
				break;
			case "bot":
				squareCtrl.prototype.mov("bottom");
				break;
			default:
				break;
		}
	}
})();