(function (window) {

    //constructor
    function Chest(instaClick){
        this.Container_constructor();
        this.instaClick = instaClick;
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

	//public functions
    container.tick = function(event){
        if (this.coins != null) this.coins.tick(event);
    }
    container.addChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        //initialize Chest
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
    }
    container.isClicked = function(){ return this.clicked; }
    container.click = function() {
        if (!this.clicked){
            if (this.success) {
                createjs.Sound.play("coins", {pan:0});
                this.coins = new CoinEffect();
                this.coins.addCoins(0, 0, 1, 1, 50, this.instaClick ? 0 : 15); //delay .25 seconds (15)
                this.addChild(this.coins);
            }
            if (!this.instaClick) window.Game.levelManager.setDelay(120); //60 = 1 second delay
            this.clicked=true;
            createjs.Sound.play("sword-low", {pan:0});
            createjs.Sound.play("chest-open", {pan:0});
            this.sprite.gotoAndPlay(this.sprite.spriteSheet.animations[this.sprite._currentFrame+(this.success ? 1:2)]);
            this.resetMouse();
        }
    }
    container.mouseOver = function() {
        if (!this.clicked){
            //if (this.instaClick) this.alpha=.25;
            this.cursor="pointer";
        }
    }
    container.mouseOut = function() { this.resetMouse(); }
    container.setText = function(text){
        if (this.children.length > 0) this.removeChild(this.customText);
        this.customText = new CustomText(0,-48,this.scaleX,this.scaleY,text);
        this.addChild(this.customText);
    }
    container.updateChest = function(text, ear, success){
        this.setText(text);
        this.ear=ear;
        this.success=success;
    }
    container.resetMouse = function() { this.sprite.alpha=1; this.cursor="default"; }
    container.reset = function() { this.clicked = this.success = false; this.resetMouse(); this.removeChild(this.coins); }

	window.Chest = new createjs.promote(Chest, "Container");
}(window));