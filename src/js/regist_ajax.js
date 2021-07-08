let UUID = uuid();


/**
 * 提交表单校验
 * @param element 表单标签
 * @returns {boolean} 是否已婚徐提交
 */
function register(element) {
    let recev_phone = $(element).find("input[name=recev_phone]").val();
    let userName = $(element).find("input[name=username]").val();
    let userPassword = $(element).find("input[name=password]").val();
    let userNickName = $(element).find("input[name=nickname]").val();
    let recev_name=$(element).find("input[name=recev_name]").val();
    let recev_zipcode=$(element).find("input[name=recev_zipcode]").val();
    let addr_province=$('#province').find('option:selected').text()+"省";
    let addr_city=$('#city').find('option:selected').text();
    let addr_district=$('#area').find('option:selected').text();
    let addr_spec=$(element).find("input[name=addr_spec]").val();
    let recev_isdef=$("input[name=recev_isdef]").is(":checked");
    if(recev_isdef)recev_isdef=1;
    else recev_isdef=0;
    let result = true;
    result = checkNull("username", "手机号不能为空") && result;
    result = checkNull("recev_phone", "手机号不能为空") && result;
    result = checkNull("password", "密码不能为空") && result;
    result = checkNull("password2", "确认密码不能为空") && result;
    result = checkNull("nickname", "昵称不能为空") && result;
    result = checkNull("recev_name", "收货人不能为空") && result;
    result = checkNull("recev_zipcode", "邮政编码不能为空") && result;
    result = checkSelect("province", "省不能为空") && result;
    result = checkSelect("city", "市不能为空") && result;
    result = checkSelect("area", "区不能为空") && result;
    result = checkNull("addr_spec", "具体不能为空") && result;
    result = isEqual("password", "两次密码输入不一致") && result;
    if (result) {
        $.ajax({
            url: "http://40f730q296.qicp.vip/custRegister",
            type: "get",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "cust_phone": userName,
                "cust_pwd": userPassword,
                "cust_nickname": userNickName,
                "addr_province":addr_province,
                "addr_city":addr_city,
                "addr_district":addr_district,
                "addr_spec":addr_spec,
                "recev_zipcode":recev_zipcode,
                "recev_name":recev_name,
                "recev_isdef":recev_isdef,
                "recev_phone":recev_phone
            },
            timeout:5000,
            dataType: "jsonp",
            jsonp:"callback",
            success: function (result) {
                if (result["msg"]==="register successfully") {
                    // 注册成功
                    window.location.href = "./regist_success.html";
                } else if (result["msg"] === "invalid phone") {
                    alert("无效的手机号");
                } else if(result["msg"]==="already exists"){
                    alert("该手机号已被占用");
                } else{
                    alert("注册失败");
                }
            },
            error: function (textStatus) {
                alert(textStatus);
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

function checkSelect(id, msg){
    let text=$("#"+id).find('option:selected').text();
    if (text === "请选择") {
        setMsg(id, msg);
        return false;
    }else{
        setMsg(id, "");
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


