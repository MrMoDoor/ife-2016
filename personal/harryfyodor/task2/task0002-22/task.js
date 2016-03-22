/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


function getCityName(index) {
  switch(index) {
    case 1:
      return "北京";
      break;
    case 2:
      return "上海";
      break;
    case 3:
      return "广州";
      break;
    case 4:
      return "深圳";
      break;
    case 5:
      return "成都";
      break;
    case 6:
      return "西安";
      break;
    case 7:
      return "福州";
      break;
    case 8:
      return "厦门";
      break;
    case 9:
      return "沈阳";
      break;
    default:
      return "错误";
      break;
  }
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 1,
  nowGraTime: "day"
}

// 记录之前的表单选项
var oldPageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var graTime = pageState.nowGraTime;
  var content = "";
  var display = document.getElementsByClassName("aqi-chart-wrap")[0];
  initAqiChartData();
  console.log(chartData);
  for (date in chartData) {
    var color = "";
    var number = chartData[date];
    
    if (number >= 400) {
      color = "black";
    } else if (number >= 300) {
      color = "purple";
    } else if (number >= 200) {
      color = "red";
    } else if (number >= 100) {
      color = "blue";
    } else {
      color = "green";
    }
    content += '<div class="' + color + ' ' + graTime + '"' +'style="height:' + number + 'px' + '"' + ' ' + 'title=' + '"' + '空气质量：' + number + '"' + '"></div>';
  }
  display.innerHTML = content;
  content = "";
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var gras = document.getElementById("form-gra-time").getElementsByTagName("input");
  var graValue = "";
  for (var i = 0, len = gras.length; i < len; i++) {
    if (gras[i].checked == true) {
      graValue = gras[i].value;
      break;
    }
  }
  if (graValue != oldPageState.nowGraTime) {
    pageState.nowGraTime = graValue;
  }
  // 设置对应数据
  oldPageState.nowGraTime = graValue;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var selects = document.getElementById("city-select");
  var index = selects.selectedIndex;
  console.log(index);
  // 设置对应数据
  if (oldPageState.nowSelectCity != pageState.nowSelectCity) {
    pageState.nowSelectCity = index + 1;
  }
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var inputs = document.getElementById("form-gra-time").getElementsByTagName("input");
  for (var i = 0; i < 3; i++) {
    inputs[i].onclick = (function(){
      return function(){
        graTimeChange();
      }
    })(i);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selects = document.getElementById("city-select");
  selects.onclick = function() {
    citySelectChange();
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var cityName = getCityName(pageState.nowSelectCity);
  var cityWeather = aqiSourceData[cityName];
  var weekTotal = 0, weekCount = 1, i = 1;
  var monthTotal = 0, monthCount = 1, j = 1;
  if (pageState.nowGraTime == "day") {
    chartData = {};console.log(cityWeather);
    for (date in cityWeather) {
      chartData[date] = cityWeather[date];
    }
  } else if (pageState.nowGraTime == "week") {
    /*while (i <= 92) {
      weekTotal += weekTotal + cityWeather[date];
      i++;
      if (i % 7 == 0) {
        chartData["week" + weekCount] = weekTotal/7;
        weekCount++;
        weekTotal = 0;
      }
    }*/
    chartData = {};console.log(cityWeather);
    for (date in cityWeather) {
      weekTotal = weekTotal + cityWeather[date];
      if (i % 7 == 0) {
        chartData["week" + weekCount] = weekTotal/7;
        weekCount++;
        weekTotal = 0;
      }
      i++;
    }
  } else if (pageState.nowGraTime == "month") {
    chartData = {};console.log(cityWeather);
    for (date in cityWeather) {
      monthTotal = monthTotal + cityWeather[date];
      if(j == 31) {
        chartData["month1" + monthCount] = monthTotal/31;
        monthCount++;
        monthTotal = 0;
      } else if (j == 60) {
        chartData["month2" + monthCount] = monthTotal/29;
        monthCount++;
        monthTotal = 0;
      } else if (j == 91) {
        chartData["month3" + monthCount] = monthTotal/31;
        monthCount++;
        monthTotal = 0;
      }
      j++;
    }
  }
}

/**
 * 初始化函数
 */
function init() {renderChart();graTimeChange();
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
