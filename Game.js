(function (window) {
    //private variables
    var KEYCODE_ENTER = 13; //useful keycode
    var KEYCODE_SPACE = 32; //useful keycode
    var KEYCODE_UP = 38; //useful keycode
    var KEYCODE_LEFT = 37; //useful keycode
    var KEYCODE_RIGHT = 39; //useful keycode
    var KEYCODE_DOWN = 40;
    var KEYCODE_W = 87; //useful keycode
    var KEYCODE_A = 65; //useful keycode
    var KEYCODE_D = 68; //useful keycode
    var KEYCODE_S = 83; //useful keycode

    //var canvas; //Main canvas
    //var stage; //Main display stage

    //register key functions
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    //private functions
    function Game(){ Game.prototype.init(); } //constructor
    function tick(event) {
        //call sub ticks
        window.Game.background.tick(event);
        window.Game.player.tick(event);
        window.Game.chestManager.tick(event);
        window.Game.levelManager.tick(event);
        window.Game.stage.update(event);
    }
    //allow for WASD and arrow control scheme
    function handleKeyDown(e) {
        if (!e) { var e = window.event; } //cross browser issues exist
        switch (e.keyCode) {
            case KEYCODE_A: case KEYCODE_LEFT: Game.prototype.player.moveLeft(true); break;
            case KEYCODE_D: case KEYCODE_RIGHT: Game.prototype.player.moveRight(true); break;
            case KEYCODE_W: case KEYCODE_UP: Game.prototype.player.moveUp(true); break;
            case KEYCODE_S: case KEYCODE_DOWN: Game.prototype.player.moveDown(true); break;
        }
    }
    function handleKeyUp(e) {
        if (!e) { var e = window.event; } //cross browser issues exist
        switch (e.keyCode) {
            case KEYCODE_A: case KEYCODE_LEFT: Game.prototype.player.moveLeft(false); break;
            case KEYCODE_D: case KEYCODE_RIGHT: Game.prototype.player.moveRight(false); break;
            case KEYCODE_W: case KEYCODE_UP: Game.prototype.player.moveUp(false); break;
            case KEYCODE_S: case KEYCODE_DOWN: Game.prototype.player.moveDown(false); break;
        }
    }

    //public functions
    Game.prototype.init = function() {
        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(60);

        this.assetManager = new AssetManager(document.getElementById("gameCanvas"));
        this.assetManager.init();
        this.stage.addChild(this.assetManager);
        this.stage.on("click", function(event){ Game.prototype.player.navigate(event); Game.prototype.selector.animateAt(event); });

        //create level manager prototype from window object
        this.levelManager = Object.create(LevelManager);

        this.assetManager.preload.on("complete", function(){ Game.prototype.restart(); });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); window.Game.stage.update(); });
    }
    Game.prototype.restart = function() {
        //clean up stage
        this.stage.removeAllChildren();

        //initialize game objects
        if (this.background == null) this.background = new Background();
        this.background.x = this.canvas.width / 2;
        this.background.y = this.canvas.height / 2;
        if (this.player == null) this.player = new Player();
        this.player.setXY(this.canvas.width / 2, (this.canvas.height / 2)+64);
        if (this.selector == null) this.selector = new Selector();
        if (this.chestManager == null) this.chestManager = new ChestManager();
        if (this.chestManager == null) this.chestManager = new ChestManager();
        if (this.interface == null) this.interface = new Interface();

        //ensure stage is blank and add the player
        this.stage.clear();
        this.stage.addChild(this.background);
        this.stage.addChild(this.chestManager);
        this.stage.addChild(this.selector);
        this.stage.addChild(this.player);
        this.stage.addChild(this.interface);

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.setFPS(60);
        }

        this.levelManager.createLevel();
    }

    //create prototype of self
    window.Game = new Game();
}(window));
