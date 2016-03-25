function sortByTask(bigTask) {
	var content = [];
	var demos = bigTask.getElementsByTagName("li");
	var len = demos.length;
	var result = "";
	
	for (var i = 0; i < len; i++) {
		content.push(demos[i].innerHTML);
	}

	for (var j = 0; j < 49; j++) {
		var taskIndex = getTitle(j);
		for (var k = 0; k < content.length; k++) {
			if (content[k].match(taskIndex) != null) {
				result = result + "<li>" + content[k] + "</li>";
			}
		}
	}
	
	result = result + '<button>按任务排列</button>';
	bigTask.innerHTML = result;
}

function getTitle(index) {
	var tasks = ["任务一：", "任务二：", "任务三：", "任务四：", "任务五：", "任务六：", "任务七：", "任务八：", "任务九：", "任务十：", "任务十一：", "任务十二：", "任务十三：", "任务十四：", "任务十五：", "任务十六：", "任务十七：", "任务十八：", "任务十九：", "任务二十：", "任务二十一：", "任务二十二：", "任务二十三：", "任务二十四：", "任务二十五：", "任务二十六：", "任务二十七：", "任务二十八：", "任务二十九：", "任务三十：", "任务三十一：", "任务三十二：", "任务三十三：", "任务三十四：", "任务三十五：", "任务三十六：", "任务三十七：", "任务三十八：", "任务三十九：", "任务四十：", "任务四十一：", "任务四十二：", "任务四十三：", "任务四十四：", "任务四十五：", "任务四十六：", "任务四十七：", "任务四十八：", "任务四十九："];
	return tasks[index];
}

function main() {
	var btnsSortTask = document.getElementsByTagName("button");
	
	// 闭包代理事件
	for (var i = 0; i < btnsSortTask.length; i++){
		btnsSortTask[i].onclick = (function(i){
			return function(event){
				sortByTask(event.target.parentNode);
			}
		})(i);
	}
}

window.onload = function() {
	main();
}