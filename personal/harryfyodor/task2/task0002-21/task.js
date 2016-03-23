// 写于2016/3/23 by harryfyodor

// 存放两组tag的数组
var data = {
	"tags-1" : [],
	"tags-2" : []
}

// 第一个事件的开始函数，回车，逗号，空格事件
function keyEvent() {
	var input = document.getElementById("tags-first").getElementsByTagName("input")[0];
	var content = "";
	input.onkeydown = function() {
		var e = arguments[0] || window.event;
		content = input.value;
		content = content.trim();
		if (content != "") {
			// 点击了回车键
			if (e.keyCode == 13) {
				content = input.value;
				keyEventHandle(content);
				content = "";
				input.value = "";
				return false;
			} else if (e.keyCode == 32) {
				// 点击了空格键
				event.returnvalue=false;
				content = input.value;
				keyEventHandle(content);
				content = "";
				input.value = "";
				return false;
			} else if (e.keyCode === 188){
				// 点击了逗号键
				content = content.replace(/[,\uff0c]+/g,"");
				keyEventHandle(content);
				content = "";
				input.value = "";
				return false; // 避免残留，不刷新
			}
		}
	}
	// 防止无意义的刷新
	var label = document.getElementById("tags-first");
	label.onkeydown = function() {
		var e = arguments[0] || window.event;
		if (e.keyCode == 13) {
			return false;
		}
	}
}

// 按键处理函数
function keyEventHandle(content) {
	var displayArea = document.getElementById("tags-display-first");
	handleData(content, 1);
	renderTags(displayArea, data["tags-1"], 1);
}

// 数据处理函数
// 要加入data的内容，编号
function handleData(content, index) {
	var identify = true;
	content = content.trim();
	if (content != "" && content.search(",") == -1 && content.search("，") == -1){
		// 不重复
		for (var j = 0; j < data["tags-" +　index].length; j++) {
			if (content == data["tags-" +　index][j]) {
				identify = false;
				break;
			}
		}
		if (identify) {
			data["tags-" +　index].push(content);	
		}
		if (data["tags-" +　index].length > 10) {
			data["tags-" +　index].shift();
		}
	}
}

// 渲染tags
// 输入变量为输出的元素，输出的数据，输出的是第一组还是第二组tags
function renderTags(displayArea, data, index) {
	displayArea.innerHTML = "";
	for (var i = 0; i < data.length; i++) {
		displayArea.innerHTML = displayArea.innerHTML + '<span class="tags-' + index + '">' + data[i] + '</span>';
	}
	deleteTags(displayArea, data, index);
}

// 添加事件给每一个tags
// 输入变量为输出的元素，以及输出的数据
function deleteTags(displayArea, data, index) {
	//var tags1Parent = document.getElementById("tags-display-first");
	// 移动鼠标到目标处tags1
	displayArea.onmouseover = function() {
		var e = arguments[0] || window.event;
		target = e.srcElement ? e.srcElement : e.target;
		if (target.tagName.toLowerCase() == "span" ) {
			target.innerHTML = "点击删除 " + target.innerHTML;
		}
	}
	// 把鼠标移出目标tags
	displayArea.onmouseout = function() {
		var e = arguments[0] || window.event;
		target = e.srcElement ? e.srcElement : e.target;
		if (target.tagName.toLowerCase() == "span") {
			target.innerHTML.replace("点击删除 ", "");
			renderTags(displayArea, data, index);
		} 
	}
	
	// 删除tags
	displayArea.onclick = function() {
		var e = arguments[0] || window.event;
		target = e.srcElement ? e.srcElement : e.target;
		var ele = target.innerHTML.replace("点击删除 ", "");
		if (target.tagName.toLowerCase() == "span") {
			data.splice(data.indexOf(ele), 1);
			renderTags(displayArea, data, index);
		}
	}
}

function btnEvent() {
	var btn = document.getElementById("tags-second").getElementsByTagName("button")[0];
	btn.onclick = function() {
		btnEventHandle();
		return false;
	}
}

function btnEventHandle() {
	var textarea = document.getElementsByTagName("textarea")[0];
	var displayArea = document.getElementById("tags-display-second");
	var text = textarea.value;
	
	text = text.replace(/[,\.\s\n\t\u3000\uff0c\u3001\u0020\u3002]+/g, " ");
	text.trim();
	var textArray = text.split(" ");
	console.log(textArray);
	
	for (var i = 0; i < textArray.length; i++) {
		handleData(textArray[i], 2)
		renderTags(displayArea, data["tags-2"], 2);
	}
	
}

keyEvent();
btnEvent();
