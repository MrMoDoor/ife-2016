// 写于1016/3/21 by harryfyodor

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById("aqi-city-input").value;
  var value = document.getElementById("aqi-value-input").value;
  city = city.trim();
  value = value.trim();
  // 只允许有中文或者英文
  if (city.search(/[^a-zA-Z\u4e00-\u9fa5]+/g) == -1) {
    if (value.search(/[^0-9]+/g) == -1){
      aqiData[city] = value;
    } else {
      alert("空气质量指数必须为整数");
    }
  } else {
    alert("输入的城市名必须为中英文字符");
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var len = 0;
  var table = document.getElementById("aqi-table");
  var tableContent = "";
  
  table.innerHTML = "";
  for (city in aqiData) {
    tableContent += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
  }
  table.innerHTML = tableContent;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var deleteThis = target.parentNode.parentNode;
  var table = deleteThis.parentNode;console.log(table);
  var cityname = "";
  for (var i = 0, len = deleteThis.childNodes.length; i < len; i++){
    if(deleteThis.childNodes[i].nodeType == 1) {
      cityname = deleteThis.childNodes[i].innerHTML;
      console.log(cityname);
      break;
    }
  }
  delete aqiData[cityname];
  renderAqiList();
}

function init() {
  
  var btn = document.getElementsByTagName("button")[0];
  var deleteBtns = document.getElementById("aqi-table").getElementsByTagName("button");
  var table = document.getElementById("aqi-table");
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  console.log(btn);
  btn.onclick = function() {
    addBtnHandle();  	  
  }
  
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // 运用事件代理的方法
  table.onclick = function() {
    var e = arguments[0] || window.event;
    target = e.srcElement ? e.srcElement : e.target;
    if (target.tagName.toUpperCase() == "BUTTON") {
      delBtnHandle(target);
    }
    return false;
  }
}

init();