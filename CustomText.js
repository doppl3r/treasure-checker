(function (window) {

	function CustomText(x,y,scaleX,scaleY,text) {
	    this.Container_constructor();
	    this.scaleX = scaleX;
	    this.scaleY = scaleY;
	    this.kerning = 14;
	    this.addText(x,y,scaleX,scaleY,text);
	}

	//instance of class
	var container = new createjs.extend(CustomText, createjs.Container);

    //shared spritesheet properties
    this.manifest = [{src: "text.png", id: "text"}];
    //this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", handleComplete);
    this.loader.loadManifest(this.manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [this.loader.getResult("text")],
            frames: [[4,4,16,23,0,8.15,11.15],[24,4,15,26,0,8.15,12.15],[43,4,14,23,0,7.15,11.15],[61,4,15,25,0,8.15,12.15],
                    [80,4,13,23,0,7.15,11.15],[97,4,14,24,0,8.15,11.15],[115,4,14,23,0,6.15,11.15],[133,4,14,23,0,7.15,11.15],
                    [151,4,15,22,0,7.15,10.15],[170,4,16,25,0,8.15,13.15],[190,4,14,23,0,7.15,11.15],[208,4,14,23,0,7.15,11.15],
                    [226,4,15,22,0,8.15,9.15],[245,4,13,23,0,6.15,11.15],[262,4,14,23,0,7.15,12.15],[280,4,15,25,0,8.15,11.15],
                    [299,4,14,23,0,6.15,10.15],[317,4,14,25,0,8.15,12.15],[335,4,13,22,0,6.15,11.15],[352,4,14,23,0,7.15,11.15],
                    [370,4,13,22,0,7.15,10.15],[387,4,15,22,0,8.15,10.15],[406,4,17,22,0,9.15,10.15],[427,4,15,24,0,8.15,11.15],
                    [446,4,16,22,0,9.15,10.15],[466,4,14,22,0,7.15,11.15],[484,4,14,22,0,7.15,11.15]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                "a": [0], "b": [1], "c": [2], "d": [3], "e": [4], "f": [5], "g": [6],
                "h": [7], "i": [8], "j": [9], "k": [10], "l": [11], "m": [12], "n": [13],
                "o": [14], "p": [15], "q": [16], "r": [17], "s": [18], "t": [19], "u": [20],
                "v": [21], "w": [22], "x": [23], "y": [24], "z": [25], "_": [26]
            }
        });
    }

    //update
	container.tick = function (event) { }
    container.addText = function (x,y,scaleX,scaleY,text){
        text=text.replace(" ","_");
        for (i = 0; i < text.length; i++){
            var tempChar = new CustomCharacter(x+(i*this.kerning*scaleX),y,scaleX,scaleY,this.spriteSheet,text.charAt(i).toLowerCase());
            this.addChild(tempChar);
        }
        this.centerText();
    }
    container.removeChar = function(i){
        this.removeChildAt(i);
    }
    container.centerText = function() {
        this.x = (-(this.getBounds().width/2)+(this.kerning/2))*this.scaleX;
        this.y = -(this.getBounds().height/2);
        this.scaleX *= this.scaleX;
    }

	window.CustomText = createjs.promote(CustomText, "Container");
}(window));
