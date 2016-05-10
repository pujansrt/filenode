var settings = {
	height : 400
};

function isEmpty(a) {
	if (!a || a.length === 0 || a === "" || typeof a === "undefined"
			|| !/[^\s]/.test(a) || /^\s*$/.test(a)
			|| a.replace(/\s/g, "") === "") {
		return true;
	} else {
		return false;
	}
}

function isIE9OrBelow(){
   return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10;
}

function elasticTextArea(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight) + "px";
}

function post(path, params, method) {
	method = method || "post"; // Set method to post by default if not
								// specified.
	var form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);
	for ( var key in params) {
		if (params.hasOwnProperty(key)) {
			var hiddenField = document.createElement("input");
			hiddenField.setAttribute("type", "hidden");
			hiddenField.setAttribute("name", key);
			hiddenField.setAttribute("value", params[key]);
			form.appendChild(hiddenField);
		}
	}
	document.body.appendChild(form);
	form.submit();
}

function imageExists(image_url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', image_url, false);
	http.send();
	return http.status != 404;
}

var tagWhitelist_ = {
	'A' : true,
	'B' : true,
	'BODY' : true,
	'BR' : true,
	'DIV' : true,
	'EM' : true,
	'HR' : true,
	'I' : true,
	'IMG' : true,
	'P' : true,
	'SPAN' : true,
	'STRONG' : true
};

var attributeWhitelist_ = {
	'href' : true,
	'src' : true
};

function sanitizeHtml(input) {
	var iframe = document.createElement('iframe');
	if (iframe['sandbox'] === undefined) {
		//alert('Your browser does not support sandboxed iframes. Please upgrade to a modern browser.');
		return '';
	}
	iframe['sandbox'] = 'allow-same-origin';
	iframe.style.display = 'none';
	document.body.appendChild(iframe); // necessary so the iframe contains a
										// document
	iframe.contentDocument.body.innerHTML = input;

	function makeSanitizedCopy(node) {
		if (node.nodeType == Node.TEXT_NODE) {
			var newNode = node.cloneNode(true);
		} else if (node.nodeType == Node.ELEMENT_NODE
				&& tagWhitelist_[node.tagName]) {
			newNode = iframe.contentDocument.createElement(node.tagName);
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes[i];
				if (attributeWhitelist_[attr.name]) {
					newNode.setAttribute(attr.name, attr.value);
				}
			}
			for (i = 0; i < node.childNodes.length; i++) {
				var subCopy = makeSanitizedCopy(node.childNodes[i]);
				newNode.appendChild(subCopy, false);
			}
		} else {
			newNode = document.createDocumentFragment();
		}
		return newNode;
	}
	;

	var resultElement = makeSanitizedCopy(iframe.contentDocument.body);
	document.body.removeChild(iframe);
	return resultElement.innerHTML;
};

function capitalizeString(string) {
	string = string.toLowerCase();
	if (string.indexOf('_') < 0)
		return string.charAt(0).toUpperCase() + string.slice(1);
	var oarr = string.split('_');
	var res = '';
	for (k in oarr) {
		res += oarr[k].charAt(0).toUpperCase() + oarr[k].slice(1) + ' ';
	}
	return res.trim();
}

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function isJsonArrayEmpty(array) {
	return array.filter(function(el) {
		return !jQuery.isEmptyObject(el);
	}).length === 0;
}

function elementToArray(element) {
	return $(element).map(function(_, ele) {
		return $(ele).text();
	}).get();
}

function toggleQnBlock() {

}

var QueryString = function() {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}();

function favorMeModal(title, message) {
	$('#generic_modal .modal-dialog').removeAttr('style');
	$('#generic_modal .modal-footer').html('<button type="button" class="btn btn-default btn-flat confirmFalse" data-dismiss="modal">'+text.close+'</button>');
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal').modal('show');
	$('.modal-backdrop').remove();
}

function confirmModal(title, message, doBtnTitle, callback) {
	message = message || '';
	doBtnTitle = doBtnTitle || text.OK
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal .modal-footer')
			.html(
					'<button type="button" class="btn btn-danger btn-flat confirmTrue" data-dismiss="modal">'
							+ doBtnTitle
							+ '</button><button type="button" class="btn btn-flat btn-default confirmFalse" data-dismiss="modal">'+text.cancel+'</button>');
	$('#generic_modal').modal({
		show : true,
		backdrop : false,
		keyboard : false
	});
	$(".confirmFalse").click(function() {
		$("#generic_modal").modal("hide");
		if (callback) {
			callback(false)
		}
	});
	$(".confirmTrue").click(function() {
		$("#generic_modal").modal("hide");
		if (callback) {
			callback(true)
		}
	});
}

