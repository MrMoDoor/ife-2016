require([
    "listPage",
    "edit",
    "newBuild",
    "storage",
    "util"
], function(ListPage, Edit, NewBuild, Storage, $) {
    'use strict';
    window.location.hash = "#listpage";
    var myList = new ListPage.listPage();
    
    // 点击logo返回
    $.U.returnToListPage();
    
    var oldHash;
    // 完成了向前向后
    window.onhashchange = function() {
        // 如果是从新建的编辑页面跳转过来，并且没有保存的
        if (oldHash === "#edit" && window.location.hash !== "#newbuild") {
            if ($.U.iAmNew === true) {
                var s = Storage.getData().qn;
                // 删除新建但是没有保存的
                s.pop();
                Storage.save({
                    qn: s,
                    textarea: "not change",
                    radio: "not change",
                    checkbox: "not change"
                });
                $.U.iAmNew = false;
            }
        }
        
        if (window.location.hash === "#listpage") {
            var myList = new ListPage.listPage();
        } else if (window.location.hash === "#edit") {
            var myEdit = new Edit.edit();
            oldHash = "#edit";
        } else if (window.location.hash === "#newbuild") {
            var myNew = new NewBuild.newBuild();
            oldHash = "#newbuild";
        }
    }
});