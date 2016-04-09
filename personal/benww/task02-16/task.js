/**
 * Created by BenWwChen on 16/4/8.
 */
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
    var city = document.getElementById("aqi-city-input").value.trim();
    var quality = document.getElementById("aqi-value-input").value.trim();
    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！");
        return;
    }
    if(isNaN(quality)) {
        alert("空气质量指数必须为整数！");
        return;
    }
    aqiData[city] = quality;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    // for creating HTML element
    var tag = "", content = "";
    function createElementWithContent(tag, content) {
        var element = document.createElement(tag);
        element.innerHTML = content;
        return element;
    }

    // get table
    var aqiTable = document.getElementById("aqi-table");
    // clear table
    aqiTable.innerHTML = "";

    // add heading
    var heading = createElementWithContent("tr", "");
    heading.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
    aqiTable.appendChild(heading);

    // render data
    for(var city in aqiData) {
        var cityElement = createElementWithContent("td", city);
        var qualityElement = createElementWithContent("td", aqiData[city]);
        var deleteButton = createElementWithContent("button", "删除");
        deleteButton.setAttribute("value", city);
        var trElement = document.createElement("tr");
        trElement.appendChild(cityElement);
        trElement.appendChild(qualityElement);
        trElement.appendChild(deleteButton);
        aqiTable.appendChild(trElement);
    }
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

function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addButton = document.getElementById("add-btn");
    addButton.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.addEventListener("click", function(event){
        if(event.target.tagName = "button") delBtnHandle(event.target.value);
    });
}

init();
