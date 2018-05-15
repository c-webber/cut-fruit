function Fruit(){
	document.getElementById("throw").load();
	document.getElementById("throw").play();
	this.allType = ["apple","banana","basaha","peach","sandia"];
	this.type = this.allType[~~(Math.random() * 5)];
	this.image = game.res[this.type];
	fruitArr.push(this);
	this.x = ~~(Math.random() * game.canvas.width * 3 / 8) + game.canvas.width / 4;
	this.y = game.canvas.height;
	switch(this.type){
		case "apple": 
			this.width = 66;
			this.height = 66;
			break;
		case "banana": 
			this.width = 126;
			this.height = 50;
			break;
		case "basaha": 
			this.width = 68;
			this.height = 72;
			break;
		case "peach": 
			this.width = 62;
			this.height = 59;
			break;
		case "sandia": 
			this.width = 98;
			this.height = 85;
			break;
	}
	do{
		this.dx = ~~(Math.random() * 6) - 2;
		this.dy = ~~(Math.random() *3) + 6;
	}while(this.dx == 0 || this.dy == 0);
}
var fruitArr = [];
Fruit.prototype.render = function(){
	game.ctx.save();
	game.ctx.drawImage(this.image, this.x, this.y);
	game.ctx.restore();
};
Fruit.prototype.update = function(){
	if(this.y < 360){
		this.dy -= 0.1;
	}
	this.x += this.dx;
	this.y -= this.dy;
	this.x2 = this.x + this.width;
	this.y2 = this.y + this.height;
	if(game.knifeX > this.x && game.knifeX < this.x2 && game.knifeY > this.y && game.knifeY < this.y2){
		new Fruitcut(this.x, this.y, this.type);
		document.getElementById("splatter").load();
		document.getElementById("splatter").play();
		game.score++;
		if(game.score % 10 == 0){
			game.life++;
		}
		if(game.life >= 3){
			game.life = 3;
		}
		this.remove();
	}
	if(this.y < -100 || this.y > game.canvas.height  || this.x < -100 || this.x > game.canvas.width + 100){
		game.life--;
		this.remove();
	}
	if(game.life <= 0){
		game.scene.sceneNumber = 4;
		game.scene.init(game.scene.sceneNumber);
	}
};
Fruit.prototype.remove = function(){
	for(var i = 0; i < fruitArr.length; i++){
		if(fruitArr[i] == this){
			fruitArr.splice(i, 1);
		}
	}
};