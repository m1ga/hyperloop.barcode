var Activity = require('android.app.Activity');
var activity = new Activity(Ti.Android.currentActivity);

var ZXingScannerView = require("me.dm7.barcodescanner.zxing.ZXingScannerView");
var ResultHandler = require("me.dm7.barcodescanner.zxing.ZXingScannerView.ResultHandler");
var scannerView = new ZXingScannerView(activity);
var isFlash = false;
var whichCam = 0;

var resultCallback = null;

var resHandler = new ResultHandler({
	handleResult: function(result){
		if (resultCallback) {
			resultCallback(result);
		}
	}
});

scannerView.setResultHandler(resHandler);

exports.result = function(opt){
	resultCallback = opt;
}

exports.resume = function(){
	scannerView.resumeCameraPreview(resHandler);
}
exports.setFlash = function(opt){
	isFlash = opt;
	scannerView.setFlash(isFlash);
}
exports.getFlash = function(){
	return isFlash;
}
exports.getCamera = function(){
	return whichCam;
}
exports.startCamera = function(opt){
	whichCam = opt;
	scannerView.startCamera(whichCam);
}
exports.stopCamera = function(opt){
	scannerView.stopCamera();
}
exports.getView = function(){
	return scannerView;
}
