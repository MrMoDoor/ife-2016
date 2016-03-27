(function(){
	var shipsInUniverse = [],
		shipsForMediator = [],
		ships = [],
		medis = [];
		
	// 定义飞船的模型
	var Spaceship = (function(window, undefined){
		
		// 飞船的私有变量
		function Spaceship() {
			this.id = 0;
			this.commandId = 0;
			this.energy = 10;
			this.status = "running";
			this.clear = false;
		}
		
		// 飞船的方法
		Spaceship.prototype = {
			// 设置真实的id，自动分配id
			deliverId : function() {
				if (shipsInUniverse.length === 0) {
					this.id = 0;
					shipsInUniverse.push(this.id);
					shipsInUniverse.sort();
				} else {
					for (var i = 0, len = shipsInUniverse.length; i < len; i++) {
						if (i != shipsInUniverse[i]) {
							this.id = i;
							shipsInUniverse.push(this.id);
							shipsInUniverse.sort();
							break;
						} else if (i == len - 1) {
							this.id = len;
							shipsInUniverse.push(this.id);
							shipsInUniverse.sort();
							break;
						}
					}
				}
			},
			
			
			// 函数中调用函数
			//var that = this;
			
			getId : function() {
				return this.id;
			},
			
			setPause : function() {
			
				var ship = document.getElementById("no" + this.id);
				
				if(ship.className.indexOf("running")) {
					ship.className = ship.className.replace("running", "");
				}
				if(ship.className.indexOf("pause") === -1) {
					ship.className = ship.className + "pause";
				}
				
				console.log(ship.className);
				this.status = "pause";
				this.clear = false;
			},
			
			setRunning : function() {
				
				var ship = document.getElementById("no" + this.id);
				
				if(ship.className.indexOf("running") === -1) {
					ship.className = ship.className + "running";
				}
				if(ship.className.indexOf("pause")) {
					ship.className = ship.className.replace("pause", "");
				}
				
				this.status = "running";
				this.clear = false;
			},
			
			returnStatus : function() {
				return this.status;
			},

			// 清除定时器 c为bool值
			setClear : function(c) {
				this.clear = c;
			},
			/*
			destory : function() {
				this.id = 222;
				that = {};
				delete that;
			}*/
			
			newHTML : function() {
				var universe = document.getElementsByClassName("universe")[0];
				//var content = '<div class="spaceship pause"' + 'id=' + '"' + 'no' + spaceshipthis.id + '"' + '><div class="energy"></div></div>';
				//universe.innerHTML = universe.innerHTML + content;
				var div = document.createElement("div");
				div.setAttribute("class", "spaceship pause");
				div.setAttribute("id", "no" + this.id);
				var div2 = document.createElement("div");
				div2.setAttribute("class", "energy");
				div.appendChild(div2);
				universe.appendChild(div);
				// return content;
			},
			
			// 最关键的部分
			energyCounting : function() {
				console.log(this.energy);
				console.log(this.status);
				var that = this;
				
				var energyUpdating = setInterval(function(){
					
					console.log(that.energy);
					console.log(that.status);
					
					if (that.energy === 0 && that.status === "running") {
						that.status = "pause";
					} else if (that.energy === 10 && that.status === "pause") {
						that.energy = 10;
					} else if (that.status === "running") {
						that.energy = that.energy - 1;
					} else if (that.status === "pause") {
						that.energy = that.energy + 1;
					}
					if (that.clear) {
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
		function Mediators() {
			this.id = 0;
			this.shipId = 0;
			this.fake = false;
			this.connect = new Spaceship();
		}
		
		Mediators.prototype =  {
			
			deliverId : function() {
				if (shipsForMediator.length === 0) {
					this.id = 0;
					shipsForMediator.push(this.id);
				} else {
					for (var i = 0, len2 = shipsForMediator.length; i < len2; i++) {
						if (i != shipsForMediator[i]) {
							this.id = i;
							shipsForMediator.push(this.id);
							shipsForMediator.sort();
							break;
						} else if (i == len2 - 1) {
							this.id = len2;
							shipsForMediator.push(this.id);
							shipsForMediator.sort();
							break;
						}
					}
				}
			},
			
			getId : function() {
				return this.id;
			},
			
			connectTo : function(spaceship) {
				this.connect = spaceship;
				this.shipId = spaceship.getId();
				console.log(this.shipId);
			},
			
			spaceship : function(){
				return this.connect;
			},
			
			newHTML : function(){
				var control = document.getElementsByClassName("control")[0];
				//var content = '<div id="command' + mediatorsInfo.id + '"><label>Spaceship no.' + mediatorsInfo.id + '</label><button>Set off</button><button>Stop</button><button>Disposal</button><label>100%</label></div>';
				// 恶心的dom
				var div = document.createElement("div");
				div.setAttribute("id", "command" + this.id);
				var label1 = document.createElement("label");
				var btn1 = document.createElement("button");
				var btn2 = document.createElement("button");
				var btn3 = document.createElement("button");
				var label2 = document.createElement("label");
				var text0 = document.createTextNode("Spaceship no." + this.id);
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
				this.addFunctiong();
			},
			
			addFunctiong : function() {
				var that = this;
				if (!this.fake) {
					var mediator = document.getElementsByClassName("control")[0];
					var command = document.getElementById("command" + this.id);
					var commandBtn = command.getElementsByTagName("button");
					var ship = document.getElementById("no" + this.shipId);
					commandBtn[0].onclick = function() {
						that.connect.setClear(true);
						that.connect.setRunning();
						console.log(that.connect.getId());
					}
					commandBtn[1].onclick = function() {
						that.connect.setClear(true);
						that.connect.setPause();
						console.log(that.connect.getId());
					}
					commandBtn[2].onclick = function() {
						console.log(that.shipId);
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
	/*
	var one = new Spaceship();
	one.deliverId();
	var dws = new Spaceship();
	dws.deliverId();
	console.log(one.getId());
	console.log(dws.getId());
	console.log(shipsInUniverse);
	one.energyCounting();
	
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