function confirmModalSerial(title, message, doBtnTitle, loadingMessage,callback) {
	message = message || '';
	doBtnTitle = doBtnTitle || text.OK
	$('#mdatatitle').html(title);
	$('#mdata').html(message).css('min-height', '140px');
	$('#generic_modal .modal-footer').html('<button type="button" class="btn btn-danger btn-flat confirmTrueSerial">' + doBtnTitle
							+ '</button><button type="button" class="btn btn-flat btn-default confirmFalseSerial" data-dismiss="modal">'+text.cancel+'</button>');
	$('#generic_modal').modal({
		show : true,
		backdrop : false,
		keyboard : false
	});
	$(".confirmFalseSerial").click(function() {
		$("#generic_modal").modal("hide");
		if (callback) {
			callback(false)
		}
	});
	$(".confirmTrueSerial").click(
			function() {
				// $("#generic_modal").modal("hide");
				if (callback) {
					var btn = $('.confirmTrueSerial');
					btn.attr('data-loading-text',
							'<i class="fa fa-spinner fa-pulse"></i> '
									+ loadingMessage);
					btn.button('loading');
					$('.confirmFalseSerial').addClass('disabled');
					callback(true)
				}
			});
}

function callbackModal(title, message, btnYES, btnNO, callback) {
	message = message || '';
	btnYES = btnYES || text.OK;
	if (btnNO == null) {
		btnNO = '';
	} else {
		btnNO = '<button type="button" class="btn btn-default btn-flat confirmFalse" data-dismiss="modal">'
				+ btnNO + '</button>'
	}
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal .modal-footer')
			.html(
					'<button type="button" class="btn btn-danger btn-flat confirmTrue" data-dismiss="modal">'
							+ btnYES + '</button>' + btnNO);
	$('#generic_modal').modal({
		show : true,
		backdrop : false,
		keyboard : false
	});
	$(".confirmFalse").click(function() {
		$("#generic_modal").modal("hide");
		if (callback) {
			callback(false)
		}
	});
	$(".confirmTrue").click(function() {
		$("#generic_modal").modal("hide");
		if (callback) {
			callback(true)
		}
	});
}

