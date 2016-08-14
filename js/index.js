/**
 * varFn Date Picker
 * @author Fu Xiaochun
 */



function getDates(timeStamp) {
	var D = typeof timeStamp === 'undefined' ? new Date() : new Date(timeStamp);
	return {
		year: D.getFullYear(),
		month: D.getMonth() + 1,
		date: D.getDate(),
		day: D.getDay(),
		hour: D.getHours(),
		min: D.getMinutes(),
		sec: D.getSeconds()
	};
}

function getDaysEveryMonth(y, m, d) {
	return new Date(y, m, d).getDate();
}

function getWeekTpl() {
	var week = '日一二三四五六';
	var cls = '';
	var html = '';
	for (var i = 0; i < 7; i++) {
		cls = (i === 0) || (i === 6) ? 'class="red"' : '';
		html += '<span ' + cls + '>' + week.charAt(i) + '</span>';
	}
	return html;
}

function getTheDay(y, m, d) {
	return new Date(y, m, d).getDay();
}

function makeDaysArr (len,position,monthDays){
	var arr = [];
	var i = 0;
	if (position === 'desc') {
		for(;i<len;i++){
			arr.unshift(monthDays - i);
		}
	}else{
		for(;i<len;i++){
			arr.push(i+1);
		}
	}
	return arr;
}

function makeDateListByWeek(arr){
	var len = arr.length;
	var weeks = len/7;
	var start = 0;
	var end = 0;
	var tempArr = [];

	for(var i= 0; i < weeks; i++){
		tempArr[i] = arr.splice(0, 7);
	}
	return tempArr;
}

function getDateTpl(timeStamp) {

	var D = getDates(timeStamp);
	var year = D.year;
	var month = D.month;
	var day = D.date;

	var TODAY = getDates();
	var todayStr = TODAY.year+'/'+TODAY.month+'/'+TODAY.date;

	// 本月和上下月的每月总天数
	var curMonthDays = getDaysEveryMonth(year, month, 0);
	var lastMonthDays = getDaysEveryMonth(year, month - 1, 0);
	var nextMonthDays = getDaysEveryMonth(year, month + 1, 0);

	// 当月前面空的天数
	var startDays = getTheDay(year, month - 1, 1);
	var endDays = 6 - getTheDay(year, month - 1, curMonthDays);

	var beforeDaysArr = makeDaysArr(startDays,'desc',lastMonthDays);
	var afterDaysArr = makeDaysArr(endDays,'asc');
	var curDaysArr = makeDaysArr(curMonthDays,'asc');

	// 日期列表数据:一维数组，以月为组
	var dateListArr = beforeDaysArr.concat(curDaysArr).concat(afterDaysArr);

	// 日期列表数据：二维数组，以周为组
	var dateListArrByWeek = makeDateListByWeek(dateListArr);

	// 拼接字符串
	var html = '';
	var len = dateListArrByWeek.length;
	var curYM = year+'/'+month;
	var curYMD = '';
	var todayClassStr = '';
	var isFirstWeek,
		isLastWeek,
		loopDate;
	for(var i = 0; i < len; i++){
		html += '<li>';
			for (var j = 0; j < 7; j++) {

				loopDate = dateListArrByWeek[i][j];
				curYMD = curYM +'/'+ loopDate;
				isFirstWeek = i === 0 && loopDate > 20;
				isLastWeek  = i === len-1 && loopDate < 10;
				todayClassStr = curYMD === todayStr ? 'class="cur"' : '';

				if (  isFirstWeek || isLastWeek) {
					html += '<del>'+ loopDate +'</del>';
				}else{
					html += '<span ' + todayClassStr + ' date-time="' + curYMD + '">'+ loopDate +'</span>';
				}
			}
		html += '</li>';
	}
	return html;

}

function initHTML(timeStamp) {
	var timeStr = typeof timeStamp === 'undefined' ? +new Date(): timeStamp;
	var curYear = getDates(timeStr).year;
	var curMonth = getDates(timeStr).month;
	var weekTpl = getWeekTpl();
	var datesTpl = getDateTpl(timeStr);

	var $datePicker = $('<div class="dp-wrap" id="varfn-dp"><div class="dp-menu"><div class="dp-nav" id="varfn-lastY" title="上一年">&lt;&lt;</div><div class="dp-nav" id="varfn-lastM" title="上一月">&lt;</div><div class="ym"><span class="y" id="varfn-dp-y">' + curYear + '</span> 年 <span class="m" id="varfn-dp-m">' + curMonth + '</span> 月 </div><div class="dp-nav" id="varfn-nextM" title="下一月">&gt;</div><div class="dp-nav" id="varfn-nextY" title="下一年">&gt;&gt;</div></div><div class="day" id="varfn-dp-day">' + weekTpl + '</div><ul class="date" id="varfn-dp-date">' + datesTpl + '</ul></div>');
	$('body').append($datePicker);
}

$(function() {
	initHTML();
});