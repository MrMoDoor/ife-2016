(function(){
	var textarea = document.getElementsByTagName("textarea")[0],
		square = document.getElementById("square"),
	    ul = document.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li"),
	    btn = document.getElementsByTagName("button")[0],
		buildBtn = document.getElementsByTagName("button")[1], 
	    direction = "top",
	    start = false,
		rotateDegs = 0, // 旋转 
		allCmds = [],
		timers = 1,
	    linesCount = 0,
		currentPosition = { // 当前位置
			x: 4,
			y: 4
		},
		board = new Array(10),
		virtualBoard = new Array(10); // 用于寻路算法的时候方便
	
	// 初始化棋盘 以及 寻路算法方便的“虚拟盘”
	for (var r = 0; r < 10; r++) {
		board[r] = [];
		virtualBoard[r] = [];
		for (var c = 0; c < 10; c++) {
			board[r][c] = 0;
			virtualBoard[r][c] = 0;
		}
	}

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
		//console.log(count)
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
	
	// 刷新棋盘
	function freshBoard() {
		var table = document.getElementsByTagName("table")[0];
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				if (board[i][j] === 1) {
					var po = table.getElementsByTagName("tr")[j + 1].getElementsByTagName("td")[i + 1];
					po.style.backgroundColor = "#E4E4E4";
					board[i][j] = 2;
				}
			}
		}
	}
	
	function handling(cmds) {
		var c = 1;
		for (var i = 0, len = cmds.length; i < len; i++) {
			var infos = cmds[i].split(" ");
			//console.log(infos); 
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
			if (infos.length === 3 && (infos[0].toLowerCase() === "mov" && infos[1].toLowerCase() === "to") && infos[2].match(/[1-10]+,[1-10]$/)) {
				console.log("right");
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
				} else if (infos[0].toLowerCase() === "bru" && infos[1] !== "What?") {
					if (start) {
						doCmd({type:infos[0],dir:infos[1],step:1 });
					}
				} 
				else {
					ul.getElementsByTagName("li")[i].style.backgroundColor = "red";
				}
			} else 
			// 命令属于一个字符的
			if (infos.length === 1 && infos[0].toLowerCase() === "go") {
				if (start) {
					doCmd({type:infos[0],dir:undefined,step:1 });
				}
			} else
			if (infos.length === 1 && infos[0].toLowerCase() === "build") {
				if (start) {
					doCmd({type:infos[0],dir:undefined,step:1 });
				}
			}
			else {
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
				} else if (type === "build") {
					build(dir);
				} else if (type === "bru") {
					bru(dir);
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
	
	// build 
	function build() {
		if (direction === "rig" && currentPosition.y <= 10 &&
			board[currentPosition.x][currentPosition.y - 1] != 2) {
			board[currentPosition.x][currentPosition.y - 1] = 1;
			freshBoard();
		} else if (direction === "lef" && currentPosition.y - 1 >= 1 &&
				  board[currentPosition.x - 2][currentPosition.y - 1] != 2) {
			board[currentPosition.x - 2][currentPosition.y - 1] = 1;
			freshBoard();
		} else if (direction === "top" && currentPosition.x <= 10 &&
				  board[currentPosition.x - 1][currentPosition.y - 2] != 2) {
			board[currentPosition.x - 1][currentPosition.y - 2] = 1;
			freshBoard();
		} else if (direction === "bot" && currentPosition.x - 1 >= 1 && 
				  board[currentPosition.x - 1][currentPosition.y] != 2) {
			board[currentPosition.x - 1][currentPosition.y] = 1;
			freshBoard();
		} else {
			console.log("Building fail!");
		}
	}
	
	// bru
	function bru(dir) {
		var x,y,
			table = document.getElementsByTagName("table")[0];
		if (direction === "lef" && board[currentPosition.x - 2][currentPosition.y - 1] === 2) {
			x = currentPosition.x;
			y = currentPosition.y - 1;
		} else if (direction === "rig" && board[currentPosition.x][currentPosition.y - 1] === 2) {
			x = currentPosition.x;
			y = currentPosition.y + 1;
		} else if (direction === "top" && board[currentPosition.x - 1][currentPosition.y - 2] === 2) {
			x = currentPosition.x - 1;
			y = currentPosition.y;
		} else if (direction === "bot" && board[currentPosition.x - 1][currentPosition.y] === 2) {
			x = currentPosition.x + 1;
			y = currentPosition.y;
		}
		// 染色
		if (!isNaN(x) && !isNaN(y)) {
			var wallShouldBeColored = table.getElementsByTagName("tr")[x].getElementsByTagName("td")[y];
			wallShouldBeColored.style.backgroundColor = dir;
			x = undefined;
			y = undefined;
		}
	}
	
	// movto函数 返回一个数组
	function movTo(aimX, aimY){
		aimX = 1;
		aimY = 1;
		for (var x = 0; x < 10; x++) {
			for (var y = 0; y < 10; y++) {
				if(board[x][y] === 2) {
					virtualBoard[x][y] = "wall";
				}
			}
		}
		virtualBoard[1][3] = 11;
		// 下上右左
		var offset = [{x:0, y:1}, {x:0, y:-1}, 
					  {x:1, y:0}, {x:-1, y:0}];
		var queue = [];
		var collection = [];
		var current = {
			x: currentPosition.x - 1,
			y: currentPosition.y - 1
		};
		var temp = {
			x: undefined,
			y: undefined
		};
		queue.push(current);
		virtualBoard[current.x][current.y] = 1;
		while(true) {
			for (var i = 0; i < 4; i++) {
				temp.x = current.x + offset[i].x;
				temp.y = current.y + offset[i].y;
				if (temp.x === aimX && temp.y === aimY) {
					virtualBoard[aimX][aimY] = virtualBoard[current.x][current.y] + 1;
					break;
				} else if (virtualBoard[temp.x][temp.y] === 0) {
					virtualBoard[temp.x][temp.y] = virtualBoard[current.x][current.y] + 1;
					queue.push({x:temp.x, y:temp.y});
				}
			}
			
			// 已经找到了目标
			if (temp.x === aimX && temp.y === aimY) {
				break;
			}
			
			// 队列已空
			if (!queue[0]) {
				alert("Can't find a way!");
				return 0;
			}
			
			// 取队头
			current = queue[0];
			queue.shift();
		}
		
		var temp = {
			x: undefined,
			y: undefined
		};
		var current = {
			x: aimX,
			y: aimY
		};
		var finish = virtualBoard[aimX][aimY];
		for (var n = finish - 1; n > 0; n--) {
			for (var m = 0; m < 4; m++) {
				temp.x = current.x + offset[m].x;
				temp.y = current.y + offset[m].y;
				if (virtualBoard[temp.x][temp.y] === n) {
					current.x = temp.x;
					current.y = temp.y;
					console.log(current.x, current.y)
					switch(m) {
						case 0:
							collection.push("top");
							break;
						case 1:
							collection.push("bot");
							break;
						case 2:
							collection.push("lef");
							break;
						case 3:
							collection.push("rig");
							break;
						default:
							return "error";
					}
				}
			}
		}
		for (var xx = 0; xx < 10; xx++) {
			console.log(virtualBoard[xx]);
		}
		console.log(collection);
		//return collection;
	}
	
	// go和tun的辅助函数
	function goOrTra(drc) {
		var dis = 0, 
			dir = "", 
			identify = "pass"; 
		switch(drc) {
			case "lef":
				dis = -40;
				dir = "left";
				// 判断是否出界了
				if (parseInt(square.style.left,10) <= 60) {
					identify = "Out of range";
					square.style.left = 60 + "px";
				} if (board[currentPosition.x - 2][currentPosition.y - 1] == 2) {
					identify = "There is a wall"; // 前面有一堵墙
				} 
				else {
					currentPosition.x--; // 更新坐标位置
				}
				break;
			case "rig":
				dis = 40;
				dir = "left";
				// 判断是否出界了
				if (parseInt(square.style.left,10) > 380) {
					identify = false;
					square.style.left = 420 + "px";
				} else if (board[currentPosition.x][currentPosition.y - 1] == 2) {
					identify = "There is a wall"; // 前面有一堵墙
				}  
				else {
					currentPosition.x++; // 更新坐标位置					
				}
				break;
			case "top":
				dis = -40;
				dir = "top";
				// 判断是否出界了
				if (parseInt(square.style.top,10) <= 60) {
					identify = false;
					square.style.top = 60 + "px";
				} else if (board[currentPosition.x - 1][currentPosition.y - 2] == 2) {
					identify = "There is a wall"; // 前面有一堵墙
				} 
				else {
					currentPosition.y--; // 更新坐标位置
				}
				break;
			case "bot":
				dis = 40;
				dir = "top";
				// 判断是否出界了
				if (parseInt(square.style.top,10) > 380) {
					identify = false;
					square.style.top = 420 + "px";
				} else if (board[currentPosition.x - 1][currentPosition.y] == 2) {
					identify = "There is a wall"; // 前面有一堵墙
				} 
				else {
					currentPosition.y++; // 更新坐标位置
				}
				break;
			default:
				break;
		}
		if (identify === "pass") {
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
			console.log(identify);
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
	
	// 随机建设墙壁
	buildBtn.onclick = function() {
		/*
		var xRandom = Math.floor(Math.random()*10);
		var yRandom = Math.floor(Math.random()*10);
		while((currentPosition.x === xRandom && currentPosition.y === yRandom)
			 || board[xRandom][yRandom] === 2) {
		    xRandom = Math.floor(Math.random()*10);
			yRandom = Math.floor(Math.random()*10);
		}
		board[xRandom][yRandom] = 1;
		freshBoard();
		console.log(xRandom, yRandom);*/
		movTo();
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
	
	setInterval(function(){
		console.log(direction);
	},1000)
	
})();
