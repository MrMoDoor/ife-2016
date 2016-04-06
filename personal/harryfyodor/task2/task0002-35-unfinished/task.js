/*
(function(){
	var square = document.getElementById("square");
	var btn = document.getElementsByTagName("button")[0];
	var inputArea = document.getElementsByTagName("textarea")[0];
	
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
	
	var textarea = {
		linesNum: 0,
		commands: []
	}
	
	textarea.prototype = {
		getCommands: function() {
			
		},
		getNum : function(){
			// 返回序号
			var content = document.getElementsByTagName("textarea")[0];
			var value = content.value;
			if (value.match(/\n/g)) {
				return value.match(/\n/g).length+1;	
			} else {
				return 1;	
			}
		},
		tests: function() {
			var lines = inputArea.value.split("\n");
			var testValid = true;
			var linesId = document.getElementsByTagName("ul")[0].getElementsByTagName("li");
			for (var i = 0, len = lines.length; i < len; i++) {
				console.log(/[mov|tun|tra]\s[rig|lef|top|bot][0-9]/.test(lines[i]))
				if (!(/[mov|tun|tra]\s[rig|lef|top|bot]\d./.test(lines[i]) || /go\s\d./i.test(lines[i]))) {
					testValid = false;
					textarea.valid = false;
					linesId[i].style.backgroundColor = "red";
					console.log(lines[i]);
				} else if (i == len - 1 && testValid == true) {
					textarea.valid = true;
					console.log(textarea.valid);
				}
			}
		},
		showError: function(array) {
			
		}
	}
	
	
	// 按键函数，把得到的数据传给处理函数
	
	var btnHandler = function(e) {
		textarea.prototype.tests();
		handling(inputArea.value);
		btn.onclick = null;
		var stopEnter = setTimeout(function() {
			btn.onclick = function(e){
				btnHandler(e);
			}
		}, 0);
	}
	
	btn.onclick = function(e){
		btnHandler(e);
	}
	
	var keyDownHandler = function(e) {
		var event = e || window.srcElement;
		var ul = document.getElementsByTagName("ul")[0];
		setTimeout(function(){
			var ulContent = "";
			for (var i = 1; i <= textarea.prototype.getNum(); i++) {
				ulContent += "<li>" + i + "</li>"
			}
			ul.innerHTML = ulContent;
			//var li = ul.getElementsByTagName("li")[0];
			ul.scrollTop = inputArea.scrollTop;
		},0);
	}
	inputArea.onkeydown = function(e){
		keyDownHandler(e);
	}
	inputArea.onscroll = function(e){
		var ul = document.getElementsByTagName("ul")[0];
		ul.scrollTop = inputArea.scrollTop;
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
		if (content.slice(0,3) == "TRA") {
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
})();*/

