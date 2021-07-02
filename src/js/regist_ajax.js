let UUID = uuid();


/**
 * 提交表单校验
 * @param element 表单标签
 * @returns {boolean} 是否已婚徐提交
 */
function register(element) {
    let userName = $(element).find("input[name=username]").val();
    let userPassword = $(element).find("input[name=password]").val();
    let userNickName = $(element).find("input[name=nickname]").val();
    let result = true;
    result = checkNull("username", "用户名不能为空") && result;
    result = checkNull("password", "密码不能为空") && result;
    result = checkNull("password2", "确认密码不能为空") && result;
    result = checkNull("nickname", "昵称不能为空") && result;
    result = isEqual("password", "两次密码输入不一致") && result;
    if (result) {
        $.ajax({
            url: "http://40f730q296.qicp.vip/custRegister",
            type: "post",
            data: {
                "cust_phone": userName,
                "cust_pwd": userPassword,
                "cust_nickname": userNickName,
            },
            dataType: "json",
            success: function (result) {
                window.location.href = "../regist_success.html";
                alert(result+"1123");
                if (result.status === 200) {
                    // 注册成功
                    window.location.href = "../regist_success.html";
                } else if (result.status === 201) {
                    // 后端校验出错
                    $("#alert").text(result.msg);
                } else {
                    alert(result.msg);
                }
            },
            error: function () {
                alert("请求失败！");
            }
        });
    }
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

/**
 * 设置校验消息提示
 * @param name input的name
 * @param msg 提示的消息
 */
function setMsg(name, msg) {
    $("#" + name + "_msg").text(msg);
}



/**
 * 检查是否为空
 * @param name input的name
 * @param msg 提示消息
 * @returns {boolean} 是否通过校验
 */
function checkNull(name, msg){
    let value = $("input[name=" + name + "]").val();
    if ($.trim(value) === "") {
        setMsg(name, msg);
        return false;
    }else{
        setMsg(name, "");
        return  true;
    }
}

/**
 * 一致性校验
 * @param name input的name
 * @param msg 提示消息
 * @return {boolean} 是否通过校验
 */
function isEqual(name, msg){
    let pwd = $("input[name=" + name + "]").val();
    let pwd2 = $("input[name=" + name + "2]").val();
    if ($.trim(pwd) === "" || $.trim(pwd2) === ""){
        // 如果二者有一个为0，这是前面非空校验要做的事情
        return false;
    }
    if ($.trim(pwd) !== "" && $.trim(pwd2) !== "" && pwd !== pwd2) {
        setMsg(name, msg);
        setMsg(name + "2", msg);
        return false;
    }else{
        setMsg(name, "");
        setMsg(name + "2", "");
        return true;
    }
}

/**
 * 是否为邮箱
 * @param name input的name
 * @param msg 提示消息
 * @return {boolean} 是否为邮箱
 */
function isEmail(name, msg){
    let value = $("input[name=" + name + "]").val();
    let reg = /^\w+(\.\w+)*@\w+(\.\w+)+$/;
    if ($.trim(value) === "")
        // 如果为空，这是前面非空校验做的事情
        return false;
    if (!reg.test(value)) {
        setMsg(name, msg);
        return false;
    }else {
        setMsg(name, "");
        return true;
    }
}
