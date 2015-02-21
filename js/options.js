var interval = localStorage.interval;
interval = interval?interval:'2'; //默认设置2小时 
document.getElementById('interval').value = interval;
document.getElementById('save').onclick = function(){
    localStorage.interval = document.getElementById('interval').value;
    alert('保存成功。请重启浏览器生效！');
}
