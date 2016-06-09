cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device-orientation/www/CompassError.js",
        "id": "cordova-plugin-device-orientation.CompassError",
        "clobbers": [
            "CompassError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-orientation/www/CompassHeading.js",
        "id": "cordova-plugin-device-orientation.CompassHeading",
        "clobbers": [
            "CompassHeading"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device-orientation/www/compass.js",
        "id": "cordova-plugin-device-orientation.compass",
        "clobbers": [
            "navigator.compass"
        ]
    },
    {
        "file": "plugins/cordova-plugin-navigationbar/www/navigationbar.js",
        "id": "cordova-plugin-navigationbar.navigationbar",
        "clobbers": [
            "window.navigationbar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-device-orientation": "1.0.3",
    "cordova-plugin-navigationbar": "1.0.31"
};
// BOTTOM OF METADATA
});