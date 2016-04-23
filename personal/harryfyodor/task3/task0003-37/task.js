 // 写于2016/4/19 by harryfyodor
 
 (function() {
     var mainBtn = document.getElementsByTagName("div")[0].getElementsByTagName("button")[0];
     
     // 弹出窗口内容自定义
     function popOut({type:type, title:title, content:content, callback:callback}) {
         this.type = type; // 类型
         this.title = title; // 弹出框标题
         this.content = content; // 弹出框内容
         this.callback = callback; // prompt调用确认的回调
     }
     
     // 应对不同模式的选择
     popOut.prototype.poping = function() {
         if (this.type === "alert") {
             alertF(this.title, this.content, null);
         } else if (this.type === "prompt") {
             promptF(this.title, this.content, this.callback);
         } else if (this.type === "confirm") {
             confirmF(this.title, this.content);
         }
     }
     
     // 弹出层的dom操作
     function dom(title, content, iden) {
         var darken = document.createElement("div");
         darken.setAttribute("class", "darken");
         var ihtml =  '<div></div>' +
		              '<div class="floatOut show">' +
		              '<div>' + title + '</div>' +
			          '<div>' + 
				      '<p>' + content + '</p>';
        if (iden) {
            ihtml = ihtml + '<input type="text">';
        }
        ihtml = ihtml + '</div>' +
			    '<div>' +
			    '<button>确认</button>' +
				'<button>取消</button>' +
			    '</div>';
         darken.innerHTML = ihtml;
         var script = document.getElementsByTagName("script")[0];
         script.parentNode.insertBefore(darken, script);
     }
     
     // alert模式
     function alertF(title, content) {
         dom(title, content, false);
         var btn1 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[0];
         var btn2 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[1];
         var darkB = document.getElementsByClassName("darken")[0].getElementsByTagName("div")[0];
         btn1.onclick = function() {
             rmv();
         }
         btn2.onclick = function() {
             rmv();
         }
         darkB.onclick = function() {
             rmv();
         }
     }
     
     // prompt模式
     function promptF(title, content, callback) {
         dom(title, content, false);
         var btn1 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[0];
         var btn2 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[1];
         var darkB = document.getElementsByClassName("darken")[0].getElementsByTagName("div")[0];
         btn1.onclick = function() {
             callback("hello");
             rmv();
         }
         btn2.onclick = function() {
             rmv();
         }
         darkB.onclick = function() {
             rmv();
         }
     }
     
     // confirm模式
     function confirmF(title, content) {
         dom(title, content, true);
         var btn1 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[0];
         var btn2 = document.getElementsByClassName("darken")[0].getElementsByTagName("button")[1];
         var darkB = document.getElementsByClassName("darken")[0].getElementsByTagName("div")[0];
         var input = document.getElementsByClassName("darken")[0].getElementsByTagName("input")[0];
         btn1.onclick = function() {
             rmv();
             alert(input.value);
         }
         btn2.onclick = function() {
             rmv();
         }
         darkB.onclick = function() {
             rmv();
         }
     }
     
     // 移除弹出层
     function rmv() {
         var darken = document.getElementsByClassName("darken")[0];
         darken.parentNode.removeChild(darken);
     }
     
     // 下面可以尝试修改来得到不同内容的弹出框
     mainBtn.onclick = function() {
         var newPopOut = new popOut({
             type: "confirm", // 有confirm，alert，prompt三种选择。
             title: "弹出框的标题",
             content: "弹出框的内容",
             callback: function(sth) {
                 alert(sth);
             } // 选择confirm和prompt的回调函数。
         });
         console.log("hi")
         newPopOut.poping();
     };
 })();