function resolveReferences(json) {
    if (typeof json === 'string')
        json = JSON.parse(json);

    var byid = {}, // all objects by id
        refs = []; // references to objects that could not be resolved
    json = (function recurse(obj, prop, parent) {
        if (typeof obj !== 'object' || !obj) // a primitive value
            return obj;
        if ("$ref" in obj) { // a reference
            var ref = obj.$ref;
            if (ref in byid)
                return byid[ref];
            // else we have to make it lazy:
            refs.push([parent, prop, ref]);
            return;
        } else if ("$id" in obj) {
            var id = obj.$id;
            delete obj.$id;
            if ("$values" in obj) // an array
                obj = obj.$values.map(recurse);
            else // a plain object
                for (var prop in obj)
                    obj[prop] = recurse(obj[prop], prop, obj)
            byid[id] = obj;
        }
        return obj;
    })(json); // run it!

    for (var i=0; i<refs.length; i++) { // resolve previously unknown references
        var ref = refs[i];
        ref[0][ref[1]] = byid[refs[2]];
        // Notice that this throws if you put in a reference at top-level
    }
    return json;
}  

var keysmap = {
        'newfile': ['&#8963;-N', '&#8984;-N'],
        'savefile': ['&#8963;-S', '&#8984;-S'],
        'downloadfile': ['', ''],
        'downloadproject': ['', ''],
        'replace': ['&#8679;-&#8963;-F', '&#8984;-&#8997;-F'],
        'cut': ['&#8963;-X', '&#8984;-X'],
        'copy': ['&#8963;-C', '&#8984;-C'],
        'paste': ['&#8963;-V', '&#8984;-V'],
        'selectall': ['&#8963;-A', '&#8984;-A'],
        'format': ['', ''],
        'minify': ['&#8963;-M', '&#8984;-M'],
        'maxify': ['&#8963;-B', '&#8984;-B'],
        'searchfile': ['', ''],
        'searcheditor': ['&#8963;-F', '&#8984;-F'],
        'replaceeditor': ['&#8679;-&#8963;-F', '&#8984;-&#8997;-F'],
        'fullscreen': ['F11', 'F11'],
};

var selectmsg = '';

function shortcutkeys(name) {
        var op = '';
        var os = navigator.platform;
        var keyarr = keysmap[name] || ['', ''];
        os.indexOf('Mac') >= 0 ? op = keyarr[1] || '' : op = keyarr[0] || '';
        op.length == 0 ? op = '' : op = '<i class="fa fa-keyboard-o"></i> ' + op;
        return op;
}

var metafilejson = { "js": {"spec": "javascript", "mode": "text/javascript"}, "java": {"spec": "clike", "mode": "text/x-java"}, "jsp": {"spec": "htmlembedded", "mode": "application/x-jsp"}, "html": {"spec": "htmlmixed", "mode": "text/html"}, "txt": {"spec": "null", "mode": "text/plain"}, "properties": {"spec": "properties", "mode": "text/x-properties"}, "css": {"spec": "css", "mode": "text/css"}, "xml": {"spec": "xml", "mode": "application/xml"} };
function isString(value){ if (value === undefined || value === null){ return false; } return typeof value === 'string' || value instanceof String; } 


var allowedext = ['java', 'css', 'js', 'md', 'txt', 'html', 'xml', 'jsp'];
    
var settings = {
	height : 400
};

function any(a, b) {
    return a || b;
}

function openTreeNode(fname){ 
	$('#tree').jstree(true).deselect_all();
//	var arr = fname.split('/'); var openarr = []; for(k in arr){ 
//		var p = pathsCombination(arr,k); p = p.replace(/\/\//gi,'/'); 
//		if(p != undefined){ $('#tree').jstree('open_node',p); openarr.push(p); } 
//		if(k==arr.length-1) $('#tree').jstree('select_node',p); 
//	} 
//	var v = $.parseJSON(localStorage.getItem('jstree')); 
//	v['state']['core']['selected'] = [fname]; 
//	v['state']['core']['open'] = openarr; 
//	localStorage.setItem('jstree',JSON.stringify(v)); 
}

