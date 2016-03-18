function sortByTask(bigTask) {
	var content = [];
	var demos = bigTask.getElementsByTagName("li");
	var len = demos.length;
	var result = "";
	
	for (var i = 0; i < len; i++) {
		content.push(demos[i].innerHTML);
	}

	for (var j = 0; j < 12; j++) {
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
	switch(index) {
		case 0:
			return "任务一";
			break;
		case 1:
			return "任务二";
			break;
		case 2:
			return "任务三";
			break;
		case 3:
			return "任务四";
			break;
		case 4:
			return "任务五";
			break;
		case 5:
			return "任务六";
			break;
		case 6:
			return "任务七";
			break;
		case 7:
			return "任务八";
			break;
		case 8:
			return "任务九";
			break;
		case 9:
			return "任务十";
			break;
		case 10:
			return "任务十一";
			break;
		case 11:
			return "任务十二";
			break;
		default:
			return "ERROR";
			break;
	}
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