function Fruitcut(x, y, type){
	this.x1 = x;
	this.x2 = x;
	this.y = y;
	this.type = type;
	this.image1 = game.res[this.type + "-1"];
	this.image2 = game.res[this.type + "-2"]; 
	this.dy = 0
	this.a = 1;
	this.position = x;
	fruitcutArr.push(this);
}
var fruitcutArr = [];
Fruitcut.prototype.render = function(){
	game.ctx.save();
	game.ctx.globalAlpha = this.a;
	game.ctx.drawImage(this.image1, this.x1, this.y);
	game.ctx.drawImage(this.image2, this.x2, this.y);
	game.ctx.restore();
};
Fruitcut.prototype.update = function(){
	this.dy += 0.5;
	this.y += this.dy;
	this.a -= 0.01
	this.x1 -= 5;
	this.x2 += 5;
	if(this.a < 0){
		this.remove();
	}
};
Fruitcut.prototype.remove = function(){
	for(var i = 0; i < fruitcutArr.length; i++){
		if(fruitcutArr[i] == this){
			fruitcutArr.splice(i, 1);
		}
	}
};