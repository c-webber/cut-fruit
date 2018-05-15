function Boom(){
	document.getElementById("throw").load();
	document.getElementById("throw").play();
	this.image = game.res["boom"];
	this.x = ~~(Math.random() * game.canvas.width / 3) + game.canvas.width / 3;
	this.y = game.canvas.height;
	this.width = 66;
	this.height = 68;
	this.boomx_long = 0;
	this.boomx = 3;
	do{
		this.dx = ~~(Math.random() * 6) - 3;
		this.dy = ~~(Math.random() * 3) + 7;
	}while(this.dx == 0 || this.dy == 0);
	boomArr.push(this);
}
var boomArr = [];
Boom.prototype.render = function(){
	game.ctx.save();
	game.ctx.drawImage(this.image, this.x, this.y);
	game.ctx.restore();
};
Boom.prototype.update = function(){
	this.dy -= 0.1;
	this.x += this.dx;
	this.y -= this.dy;
	this.x2 = this.x + this.width;
	this.y2 = this.y + this.height;
	if(game.knifeX > this.x && game.knifeX < this.x2 && game.knifeY > this.y && game.knifeY < this.y2){
		game.scene.sceneNumber = 3;
		game.scene.init(game.scene.sceneNumber);
	}
	if(this.y < -100 || this.y > game.canvas.height  || this.x < -100 || this.x > game.canvas.width + 100){
		this.remove();
	}
};
Boom.prototype.remove = function(){
	for(var i = 0; i < boomArr.length; i++){
		if(boomArr[i] == this){
			boomArr.splice(i, 1);
		}
	}
};