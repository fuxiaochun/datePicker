/**
 * varFn Date Picker
 * @author Fu Xiaochun
 */



function getDates() {
	var date = new Date();
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		date: date.getDate(),
		day: date.getDay(),
		hour: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
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

function makeData(s, c, e) {
	var total = s + c + e;
}

function getDays(timeStamp) {

	var date = typeof timeStamp === 'undefined' ? new Date() : new Date(timeStamp);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;

	// 本月和上下月的每月总天数
	var curMonthDays = getDaysEveryMonth(year, month, 0);
	var lastMonthDays = getDaysEveryMonth(year, month - 1, 0);
	var nextMonthDays = getDaysEveryMonth(year, month + 1, 0);

	// 当月前面空的天数
	var startDays = getTheDay(year, month - 1, 1);
	var endDays = 6 - getTheDay(year, month - 1, curMonthDays);

	var daysData = makeData(startDay, curMonthDays, endDay);


}

function initHTML() {
	var curYear = getDates().year;
	var curMonth = getDates().month;
	var weekTpl = getWeekTpl();
	var datesTpl = getDays();

	var $datePicker = $('<div class="dp-wrap" id="varfn-dp"><div class="dp-menu"><div class="dp-nav" id="varfn-lastY" title="上一年">&lt;&lt;</div><div class="dp-nav" id="varfn-lastM" title="上一月">&lt;</div><div class="ym"><span class="y" id="varfn-dp-y">' + curYear + '</span> 年 <span class="m" id="varfn-dp-m">' + curMonth + '</span> 月 </div><div class="dp-nav" id="varfn-nextM" title="下一月">&gt;</div><div class="dp-nav" id="varfn-nextY" title="下一年">&gt;&gt;</div></div><div class="day" id="varfn-dp-day">' + weekTpl + '</div><ul class="date" id="varfn-dp-date">' + datesTpl + '</ul></div>');
	$('body').append($datePicker);
}

$(function() {
	initHTML();
});