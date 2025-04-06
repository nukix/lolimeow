
// 摸鱼日历 begin
var apiUrl1 = "https://api.vvhan.com/api/moyu"
var apiUrl2 = "https://dayu.qqsuu.cn/moyuribao/apis.php"

var hasLoadMoyu = false

function isMobile() {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return flag;
}

function insertMoyuPlaceHolder(url) {
    hasLoadMoyu = true;
    var columnLeftElement = document.querySelector("aside[class='column column-side column-left top-sticky']");
    var columnRightElement = document.querySelector("aside[class='column column-side column-right top-sticky']");

    var htmlToInsert = '<div class="card widget is-not-hidden"><div class="card-title"><i class="ri-emotion-happy-line card-title-label"></i><span>摸鱼日历</span></div><div class="gallery-item"><div data-fancybox="gallery" data-caption="moyurili" href="' + url + '"><a href="#"><img src="' + url + '" alt="moyurili" style="width:100%;"></a></div></div></div>';

    if (isMobile()) {
        columnLeftElement.innerHTML = htmlToInsert + columnLeftElement.innerHTML;
    } else {
        columnRightElement.innerHTML = htmlToInsert + columnRightElement.innerHTML;
    }

}

var moyuImage1 = new Image();
moyuImage1.src = apiUrl1
moyuImage1.onload = function (res) {
    if (hasLoadMoyu) {
        return
    }

    insertMoyuPlaceHolder(moyuImage1.src);
}

moyuImage1.onerror = function (err) {

}

var moyuImage2 = new Image();
moyuImage2.src = apiUrl2
moyuImage2.onload = function (res) {
    if (hasLoadMoyu) {
        return
    }

    insertMoyuPlaceHolder(moyuImage2.src);
}

moyuImage2.onerror = function (err) {

}
// 摸鱼日历 end
// 时间倒计时 begin
function insertCountdownPlaceHolder() {
    var columnLeftElement = document.querySelector("aside[class='column column-side column-left top-sticky']");
    var columnRightElement = document.querySelector("aside[class='column column-side column-right top-sticky']");

    var listen = [{
        title: "今日已经过去",
        endTitle: "小时",
        num: 0,
        percent: "0%"
    }, {
        title: "这周已经过去",
        endTitle: "天",
        num: 0,
        percent: "0%"
    }, {
        title: "本月已经过去",
        endTitle: "天",
        num: 0,
        percent: "0%"
    }, {
        title: "今年已经过去",
        endTitle: "个月",
        num: 0,
        percent: "0%"
    }];

    // 设置一天中的小时
    var hourOfDay = (+new Date - new Date((new Date).toLocaleDateString()).getTime()) / 1000 / 60 / 60;
    var hourOfDayPercent = hourOfDay / 24 * 100;
    listen[0].num = parseInt(hourOfDay);
    listen[0].percent = parseInt(hourOfDayPercent) + "%";

    // 设置一周中的天
    var dayOfWeek = {
        0: 7,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
    }[(new Date).getDay()];
    dayOfWeekPercent = dayOfWeek / 7 * 100;
    listen[1].num = parseInt(dayOfWeek);
    listen[1].percent = parseInt(dayOfWeekPercent) + "%";

    // 设置一个月中的天
    var year = (new Date).getFullYear();
    var dayOfMonth = (new Date).getDate();
    var monthOfYear = (new Date).getMonth() + 1;
    var dayOfMonthPercent = dayOfMonth / new Date(year, monthOfYear, 0).getDate() * 100;
    listen[2].num = dayOfMonth;
    listen[2].percent = parseInt(dayOfMonthPercent) + "%";

    // 设置一年中的月
    var monthOfYearPercent = monthOfYear / 12 * 100;
    listen[3].num = monthOfYear;
    listen[3].percent = parseInt(monthOfYearPercent) + "%";

    var html = "";
    listen.forEach((bean, position) => {
        html += `
						<div class="item">
							<div class="title">
								${bean.title}
								<span class="text">${bean.num}</span>
								${bean.endTitle}
							</div>
							<div class="progress">
								<div class="progress-bar">
									<div class="progress-bar-inner progress-bar-inner-${position}" style="width: ${bean.percent}"></div>
								</div>
								<div class="progress-percentage">${bean.percent}</div>
							</div>
						</div>`
    }
    );

    var htmlToInsert = '<div class="card widget is-not-hidden"><div class="card-title"><i class="ri-hourglass-line card-title-label"></i><span>时间倒计时</span></div><div class="gallery-item nukix_timelife">' + html + '</div></div>';

    if (isMobile()) {
        columnLeftElement.innerHTML = htmlToInsert + columnLeftElement.innerHTML;
    } else {
        columnRightElement.innerHTML = htmlToInsert + columnRightElement.innerHTML;
    }

}
insertCountdownPlaceHolder();
// 时间倒计时 end
// 公告 begin

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://v1.hitokoto.cn?c=b');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        const data = JSON.parse(xhr.responseText);
        const hitokoto = document.querySelector('#hitokoto_text');
        hitokoto.href = 'https://blog.uso6.com/links'
        hitokoto.innerText = data.hitokoto;
    }
}
xhr.send();

// 公告 end