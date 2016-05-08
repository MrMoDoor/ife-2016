define([
    'storage',
    'util'
], function(Storage, $) {
    'use strict';
    
    // 所有 id 自动分配
    
    // 问卷
    var qn = function({
        title: title,
        endTime: endTime,
        status: status,
        textarea: textarea,
        radio: radio,
        checkbox: checkbox
    }) {
        this.title = title;
        this.endTime = endTime;
        this.status = status;
        this.textarea = textarea;
        this.radio = radio;
        this.checkbox = checkbox;
        this.id = assignId("qn");
    };
    
    var form = function({
        title: title,
        father: father,
        options: options,
        order: order,
        type: type,
        necessary: necessary
    }) {
        this.title = title;
        this.father = father;
        this.options = options;
        this.order = order;
        this.type = type;
        this.necessary = necessary;
        this.id = assignId(type);
    };
    
    // 找出空位
    function assignId(type) {
        var inStorage = Storage.getData()[type];    
        console.log(inStorage);
        for (var i = 1; i <= inStorage.length + 1; i++) {
            if($.U.findObjectBy("id", inStorage, i).objectIneed.length === 0) {
                return i;
            }
        }
    }
    
    return {
        qns: qn,
        form: form
    };
});