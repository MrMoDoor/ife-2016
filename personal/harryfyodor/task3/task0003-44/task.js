(function(){
	
	var data = {
		"imgs":
		[
			{"src":"img1.jpg", "info":"好看的图片1"},
			{"src":"img2.jpg", "info":"好看的图片2"},
			{"src":"img3.jpg", "info":"好看的图片3"},
			{"src":"img4.jpg", "info":"好看的图片4"},
			{"src":"img5.jpg", "info":"好看的图片5"},
			{"src":"img2.jpg", "info":"好看的图片2"},
			{"src":"img7.jpg", "info":"好看的图片7"},
			{"src":"img8.jpg", "info":"好看的图片8"},
			{"src":"img9.jpg", "info":"好看的图片9"},
			{"src":"img1.jpg", "info":"好看的图片1"},
			{"src":"img2.jpg", "info":"好看的图片2"}
		] 
	};
	
	var	showBig = function() {
		var container = document.getElementsByClassName("container")[0];
		container.onclick = function(e) {
			e = window.event || e;
			var target = e.target || event.srcElement;
			console.log(target.tagName);
			if (target.tagName.toLowerCase() === "img") {
				// dom建立遮罩层
				var scrollTop = document.body.scrollTop || document.documentElement.offsetTop;
				var darken = document.createElement("div");
				darken.setAttribute("class", "darken");
				darken.style.top = scrollTop + "px";
				// 新建图片
				var imgSrc = target.src;
				var nImg = document.createElement("img");
				nImg.src = imgSrc;
				nImg.setAttribute("alt", "img");
				// 新建遮罩层
				var nDiv = document.createElement("div");

				darken.appendChild(nDiv);
				darken.appendChild(nImg);
				document.body.appendChild(darken);
				document.body.style.overflow = "hidden";
				re();
			}
		}
	}
	
	var re = function() {
		var container = document.getElementsByClassName("container")[0];
		if (document.getElementsByClassName("darken")) {
			var darken = document.getElementsByClassName("darken")[0];
			var darkenDiv = darken.getElementsByTagName("div")[0];
			var darkenImg = darken.getElementsByTagName("img")[0];
			darkenDiv.onclick = function() {
				darken.parentNode.removeChild(darken);
				document.body.style.overflow = "auto";
			}
		}
	}
	
	// 滚动动态加载
	var activeAdd = function() {
		var contaienr = document.getElementsByClassName("container")[0];
		window.onscroll = function() {
			for (var i = 0, len = data.imgs.length; i < len; i++){
				if (checkScroll()) {
					var nBox = document.createElement("div");
					nBox.setAttribute("class", "box");
					var nPic = document.createElement("div");
					nPic.setAttribute("class", "picture");
					var nImg = document.createElement("img");
					nImg.src = "img/" + data.imgs[i]["src"];
					nImg.alt = "img";
					var nDes = document.createElement("div");
					nDes.setAttribute("class", "description");
					var np = document.createElement("p");
					var npInfo = document.createTextNode(data.imgs[i]["info"]);
					np.appendChild(npInfo);
					nDes.appendChild(np);
					nPic.appendChild(nImg);
					nPic.appendChild(nDes);
					nBox.appendChild(nPic);
					contaienr.appendChild(nBox);
				}
			}
			waterfall();
		}
		
	}
	
	
	// 瀑布流布局
	var waterfall = function() {
		var container = document.getElementsByClassName("container")[0];
		var boxes = document.getElementsByClassName("box");
		var wid = boxes[0].offsetWidth;
		var documentW = document.documentElement.clientWidth;
		var num = Math.floor(document.documentElement.clientWidth/wid);
		container.style.width = num * wid + "px";
		container.style.marginLeft = Math.floor((documentW - parseInt(container.style.width))/2) + "px";
		//container.style.margin = "0 auto";
		var heights = [];
		
		for (var i = 0, len = boxes.length; i < len; i++) {
			if (i < num) {
				// 第一行的高度塞进去
				heights.push(boxes[i].offsetHeight);
			} else {
				// 获取高度最低的哪一行的index
				var minHeight = Math.min.apply(null, heights);
				var indexOfMinH = findMinH(heights, minHeight);
				// 设置第二行元素的正确位置
				boxes[i].style.position = "absolute";
				boxes[i].style.top = minHeight + "px";
				boxes[i].style.left = indexOfMinH * wid + "px";
				// 更新数组
				heights[indexOfMinH] += boxes[i].offsetHeight;
			}
		}
	};
	
	// 找出数组中最小值的索引
	var findMinH = function(heights, minHeight) {
		for (var i = 0; i < heights.length; i++){
			if (heights[i] === minHeight) {
				return i;
			}
		}
	};
 
	// 
	var checkScroll = function() {
		var container = document.getElementsByTagName("contaienr")[0];
		var boxes = document.getElementsByClassName("box");
		// 获取最后一个元素的信息
		var lastBoxHeight = boxes[boxes.length - 1].offsetTop + Math.floor(boxes[boxes.length - 1].offsetHeight/2);
		var scrollTop = document.body.scrollTop || document.documentElement.offsetTop;
		var documentH = document.documentElement.clientHeight;
		return lastBoxHeight < scrollTop + documentH;
	}
	
 	waterfall();
	activeAdd();
	showBig();
})();