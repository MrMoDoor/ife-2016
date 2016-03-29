requirejs(["Spaceship", "Manager"], function(S, M){
console.log(S);
(function(){
	var consoleStage = document.getElementsByClassName("console")[0].getElementsByTagName("div")[0]; // 控制台的位置	
	var shipsInUniverse = S.shipsInUniverse;
	var shipsForManager = M.shipsForManager;
	var Spaceship = S.Spaceship;
	var Manager = M.Manager;
	
	// 非常注意的一点就是，千万不要改变按钮
	var newBtn = document.getElementsByClassName("manager")[0].getElementsByTagName("button")[0];
	newBtn.onclick = function() {
		if (shipsForManager.length < 4 && shipsInUniverse.length < 4) {
			// 飞船的新建
			var newSpaceship = new Spaceship();
			newSpaceship.deliverId();	
			newSpaceship.newHTML();
			// 控制台的新建
			var newManager = new Manager();
			newManager.deliverId(); console.log(shipsForManager);
			newManager.newHTML();
			// 联系起来
			newManager.connectTo(newSpaceship);
			newSpaceship.setCommandId(newManager.getId());
			// 能量计数启动
			newSpaceship.energyCounting();
			// 控制台显示
			consoleStage.innerHTML += '<p style="color:#1D4ED6;">Spaceship no' + newSpaceship.getId() + ' has been built.</p>'; 
			consoleStage.scrollTop = consoleStage.scrollHeight;
		} else {
			consoleStage.innerHTML += '<p style="color:red;">Spaceships have been up to the maximum!</p>'; 
			consoleStage.scrollTop = consoleStage.scrollHeight;
		}
	}	
})();
	
	
	
})





