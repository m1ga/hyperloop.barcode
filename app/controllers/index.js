var scanner = require("scanner");
var whichCam = 0;

scanner.result(function(result) {
	$.lbl.text = result.getText() + "\n" + result.getBarcodeFormat();

	// just wait a bit to resume
	_.delay(function() {
		scanner.resume();
	}, 1000);
})

$.btn_start.addEventListener("click", function(e) {
	scanner.startCamera(whichCam);
});
$.btn_stop.addEventListener("click", function(e) {
	scanner.stopCamera();

	whichCam = scanner.getCamera() + 1;
	if (whichCam > 1) {
		whichCam = 0;
	}
});

$.btn_flash.addEventListener("click", function(e) {
	scanner.setFlash(!scanner.getFlash());
});

$.index.addEventListener("open", function(e) {

})
$.view_cam.add(scanner.getView());
$.index.open();
