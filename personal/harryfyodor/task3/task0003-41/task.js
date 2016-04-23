(function() {
    // 日历所需要的详细信息
    var dateInfo = {
        month : Number((new Date()).getMonth()),
        year : Number((new Date()).getFullYear()),
        getTheMonth : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"
        ,"AUG", "SEP", "OCT", "NOV", "DEC"],
        getWeekString : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    };
    var getDaysOfMonth = [31, febDays(dateInfo.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    //　返回这个月一号星期几
    function firstDayOfMonth(mon, year) {
        return (new Date(year + ", " + (mon + 1) + ", " + 1)).getDay();
    }
    
    // 返回二月份的天数
    function febDays(year) {
        if ((year%4 === 0 && year%100 !== 0)||(year%400 === 0)) {
            return 29;
        } else {
            return 28;
        }
    }
    
    // 渲染日历的dom
    function display(mon, year) {
        var ihtml = document.getElementsByTagName("table")[0];
        var eachLines = "",
            wholeMonth = "",
            weekDay = firstDayOfMonth(Number(mon), Number(year)),
            daysNum = getDaysOfMonth[mon];
            
        var selectYear = document.getElementsByTagName("select")[0];
        var selectMon = document.getElementsByTagName("select")[1];
        if (selectMon.value !== mon) {
            selectMon.selectedIndex = mon;
        }
        if (selectYear.selectedIndex !== Number(year - 2016)) {
            selectYear.selectedIndex = Number(year - 2016);
        }
        // 空格
        if (weekDay !== 7) {
            for (var i = 0; i < weekDay; i++) {
                eachLines += "<td></td>";
            }
        } else {
            weekDay = 0;
        }
        
        for (var j = 1; j < daysNum + 1; j++) {
            eachLines += "<td>" + j + "</td>"; 
            weekDay++;
            if (weekDay === 7 || j === daysNum) {
                wholeMonth = wholeMonth + "<tr>" + eachLines + "</tr>";
                eachLines = "";
                weekDay = 0;
            }
        }
        
        ihtml.innerHTML = '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr>' + wholeMonth;
        refresh();
    }
    
    // 两个选择框
    function select() {
        var selectYear = document.getElementsByTagName("select")[0];
        var selectMon = document.getElementsByTagName("select")[1];
        var year = selectYear.value, mon = selectMon.selectedIndex;
        selectYear.onclick = function() {
            year = selectYear.value;
            display(mon, year);
        }
        selectMon.onclick = function() {
            mon = selectMon.value;
            display(mon, year);
        }
    }
    
    // 左右箭头
    function arrow() {
        var left = document.getElementsByClassName("cal-head")[0].getElementsByTagName("div")[0];
        var right = document.getElementsByClassName("cal-head")[0].getElementsByTagName("div")[1];
        var selectYear = document.getElementsByTagName("select")[0];
        var selectMon = document.getElementsByTagName("select")[1];
        var year = selectYear.value, mon = selectMon.selectedIndex;
        // 按向左
        left.onclick = function() {
            if (selectMon.selectedIndex === 0) {
                if (selectYear.selectedIndex === 0) {
                    console.log("Out of range");
                } else {
                    selectMon.selectedIndex = 11;
                    mon = 11;
                    selectYear.selectedIndex--;
                    year--;
                }
            } else {
                selectMon.selectedIndex--;
                mon = selectMon.selectedIndex;
            }
            display(mon, year);
        }
        // 按向右
        right.onclick = function() {
            if (selectMon.selectedIndex === 11) {
                if (selectYear.selectedIndex === 4) {
                    console.log("Out of range");
                } else {
                    selectMon.selectedIndex = 0;
                    mon = 0;
                    selectYear.selectedIndex++;
                    year++;
                }
            } else {
                selectMon.selectedIndex++;
                mon = selectMon.selectedIndex;
            }
            display(mon, year);
        }
    }
    
    function refresh() {
        var tds = document.getElementsByTagName("td");
        var now = new Date();
        var selectYear = document.getElementsByTagName("select")[0].value;
        var selectMon = document.getElementsByTagName("select")[1].selectedIndex;
        for (var i = 0, len = tds.length; i < len; i++) {
            if (tds[i].innerHTML !== "" && 
            (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))) >= now )  {
                // 绑定点击返回事件，经过时的色彩变化
                tds[i].onmouseover = (function(i) {
                    return function() {
                        tds[i].className = "active";
                    };
                })(i);
                tds[i].onmouseout = (function(i) {
                    return function() {
                        tds[i].className = "";
                    };
                })(i);
                // 点击日期时候的变化
                tds[i].onclick = (function(i) {
                    var clickDate = (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML)));
                    return function() {
                        chosen(clickDate);
                    }
                })(i);
            } 
            if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))) < now){
                // 绑定类，颜色变化
                tds[i].className = "nonactive";
            } else {
                // 空的，没有变化
            }
        }
    }
    
    function initCal(){
        display(dateInfo.month, dateInfo.year);
        select();
        arrow();
        refresh();
        showCal();
        calendarShow();
    }
    
    function chosen(d) {
        var inputCal = document.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
        var content = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();
        var container = document.getElementsByClassName("container")[0];
        inputCal.value = content;
        container.style.display = "none";
        alert(d);
    }
    
    function showCal() {
        var inputCal = document.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
        var btn1 = document.getElementsByClassName("form-cal")[0].getElementsByTagName("button")[0];
        var container = document.getElementsByClassName("container")[0];
        
        btn1.onclick = function() {
            if (container.style.display === "block"){
                container.style.display = "none";
            } else {
                container.style.display = "block";
            }
        }

    }
    
    function calendarShow() {
        var inputCal = document.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
        var container = document.getElementsByClassName("container")[0];
        inputCal.onclick = function() {
            if (container.style.display === "block"){
                container.style.display = "none";
            } else {
                container.style.display = "block";
            }
        }
    }
    
    window.onload = function() {
        initCal();
    }
    
})();