function blockScreenUI(msg, milliseconds) { var spinner2 = '<img src="'+cp+ '/config/images/spinner.gif" width=\"44\" height=\"44\"/>'; var spinner = '<div class=spinner></div>'; if(!milliseconds) { milliseconds = 0; } if(!msg) { msg = spinner; } else { msg = spinner + '<br><span class=\"blockui-eaf\">' + msg + '</span>'; } $.blockUI({ message: msg, css: { width: '30%', top: '40%', border: 'none', padding: '15px', backgroundColor: '#AAA', '-webkit-border-radius': '0px', '-moz-border-radius': '0px', opacity: .7, color: '#fff', cursor: 'wait' }, overlayCSS: { opacity: 0.6, cursor: 'wait' }, timeout: milliseconds }); } 
function blockScreenTopUI(msg, milliseconds) { var spinner2 = '<img src="'+cp+'/config/images/spinner.gif" width=\"44\" height=\"44\"/>'; var spinner = '<div class=spinner></div>'; if(!milliseconds) { milliseconds = 0; } if(!msg) { msg = spinner; } else { msg = spinner + '<br><span class=\"blockui-eaf\">' + msg + '</span>'; } top.$.blockUI({ message: msg, css: { width: '30%', top: '40%', border: 'none', padding: '15px', backgroundColor: '#AAA', '-webkit-border-radius': '0px', '-moz-border-radius': '0px', opacity: .7, color: '#fff', cursor: 'wait' }, overlayCSS: { opacity: 0.6, cursor: 'wait' }, timeout: milliseconds }); } 
function blockScreenTopUI2(msg, milliseconds) { if(!milliseconds) { milliseconds = 0; } if(!msg) { msg = '<img src="config/images/spinner.gif" width=\"44\" height=\"44\"/>'; } else { msg = '<img src="config/images/spinner.gif" width=\"44\" height=\"44\"/><br><span class=\"blockui-eaf\">' + msg + '</span>'; } top.$.blockUI({ message: msg, css: { width: '30%', top: '40%', border: 'none', padding: '15px', backgroundColor: '#AAA', '-webkit-border-radius': '0px', '-moz-border-radius': '0px', opacity: .7, color: '#fff', cursor: 'wait' }, overlayCSS: { opacity: 0.6, cursor: 'wait' }, timeout: milliseconds }); } 
function unblockScreenUI() { $.unblockUI(); } 
function unblockTopScreenUI() { top.$.unblockUI(); }
function pathsCombination(arr, len){ var op=''; for(var k=0; k < arr.length; k++){ op += '/' + arr[k] ; if(k==len)return op; } }