(function(){
	var textarea = document.getElementsByTagName("textarea")[0],
		square = document.getElementById("square"),
	    ul = document.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li")[0],
	    btn = document.getElementsByTagName("button")[0],
	    direction = "top",
	    start = false,
		rotateDegs = 0, 
		allCmds = [],
		timers = 1,
	    linesCount = 0;

	// 每次的改变都调用一下这个函数
	function prepare() {
		var content = textarea.value;
		if (content != "") {
			var cmds = content.split("\n");
			handling(cmds);
		}
	}
	
	// 对左边栏的id进行刷新
	function freshId() {
		ul.innerHTML = "";
		var count;
		if (textarea.value.match(/\n/g)) {
			count = textarea.value.match(/\n/g).length+1;
		} else {
			count = 1;
		}
		console.log(count)
		var content = "";
		for (var i = 0, len = count; i < len; i++) {
			content += "<li>" + (i + 1) + "</li>";
		}
		ul.innerHTML = content;
		content = "";
	}
	
	// 刷新方块的旋转角度
	function freshDeg() {
		while(rotateDegs > 360) {
			rotateDegs -= 360;
		}
		while(rotateDegs < 0) {
			rotateDegs += 360;
		}
		if (rotateDegs === 360 || rotateDegs === 0) {
			direction = "top";
		} else if (rotateDegs === 270) {
			direction = "lef";
		} else if (rotateDegs === 180) {
			direction = "bot";
		} else if (rotateDegs === 90) {
			direction = "rig";
		}
	}
	
	function handling(cmds) {
		for (var i = 0, len = cmds.length; i < len; i++) {
			
			var infos = cmds[i].split(" ");
			console.log(infos); 
			// 用一个字符串占着空的位置
			for (var k = 0, len2 = infos.length; k < len2; k++) {
				if (infos[k] == "") {
					infos[k] = "What?";
				}
			}
			console.log(infos);
			// 命令属于三个字符的
			if (infos.length === 3 && (infos[0].toLowerCase() in {"mov":undefined, "tun":undefined, 							"tra":undefined})
			   					   && (infos[1].toLowerCase() in {"lef":undefined, "rig":undefined, 	"top":undefined, "bot":undefined})
			   					   && !isNaN(Number(infos[2]))) {
				if (start) {
					doCmd({type:infos[0],dir:infos[1],step:parseInt(infos[2], 10)});
				}
			} else
			// 命令属于两个字符的
			if (infos.length === 2) {
				if ((infos[0].toLowerCase() in {"mov":undefined, "tun":undefined, 							"tra":undefined})
			     && (infos[1].toLowerCase() in {"lef":undefined, "rig":undefined, 	"top":undefined, "bot":undefined}) ) {
					if (start) {
						doCmd({type:infos[0],dir:infos[1],step:1});
					}
				} else if (infos[0].toLowerCase() === "go" && !isNaN(Number(infos[1]))) {
					if (start) {
						doCmd({type:infos[0],dir:direction,step:parseInt(Number(infos[1], 10))});
					}
				} else {
					ul.getElementsByTagName("li")[i].style.backgroundColor = "red";
				}
			} else 
			// 命令属于一个字符的
			if (infos.length === 1 && infos[0].toLowerCase() === "go") {
				if (start) {
					doCmd({type:infos[0],dir:direction,step:1 });
				}
			} else {
				//console.log(ul.getElementsByTagName("li")[0]);
				ul.getElementsByTagName("li")[i].style.backgroundColor = "red";
			}
		}
	}
	
	// 返回行数目
	function linesCounts() {
		if() {
			
		}
	}

	// 对传入命令（单行）进行分析，选择对应的事件
	function doCmd({type:type, dir:dir, step:step}){
		if (textarea.value.match(/\n/g)) {
			linesCount = textarea.value.match(/\n/g).length + 1;
		} else {
			linesCount = 1;
		}
		linesCount--;
		if (linesCount == 0) {console.log(linesCount);
			timers = 0;
			start = false;
		}
		for (var i = 0; i < step; i++) {
			setTimeout(function(){
				if(type === "mov") {
					mov(dir);
				} else if (type === "tun")	{
					tun(dir);
				} else if (type === "tra") {
					tra(dir);
				} else if (type === "go") {
					go(dir);
				}
			},1200*timers);
			timers++;
		}
	}
	
	// 分别不同的事件 tun
	function tun(dir) {
		console.log("tun");
		freshDeg();
		var deg, degSec, c = 0;
		if (dir == "rig") {
			deg = 90;
		} else if (dir == "lef") {
			deg = -90;
		} else if (dir == "bot") {
			deg = 180;
		}
		degSec = deg/30;
		var rotating = setInterval(function(){
			var current = parseInt(rotateDegs,10) + degSec;
			square.style.transform = "rotate(" + current + "deg)";
			c++;
			rotateDegs = current; 
			if (c == 30) {
				clearInterval(rotating);
			}
		},20);
		freshDeg();
	}
	
	// go
	function go(dir) {
		console.log("go");
		goOrTra(dir);
	}
	
	// tra
	function tra(dir) {
		console.log("tra");
		goOrTra(dir);
	}
	
	// mov
	function mov(dir) {
		console.log("mov");
		tun(dir);
		setTimeout(function(){
			go(dir);
		}, 800);
	}
	
	// go和tun的辅助函数
	function goOrTra(drc) {
		var dis = 0, 
			dir = "", 
			identify = true; 
		switch(drc) {
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
				// 判断是否出界了
				if (parseInt(square.style.left,10) > 380) {
					identify = false;
					square.style.left = 420 + "px";
				}
				break;
			case "top":
				dis = -40;
				dir = "top";
				// 判断是否出界了
				if (parseInt(square.style.top,10) <= 60) {
					identify = false;
					square.style.top = 60 + "px";
				}
				break;
			case "bot":
				dis = 40;
				dir = "top";
				// 判断是否出界了
				if (parseInt(square.style.top,10) > 380) {
					identify = false;
					square.style.top = 420 + "px";
				}
				break;
			default:
				break;
		}
		if (identify) {
			var c = 0;
			var sstep = dis/10;
			var going = setInterval(function(){
				square.style[dir] = parseInt(square.style[dir],10) + sstep + "px";
				c++;
			if (c == 10) {
				clearInterval(going);
				c = 0;
			}
		},50);
			//squareCtrl.prototype.go(dir, dis);
		} else {
			console.log("Out of range");
		}
	}
	
	// 事件
	// 事件的选择非常重要！scroll 和 keyup
	textarea.addEventListener("scroll", function(){
		freshId();
		prepare();
		ul.scrollTop = textarea.scrollTop;
	}, false);
	textarea.addEventListener("keyup", function(e){
		e = arguments[0] || window.srcElement;
		freshId();
		prepare();
		ul.scrollTop = textarea.scrollTop;
	}, false);
	btn.addEventListener("click", function(){
		start = true;
		freshId();
		prepare();
		ul.scrollTop = textarea.scrollTop;
		
		if (textarea.value.match(/\n/g)) {
			linesCount = textarea.value.match(/\n/g).length + 1;
		} else {
			linesCount = 1;
		}
	},false);
	
	// 异步刷新deg值
	setInterval(function(){
		freshDeg();
		//console.log(start, linesCount, rotateDegs, direction);
		if (linesCount == 0) {
			timers = 0;
			start = false;
		}
	},0);
	
	setInterval(function(){
		console.log(start, linesCount, rotateDegs, direction);
	},1000)
	
})();
