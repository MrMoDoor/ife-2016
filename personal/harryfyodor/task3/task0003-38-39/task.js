(function() {
    
    function table({id: id, content:content, supportSort:supportSort, fixed:fixed}) {
        this.id = id;
        this.content = content;
        this.supportSort = supportSort;
        this.fixed = fixed;
        // 初始化
        this.refresh();
        this.sortT();
        this.fixHead();
    }
    
    // 通过数组渲染表格
    table.prototype.refresh = function(){
        var ihtml = "";
        var headC = "";
        var bodyC = "";
        var tableContainer = document.getElementById("table-" + this.id);
        var sub = ["语文", "数学", "英语", "总分"];
        
        // 表格头部
        headC = '<tr><th>姓名';
        for (var k = 0; k < 4; k++) {
            headC += '</th><th>' + sub[k];
            if (checkInArray(this.supportSort, k + 1)) {
                headC += "<div></div><div></div>";
            }
        }
        headC += '</th></tr>';
        
        // 表格内容部分
        for (var i = 0, len = this.content.length; i < len; i++) {
            bodyC += '<tr>';
            for (var j = 0, len2 = this.content[i].length; j < len2; j++) {
                bodyC += '<td>' + this.content[i][j] + '</td>';
            }
            bodyC += '</tr>'
        }
        
        // 所有要插入的
        ihtml = '<table>' + headC + bodyC + '</table>';
        
        tableContainer.innerHTML = ihtml;
    }
    
    
    
    // 事件绑定
    table.prototype.sortT = function() {
        var tableContainer = document.getElementById("table-" + this.id);
        var that = this;
        for (var i = 1; i <= 4; i++) {
            if (checkInArray(this.supportSort, i)) {
                var th = tableContainer.getElementsByTagName("th")[i];
                th.getElementsByTagName("div")[0].onclick = (function(i){
                    return function(){
                        console.log(i)
                        that.preOrder(i);
                        that.refresh();
                        that.sortT();
                    }      
                })(i);
                th.getElementsByTagName("div")[1].onclick = (function(i){
                    return function(){
                        console.log(i)
                        that.postOrder(i);
                        that.refresh();
                        that.sortT();
                    };
                })(i);
            }
        }
    }
    
    // 排序根据
    // 升顺排列
    table.prototype.preOrder = function(index) {
        this.content.sort(function(a, b) {
            if (a[index] > b[index]) {
                return -1;
            } else if (a[index] < b[index]) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(this.content);
    }
    
    // 降序排序
    table.prototype.postOrder = function(index) {
        this.content.sort(function(a, b) {
            if (a[index] > b[index]) {
                return 1;
            } else if (a[index] < b[index]) {
                return -1;
            } else {
                return 0;
            }
        });   
    }
    
    table.prototype.fixHead = function() {
        var theTable = document.getElementById("table-" + this.id).getElementsByTagName("table")[0];
        var tableHead = theTable.getElementsByTagName("tr")[0];
        
        if (this.fixed) {
            document.onscroll = function(){
                // 在table元素的顶部和底部范围内，添加fix类
                if (document.body.scrollTop > theTable.offsetTop && 
                document.body.scrollTop < theTable.offsetHeight + theTable.offsetTop) {
                    tableHead.className = "table-head-fix";
                } else {
                    tableHead.className = "";
                }
                
            }
        }
    }
    
    // 检查一个数值是不是在一个数值里
    function checkInArray(array, num) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === num) {
                return true;
            }
        }
    }
    
    // 获取元素与整个页面的距离
    function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　}
　　function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　}
    
    window.onload = function() {
        // 表格数据接口
        var table1 = {
            id: 1,
            content: [
                ["小明", 80, 90, 70, 240],
                ["小红", 90, 60, 90, 240],
                ["小明", 80, 90, 70, 240],
                ["小红", 90, 60, 90, 240],
                ["小明", 80, 90, 70, 240],
                ["小红", 90, 60, 90, 240],
                ["小亮", 60, 100, 70, 240]  
            ],
            // 支持排序的接口
            supportSort: [1, 2, 3, 4],
            // 首行是否fix
            fixed: false
        };
        var table2 = {
            id: 2,
            content: [
                ["小明", 80, 90, 70, 240],
                ["小红", 90, 60, 90, 240],
                ["小明", 80, 90, 70, 240],
                ["小红", 90, 60, 90, 240],
                ["小明", 80, 90, 70, 240],
                ["小亮", 60, 100, 70, 240]  
            ],
            supportSort: [1, 2, 3, 4],
            fixed: true
        };
        var tableone = new table(table1);
        var tabletwo = new table(table2);
    }
    
    
})();