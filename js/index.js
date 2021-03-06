/**
 * varFn Date Picker
 * @author Fu Xiaochun
 */

(function() {

	// 根据时间戳获取时间信息。
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

	// 获取指定月的总天数
	function getDaysEveryMonth(y, m, d) {
		return new Date(y, m, d).getDate();
	}

	// 获取星期的html模板
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

	// 获取指定日期是星期几
	function getTheDay(y, m, d) {
		return new Date(y, m, d).getDay();
	}

	// 处理生成日历天数的数组。
	function makeDaysArr(len, position, monthDays) {
		var arr = [];
		var i = 0;
		if (position === 'desc') {
			for (; i < len; i++) {
				arr.unshift(monthDays - i);
			}
		} else {
			for (; i < len; i++) {
				arr.push(i + 1);
			}
		}
		return arr;
	}

	// 以周为单位生成日历数据，返回二维数组。
	function makeDateListByWeek(arr) {
		var len = arr.length;
		var weeks = len / 7;
		var start = 0;
		var end = 0;
		var tempArr = [];

		for (var i = 0; i < weeks; i++) {
			tempArr[i] = arr.splice(0, 7);
		}
		return tempArr;
	}

	// 根据时间戳获取指定月的日历的HTML模板
	function getDateTpl(timeStamp) {

		var D = getDates(timeStamp);
		var year = D.year;
		var month = D.month;
		var day = D.date;

		var TODAY = getDates();
		var todayStr = TODAY.year + '/' + TODAY.month + '/' + TODAY.date;

		// 本月和上下月的每月总天数
		var curMonthDays = getDaysEveryMonth(year, month, 0);
		var lastMonthDays = getDaysEveryMonth(year, month - 1, 0);
		var nextMonthDays = getDaysEveryMonth(year, month + 1, 0);

		// 当月前面空的天数
		var startDays = getTheDay(year, month - 1, 1);
		var endDays = 6 - getTheDay(year, month - 1, curMonthDays);

		var beforeDaysArr = makeDaysArr(startDays, 'desc', lastMonthDays);
		var afterDaysArr = makeDaysArr(endDays, 'asc');
		var curDaysArr = makeDaysArr(curMonthDays, 'asc');

		// 日期列表数据:一维数组，以月为组
		var dateListArr = beforeDaysArr.concat(curDaysArr).concat(afterDaysArr);

		// 日期列表数据：二维数组，以周为组
		var dateListArrByWeek = makeDateListByWeek(dateListArr);

		// 拼接字符串
		var html = '';
		var len = dateListArrByWeek.length;
		var curYM = year + '/' + month;
		var curYMD = '';
		var todayClassStr = '';
		var isFirstWeek,
			isLastWeek,
			loopDate;
		for (var i = 0; i < len; i++) {
			html += '<li>';
			for (var j = 0; j < 7; j++) {

				loopDate = dateListArrByWeek[i][j];
				curYMD = curYM + '/' + loopDate;
				isFirstWeek = i === 0 && loopDate > 20;
				isLastWeek = i === len - 1 && loopDate < 10;
				todayClassStr = curYMD === todayStr ? 'class="cur"' : '';

				if (isFirstWeek || isLastWeek) {
					html += '<del>' + loopDate + '</del>';
				} else {
					html += '<span ' + todayClassStr + ' data-time="' + curYMD + '">' + loopDate + '</span>';
				}
			}
			html += '</li>';
		}
		return html;
	}

	// 初始化渲染日历
	function initHTML(timeStamp) {
		var timeStr = typeof timeStamp === 'undefined' ? +new Date() : timeStamp;
		var curYear = getDates(timeStr).year;
		var curMonth = getDates(timeStr).month;
		var weekTpl = getWeekTpl();
		var datesTpl = getDateTpl(timeStr);

		var $datePicker = $('<div class="dp-wrap" id="varfn-dp"><div class="dp-menu"><div class="dp-nav" data-nav="lastY" title="上一年">&lt;&lt;</div><div class="dp-nav" data-nav="lastM" title="上一月">&lt;</div><div class="ym"><dl class="y"><dt data-type="year" id="varfn-curYear">' + curYear + '</dt></dl><p>年</p><dl class="m"><dt data-type="month" id="varfn-curMonth">' + curMonth + '</dt></dl><p>月</p></div><div class="dp-nav" data-nav="nextM" title="下一月">&gt;</div><div class="dp-nav" data-nav="nextY" title="下一年">&gt;&gt;</div></div><div class="day" id="varfn-dp-day">' + weekTpl + '</div><ul class="date" id="varfn-dp-date">' + datesTpl + '</ul></div>');
		$('body').append($datePicker);
	}

	////////////////////////////////////////////////////////////////////////////

	// 日历下拉选项数据
	var selectionData = {
		year: (function() {
			var arr = [];
			var start = new Date().getFullYear() - 50;
			for (var i = 0; i < 100; i++) {
				arr.push(start++);
			}
			return arr;
		})(),
		month: (function() {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		})()
	};

	// 初始化日历年月下拉选项
	function initSelection() {
		var $html = null;
		$('#varfn-curYear, #varfn-curMonth').on('click', function(e) {

			var $this = $(this);
			var $parent = $this.parent();
			var type = $this.data('type');
			var html = '';
			var data = selectionData[type];

			if ($parent.hasClass('active')) {
				return false;
			}

			$parent.addClass('active').siblings('dl').removeClass('active');
			$('.date-selector').remove();

			html += '<dd class="date-selector"><ul>';
			for (var i = 0; i < data.length; i++) {
				html += '<li>' + data[i] + '</li>';
			}
			html += '</ul></dd>';
			$html = $(html);
			$parent.append($html);
			$html.show();

			bindSelection();

			return false;
		});

		$('#varfn-dp').on('click', function() {
			$('.date-selector').hide();
			$('.ym dl').removeClass('active');
		});
	}

	// 获取下拉选择后的日期
	function getSelectedDate() {
		var y = $('#varfn-curYear').text();
		var m = $('#varfn-curMonth').text();
		return y + '/' + m + '/1';
	}

	// 绑定下拉选项相关事件。
	function bindSelection() {
		var $selector = $('.date-selector');
		$selector.on('click', 'li', function() {
			var $this = $(this);
			var $p = $this.parents('dd');
			var val = $this.text();
			$p.siblings('dt').text(val);
			$p.hide();
			$('.ym dl').removeClass('active');
			changeDate(getSelectedDate());
		});

		// 滚轮事件
		var $selectorContent = $selector.children('ul');
		var selectorHeight = $selector.height();
		var whellContentTop = 0;
		var pMinTop = selectorHeight - $selectorContent.height();
		var movedifs = 100;

		function scroll(n) {
			if (n > 0) { // up
				whellContentTop += movedifs;
				whellContentTop = whellContentTop > 0 ? 0 : whellContentTop;
			} else { // down
				whellContentTop -= movedifs;
				whellContentTop = whellContentTop < pMinTop ? pMinTop : whellContentTop;
			}

			$selectorContent.stop().animate({
				'top': whellContentTop
			}, 200);
		}

		$selector[0].onmousewheel = function(evt) {
			var e = evt || window.event;
			scroll(e.wheelDelta);
			return false;
		};

		$selector.on('DOMMouseScroll', function(e) {
			scroll(-e.detail);
			return false;
		});
	}

	// 点击选择年月
	function initPageNav() {
		$('.dp-menu').on('click', '.dp-nav', function() {
			var $this = $(this);
			var type = $this.data('nav');
			var $curYear = $('#varfn-curYear');
			var $curMonth = $('#varfn-curMonth');
			var year = $curYear.text() / 1;
			var month = $curMonth.text() / 1;

			switch (type) {
				case 'lastY':
					year -= 1;
					break;
				case 'lastM':
					month -= 1;
					if (month < 1) {
						month = 12;
						year = year - 1;
					}
					break;
				case 'nextM':
					month += 1;
					if (month > 12) {
						month = 1;
						year = year + 1;
					}
					break;
				case 'nextY':
					year += 1;

					// no default
			}

			$curYear.text(year);
			$curMonth.text(month);

			changeDate(getSelectedDate());

		});
	}

	// 日期格式化
	function dateFormat(time, template) {
		time = parseInt(time);
		var date = new Date(time);
		var Y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var i = date.getMinutes();
		var s = date.getSeconds();

		function leftPad(n) {
			if (n < 10) {
				return '0' + n;
			}
			return n + '';
		}

		var data = {
			Y: Y,
			y: Y.toString().substr(-2),
			M: leftPad(m),
			m: m,
			D: leftPad(d),
			d: d,
			H: leftPad(h),
			h: h,
			I: leftPad(i),
			i: i,
			S: leftPad(s),
			s: s
		};

		var reg = /([YMDHISymdhis])/g;
		return template.replace(reg, function(match, u1) {
			return data[u1];
		});
	}

	// 选择日期输入
	function initInput(obj) {
		$('#varfn-dp-date').on('click', 'span', function() {
			var date = $(this).data('time');
			var formate = obj.data('dateformat');
			date = +new Date(date);
			obj.val(dateFormat(date, formate));
		});
		$(document).on('click', '#varfn-dp-date span', function() {
			$('#varfn-dp').remove();
		});
	}

	// 根据拿到的日历数据重新渲染日历
	function changeDate(date) {
		var datesTpl = getDateTpl(date);
		$('#varfn-dp-date').html(datesTpl);
	}

	// 初始化日历
	function init() {
		var inputForm = null;
		var isFocus = false;
		$(document).on('click', '[data-node=datePicker]', function(e) {
			var $this = $(this);
			var thisHeight, $offset, left, top;
			e.stopPropagation();

			if (inputForm === $this) {
				return false;
			}

			isFocus = true;
			thisHeight = $this.outerHeight();
			$offset = $this.offset();
			left = $offset.left;
			top = $offset.top + thisHeight;

			inputForm !== null && $('#varfn-dp').remove();
			initDatePicker($this);
			inputForm = $this;

			$('.dp-wrap').css({
				left: left,
				top: top
			}).show();
		});

		$(document).on('click', '#varfn-dp', function(e) {
			e.stopPropagation();
		});

		$(document).on('click', function() {
			$('#varfn-dp').remove();
		});

		function initDatePicker(obj) {
			initHTML();
			initSelection();
			initPageNav();
			initInput(obj);
		}
	}

	$(function() {
		init();
	});
})();