require([
    "listPage",
    "edit",
    "newBuild",
    "util"
], function(ListPage, Edit, NewBuild, $) {
    'use strict';
    window.location.hash = "#listpage";
    var myList = new ListPage.listPage();
    
    // 厉害！完成了向前向后！
    window.onhashchange = function() {
        if (window.location.hash === "#listpage") {
            var myList = new ListPage.listPage();
        } else if (window.location.hash === "#edit") {
            var myEdit = new Edit.edit();
        } else if (window.location.hash === "#newbuild") {
            var myNew = new NewBuild.newBuild();
        }
    }
    
});