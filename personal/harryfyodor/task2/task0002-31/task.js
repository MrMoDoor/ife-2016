(function(){
	var name = {
		label: '名称',                    // 表单标签
		type: 'input',                   // 表单类型
		validator: function(str) {
			if (str === "123") {
				return true;
			}
		},    	 						  // 表单验证规
		rules: '必填，长度为3-16个字符',     // 填写规则提示
		success: '格式正确',               // 验证通过提示
		fail: '格式不正确' ,               // 验证失败提示
		necessary: true
	};
	
	var age = {
		label: '年龄',                    // 表单标签
		type: 'input',                   // 表单类型
		validator: function(str) {
			if (str === "123") {
				return true;
			}
		},    	                         // 表单验证规
		rules: '必填',    // 填写规则提示
		success: '格式正确',              // 验证通过提示
		fail: '格式不正确' ,              // 验证失败提示
		necessary: true
	};
	
	
	var email = {
		label: '邮箱',                    // 表单标签
		type: 'email',                   // 表单类型
		validator: function(str) {
			if (/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/.test(str)) {
				return true;
			} else {
				return false;
			}
		},    	                         // 表单验证规
		rules: '必填，长度为4-16个字符',    // 填写规则提示
		success: '格式正确',              // 验证通过提示
		fail: '格式不正确' ,              // 验证失败提示
		necessary: true
	};
	
	var phoneNumber = {
		label: '电话',                    // 表单标签
		type: 'input',                   // 表单类型
		validator: function(str) {
			if (str === "123") {
				return true;
			}
		},    	                         // 表单验证规
		rules: '必填，手机号码',    // 填写规则提示
		success: '格式正确',              // 验证通过提示
		fail: '格式不正确' ,              // 验证失败提示
		necessary: true
	};
	
	var birthday = {
		label: '生日',                    // 表单标签
		type: 'input',                   // 表单类型
		validator: function(str) {
			if (str === "123") {
				return true;
			}
		},    	                         // 表单验证规
		rules: '不属于必填，按照yyyy-mm-dd的格式',    // 填写规则提示
		success: '格式正确',              // 验证通过提示
		fail: '格式不正确' ,              // 验证失败提示
		necessary: false
	};
	
	
	// 这里放其他的
	var makeAForm = (function(){
		function makeAForm({
				label: label,
				type: type,
				validator: validator,
				rules: rules,
				success: success,
				fail: fail,
				necessary: necessary
			}, formIndex) {
			this.label = label;
			this.type = type;
			this.validator = validator;
			this.rules = rules;
			this.success = success; // 格式正确的时候
			this.fail = fail;       // 格式不正确
			this.necessary = necessary;
			this.status = "wrong"; // 有 begin,empty,wrong,right 四种选择
			this.formIndex = formIndex;
			this.content = "";
		}
	
		makeAForm.prototype = {
			
			init : function() {
				// DOM
				var form = document.getElementsByTagName("form")[this.formIndex];
				var p = document.createElement("p");
				var label = document.createElement("label");
				var input = document.createElement("input");
				var span = document.createElement("span");
				var inLabel = document.createTextNode(this.label + " ");
				var inSpan = document.createTextNode(" " + this.rules); // 聚焦也显示这个
				p.setAttribute("class", this.label);
				input.setAttribute("type", this.type);
				label.appendChild(inLabel);
				//span.appendChild(inSpan);
				p.appendChild(label);
				p.appendChild(input);
				p.appendChild(span);
				form.appendChild(p);
				
				// status
				if (this.necessary) {
					this.status = "empty";
				}
				
				// 事件绑定
				this.identitying();
			},
		
			
			// 用作绑定事件，主要是失去焦点
			identitying : function() {
				// input 失去焦点判断value，通过validator判断，如果正确就渲染正确，修改对象值
				// 如果错误，就现实错误
				// 如果空，则根据是否必要显示
				var form = document.getElementsByTagName("form")[this.formIndex];
				var inputArea = form.getElementsByClassName(this.label)[0].getElementsByTagName("input")[0];
				var span = form.getElementsByClassName(this.label)[0].getElementsByTagName("span")[0];
				var that = this;
				inputArea.onfocus = function(e) {
					var event = arguments[0] || window.event;
					var target = event.target || event.srcElement;
					span.innerHTML = " " + that.rules;
				}
				
				inputArea.onblur = function(e) {
					var event = arguments[0] || window.event;
					var target = event.target || event.srcElement;
					var inputValue = inputArea.value;
					if (that.validator(inputValue)) {
						span.innerHTML = " " + that.success;
						that.status = "right";
						that.content = inputValue;
					} else {
						span.innerHTML = " " + that.fail;
						if (inputValue === "" && that.necessary === false) {
							that.status = "empty";
						} else {
							that.status = "wrong";
						}
					}
				}
			},
			
			getStatus : function() {
				return {
					content : this.content,
					label : this.label,
					status : this.status,
					necessary : this.necessary
				}
			}
		}
		
		return makeAForm;
	})();
	
	// 整一份表单
	// 传入表单对象（按照所给的格式）组成的数组和想要生成的表单的位置。
	var formGroup = (function(){
		function formGroup(array, index) {
			this.array = array;
			this.index = index;
			this.arrayOfInputs = [];
			// 判断传入的是不是一个数组
			if (Object.prototype.toString.call(array) === "[object Array]") {
				 for (var i = 0, len = array.length; i < len; i++) {
					 var input = new makeAForm(array[i], index);
					 input.init();
					 this.arrayOfInputs.push(input);
				 }
			} else {
				console.error("Not an array!");
			}
		}
		
		formGroup.prototype = {
			// 按键事件绑定
			btnEvent : function() {
				var form = document.getElementsByTagName("form")[this.index];
				var btn = document.getElementsByTagName("button")[this.index];
				var array = this.arrayOfInputs;
				var that = this;
				btn.onclick = function() {
					for (var i = 0, len = array.length; i < len; i++) {
						if (array[i] instanceof makeAForm) { 
							console.log(array[i].getStatus().status);
							if (array[i].getStatus().status === "wrong") {
								console.log("输入错误！");
								i = 0;
								break;
							} else if (i === len - 1){
								console.log("输入正确");
								that.printForm();
								i = 0;
								break;
							}
						}
					}
				}
			},
			
			// 把结果打印出来
			printForm : function() {
				var array = this.arrayOfInputs;
				var output = "";
				for (var i = 0, len = array.length; i < len; i++) {
					if (array[i].getStatus().status === "right") {
						output += array[i].getStatus().label + ":" + array[i].getStatus().content + "\n";
					}	
				}
				console.log("表单" + this.index + "\n" + output);
			}
		}
		return formGroup;
	})();
	
	
	// 利用工厂来创建表单
	var theFirst = new formGroup([name, age, email,birthday],0);
	theFirst.btnEvent();
	var theSecond = new formGroup([name, email], 1);
	theSecond.btnEvent();
	
})();


