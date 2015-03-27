$(function() {

	var configData;

	var socket = io();

	socket.on('config', function(data) {
		configData = data;
		// 服务器类型
		if (configData.serviceType && configData.serviceType.length > 0) {
			for (var i = 0; i < configData.serviceType.length; i++) {
				$('#serverType').append("<option>" + configData.serviceType[i] + "</option>");
			}
		}
		// 触发服务类型change事件
		$('#serverType').trigger('change');

		// 添加服务器
		if (configData.server && configData.server.length > 0) {
			for (var i = 0; i < configData.server.length; i++) {
				var serverObj = configData.server[i];
				$('#serverName').append("<option>" + serverObj.ip + "</option>");
			}
		}
	});

	$('#serverType').on('change', function(v) {
		$('#serviceName').empty();
		var optionValues = [];
		var val = v.target.value;
		if (val == 'Base') {
			if (configData.BService && configData.BService.length > 0) {
				optionValues = configData.BService;
			}

		} else if (val == 'C++') {
			if (configData.CService && configData.CService.length > 0) {
				optionValues = configData.CService;
			}
		} else if (val == 'Java') {
			if (configData.JService && configData.JService.length > 0) {
				optionValues = configData.JService;
			}
		}

		for (var i = 0; i < optionValues.length; i++) {
			$('#serviceName').append("<option>" + optionValues[i] + "</option>");
		}
	});

	socket.on('output', function(data) {
		$('.well').append(data.replace(/\n/g, '<br>'));
		$('.well').append('<br>');
	});

	$('#deployBtn').on('click', function() {
		var deployObj = {};
		socket.emit('deploy', deployObj);
	});
});