var defaulttheme = "ambiance"; 
if(isString(localStorage.getItem('onewebtheme'))){ defaulttheme = localStorage.getItem('onewebtheme').replace(/"/g, ''); }
var the={use_codemirror:!window.location.href.match(/without-codemirror/),beautify_in_progress:!1,editor:null};
function run_tests() { var st = new SanityTest(); run_javascript_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); run_css_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); run_html_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); JavascriptObfuscator.run_tests(st); P_A_C_K_E_R.run_tests(st); Urlencoded.run_tests(st); MyObfuscate.run_tests(st); var results = st.results_raw() .replace(/&/g, '&amp;') .replace(/</g, '&lt;') .replace(/>/g, '&gt;') .replace(/ /g, '&nbsp;') .replace(/\r/g, '·') .replace(/\n/g, '<br>'); $('#testresults').html(results).show(); }
function run_tests() { var st = new SanityTest(); run_javascript_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); run_css_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); run_html_tests(st, Urlencoded, js_beautify, html_beautify, css_beautify); JavascriptObfuscator.run_tests(st); P_A_C_K_E_R.run_tests(st); Urlencoded.run_tests(st); MyObfuscate.run_tests(st); var results = st.results_raw() .replace(/&/g, '&amp;') .replace(/</g, '&lt;') .replace(/>/g, '&gt;') .replace(/ /g, '&nbsp;') .replace(/\r/g, '·') .replace(/\n/g, '<br>'); $('#testresults').html(results).show(); }
function read_settings_from_cookie() { $('#tabsize').val(any($.cookie('tabsize'), '4')); $('#brace-style').val(any($.cookie('brace-style'), 'collapse')); $('#detect-packers').prop('checked', $.cookie('detect-packers') !== 'off'); $('#max-preserve-newlines').val(any($.cookie('max-preserve-newlines'), '5')); $('#keep-array-indentation').prop('checked', $.cookie('keep-array-indentation') === 'on'); $('#break-chained-methods').prop('checked', $.cookie('break-chained-methods') === 'on'); $('#indent-scripts').val(any($.cookie('indent-scripts'), 'normal')); $('#space-before-conditional').prop('checked', $.cookie('space-before-conditional') !== 'off'); $('#wrap-line-length').val(any($.cookie('wrap-line-length'), '0')); $('#unescape-strings').prop('checked', $.cookie('unescape-strings') === 'on'); $('#jslint-happy').prop('checked', $.cookie('jslint-happy') === 'on'); $('#end-with-newline').prop('checked', $.cookie('end-with-newline') === 'on'); $('#indent-inner-html').prop('checked', $.cookie('indent-inner-html') === 'on'); $('#comma-first').prop('checked', $.cookie('comma-first') === 'on'); $('#e4x').prop('checked', $.cookie('e4x') === 'on'); }
function store_settings_to_cookie() { var opts = { expires: 360 }; $.cookie('tabsize', $('#tabsize').val(), opts); $.cookie('brace-style', $('#brace-style').val(), opts); $.cookie('detect-packers', $('#detect-packers').prop('checked') ? 'on' : 'off', opts); $.cookie('max-preserve-newlines', $('#max-preserve-newlines').val(), opts); $.cookie('keep-array-indentation', $('#keep-array-indentation').prop('checked') ? 'on' : 'off', opts); $.cookie('break-chained-methods', $('#break-chained-methods').prop('checked') ? 'on' : 'off', opts); $.cookie('space-before-conditional', $('#space-before-conditional').prop('checked') ? 'on' : 'off',opts); $.cookie('unescape-strings', $('#unescape-strings').prop('checked') ? 'on' : 'off', opts); $.cookie('jslint-happy', $('#jslint-happy').prop('checked') ? 'on' : 'off', opts); $.cookie('end-with-newline', $('#end-with-newline').prop('checked') ? 'on' : 'off', opts); $.cookie('wrap-line-length', $('#wrap-line-length').val(), opts); $.cookie('indent-scripts', $('#indent-scripts').val(), opts); $.cookie('indent-inner-html', $('#indent-inner-html').prop('checked') ? 'on' : 'off', opts); $.cookie('comma-first', $('#comma-first').prop('checked') ? 'on' : 'off', opts); $.cookie('e4x', $('#e4x').prop('checked') ? 'on' : 'off', opts); }
function unpacker_filter(source) { var trailing_comments = '', comment = '', unpacked = '', found = false; do { found = false; if (/^\s*\/\*/.test(source)) { found = true; comment = source.substr(0, source.indexOf('*/') + 2); source = source.substr(comment.length).replace(/^\s+/, ''); trailing_comments += comment + "\n"; } else if (/^\s*\/\//.test(source)) { found = true; comment = source.match(/^\s*\/\/.*/)[0]; source = source.substr(comment.length).replace(/^\s+/, ''); trailing_comments += comment + "\n"; } } while (found); var unpackers = [P_A_C_K_E_R, Urlencoded, MyObfuscate]; for (var i = 0; i < unpackers.length; i++) { if (unpackers[i].detect(source)) { unpacked = unpackers[i].unpack(source); if (unpacked != source) { source = unpacker_filter(unpacked); } } } return trailing_comments + source; }                
function beautify() { if (the.beautify_in_progress) return; store_settings_to_cookie(); the.beautify_in_progress = true; var source = editor.getValue(), output, opts = {}; opts.indent_size = $('#tabsize').val(); opts.indent_char = opts.indent_size == 1 ? '\t' : ' '; opts.max_preserve_newlines = $('#max-preserve-newlines').val(); opts.preserve_newlines = opts.max_preserve_newlines !== "-1"; opts.keep_array_indentation = $('#keep-array-indentation').prop('checked'); opts.break_chained_methods = $('#break-chained-methods').prop('checked'); opts.indent_scripts = $('#indent-scripts').val(); opts.brace_style = $('#brace-style').val(); opts.space_before_conditional = $('#space-before-conditional').prop('checked'); opts.unescape_strings = $('#unescape-strings').prop('checked'); opts.jslint_happy = $('#jslint-happy').prop('checked'); opts.end_with_newline = $('#end-with-newline').prop('checked'); opts.wrap_line_length = $('#wrap-line-length').val(); opts.indent_inner_html = $('#indent-inner-html').prop('checked'); opts.comma_first = $('#comma-first').prop('checked'); opts.e4x = $('#e4x').prop('checked'); if (looks_like_html(source)) { output = html_beautify(source, opts); } else { if ($('#detect-packers').prop('checked')) { source = unpacker_filter(source); } output = js_beautify(source, opts); } if (editor) { editor.setValue(output); } the.beautify_in_progress = false; }
function looks_like_html(source) { var trimmed = source.replace(/^[ \t\n\r]+/, ''); var comment_mark = '<' + '!-' + '-'; return (trimmed && (trimmed.substring(0, 1) === '<' && trimmed.substring(0, 4) !== comment_mark)); }
function appendToConsole(msg) { $('#console > section').append('<small><b>[' + moment().format('HH:mm:ss') + ']</b> - ' + msg + '</small><br>'); $("#console section").animate({ scrollTop: $(document).height() }, "slow"); if(editor.getOption("fullScreen")){ if(msg.length > 30) msg = msg.substring(0, 30) + '...'; msg = '<small>' + msg + '</small>'; notif('',msg,'pastel-danger',5000); } }
function opentree(fname) { var arr=('' + fname).split('/'); var parent=arr.slice(0, arr.length - 1); for(k in parent) { if(parent[k].length > 0) { var dir='/' + parent[k];  $('#tree').jstree('open_node', dir); } } } 
function isFile(pathname) { pathname += ''; return pathname.split('/').pop().split('.').length > 1; } 
function refreshtree() { $('#tree').jstree(true).refresh(); bootstrapping();} 
function deselecttree() { $('#tree').jstree(true).deselect_all(); } 
function refreshcontent() { $('#tree').jstree("refresh"); } 
function inIframe() { try { return window.self !== window.top; } catch(e) { return true; } } 
function maxify(filename) { var farr = ['js', 'css', 'html']; if(_.includes(farr, filename.split('.')[1])) {beautify();savefile();return true;}$.ajax({ url: cp + '/operation/maxify?filename=' + filename, method: 'GET', success: function(response) { refreshcontent(); } }); } 
function makeMarker() { var marker = document.createElement("div"); marker.style.color = "#822"; marker.style.fontSize = "13px"; marker.innerHTML = "&#9679;"; return marker; }
function minifyfile() { var obj = $('#tree').jstree('get_selected'); var filename = ''; for (var p in obj) { filename = obj[p]; } $.ajax({ url: cp + '/operation/minify?filename=' + filename, method: 'GET', success: function (response) { refreshcontent(); } });}
function maxifyfile(){ var filename = $('#tree').jstree('get_selected')[0];maxify(filename);}
function printfile() { $('body').on('click', '.print', function (e) { var win = window.open('', 'my div', 'height=400,width=600'); win.document.write('<html><head><title>my div</title>'); win.document.write('</head><body>'); win.document.write($('.CodeMirror-code').html()); win.document.write('</body></html>'); win.document.close(); win.focus(); win.print(); win.close(); return true; });}
function getSelectionText() { var text = ""; if (window.getSelection) { text = window.getSelection().toString(); } else if (document.selection && document.selection.type != "Control") { text = document.selection.createRange().text; } return text; } 
function colorChange() { $('body').on('change', '#background-color', function (e) { var c = $('#background-color').val(); $('#chosen-color').val(c); }); }
function checkoskey(){ var os=navigator.platform; if(os.indexOf('Mac')>=0) { return '&#8984;';} else return 'CTRL'; } 
function startsWith (string, prefix) { return string.slice(0, prefix.length) == prefix; } 

function cmResetCss(){
	$('.CodeMirror').css({'border': '0px'}); 
	$('.btnsave').addClass('disabled');
	$('.btnrun').addClass('disabled');
 }


var value, orig1, orig2, dv, panes = 3,
highlight = true,
connect = null,
collapse = false;

function initMergeUI(valuex, orig1x, orig2x, currentmode) {
value = valuex;
orig1 = orig1x;
orig2 = orig2x;
if(value == null) return;
var target = document.getElementById("view");
target.innerHTML = "";
dv = CodeMirror.MergeView(target, {
	value: value,
	origLeft: panes == 3 ? orig1 : null,
	orig: orig2,
	lineNumbers: true,
	mode: currentmode, 
	highlightDifferences: highlight,
	connect: connect,
	collapseIdentical: collapse,
	theme: defaulttheme,
	styleActiveLine: true,
	scrollbarStyle: "simple",
});
}

function toggleDifferences() {
dv.setShowDifferences(highlight = !highlight);
}

function showMergeUI(value, orig1, orig2) {
$('#view').prev('.CodeMirror').hide();
$('#view').show();
$('.CodeMirror').css({
	'border': '0px'
});
$('.btnsave').removeClass('disabled');
$('.btnrun').addClass('disabled');
var mode = editor.getOption('mode');
initMergeUI(value, orig1, orig2, mode);
$('.viewhead').show();
var currentrevision = $('#inmerge').val();
console.log('currentrevision=',currentrevision);
$('.viewhead > span').first().html(selectmsg);
$('#inmerge').val(currentrevision);
}

function hideMergeUI() {
$('#view').prev('.CodeMirror').show();
$('#view').hide();
$('.viewhead').hide();
}

function mergeViewHeight(mergeView) {
function editorHeight(editor) {
	if(!editor) return 0;
	return editor.getScrollInfo().height;
}
return Math.max(editorHeight(mergeView.leftOriginal()), editorHeight(mergeView.editor()), editorHeight(mergeView.rightOriginal()));
}

function resize(mergeView) {
var height = mergeViewHeight(mergeView);
for(;;) {
	if(mergeView.leftOriginal()) mergeView.leftOriginal().setSize(null, height);
	mergeView.editor().setSize(null, height);
	if(mergeView.rightOriginal()) mergeView.rightOriginal().setSize(null, height);
	var newHeight = mergeViewHeight(mergeView);
	if(newHeight >= height) break;
	else height = newHeight;
}
mergeView.wrap.style.height = height + "px";
}

function projectLauncher(){
if(isIFrame()){
	return true;
}

var projectlist = '';

$.ajax({
    url: cp + '/operation/project/list',
    type: "GET", 
    cache: false, 
    error: function(xhr,status,error) {
        
    },
    success: function(result,status,xhr) {
    	projectlist = result;
    	var num = projectlist.split('<option').length || 0; 
    	$('.numproject').html(num);

    	var data = '<div class="projectlauncher">'+
        '    <div class="row">'+
        '        <div class="col-xs-7">' + projectlist + '</div>'+
        '        <div class="col-xs-1"><input type=radio class="btn btn-flat btn-primary" name="type" value="1" /></div>'+
        '        <div class="col-xs-4">Existing Project</div>'+
        '    </div>'+
        '    <div class="row">'+
        '        <div class="col-xs-7 validationElement"><input id="projecturl" class="form-control giturl" type="text" name="element" placeholder="http://someip/project/part.git" data-placement="top" data-trigger="manual" data-content="Git URL Ex: http://host/smt.git"/><small style="color: #aaa;">If authorized use: http://username:password@giturl.git</small></div>'+
        '        <div class="col-xs-1"><input type=radio class="btn btn-flat btn-primary" name="type" value="2" /></div>'+
        '        <div class="col-xs-4">Checkout Git URL</div>'+
        '    </div>'+
        '    <div class="row">'+
        '        <div class="col-xs-7 validationElement"><input id="projectname" class="form-control templateName" type="text" name="element" data-placement="top" data-trigger="manual" data-content="Projectname should be atleast 4 characters long (alphabetical and numericals allowed)"/></div>'+
        '        <div class="col-xs-1"><input type=radio class="btn btn-flat btn-primary" name="type" value="3" /></div>'+
        '        <div class="col-xs-4">Create New Project</div>'+
        '    </div>'+
        '</div>';

        confirmModalSerial('Select One of these:', data, 'Launch', 'Launching...' ,function (result) {
            if (result == true) {
				var type = $('[name=type]:checked').val();
				var paramdata = {'username': '<%=session.getAttribute("username") %>','type' : type};
				paramdata['projectname'] =  type == 1 ? $('.projectlist').val() : ( type == 2 ? $('#projecturl').val() : $('#projectname').val());

            	if(type==2) { blockScreenUI("Pulling and Preparing Project...", 180 * 000);}
            	else{ blockScreenUI("Opening Project...", 30 * 000); }

				$.ajax({
	    			url: cp + '/operation/setproject',
	    			type: 'POST', 
	    			data : paramdata,
	    			error: function(xhr,status,error) { window.top.location.reload(); },
	    			success: function(result,status,xhr) { 
		    			callbackModal('Select One of these:',response,'OK', null,function(){
		    				unblockScreenUI();
							window.top.location.reload(); 
			    	 	});
		    		}
				}); 
            }
		});
    }
});
}

function isIFrame(){
	//return parent==top ? true: false;
	try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function isEmpty(a) {
	if (!a || a.length === 0 || a === "" || typeof a === "undefined" || !/[^\s]/.test(a) || /^\s*$/.test(a) || a.replace(/\s/g, "") === "") {
		return true;
	} else {
		return false;
	}
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
		alert('Your browser does not support sandboxed iframes. Please upgrade to a modern browser.');
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


function insertAtCaret(areaId,text) {
	console.log('insertatcarent');
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    
    console.log(front,back);
    
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
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
						allow_dismiss : false,
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

window.myCallback = function(data) {
	  console.log(data);
	};
	
// custom function ends

$(function(e){
		$('.nav li.dropdown').hover(function () { $(this).addClass('open'); }, function () { $(this).removeClass('open'); });
		
		$.fn.goValidate = function() {
	        var $ele = this,
	                $inputs = $ele.find('input:text, input:password'),
	                $selects = $ele.find('select'),
	                $textAreas = $ele.find('textarea');

	        var validators = {
	            name: {
	                regex: /^[A-Za-z]{3,}$/
	            },
	            tx:{
	            	required: true
	            },
	            url : {
	                regex : /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	            },
	            filepath : {
	                regex : /^[a-zA-Z\/:]{3,}$/
	            },
	            filename:{
	            	regex: /^[a-zA-Z0-9/]+(.css|.html|.java|.txt|.md|.xml|.js|.jsp)$/
	            },
	            giturl:{
	            	regex: /^(http|https):(?:\/\/).[\w\.@:\/~_-]+\.git(?:\/?|\#[\d\w\.\-_]+?)$/
	            },
	            jarname:{
	            	regex: /^\w+.(?!.)$/
	            },
	            templateName : {
	                regex : /^[a-zA-Z0-9/]{4,}$/
	            },
	            username: {
	                regex: /^[A-Za-z]{6,}$/
	            },
	            gitmsg: {
	                regex: /^[A-Za-z]{6,}$/
	            },
	            firstName: {
	                regex: /^[A-Za-z]{3,}$/
	            },
	            lastName: {
	                regex: /^[A-Za-z]{3,}$/
	            },
	            town: {
	                regex: /^[A-Za-z]{3,}$/
	            },
	            postcode: {
	                regex: /^.{3,}$/
	            },
	            password1: {
	                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
	            },
	            password1_repeat: {
	                regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
	            },
	            email: {
	                regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
	            },
	            phone: {
	                regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
	            },
	            body: {
	                regex: /^.{3,}$/
	            },
	            country: {
	                regex: /^(?=\s*\S).*$/,
	            }
	        };
	        var validate = function(klass, value) {
	            var isValid = true;
	            var error = '';
	            
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
	                isValid: isValid,
	                error: error
	            }
	        };
	        var showError = function($e) {
	            var klass = $e.attr('class'),value = $e.val(), test = validate(klass, value);
	            
	            $e.removeClass('invalid');
	            $('#form-error').addClass('hide');
	            $('.confirmTrueSerial, .confirmTrue').addClass('disabled');
	            if (!test.isValid) {
	                $e.addClass('invalid');
	                if (typeof $e.data("shown") == "undefined" || $e.data("shown") == false) {
	                    $e.popover('show');
	                }
	            }
	            else {
	                $e.popover('hide');
	                $('.confirmTrueSerial, .confirmTrue').removeClass('disabled');
	            }
	        };

	        $inputs.on('keyup mouseover',function(){
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
		//$('.validationElement').goValidate();
	    
	    
		$('body').on('keypress keydown',function(e){    
	        if (e.keyCode == 65 && e.ctrlKey) {
	        	e.preventDefault(); e.stopPropagation();
	            alert('ctrl A');
	        }
	        if (e.keyCode == 83 && (e.ctrlKey || e.metaKey)) {//S
	        	e.preventDefault(); e.stopPropagation();
	            savefile();
	        }else if (e.keyCode == 68 && (e.ctrlKey || e.metaKey)) {//D
	        	e.preventDefault(); e.stopPropagation();
	            downloadfile();
	        }else if (e.keyCode == 77 && (e.ctrlKey || e.metaKey)) {//M
	        	e.preventDefault(); e.stopPropagation();
	        	if($('.minifyexec').parent().hasClass('disabled')){
					return true;
	            }
	        	minifyfile();
	        }else if (e.keyCode == 66 && (e.ctrlKey || e.metaKey)) {//B
	        	e.preventDefault(); e.stopPropagation();
	        	if($('.maxifyexec').parent().hasClass('disabled')){
					return true;
	            }
	        	maxifyfile();
	        }else if (e.keyCode == 80 && (e.ctrlKey || e.metaKey)) {//P
	        	e.preventDefault(); e.stopPropagation();
	        	printfile();
	        }
	    });    

});
