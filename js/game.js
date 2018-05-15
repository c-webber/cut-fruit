function Game(){
	this.init();
	this.bindEvent();
	// state用来记录是否需要刀
	this.state = 0;
	this.score = 0;
	this.life = 3;
}
Game.prototype.init = function(){
	this.res = {
		"background": "images/background.jpg",
		"apple": "images/fruit/apple.png",
		"apple-1": "images/fruit/apple-1.png",
		"apple-2": "images/fruit/apple-2.png",
		"banana": "images/fruit/banana.png",
		"banana-1": "images/fruit/banana-1.png",
		"banana-2": "images/fruit/banana-2.png",
		"basaha": "images/fruit/basaha.png",
		"basaha-1": "images/fruit/basaha-1.png",
		"basaha-2": "images/fruit/basaha-2.png",
		"peach": "images/fruit/peach.png",
		"peach-1": "images/fruit/peach-1.png",
		"peach-2": "images/fruit/peach-2.png",
		"sandia": "images/fruit/sandia.png",
		"sandia-1": "images/fruit/sandia-1.png",
		"sandia-2": "images/fruit/sandia-2.png",
		"boom": "images/fruit/boom.png",
		"game-over": "images/game-over.png",
		"logo": "images/logo.png",
		"new": "images/new.png",
		"new-game": "images/new-game.png",
		"developing": "images/developing.png",
		"score": "images/score.png",
		"x": "images/x.png",
		"xx": "images/xx.png",
		"xxx": "images/xxx.png",
		"xf": "images/xf.png",
		"xxf": "images/xxf.png",
		"xxxf": "images/xxxf.png"
	};
	var length = Object.keys(this.res).length;
	var count = 0;
	var self = this;
	for(var k in this.res){
		var image = new Image();
		image.src = this.res[k];
		this.res[k] = image;
		// 图片资源加载完成后开始
		image.onload = function(){
			count++;
			if(count == length){
				self.start();
			}
		}
	}
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
};
Game.prototype.bindEvent = function(){
	var self = this;
	// 刀的代码
	this.canvas.onmousedown = function(event){
		self.mouseX = event.offsetX;
		self.mouseY = event.offsetY;
		self.state = 1;
	};
	document.documentElement.onmouseup = function(event){
		self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
		self.state = 0;
		self.knifeX = -100;
		self.knifeY = -100;
	};
	this.canvas.onmousemove = function(event){
		if(self.state == 1){
			self.knifeX = event.offsetX;
			self.knifeY = event.offsetY;
			new Knife(self.knifeX,self.knifeY);
			self.mouseX = self.knifeX;
			self.mouseY = self.knifeY;
		}		
	}
};
var f = 0;
Game.prototype.start = function(){
	var self = this;
	this.scene = new Scene();
	this.timer = setInterval(function(){
		f++;
		self.scene.render();
	}, 10)
};