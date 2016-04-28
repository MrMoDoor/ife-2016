define([
    'util',
    'darken',
    'result',
    'newBuild',
    'edit',
    'storage',
    'types'
], function($, Darken, Result, NewBuild, Edit, Storage, T) {
    'use strict';
    var listPage = function() {
        refresh();
        btnEvent();
        delEvent();
    };
    
    // 渲染页面
    var refresh = function() {
        var allQns = Storage.getData().qn,
            main = document.getElementById("main");
        var ihtml = "",
            aQn = "";
        
        for (var i = 0, len = allQns.length; i < len; i++) {
                aQn = 
                 '<div>'
			   +	'<input type="checkbox">'
			   +   	'<span>' + allQns[i].title + '</span>'
			   +	'<span>' + allQns[i].endTime + '</span>'
			   +	'<span>' + allQns[i].status + '</span>'
			   +	'<button>编辑</button>'
			   +    '<button>删除</button>'
			   +	'<button>查看问卷</button>'
			   + '</div>';
               ihtml += aQn;
        }

        ihtml = '<div id="list-page">'
	    +   	'<div id="list-page-head">'
	    +		'<span>标题</span>'
	    +		'<span>时间</span>'
	    +		'<span>状态</span>'
	    +		'<span>操作</span>'
	    +		'<button>+新建问卷</button>'
	    +	'</div>'
	    +	'<div id="list-page-body">'
        +   ihtml		
	    +	'</div>'
	    +	'<div id="list-page-foot">'
        +		'<input type="checkbox">'
	    +		'<span>全选</span>'
	    +		'<button>删除</button>'
	    +	'</div>'
	    +	'</div>';

        main.innerHTML = ihtml;
        btnEvent();
    }
    
    // 绑定右边按钮的事件
    var btnEvent = function() {
        var listItems = document.getElementById("list-page-body").childNodes;
        for (var i = 0, len = listItems.length; i < len; i++) {
            var btn1 = listItems[i].getElementsByTagName("button")[0];
            var btn2 = listItems[i].getElementsByTagName("button")[1];
            var btn3 = listItems[i].getElementsByTagName("button")[2];
            $.U.on(btn1, )
        }
    }
    
    // 绑定下面删除按钮的事件逻辑和上面的新建逻辑
    var delEvent = function() {
        
    }

    // 返回函数，用于渲染页面
    return {
        listPage : listPage
    };
});