var Activity = require('android.app.Activity');
var activity = new Activity(Ti.Android.currentActivity);

var ZXingScannerView = require("me.dm7.barcodescanner.zxing.ZXingScannerView");
var ResultHandler = require("me.dm7.barcodescanner.zxing.ZXingScannerView.ResultHandler");
var scannerView = new ZXingScannerView(activity);
var isFlash = false;
var isRunning = false;
var whichCam = 0;
var resultCallback = null;
var hasCameraPermissions = Ti.Media.hasCameraPermissions();

var resHandler = new ResultHandler({
	handleResult: function(result) {
		if (resultCallback) {
			resultCallback(result);
		}
	}
});

scannerView.setResultHandler(resHandler);

exports.requestCameraPermissions = function(clb) {
	Ti.Media.requestCameraPermissions(function(e) {
		if (e.success) {
			hasCameraPermissions = true;
			if (clb) {
				clb(true);
			}
		} else {
			hasCameraPermissions = false;
			if (clb) {
				clb(false);
			}
		}
	});
}

exports.hasCameraPermissions = function() {
	return hasCameraPermissions;
}

exports.result = function(opt) {
	resultCallback = opt;
}

exports.resume = function() {
	scannerView.resumeCameraPreview(resHandler);
}
exports.setFlash = function(opt) {
	if (isRunning) {
		isFlash = opt;
		scannerView.setFlash(isFlash);
	}
}
exports.getFlash = function() {
	return isFlash;
}
exports.getCamera = function() {
	return whichCam;
}
exports.startCamera = function(opt) {
	if (!isRunning) {
		whichCam = opt;
		scannerView.startCamera(whichCam);
		isRunning = true;
	}
}
exports.stopCamera = function(opt) {
	if (isRunning) {
		scannerView.stopCamera();
		isRunning = false;
	}
}
exports.getView = function() {
	return scannerView;
}
