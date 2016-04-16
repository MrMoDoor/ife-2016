var placing = (function(){
	/*图片接口*/
	var img = [
		["img/img9.jpg"],
		["img/img1.jpg", "img/img2.jpg"], 
		["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"],
		["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg"],
		["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg"],
		["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpeg"],
	];
	
	// 用于判断某一个区域块是否缓存
	var complete = [];
	
	// 处理容器
	var produce = function(imgGroup) {
		complete.push(0);
		var len = imgGroup.length; 
		var content = '<div class="hold-' + len + '">' + '</div>';
		return content;
	}
	
	// 生成容器
	function init() {
		var container = document.getElementsByTagName("div")[0];
		var content = container.innerHTML;
		for (var i = 0, len = img.length; i < len; i++) {
			if (img[i].length <= 6 && img[i].length >= 1) {
				content += produce(img[i]);
			} else {
				console.log("Only 1~6 pictures are permitted!");
			}
		}
		container.innerHTML = content;  
	}
	
	
	// 通过滚动的位置动态加载
	document.addEventListener("scroll", function(event){
		for (var i = 0, len = complete.length; i < len; i++) {
			// 获取生成的hold
			var hold = document.getElementsByTagName("div")[0].getElementsByTagName("div")[i];
			var content = "";
			// 如果还没有缓存出来
			if (complete[i] === 0 && document.body.scrollTop >= 400*i) {
				complete[i] = 1;
				for (var j = 0; j < img[i].length; j++) {
					console.log(img[i][j]);
					content += '<img src="' + img[i][j] + '" alt="img">';
				}
				hold.innerHTML = content;
				content = "";
			}
		}
	}, false);
	
	//自动加载第一幅图
	function loadFirstImg() {
		complete[0] = 1; 
		var content = "";
		var hold = document.getElementsByTagName("div")[0].getElementsByTagName("div")[0];
		for (var i = 0, len = img[0].length; i < len; i++) {
			content += '<img src="' + img[0][i] + '" alt="img">';
		}
		hold.innerHTML = content;
		console.log(hold)
	}
	
	init();
	loadFirstImg();
	
})();