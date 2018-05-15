function Knife(x,y){
	this.startX = game.mouseX;
	this.startY = game.mouseY;
	this.x = x;
	this.y = y;
	this.width = 14;
	knifeArr.push(this);
}
var knifeArr = [];
Knife.prototype.render = function(){
	game.ctx.save();
	game.ctx.beginPath();
	game.ctx.moveTo(this.startX,this.startY);
	game.ctx.lineTo(this.x, this.y);
	game.ctx.lineWidth = `${this.width}`;
	game.ctx.strokeStyle = "#fff";
	game.ctx.stroke();
	game.ctx.restore();
};
Knife.prototype.update = function(){
	this.width-=0.8;
	if(this.width <= 0){
		for(var i = 0; i < knifeArr.length; i++){
			if(knifeArr[i] == this){
				knifeArr.splice(i, 1);
			}
		}
	}
};