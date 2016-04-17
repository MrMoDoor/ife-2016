// 写于2016/4/17 by harryfyodor

(function() {
    var timer = 1,
        main = document.getElementById("main"),
        btns = document.getElementsByTagName("button");
        
    // 前序
    btns[0].onclick = function() {
        preOrder(main.getElementsByTagName("div")[0]); 
        timer = 1;
    };
    
    // 中序
    btns[1].onclick = function() {
        inOrder(main.getElementsByTagName("div")[0]);
        timer = 1;
    };
    
    // 后序
    btns[2].onclick = function() {
        postOrder(main.getElementsByTagName("div")[0]);
        timer = 1;
    };
    
    // 根据select框来确定速度。
    function selectChoose() {
        var speed = 500,
            select = document.getElementsByTagName("select")[0];
        
        if (select.selectedIndex === 0) {
            speed = 300;
        } else if (select.selectedIndex === 2){
            speed = 800;
        }
        
        return speed;
    }
    
    // 颜色变化动画
    function colorFlash(element) {
        var flash = setTimeout(function() {
            element.style.backgroundColor = "#B82525";
        }, selectChoose()*timer);
        var dark = setTimeout(function() {
            element.style.backgroundColor = "white";
        }, selectChoose()*(timer+1));
        timer++;
        
    }
    
    // 三种遍历二叉树的方法
    
    // 前序实现
    function preOrder(element) {
        if (element != null && element != undefined) {
            colorFlash(element);
            if (element.getElementsByTagName("div")[0]!= undefined) {
                preOrder(element.getElementsByTagName("div")[0]);
                preOrder(element.getElementsByTagName("div")[0].nextSibling.nextSibling);
            }
        }
    }
   
    // 中序实现
    function inOrder(element) {
        if (element != null && element != undefined) {
            if (element.getElementsByTagName("div")[0]!= undefined) { 
                inOrder(element.getElementsByTagName("div")[0]);
            }
            colorFlash(element);
            if (element.getElementsByTagName("div")[0]!= undefined) { 
                inOrder(element.getElementsByTagName("div")[0].nextSibling.nextSibling);
            }     
        }
    }
    
    // 后序实现
    function postOrder(element) {
        if (element != null && element != undefined) {
            colorFlash(element);
            if (element.getElementsByTagName("div")[0]!= undefined) { 
                 postOrder(element.getElementsByTagName("div")[0].nextSibling.nextSibling);
                 postOrder(element.getElementsByTagName("div")[0]);
            } 
        }
    }
    
})();