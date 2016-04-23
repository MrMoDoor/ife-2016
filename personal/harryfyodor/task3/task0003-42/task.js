(function() {
    // 日历所需要的详细信息
    function calendar(id, period, inputNum) {
        this.id = id;
        this.dateInfo = {
            month : Number((new Date()).getMonth()),
            year : Number((new Date()).getFullYear()),
            getTheMonth : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"
            ,"AUG", "SEP", "OCT", "NOV", "DEC"],
            getWeekString : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        };
        this.getDaysOfMonth = [31, this.febDays(this.dateInfo.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.period = period;
        this.container = undefined;
        this.inputNum = inputNum;
        this.choice1 = undefined;
        this.choice2 = undefined;
   };
   
   calendar.prototype = {
       
       // 初始化
       init: function() {
           var cal = document.getElementsByClassName("calendar" + this.id)[0];
           var inputs = "";
           if (this.inputNum === 2) {
               inputs = '<input type="text" class="twoInput">' + '<b>to</b>' + '<input type="text" class="twoInput">';
           } else {
               inputs = '<input type="text" class="oneInput">';
           }
           cal.innerHTML = 
           '<div class="form-cal">' +
		   inputs +
		   '<button>Calendar</button>' +
	       '</div>' +
	       '<div class="container">' +
           '<div class="cal-head"><div></div><select>' +
		   '<option value="2016">2016</option>' +
		   '<option value="2017">2017</option>' +
		   '<option value="2018">2018</option>' +
		   '<option value="2019">2019</option>' +
	       '<option value="2020">2020</option>' +
		   '</select>' +
		   '<select>' +
		   '<option value="0">JAN</option>' +
		   '<option value="1">FEB</option>' +
		   '<option value="2">MAR</option>' +
		   '<option value="3">APR</option>' +
		   '<option value="4">MAY</option>' +
		   '<option value="5">JUN</option>' +
		   '<option value="6">JUL</option>' +
		   '<option value="7">AUG</option>' +
		   '<option value="8">SEP</option>' +
		   '<option value="9">OCT</option>' +
		   '<option value="10">NOV</option>' +
		   '<option value="11">DEC</option>' +
		   '</select>' +
		   '<div></div>' +
		   '</div>' +
		   '<table>' +
           '</table>' +
           '</div>';
           this.container = cal.getElementsByClassName("container")[0];

           this.display(this.dateInfo.month, this.dateInfo.year);
           this.select();
           this.arrow();
           this.refreshnd();
           this.showCal();
       },
       
       initC: function() {
           this.init();
           this.container.innerHTML = "";
       },
       
       //　返回这个月一号星期几
       firstDayOfMonth: function(mon, year){
           return (new Date(year + ", " + (mon + 1) + ", " + 1)).getDay();
       },
       
       // 返回二月份的天数
       febDays: function(year) {
           if ((year%4 === 0 && year%100 !== 0)||(year%400 === 0)) {
               return 29;
           } else {
               return 28;
           }
       },
       
       // 渲染日历的dom
       display: function (mon, year) {
           var ihtml = this.container.getElementsByTagName("table")[0];
           var eachLines = "",
               wholeMonth = "",
               weekDay = this.firstDayOfMonth(Number(mon), Number(year)),
               daysNum = this.getDaysOfMonth[mon];
            
           var selectYear = this.container.getElementsByTagName("select")[0];
           var selectMon = this.container.getElementsByTagName("select")[1];
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
           
           // 日期
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
           
           this.select();
           this.arrow();
           this.refreshnd();
           this.showCal();
       },
       
       // 两个选择框
       select: function() {
           var that = this;
           var selectYear = this.container.getElementsByTagName("select")[0];
           var selectMon = this.container.getElementsByTagName("select")[1];
           var year = selectYear.value, mon = selectMon.selectedIndex;
           selectYear.onclick = function() {
               year = selectYear.value;
               that.display(mon, year);
           }
           selectMon.onclick = function() {
               mon = selectMon.value;
               that.display(mon, year);
           }
       },
       
       // 左右箭头
       arrow: function () {
           var that = this;
           var left = this.container.getElementsByClassName("cal-head")[0].getElementsByTagName("div")[0];
           var right = this.container.getElementsByClassName("cal-head")[0].getElementsByTagName("div")[1];
           var selectYear = this.container.getElementsByTagName("select")[0];
           var selectMon = this.container.getElementsByTagName("select")[1];
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
              that.display(mon, year);
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
              that.display(mon, year);
           }
       },
       
       refresh: function() {
           var that = this;
           var tds = this.container.getElementsByTagName("td");
           var now = new Date();
           var selectYear = this.container.getElementsByTagName("select")[0].value;
           var selectMon = this.container.getElementsByTagName("select")[1].selectedIndex;
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
                           that.choice1 = clickDate;
                           that.chosen(clickDate);
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
       },
       
       // 范围输入点击情况
       refreshnd: function() {
           var that = this;
           var tds = this.container.getElementsByTagName("td");
           var now = new Date();
           var selectYear = this.container.getElementsByTagName("select")[0].value;
           var selectMon = this.container.getElementsByTagName("select")[1].selectedIndex;
           
           for (var i = 0, len = tds.length; i < len; i++) { 
               
               if (that.choice1) {
                   if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() === that.choice1.getTime()) {
                       tds[i].className = "active";
                   }
               } 
               if (tds[i].innerHTML !== "" && 
               (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))) >= now )  {
                // 绑定点击返回事件，经过时的色彩变化
                   tds[i].onmouseover = (function(i) {
                       var mouseoverDate = (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML)));
                       return function() {
                           tds[i].className = "active";
                           if (that.choice1) {
                               that.showPeriod(that.choice1, mouseoverDate);
                           }
                       };
                   })(i);
                   tds[i].onmouseout = (function(i) {
                       return function() {
                           tds[i].className = "";
                           if (that.choice1) {
                               if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() === that.choice1.getTime()) {
                                   tds[i].className = "active";
                               }
                               that.clearPeriod();
                           }      
                       };
                   })(i);
                   // 点击日期时候的变化
                   tds[i].onclick = (function(i) {
                       var clickDate = (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML)));
                       return function() {
                           if (!that.choice1) {
                               that.choice1 = clickDate;
                               tds[i].className = "active";
                               that.chosen(clickDate);
                           } else {
                               if (clickDate.getTime() === that.choice1.getTime()) {
                                   that.choice1 = undefined;
                                   tds[i].className = "";
                               } else {
                                   that.choice2 = clickDate;
                                   that.chosennd();
                               }
                           }
                       }
                   })(i);
               } 

               if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() < now.getTime()){
                   // 绑定类，颜色变化
                   tds[i].className = "nonactive";
               } else {
                   // 空的，没有变化
               }
           }
       },
       
       // 日期的比较！要用gettime
       showPeriod: function(cD, oD) {
           var tds = this.container.getElementsByTagName("td");
           var selectYear = this.container.getElementsByTagName("select")[0].value;
           var selectMon = this.container.getElementsByTagName("select")[1].selectedIndex;
           for (var i = 0, len = tds.length; i < len; i++) {
               if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() > cD.getTime()
               && (new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() <  oD.getTime()) {
                   tds[i].style.backgroundColor = "#eeeeee";
               } else if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() === cD.getTime()) {
                   tds[i].className = "active";
               } else {
                   tds[i].style.backgroundColor = "white";
               }          
           }
       },
       
       // 清除时间间隔颜色
       clearPeriod: function() {
           var tds = this.container.getElementsByTagName("td");
           var selectYear = this.container.getElementsByTagName("select")[0].value;
           var selectMon = this.container.getElementsByTagName("select")[1].selectedIndex;
           for (var i = 0, len = tds.length; i < len; i++) {
               if ((new Date(selectYear + ", " + (selectMon + 1) + ", " + Number(tds[i].innerHTML))).getTime() !== this.choice1.getTime()) {
                   tds[i].style.backgroundColor = "white";
               }
           }
       },
       
       // 点下日期时候的回调
       chosen: function(d) {
           var cal = document.getElementsByClassName("calendar" + this.id)[0];
           var inputCal = cal.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
           var content = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();
           inputCal.value = content;
           if (this.inputNum !== 2) {
               this.container.innerHTML = "";
               alert(d);
           } 
       },
       
       // 点下日期后的回调函数
       chosennd: function() {
           var cal = document.getElementsByClassName("calendar" + this.id)[0];
           var inputCal1 = cal.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
           var inputCal2 = cal.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[1];
           var content1 = this.choice1.getFullYear() + "/" + this.choice1.getMonth() + "/" + this.choice1.getDate(); 
           var content2 = this.choice2.getFullYear() + "/" + this.choice2.getMonth() + "/" + this.choice2.getDate(); 
           // 找到最后被允许的那个
           var lastDate = new Date(this.choice1);
           lastDate.setDate(this.choice1.getDate() + this.period - 1);
           if (this.choice2 > lastDate) {
               alert("超过了允许范围！");
               inputCal1.value = "";
               inputCal2.value = "";
           } else {
               inputCal1.value = content1;
               inputCal2.value = content2;
               alert("from " + content1 + " to " + content2);
               this.container.innerHTML = "";
           }  
       },
       
       // 输入框和按钮
       showCal: function() {
           var that = this;
           var cal = document.getElementsByClassName("calendar" + this.id)[0];
           var inputCal = cal.getElementsByClassName("form-cal")[0].getElementsByTagName("input")[0];
           var btn1 = cal.getElementsByClassName("form-cal")[0].getElementsByTagName("button")[0];
           btn1.onclick = function() { 
              that.clear();
              if (that.container.innerHTML === "") {
                  that.init();
              } else {
                  that.container.innerHTML = "";
              } 
              
              console.log(that.container)
          };
          
          inputCal.onclick = function() {
              that.clear();
              if (that.container.innerHTML === "") {
                  that.init();
              } else {
                  that.container.innerHTML = "";
              } 
          }
       },
       
       clear: function() {
           var tds = this.container.getElementsByTagName("td");
           for (var i = 0; i < tds.length; i++) {
               tds[i].className = "";
           }
           if (this.choice1) {
               this.choice1 = undefined;
           } 
           if (this.choice2) {
               this.choice2 = undefined;
           }
       }
    };
    
    window.onload = function() {
        var mu = new calendar(1, undefined, 1);
        mu.initC();
        var my = new calendar(2, 12, 2);
        my.initC();
    }
    
})();