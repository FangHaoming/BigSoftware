//@ sourceURL=login_ajax.js
let UUID = uuid();


/**
 * 登录事件
 * @returns {boolean}
 */
function login(element){
	//获取页面数据
	let userName = $(element).find("input[name=username]").val();
	let userPassword = $(element).find("input[name=password]").val();
	if(userName===""){
		$("form table tr:eq(1) td span").html("手机号不能为空");
		return false;
	}
	if(userPassword===""){
		$("form table tr:eq(2) td span").html("密码不能为空");
		return false;
	}

	$.ajax({
		url:"http://40f730q296.qicp.vip/custLogin",
		type:"get",
		data:{
			"cust_phone": userName,
			"cust_pwd": userPassword,
		},
		dataType:"jsonp",
		jsonp:"callback",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success:function(result){
			if(result["msg"] === "correct pwd") {
				let re={
					"nickname":result["nickname"],
					"cust_id":result["cust_id"],
					"msg":result["msg"]
				};
				let str_re=JSON.stringify(re);
				addCookie("identify",str_re);
				window.location.href = "./index.html";

			}else if (result["msg"] === "invalid account"){
				alert("找不到该用户");
			}else{
				alert("密码错误");
			}
		},
		error:function(textStatus){
			alert(textStatus);
		}
	});

	return false;
}


/**
 * 生成随机UUID
 * @returns {string} 生成的UUID
 */
function uuid() {
	let s = [];
	let hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	return s.join("");
}
