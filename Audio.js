(function (window) {

    // begin loading content (only sounds to load)
    var assetsPath = "sounds/";
    manifest = [
        { id: "begin", src: "spawn.ogg" },
        { id: "break", src: "break.ogg", data: 6 },
        { id: "death", src: "death.ogg" },
        { id: "laser", src: "shot.ogg", data: 6 },
        { id: "music", src: "music.ogg" }
    ];
    createjs.Sound.alternateExtensions = ["mp3"];
    preload = new createjs.LoadQueue(true, assetsPath);
    preload.installPlugin(createjs.Sound);
    //preload.addEventListener("complete", restart); // add an event listener for when load is completed
    //preload.addEventListener("progress", updateLoading);
    preload.loadManifest(manifest);
}(window));
