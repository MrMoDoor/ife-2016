define(function(){
	// 要暴露出去的模块有shipsInUniverse 以及 Spaceship
	
	var shipsInUniverse = []; // 用于装在宇宙中的飞船的id
	var consoleStage = document.getElementsByClassName("console")[0].getElementsByTagName("div")[0]; // 控制台的位置	
	
	var Spaceship = (function(window, undefined){
	
		// 飞船的私有变量
		function Spaceship() {
			this.id = 0;
			this.commandId = -1;
			this.energy = 100;
			this.status = "pause";
			this.clear = false;
			this.recovery = 3;
			this.speed = 5;
			this.cost = 2;
		}
		
		// 飞船的方法
		Spaceship.prototype = {
			// 设置真实的id，自动分配id，自动补全
			deliverId : function() {
				if (shipsInUniverse.length === 0) {
					this.id = 0;
					shipsInUniverse.push(this.id);
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
			
			// 设置飞船对应的command接口
			setCommandId : function(id) {
				this.commandId = id;
			},
			
			// 用于设置飞船id
			getId : function() {
				return this.id;
			},
			
			// 控制飞船的暂停
			setPause : function() {
				// 控制台显示
				this.clear = true;
				consoleStage.innerHTML += '<p style="color:#1D4ED6;">Spaceship no' + this.id + ' has stoped.</p>';
				consoleStage.scrollTop = consoleStage.scrollHeight;
				
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
			
			// 控制飞船的起飞
			setRunning : function() {
				// 控制台
				this.clear = true;
				consoleStage.innerHTML += '<p style="color:#1D4ED6;">Spaceship no' + this.id + ' has been running.</p>';
				consoleStage.scrollTop = consoleStage.scrollHeight;
				
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
			
			// 设置speed和recovery
			setInfo: function(speed, recovery, cost) {
				this.speed = speed;
				this.recovery = recovery;
				this.cost = cost;
				var spaceship = document.getElementById("no" + this.getId());
				spaceship.style.animationDuration = this.speed + "s"; 
			},
			
			// 返回当前的飞船飞行状态
			returnStatus : function() {
				return this.status;
			},

			// 自爆
			destory : function(){
				var info = document.getElementById("info" + this.id);
				for (var i = 0; i < shipsInUniverse.length; i++) {
					if (shipsInUniverse[i] === this.id) {
						shipsInUniverse.splice(i, 1);
					}
				}
				this.id = -1;
				this.commandId = -1;
				delete this.prototype;
				this.clear = true;
				delete this;
				info.innerHTML = "";
			},
			
			// 飞船的dom生成
			newHTML : function() {
				var universe = document.getElementsByClassName("universe")[0];
				var div = document.createElement("div");
				div.setAttribute("class", "spaceship pause");
				div.setAttribute("id", "no" + this.id);
				var div2 = document.createElement("div");
				div2.setAttribute("class", "energy");
				var span = document.createElement("span");
				var text = document.createTextNode("100%");
				span.appendChild(text);
				div2.appendChild(span);
				div.appendChild(div2);
				universe.appendChild(div);
			},
			
			// 通过二进制事件选择程序
			order : function(order) {
				if (order === "0001") {
					this.setRunning();
				} else if (order === "0010") {
					this.setPause();
				} else if (order === "0100") {
					this.destory();
				}
			},
			
			// 当前飞船信息
			newIofo : function() {
				var info = document.getElementById("info" + this.id);
				info.innerHTML = "";
				var speed = "", recovery = "";
				
				if (this.speed == 2) {
					speed = "high-speed";
				} else if (this.speed == 5) {
					speed = "average-speed";
				} else {
					speed = "low-speed";
				}
				
				if (this.recovery == 4) {
					recovery = "high-recovery";
				} else if (this.recovery == 3) {
					recovery = "average-recovery";
				} else {
					recovery = "low-recovery";
				}
				
				info.innerHTML = '<p>no' + this.id + '<br>' + speed + '<br>' + recovery + '</p>';
			},
			
			// 最关键的部分，设置定时器
			energyCounting : function() {
				console.log(this.energy);
				console.log(this.status);
				var that = this;
				
				var energyUpdating = setInterval(function(){

					if (that.energy <= 0 && that.status === "running") {
						that.status = "pause";
						that.setPause();
						that.energy = 0;
					} else if (that.energy >= 100 && that.status === "pause") {
						that.energy = 100;
					} else if (that.status === "running") {
						that.energy = that.energy - that.cost;
					} else if (that.status === "pause") {
						that.energy = that.energy + that.recovery;
					}
					
					// 设置能量显示
					if (that.commandId != -1 && that.id != -1) {
						// console栏
						var label = document.getElementById("command" + that.commandId).getElementsByTagName("label")[1];
						var width = document.getElementById("no" + that.id).getElementsByClassName("energy")[0].style.width = that.energy + "%";
						label.innerHTML = that.energy + "%";
						// 飞船
						document.getElementById("no" + that.id).getElementsByTagName("span")[0].innerHTML = that.energy + "%";
					}
					if (that.clear) {
						clearInterval(energyUpdating);
					}
				}, 500);
			}
		}
		
		// 返回函数
		return Spaceship;
	})(window);
	
	return {
		Spaceship : Spaceship,
		shipsInUniverse : shipsInUniverse 
	};
})

