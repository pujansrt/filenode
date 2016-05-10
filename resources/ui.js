function callout(title, msg, type){
	type = type || 'info';
	
	return 	'<div class="callout callout-'+ type +'">' +
    		'<h4>'+ title +'</h4>' +
    		'<p>'+ msg +'</p>' +
    		'</div>';
}

function favorMeModal(title, message) {
	$('#generic_modal .modal-dialog').removeAttr('style');
	$('#generic_modal .modal-footer').html('<button type="button" class="btn btn-default btn-flat confirmFalse" data-dismiss="modal">Close</button>');
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal').modal('show');
	//$('.modal-backdrop').remove();
}

function favorMeModal(title, message, btnhtml) {
	$('#generic_modal .modal-dialog').removeAttr('style');
	$('#generic_modal .modal-footer').html(btnhtml);
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal').modal('show');
	$('.modal-backdrop').remove();
}

function confirmModal(title, message, doBtnTitle, callback) {
	message = message || '';
	doBtnTitle = doBtnTitle || 'OK'
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal .modal-footer').html('<button type="button" class="btn btn-danger btn-flat confirmTrue" data-dismiss="modal">'
							+ doBtnTitle
							+ '</button><button type="button" class="btn btn-flat btn-default confirmFalse" data-dismiss="modal">Cancel</button>');
	
	$("input[type=radio]").icheck({checkboxClass: 'icheckbox_flat-red',radioClass: 'iradio_flat-red',});
	
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

function confirmModalWithBtnClass(title, message, doBtnTitle, doBtnClass ,callback) {
	message = message || '';
	doBtnTitle = doBtnTitle || 'OK'
	$('#mdatatitle').html(title);
	$('#mdata').html(message);
	$('#generic_modal .modal-footer').html('<button type="button" class="btn btn-danger btn-flat confirmTrue ' + doBtnClass + '" data-dismiss="modal">'
							+ doBtnTitle
							+ '</button><button type="button" class="btn btn-flat btn-default confirmFalse" data-dismiss="modal">Cancel</button>');
	
	$("input[type=radio]").icheck({checkboxClass: 'icheckbox_flat-red',radioClass: 'iradio_flat-red',});
	
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
	doBtnTitle = doBtnTitle || 'OK'
	$('#mdatatitle').html(title);
	$('#mdata').html(message).css('min-height', '140px');
	$('#generic_modal .modal-footer')
			.html(
					'<button type="button" class="btn btn-danger btn-flat confirmTrueSerial">'
							+ doBtnTitle
							+ '</button><button type="button" class="btn btn-flat btn-default confirmFalseSerial" data-dismiss="modal">Cancel</button>');
	$("input[type=radio]").icheck({checkboxClass: 'icheckbox_flat-red',radioClass: 'iradio_flat-red',});
	$('.validationElement').goValidate();
	
	
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
	btnYES = btnYES || 'OK';
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