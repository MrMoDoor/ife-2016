define([
    'util',
    'listPage',
    'edit'
], function($, Darken, Result, NewBuild, Edit, Stroage) {
    'use strict';
    var build = function() {
        refresh();
        btnEvent();
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
            var newEdit = new Edit.edit(null);
        });
    }
    
    return {
        newBuild: build
    }
});