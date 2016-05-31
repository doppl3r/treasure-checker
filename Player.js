(function (window) {

    //constructor
	function Player() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("player")],
            frames: [[4,4,136,240,0,56,218.25],[144,4,144,236,0,57,214.25],[292,4,149,236,0,58,213.25],
                    [4,248,151,259,0,50,237.25],[159,248,128,261,0,43,235.25],[291,248,213,193,0,27,160.25],
                    [4,513,140,207,0,58,190.25],[148,513,138,209,0,63,182.25]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                idle: { frames: [0,1,2,1] },
                attack: { frames: [3,4,5,5], next: "idle" },
                run: { frames: [6,7] }
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "idle");
        this.addChild(this.sprite);
        this.speed = 10;
        this.forceAllKeysUp();
	}

	//instance of class
	var container = createjs.extend(Player, createjs.Container);

    //update
	container.tick = function (event) {
	    //move player if target is not in reach
	    if (this.target){
	        if (Math.abs(this.x - this.targetX) >= this.speed ||
                Math.abs(this.y - this.targetY) >= this.speed){
                this.left = this.x >= this.targetX + this.speed * this.directionX;
                this.right = this.x < this.targetX - this.speed * this.directionX;
                this.up = this.y >= this.targetY + this.speed * this.directionY;
                this.down = this.y < this.targetY - this.speed * this.directionY;

                this.enableRunAnimation(true);

                //adjust player direction
                if (this.left) this.scaleX = -1;
                else this.scaleX = 1;
            }
            else {
                this.forceAllKeysUp();
                this.enableRunAnimation(false);
            } //reset when reached target
	    }

        //check key input
        if (this.sprite.currentAnimation != "attack" && !this.freeze) { //disable movement while attacking
            if (this.left) this.x += this.speed * this.directionX;
            else if (this.right) this.x += this.speed * this.directionX;
            if (this.up) this.y += this.speed * this.directionY;
            else if (this.down) this.y += this.speed * this.directionY;
        }
        else this.forceAllKeysUp();

        //check collision using 'ndgmr.Collision.js' provided by Olaf Horstmann
        var tempChest;
        for (i=0; i<window.Game.chestManager.children.length; i++){
            tempChest = window.Game.chestManager.getChildAt(i); //get temporary index
            if (ndgmr.checkRectCollision(this, tempChest)){
                if (!tempChest.isClicked()){
                    this.freeze = true;
                    tempChest.click();
                    this.sprite.gotoAndPlay("attack");
                }
            }
        }
	}

	//public variables
    container.moveUp = function(pressed) {
        if (!this.freeze) {
            this.up = pressed;
            this.directionY = -1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveRight = function(pressed) {
        if (!this.freeze) {
            this.right = pressed;
            this.scaleX = this.directionX = 1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveDown = function(pressed) {
        if (!this.freeze) {
            this.down = pressed;
            this.directionY = 1;
            this.enableRunAnimation(pressed);
        }
    }
    container.moveLeft = function(pressed) {
        if (!this.freeze){
            this.left = pressed;
            this.scaleX = this.directionX = -1;
            this.enableRunAnimation(pressed);
        }
    }
    container.setXY = function(x,y) { this.x = x; this.y = y; this.freeze = false; }
    container.navigate = function(event) {
        if (!this.freeze){
            this.target = true;
            this.targetX = event.stageX;
            this.targetY = event.stageY;
            this.distance = Math.sqrt(Math.pow(this.targetX - this.x,2)+Math.pow(this.targetY - this.y,2));
            this.directionX = (this.targetX - this.x) / this.distance;
            this.directionY = (this.targetY - this.y) / this.distance;
        }
    }
    container.enableRunAnimation = function(pressed){
        if (pressed){
            if (this.sprite.currentAnimation == "idle") this.sprite.gotoAndPlay("run");
        }
        else {
            this.targetX = this.x; //interrupt target
            this.targetY = this.y;
            if (this.sprite.currentAnimation == "run" && this.allKeysUp()) {
                this.sprite.gotoAndPlay("idle");
            }
        }
    }
    container.allKeysUp = function() { return this.left==this.right==this.up==this.down; }
    container.forceAllKeysUp = function() { this.left=this.right=this.up=this.down=this.target=false; }

	window.Player = createjs.promote(Player, "Container");
}(window));
