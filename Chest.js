(function (window) {
    var container = createjs.extend(Chest, createjs.Container);

	function Chest(x,y,scaleX,scaleY,spriteSheet,frame) {
        this.Container_constructor();
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.charManager = new CharManager(x,y,scaleX,scaleY);
        //this.char = new Char(x,y-64,scaleX,scaleY,new CharManager().spriteSheet,"i");
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
        this.addChild(this.charManager);
	}
	//public functions
    container.getSprite = function() { return this.sprite; }
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }

	window.Chest = createjs.promote(Chest, "Container");

}(window));
