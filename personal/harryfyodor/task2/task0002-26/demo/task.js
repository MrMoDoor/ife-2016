(function(){
	var shipsInUniverse = [],
		shipsForMediator = [],
		ships = [],
		medis = [];
		
	// 定义飞船的模型
	var Spaceship = (function(window, undefined){
		
		// 飞船的私有变量
		var spaceshipInfo = {
			id: 0,
			commandId: 0,
			energy: 10,
			status: "running",
			clear: false
		};
		
		// 飞船的方法
		function Spaceship(){
			// 设置真实的id，自动分配id
			this.deliverId = function() {
				if (shipsInUniverse.length === 0) {
					spaceshipInfo.id = 0;
					shipsInUniverse.push(spaceshipInfo.id);
					shipsInUniverse.sort();
				} else {
					for (var i = 0, len = shipsInUniverse.length; i < len; i++) {
						if (i != shipsInUniverse[i]) {
							spaceshipInfo.id = i;
							shipsInUniverse.push(spaceshipInfo.id);
							shipsInUniverse.sort();
							break;
						} else if (i == len - 1) {
							spaceshipInfo.id = len;
							shipsInUniverse.push(spaceshipInfo.id);
							shipsInUniverse.sort();
							break;
						}
					}
				}
			}
			
			
			// 函数中调用函数
			var that = this;
			
			this.getId = function() {
				return spaceshipInfo.id;
			}
			
			this.setPause = function() {
			
				var ship = document.getElementById("no" + spaceshipInfo.id);
				
				if(ship.className.indexOf("running")) {
					ship.className = ship.className.replace("running", "");
				}
				if(ship.className.indexOf("pause") === -1) {
					ship.className = ship.className + "pause";
				}
				
				console.log(ship.className);
				spaceshipInfo.status = "pause";
				spaceshipInfo.clear = false;
			}
			
			this.setRunning = function() {
				
				var ship = document.getElementById("no" + spaceshipInfo.id);
				
				if(ship.className.indexOf("running") === -1) {
					ship.className = ship.className + "running";
				}
				if(ship.className.indexOf("pause")) {
					ship.className = ship.className.replace("pause", "");
				}
				
				spaceshipInfo.status = "running";
				spaceshipInfo.clear = false;
			}
			
			this.returnStatus = function() {
				return spaceshipInfo.status;
			}

			// 清除定时器 c为bool值
			this.setClear = function(c) {
				spaceshipInfo.clear = c;
			}
			
			this.destory = function() {
				spaceshipInfo.id = 222;
				that = {};
				delete that;
			}
			
			this.newHTML = function() {
				var universe = document.getElementsByClassName("universe")[0];
				//var content = '<div class="spaceship pause"' + 'id=' + '"' + 'no' + spaceshipInfo.id + '"' + '><div class="energy"></div></div>';
				//universe.innerHTML = universe.innerHTML + content;
				var div = document.createElement("div");
				div.setAttribute("class", "spaceship pause");
				div.setAttribute("id", "no" + spaceshipInfo.id);
				var div2 = document.createElement("div");
				div2.setAttribute("class", "energy");
				div.appendChild(div2);
				universe.appendChild(div);
				// return content;
			}
			
			// 最关键的部分
			this.energyCounting = function() {
				console.log(spaceshipInfo.energy);
				console.log(spaceshipInfo.status);
				
				var energyUpdating = setInterval(function(){
					
					console.log(spaceshipInfo.energy);
					console.log(that.returnStatus());
					
					if (spaceshipInfo.energy === 0 && spaceshipInfo.status === "running") {
						spaceshipInfo.status = "pause";
					} else if (spaceshipInfo.energy === 10 && spaceshipInfo.status === "pause") {
						spaceshipInfo.energy = 10;
					} else if (that.returnStatus() === "running") {
						spaceshipInfo.energy = spaceshipInfo.energy - 1;
					} else if (that.returnStatus() === "pause") {
						spaceshipInfo.energy = spaceshipInfo.energy + 1;
					}
					if (spaceshipInfo.clear) {
						clearInterval(energyUpdating);
					}
				}, 1000);
			}
		}
		
		// 返回函数
		return Spaceship;
	})(window);
	
	// 定义控制台
	var Mediators = (function(window, undefined){
		
		// 控制台的私有变量
		var mediatorsInfo = {
			id: 0,
			shipId: 0,
			fake: false,
			connect: new Spaceship()
		}
		
		function Mediators() {
			
			var that = this;
			
			this.deliverId = function() {
				if (shipsForMediator.length === 0) {
					mediatorsInfo.id = 0;
					shipsForMediator.push(mediatorsInfo.id);
				} else {
					for (var i = 0, len2 = shipsForMediator.length; i < len2; i++) {
						if (i != shipsForMediator[i]) {
							mediatorsInfo.id = i;
							shipsForMediator.push(mediatorsInfo.id);
							shipsForMediator.sort();
							break;
						} else if (i == len2 - 1) {
							mediatorsInfo.id = len2;
							shipsForMediator.push(mediatorsInfo.id);
							shipsForMediator.sort();
							break;
						}
					}
				}
			}
			
			this.getId = function() {
				return mediatorsInfo.id;
			}
			
			this.connectTo = function(spaceship) {
				mediatorsInfo.connect = spaceship;
				mediatorsInfo.shipId = spaceship.getId();
				console.log(mediatorsInfo.shipId);
			}
			
			this.spaceship = function(){
				return mediatorsInfo.connect;
			}
			
			this.newHTML = function(){
				var control = document.getElementsByClassName("control")[0];
				//var content = '<div id="command' + mediatorsInfo.id + '"><label>Spaceship no.' + mediatorsInfo.id + '</label><button>Set off</button><button>Stop</button><button>Disposal</button><label>100%</label></div>';
				// 恶心的dom
				var div = document.createElement("div");
				div.setAttribute("id", "command" + mediatorsInfo.id);
				var label1 = document.createElement("label");
				var btn1 = document.createElement("button");
				var btn2 = document.createElement("button");
				var btn3 = document.createElement("button");
				var label2 = document.createElement("label");
				var text0 = document.createTextNode("Spaceship no." + mediatorsInfo.id);
				var text1 = document.createTextNode("Set off");
				var text2 = document.createTextNode("Stop");
				var text3 = document.createTextNode("Disosal");
				var text4 = document.createTextNode("100%");
				label1.appendChild(text0);
				btn1.appendChild(text1);
				btn2.appendChild(text2);
				btn3.appendChild(text3);
				label2.appendChild(text4);
				div.appendChild(label1);
				div.appendChild(btn1);
				div.appendChild(btn2);
				div.appendChild(btn3);
				div.appendChild(label2);
				control.appendChild(div);
				//control.innerHTML = control.innerHTML + content;
				// 在这里添加事件
				that.addFunctiong();
			}
			
			this.addFunctiong = function() {
				if (!mediatorsInfo.fake) {
					var mediator = document.getElementsByClassName("control")[0];
					var command = document.getElementById("command" + mediatorsInfo.id);
					var commandBtn = command.getElementsByTagName("button");
					var ship = document.getElementById("no" + mediatorsInfo.shipId);
					commandBtn[0].onclick = function() {
						mediatorsInfo.connect.setClear(true);
						mediatorsInfo.connect.setRunning();
						console.log(mediatorsInfo.connect.getId());
					}
					commandBtn[1].onclick = function() {
						mediatorsInfo.connect.setClear(true);
						mediatorsInfo.connect.setPause();
						console.log(mediatorsInfo.connect.getId());
					}
					commandBtn[2].onclick = function() {
						console.log(mediatorsInfo);
					}
				}
			}
		} 
		
		return Mediators;
	})(window);
	
	// 非常注意的一点就是，千万不要改变按钮
	var newBtn = document.getElementsByClassName("mediator")[0].getElementsByTagName("button")[0];
	newBtn.onclick = function() {
		console.log("hi");
		
		var newSpaceship = new Spaceship();
		newSpaceship.deliverId();	console.log(newSpaceship.getId());
		newSpaceship.newHTML();
		
		var newMediator = new Mediators();
		newMediator.deliverId(); console.log(shipsForMediator);
		newMediator.newHTML();
		// 联系起来
		console.log(newSpaceship.getId())
		newMediator.connectTo(newSpaceship);
		
		ships.push(newSpaceship);
		medis.push(newMediator);
		
		//refreshEvent();
		console.log(ships);
		for (var i = 0; i < ships.length; i++) {
			console.log(ships[i].getId());
		}
	}
	
	var one = new Spaceship();
	one.deliverId();
	var dws = new Spaceship();
	dws.deliverId();
	console.log(one.getId());
	console.log(dws.getId());
	console.log(shipsInUniverse);
	//one.energyCounting();
	/*
	document.onclick = function() {
		one.setClear(true);
		one.setRunning();
	}
	*/
	document.onclick = function() {
		/*one.setClear(true);
		one.setRunning();*/
	}
	
})();