function sleep1(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function getRandomArbitrary(min, max) {
	return ~~(Math.random() * (max - min + 1)) + min;
}

function notif(t, msg, type, delay) {
	var delay = delay || 3000;
	if (delay < 1000)
		delay = 3000;
	var type = type || 'pastel-info';
	var notify = $
			.notify(
					{
						title : t,
						message : msg
					},
					{
						allow_dismiss : true,
						delay : delay,
						placement : {
							from : "top",
							align : "center"
						},
						animate : {
							enter : 'animated fadeInDown',
							exit : 'animated fadeOutUp'
						},
						type : type,
						template : '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert"><span data-notify="title">{1}</span><span data-notify="message">{2}</span></div>'
					});
	return notify;
}

function notifUpdate(notify, type, msg) {
	setTimeout(function() {
		notify.update('type', type);
		notify.update('message', msg);
	}, 2000);
	setTimeout(function() {
		notify.close();
	}, 8000);
}

String.prototype.args = function()
{
	var temp = this;
	for (var i = 0; i < arguments.length; i++) {
		//console.log(arguments[i]);
		var reg = new RegExp('\\{'+(i+1)+'}', 'g');
		temp = temp.replace(reg, arguments[i]);
	}
    return temp;
};

// custom function ends

$(function() {

	$('.nav li.dropdown').hover(function() {
		$(this).addClass('open');
	}, function() {
		$(this).removeClass('open');
	});

	$.fn.goValidate = function() {
		var $ele = this, $inputs = $ele.find('input:text, input:password'), $selects = $ele
				.find('select'), $textAreas = $ele.find('textarea');

		var validators = {
			name : {
				regex : /^[A-Za-z]{3,}$/
			},
			tx : {
				required : true
			},
			templateName : {
				regex : /^.{6,}$/
			},
			username : {
				regex : /^[A-Za-z]{6,}$/
			},
			firstName : {
				regex : /^[A-Za-z]{3,}$/
			},
			lastName : {
				regex : /^[A-Za-z]{3,}$/
			},
			town : {
				regex : /^[A-Za-z]{3,}$/
			},
			postcode : {
				regex : /^.{3,}$/
			},
			password1 : {
				regex : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
			},
			password1_repeat : {
				regex : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
			},
			email : {
				regex : /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
			},
			phone : {
				regex : /^[2-9]\d{2}-\d{3}-\d{4}$/,
			},
			body : {
				regex : /^.{3,}$/
			},
			country : {
				regex : /^(?=\s*\S).*$/,
			}
		};
		var validate = function(klass, value) {
			var isValid = true, error = '';

			if (!value && /required/.test(klass)) {
				error = 'This field is required';
				isValid = false;
			} else {
				klass = klass.split(/\s/);
				$.each(klass, function(i, k) {
					if (validators[k]) {
						if (value && !validators[k].regex.test(value)) {
							isValid = false;
							error = validators[k].error;
						}
					}
				});
			}
			return {
				isValid : isValid,
				error : error
			}
		};
		var showError = function($e) {
			var klass = $e.attr('class'), value = $e.val(), test = validate(
					klass, value);
			$e.removeClass('invalid');
			$('#form-error').addClass('hide');
			$('.modal-footer .btn').addClass('disabled');
			if (!test.isValid) {
				$e.addClass('invalid');
				if (typeof $e.data("shown") == "undefined"
						|| $e.data("shown") == false) {
					$e.popover('show');
				}
			} else {
				$e.popover('hide');
				$('.modal-footer .btn').removeClass('disabled');
			}
		};

		$inputs.on('keyup mouseover', function() {
			showError($(this));
		});
		$selects.change(function() {
			showError($(this));
		});
		$textAreas.keyup(function() {
			showError($(this));
		});
		$inputs.on('shown.bs.popover', function() {
			$(this).data("shown", true);
		});
		$inputs.on('hidden.bs.popover', function() {
			$(this).data("shown", false);
		});

		$ele.submit(function(e) {
			$inputs.each(function() { /* test each input */
				if ($(this).is('.required') || $(this).hasClass('invalid')) {
					showError($(this));
				}
			});
			$selects.each(function() { /* test each input */
				if ($(this).is('.required') || $(this).hasClass('invalid')) {
					showError($(this));
				}
			});
			$textAreas.each(function() { /* test each input */
				if ($(this).is('.required') || $(this).hasClass('invalid')) {
					showError($(this));
				}
			});
			if ($form.find('input.invalid').length) { /* form is not valid */
				e.preventDefault();
				$('#form-error').toggleClass('hide');
			}
		});
		return this;
	};
	$('.validationElement').goValidate();

});
function numToEmpty(num){
	return "";
}
function numToNumber(num){
	return num;
}

function numToLetter(num) {
	var lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var upper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	var letters = "";
	if(num > 26) {
		var a = parseInt(num/26);
		var b = num%26;
		if(b <= 0) {
			b = 26;
			a -= 1;
		}
		if(a <= 0) {
			a = 26;
		}
		
		letters += upper[a-1];
		letters += lower[b-1];
	}
	else {
		letters = upper[num-1];
	}
	return letters
}
function numToRoman(num) {
	var numbers = [1000, 900,  500,  400,  100,   90,  50,   40,   10,    9,    5,    4,    1];
	var letters = ["M",  "CM",  "D",  "CD", "C",  "XC", "L",  "XL",  "X",  "IX", "V",  "IV", "I"];

	var roman = "";
	for (var i = 0; i < numbers.length; i++) {
            while (num >= numbers[i]) {
               roman += letters[i];
               num -= numbers[i];
            }
    }
	return roman;
}

function numToThai(num) {
	var thais = ['ก','ข','ค','ง','จ','ฉ','ช','ซ','ฌ','ญ','ฎ','ฏ','ฐ','ณ','ด','ต','ถ','ท','ธ','น','บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ล','ว','ศ','ษ','ส','ห','ฬ','อ','ฮ'];
	
	if(num > 39) {
		var a = parseInt(num/39);
		var b = num%39;
		var letters = "";
		if(b <= 0) {
			b = 39;
			a -= 1;
		}
		if(a <= 0) {
			a = 39;
		}
		
		letters += thais[a-1];
		letters += thais[b-1];
	}
	else {
		letters = thais[num-1];
	}
	return letters;
}

function getShortMonths(locale) {
	var temp = null;
	switch (locale) {
	case "en":
		temp = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		break;
	case "th":
		temp = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
		break;

	default:
		temp = ["unknown locale"];
		break;
	}
	return temp;
}
function getDaysOfWeek(locale) {
	var temp = null;
	switch (locale) {
	case "en":
		temp = ["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"];
		break;
	case "th":
		temp = ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"];
		break;

	default:
		temp = ["unknown locale"];
		break;
	}
	return temp;
}
