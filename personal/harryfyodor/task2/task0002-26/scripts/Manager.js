define(function(){
	// 这个模块有三个变量，其中要暴露为shipsForManager,以及Manager
	
	var shipsForManager = []; // 用于装载控制台的id
	var consoleStage = document.getElementsByClassName("console")[0].getElementsByTagName("div")[0]; // 控制台的位置	
	
	var Manager = (function(window, undefined){
		
		// 控制台的私有变量
		function Manager() {
			this.id = 0;
			this.shipId = 0;
			this.fake = false;
			this.connect = new Object();
		}
		
		Manager.prototype =  {
			// 自动分配控制台的id值，自动补全。
			deliverId : function() {
				if (shipsForManager.length === 0) {
					this.id = 0;
					shipsForManager.push(this.id);
				} else {
					for (var i = 0, len2 = shipsForManager.length; i < len2; i++) {
						if (i != shipsForManager[i]) {
							this.id = i;
							shipsForManager.push(this.id);
							shipsForManager.sort();
							break;
						} else if (i == len2 - 1) {
							this.id = len2;
							shipsForManager.push(this.id);
							shipsForManager.sort();
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
					//var mediator = document.getElementsByClassName("control")[0];
					var command = document.getElementById("command" + this.id);
					var commandBtn = command.getElementsByTagName("button");
					var ship = document.getElementById("no" + this.shipId);
					commandBtn[0].onclick = function() {
						var i = 0;
						consoleStage.innerHTML += '<p style="color:#1D4ED6;">LOADING...</p>'
						consoleStage.scrollTop = consoleStage.scrollHeight;
						var delay = setInterval(function(){
							// donothing
							i++;
							console.log("waste time" + i);
							if (i == 5) {
								(function(){
									var rand = Math.random()*10;
									if (rand <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>';
										consoleStage.scrollTop = consoleStage.scrollHeight;
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
						consoleStage.scrollTop = consoleStage.scrollHeight;
						var delay2 = setInterval(function(){
							// donothing
							j++;
							console.log("waste time" + j);
							if (j == 5) {
								(function(){
									var rand2 = Math.random()*10;
									if (rand2 <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>';
										consoleStage.scrollTop = consoleStage.scrollHeight;
										rand2 = Math.random()*10;
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
						consoleStage.scrollTop = consoleStage.scrollHeight;
						var delay3 = setInterval(function(){
							// donothing
							k++;
							console.log("waste time" + k);
							if (k == 5) {
								(function(){
									var rand = Math.random()*10;
									if (rand <= 3) {
										consoleStage.innerHTML += '<p style="color:red;">Your command has been lost!</p>';
										consoleStage.scrollTop = consoleStage.scrollHeight;
										} else {
											// 删除编号
											
										
										for (var j = 0; j < shipsForManager.length; j++) {
											if (shipsForManager[j] == that.id) {
											shipsForManager.splice(j, 1);
											}
										}
										consoleStage.innerHTML += '<p style="color:#D88427;">Spaceship no' + that.connect.getId() + ' has been destoryed.</p>'; 
						
										// 设置id为-1，使之无法占用一个编号。
										var managerId = that.id;
										that.id = -1;
										var spaceshipId = that.connect.getId();
										that.connect.destory();
							
											// 删除对应的dom
										var deleteManager = document.getElementById("command" + 	managerId);
										delete that.connect; delete this; delete that;
										deleteManager.parentNode.removeChild(deleteManager);
							
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
		return Manager;
	})(window);
	
	return {
		Manager : Manager,
		shipsForManager : shipsForManager 
	};
	
})

