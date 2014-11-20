var notification = webkitNotifications.createNotification(
    '../images/icon48.png',
    '你已经用电脑'+localStorage.interval+'分钟啦',
    '常坐电脑前可对身体不好哦，是时候应该去活动一下啦！'
);
	setTimeout(function(){
		notification.show();
	},localStorage.interval*60000);
	setTimeout(function(){
		notification.cancel();
	},localStorage.interval*60000+5000);
