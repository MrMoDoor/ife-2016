// 写于2016/4/8 by harryfyodor

(function(){
	var textarea = document.getElementsByTagName("textarea")[0],
		square = document.getElementById("square"),
	    ul = document.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li"),
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
		var c = 1;
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
						doCmd({type:infos[0],dir:undefined,step:parseInt(Number(infos[1], 10))});
					}
				} else {
					ul.getElementsByTagName("li")[i].style.backgroundColor = "red";
				}
			} else 
			// 命令属于一个字符的
			if (infos.length === 1 && infos[0].toLowerCase() === "go") {
				if (start) {
					doCmd({type:infos[0],dir:undefined,step:1 });
				}
			} else {
				//console.log(ul.getElementsByTagName("li")[0]);
				ul.getElementsByTagName("li")[i].style.backgroundColor = "red";
			}
		}
		c = 1;
	}
	
	// 返回行数目
	function linesCounts() {
		if(start) {
			if (textarea.value.match(/\n/g)) {
				return textarea.value.match(/\n/g).length;
			} else {
				return 0;
			}
		} else {
			return 0;
		}
	}

	// 对传入命令（单行）进行分析，选择对应的事件
	function doCmd({type:type, dir:dir, step:step}){
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
	
	// 分别不同的事件 
	// tun
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
		freshDeg();
		dir = direction;// 异步！！
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
		movAuxi(dir);
		setTimeout(function(){
			go(undefined);
		}, 650);// 异步数值巧妙
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
	
	// mov的辅助函数
	function movAuxi(dir) {
		freshDeg();
		var deg = {
			"top": 0,
			"lef": -90,
			"rig": 90,
			"bot": 180
		};
		if (direction != dir) {
			var diff = deg[dir] - rotateDegs;
			var count = 0;
			var degSec = diff/30;
			var rot = setInterval(function(){
				var current = parseInt(rotateDegs,10) + degSec;
				square.style.transform = "rotate(" + current + "deg)";
				count++;
				rotateDegs += degSec; 
				if (count == 30) {
					count = 0;
					clearInterval(rot);
				}
			},20);
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
	
	//btn.addEventListener("click", ,false);
	btn.onclick = function(){
		btnHandler();
	};
	
	//btn的handler
	function btnHandler() {
		var hasError = false;
		start = true;
		for (var i = 0, len = lis.length; i < len; i++) {
			if(lis[i].style.backgroundColor === "red") {
				hasError = true;
				alert("输入错误！");
				break;
			}
		}
		// 没有红点
		if (!hasError) {
			freshId();
			prepare();
			btn.onclick = null;
			// 防止多次触发
			// 1.2秒后关闭。由于程序执行时间很短，因此1.2秒可以保证执行完。
			setTimeout(function(){
				start = false;
				counter = 0;
				btn.onclick = function(){
					btnHandler();
				}
			},1200);
		}	
	}
	
	
	
	// 异步刷新deg值
	setInterval(function(){
		freshDeg();
		if (linesCount == 0) {
			timers = 0;
			start = false;
		}
	},0);
	
	setInterval(function(){console.log(direction);
		//console.log(start, linesCount, rotateDegs, direction);
	},1000)
	
})();
