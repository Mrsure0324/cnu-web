
/*

	--注册功能--

*/
// 文本框对象
var email = document.getElementById('email');
var password = document.getElementById('password');
var username = document.getElementById('username');

/*
	人员信息类
*/
function Person(email,password,username) {
	this.username = username;
	this.email = email;
	this.password = password;
}

/*
	增加人员信息
*/
function add() {

	// 表单验证
	var r = /^[a-z0-9_]+@\w+(\.[a-z]{2,3}){1,2}$/;

	if ( !r.test(email.value) ) {
		alert('邮箱格式不正确');
		return;
	}

	r = /^\d{6,8}$/;

	if (!r.test(password.value)) {
		alert('密码格式不正确！');
		password.focus();
		return false;
	}

	if (username.value == '' || username.value.length > 10) {
		alert('姓名不能为空且最多10个字符');
		return;
	}

	if ( queryPersonByEmail(email.value) != null) {
		alert('该邮箱已经存在！');
		return;
	}
	
	// 创建对象
	var p = new Person(email.value,password.value,username.value);

	// 对象转换为字符串
	var pStr = JSON.stringify(p);

	//存储到本地
	localStorage.setItem(email.value,pStr);

	alert('注册成功！');

	location.href = "login.html";
}

/*
	传入一个姓名，返回这个人的数据对象
	如果人员不存在，返回null
*/
function queryPersonByEmail(email) {

	var obj = null; //创建空对象
	
	// 遍历存储的数据
	for (var i = 0;i < localStorage.length;i ++) {

		var key = localStorage.key(i);	//键	
		
		// 如果找到匹配的名称
		if (key == email) {

			var val = localStorage.getItem(key); //值

			try {
				obj = JSON.parse(val); //转换为json对象
			} catch (e) {
				return null;
			}

			return obj;					
		}

	}

	return obj;
}



