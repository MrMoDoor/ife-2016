define([
    "Storage",
    'listPage',
    'edit',
    "types",
    'util'
], function(Storage, Listpage, Edit, T, $) {
    'use strict';
    var build = function() {
        refresh();
        btnEvent();
        $.U.returnToListPage();
    };
    
    var refresh = function() {
        var main = $.U("#main");
        var ihtml = "";
        ihtml = 
          '<div id="new-build">' 
	    +	'<button>+ 新建问卷</button>'
	    + '</div>';
       
       main.innerHTML = ihtml;
    }
    
    var btnEvent = function() {
        var btn = $.U("#new-build button");
        $.U.click(btn, function() {
            var len = Storage.getData().qn.length;
            var newE = new T.qns({
                title: "请在此输入名称(" + (len + 1) + ")",
                endTime: "",
                status: "未发布",
                textarea: [],
                radio: [],
                checkbox: []
            });
            var qns = Storage.getData().qn;
            qns.push(newE);
            Storage.save({
                qn : qns,
                textarea : "not change",
                checkbox : "not change",
                radio : "not change"
            });
            console.log(newE)
            $.U.pos = len;
            var newEdit = new Edit.edit();
        });
    }
    
    return {
        newBuild: build
    }
});