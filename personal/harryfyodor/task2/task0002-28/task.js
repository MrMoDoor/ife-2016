(function(){
	var shipsInUniverse = [], // 用于装在宇宙中的飞船的id
		shipsForMediator = []; // 用于装载控制台的id
	var consoleStage = document.getElementsByClassName("console")[0].getElementsByTagName("div")[0]; // 控制台的位置
		
	// 定义飞船的模型
	var Spaceship = (function(window, undefined){
		
		// 飞船的私有变量
		function Spaceship() {
			this.id = 0;
			this.commandId = -1;
			this.energy = 100;
			this.status = "pause";
			this.clear = false;
		}
		
		// 飞船的方法
		Spaceship.prototype = {
			// 设置真实的id，自动分配id，自动补全
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
			
			// 返回当前的飞船飞行状态
			returnStatus : function() {
				return this.status;
			},

			// 清除定时器 c为bool值，用于在定时器中循环是判断退出的条件。
			setClear : function(c) {
				this.clear = c;
			},
			
			// 自爆
			destory : function(){
				shipsInUniverse.splice(shipsInUniverse.indexOf(this.id), 1);
				this.id = -1;
				this.commandId = -1;
				delete this.prototype;
				this.setClear(true);
				delete this;
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
			
			// 最关键的部分，设置定时器
			energyCounting : function() {
				console.log(this.energy);
				console.log(this.status);
				var that = this;
				
				var energyUpdating = setInterval(function(){

					if (that.energy === 0 && that.status === "running") {
						that.status = "pause";
						that.setPause();
					} else if (that.energy === 100 && that.status === "pause") {
						that.energy = 100;
					} else if (that.status === "running") {
						that.energy = that.energy - 2;
					} else if (that.status === "pause") {
						that.energy = that.energy + 2;
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
			// 自动分配控制台的id值，自动补全。
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
			
			// 获取控制台的id
			getId : function() {
				return this.id;
			},
			
			// 联系控制台和飞船的接口。
			connectTo : function(spaceship) {
				this.connect = spaceship;
				this.shipId = spaceship.getId();
				console.log(this.shipId);
			},
			
			// 返回控制台所控制的飞船。
			spaceship : function(){
				return this.connect;
			},
			
			// 控制台的dom操作，非常恶心。
			newHTML : function(){
				var control = document.getElementsByClassName("control")[0];
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
				this.addFunctiong();
			},
			
			// 给控制台按钮新增事件
			addFunctiong : function() {
				var that = this;
				if (!this.fake) {
					var mediator = document.getElementsByClassName("control")[0];
					var command = document.getElementById("command" + this.id);
					var commandBtn = command.getElementsByTagName("button");
					var ship = document.getElementById("no" + this.shipId);
					commandBtn[0].onclick = function() {
						var i = 0;
						consoleStage.innerHTML += '<p style="color:#1D4ED6;">LOADING...</p>'
						var delay = setInterval(function(){
							// donothing
							i++;
							console.log("waste time" + i);
							if (i == 5) {
								(function(){
									var rand = Math.random()*10;
									if (rand <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>'
									} else {
										that.connect.setClear(true);
										that.connect.setRunning();
										console.log(that.connect.getId());
									}
								})();
								clearInterval(delay);
							}
						},200);
						
					}
					commandBtn[1].onclick = function() {
						var j = 0;
						consoleStage.innerHTML += '<p style="color:#1D4ED6;">LOADING...</p>'
						var delay2 = setInterval(function(){
							// donothing
							j++;
							console.log("waste time" + j);
							if (j == 5) {
								(function(){
									var rand2 = Math.random()*10;
									if (rand2 <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>'
									} else {
										that.connect.setClear(true);
										that.connect.setPause();
										console.log(that.connect.getId());
									}
								})();
								clearInterval(delay2);
							}
						},200);
						
						
						
					}
					commandBtn[2].onclick = function() {
						var k = 0;
						consoleStage.innerHTML += '<p style="color:#1D4ED6;">LOADING...</p>'
						var delay3 = setInterval(function(){
							// donothing
							k++;
							console.log("waste time" + k);
							if (k == 5) {
								(function(){
									var rand = Math.random()*10;
									if (rand <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>'
										} else {
											// 删除编号
										for (var i = 0; i < shipsInUniverse.length; i++) {
										if (shipsInUniverse[i] == that.connect.id) {
											shipsInUniverse.splice(i, 1);
											}
										}
										for (var j = 0; j < shipsForMediator.length; j++) {
											if (shipsForMediator[j] == that.id) {
											shipsForMediator.splice(j, 1);
											}
										}
										consoleStage.innerHTML += '<p style="color:#D88427;">Spaceship no' + that.connect.getId() + ' has been destoryed.</p>'; 
						
										// 设置id为-1，使之无法占用一个编号。
										var mediaterId = that.id;
										that.id = -1;
										var spaceshipId = that.connect.getId();
										that.connect.destory();
							
											// 删除对应的dom
										var deleteMediater = document.getElementById("command" + 	mediaterId);
										delete that.connect; delete this; delete that;
										deleteMediater.parentNode.removeChild(deleteMediater);
							
										var deleteSpaceship = document.getElementById("no" + spaceshipId);
										deleteSpaceship.parentNode.removeChild(deleteSpaceship);
						
										// 控制台显示最后
										consoleStage.scrollTop = consoleStage.scrollHeight;
										}
									})();
								
								clearInterval(delay3);
							}
						},200);
					}
				}
			}
		} 
		return Mediators;
	})(window);
	
	// 非常注意的一点就是，千万不要改变按钮
	var newBtn = document.getElementsByClassName("mediator")[0].getElementsByTagName("button")[0];
	newBtn.onclick = function() {
		if (shipsForMediator.length < 4 && shipsInUniverse.length < 4) {
			// 飞船的新建
			var newSpaceship = new Spaceship();
			newSpaceship.deliverId();	
			newSpaceship.newHTML();
			// 控制台的新建
			var newMediator = new Mediators();
			newMediator.deliverId(); console.log(shipsForMediator);
			newMediator.newHTML();
			// 联系起来
			newMediator.connectTo(newSpaceship);
			newSpaceship.setCommandId(newMediator.getId());
			// 能量计数启动
			newSpaceship.energyCounting();
			// 控制台显示
			consoleStage.innerHTML += '<p style="color:#1D4ED6;">Spaceship no' + newSpaceship.getId() + ' has been built.</p>'; 
			consoleStage.scrollTop = consoleStage.scrollHeight;
		} else {
			consoleStage.innerHTML += '<p style="color:red;">Spaceships have been up to the maximum!</p>'; 
		}
	}	
})();



