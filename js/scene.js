// 场景切换器
function Scene(){
	// 定义初始场景
	this.sceneNumber = 0;
	this.init(this.sceneNumber);
}
Scene.prototype.init = function(number){
	switch(number){
		case 0:
			document.getElementById("menu").play();
			game.life = 3;
			fruitArr = [];
			fruitcutArr = [];
			knifeArr = [];
			boomArr = [];
			this.deg = 0;
			game.score = 0;
			break;
		case 1:
			document.getElementById("start").play();
			// state用来记录是否切换场景
			this.state = 0;
			// boomAlpha用来改变场景画面的透明度
			this.boomAlpha = 0.1;
			break;
		case 2:
			knifeArr = [];
			break;
		case 3:
			document.getElementById("boom").play();
			this.boomAlpha = 1;
			this.boomtime = 0;
			break;
		case 4:
			document.getElementById("over").play();
			knifeArr = [];
			this.overY = -86;
			break;
	}
};
Scene.prototype.render = function(){
	switch(this.sceneNumber){
		case 0:
		// 场景0:
			this.deg -= 0.02;
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
			game.ctx.save();
			game.ctx.drawImage(game.res["logo"], 160, 50);
			game.ctx.drawImage(game.res["new"], 460, 80);
			game.ctx.drawImage(game.res["apple"], (game.canvas.width - 66) / 2, 294.5);
			game.ctx.restore();
			game.ctx.save();
			game.ctx.translate((game.canvas.width - 195) / 2 + 97.5, 327.5);
			game.ctx.rotate(this.deg);
			game.ctx.drawImage(game.res["new-game"], -97.5,-97.5);
			game.ctx.restore();
			for(var i = 0; i < knifeArr.length; i++){
				knifeArr[i].render();
				knifeArr[i].update();
			}
			// ,切到水果,开始游戏,切换场景
			if(game.knifeX > (game.canvas.width - 66) / 2 && game.knifeX < (game.canvas.width - 66) / 2 + 66 && game.knifeY > 294.5 && game.knifeY < 360.5){
				document.getElementById("menu").pause();
				document.getElementById("splatter").load();
				document.getElementById("splatter").play();
				game.scene.sceneNumber = 1;
				game.scene.init(this.sceneNumber);
			}
			break;
		case 1:
			if(this.state == 0){
				this.boomAlpha += 0.01;
			}else if(this.state == 1){
				this.boomAlpha -= 0.01;
			}
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
			game.ctx.save();
			game.ctx.globalAlpha = this.boomAlpha;
			game.ctx.drawImage(game.res["developing"], (game.canvas.width - 429) / 2, 200);
			game.ctx.restore();
			if(this.boomAlpha >= 0.95){
				this.state = 1;
			}else if(this.boomAlpha < 0.05){
				game.scene.sceneNumber = 2;
				game.scene.init(game.scene.sceneNumber);
			}
			break;
		case 2:
			f % 150 == 0 && new Fruit();
			f % 225 == 0 && new Fruit();
			f % 300 == 0 && new Fruit();
			f % 375 == 0 && new Boom();
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
			game.ctx.save();
			game.ctx.drawImage(game.res["score"], 10, 10);
			game.ctx.fillStyle = "#fd9d1c";
			game.ctx.font = 'bold 36px 微软雅黑';
			game.ctx.fillText(`${game.score}`,50,40);
			game.ctx.restore();
			// 剩余生命显示
			switch(game.life){
				case 3:
					game.ctx.save();
					game.ctx.drawImage(game.res["x"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 2:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 1:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 0:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxxf"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
			}
			for(var j = 0; j < fruitArr.length; j++){
				fruitArr[j].render();
				fruitArr[j].update();
			}
			for(var n = 0; n < fruitcutArr.length; n++){
				fruitcutArr[n].render();
				fruitcutArr[n].update();
			}
			for(var m = 0; m < boomArr.length; m++){
				boomArr[m].render();
				boomArr[m].update();
			}
			for(var i = 0; i < knifeArr.length; i++){
				knifeArr[i].render();
				knifeArr[i].update();
			}
			break;
		case 3:
		// 切到炸弹进入场景3
			this.boomtime++;
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
			for(var j = 0; j < fruitArr.length; j++){
				fruitArr[j].render();
			}
			for(var n = 0; n < fruitcutArr.length; n++){
				fruitcutArr[n].render();
			}
			for(var m = 0; m < boomArr.length; m++){
				boomArr[m].boomx_long += boomArr[m].boomx;
				boomArr[m].x += boomArr[m].boomx;
				if(boomArr[m].boomx_long > 5){
					boomArr[m].boomx = -3;
				}else if(boomArr[m].boomx_long < -5){
					boomArr[m].boomx = 3;
				}
				boomArr[m].render();
			}
			switch(game.life){
				case 3:
					game.ctx.save();
					game.ctx.drawImage(game.res["x"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 2:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 1:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 0:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxxf"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
			}
			game.ctx.save();
			game.ctx.drawImage(game.res["score"], 10, 10);
			game.ctx.fillStyle = "#fd9d1c";
			game.ctx.font = 'bold 36px 微软雅黑';
			game.ctx.fillText(`${game.score}`,50,40);
			game.ctx.restore();
			if(this.boomtime > 100){
				this.boomAlpha -= 0.01;
				for(var j = 0; j < fruitArr.length; j++){
					fruitArr[j].remove();
				}
				for(var n = 0; n < fruitcutArr.length; n++){
					fruitcutArr[n].remove();
				}
				game.ctx.save();
				game.ctx.globalAlpha = this.boomAlpha;
				game.ctx.fillStyle = "#fff";
				game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
				game.ctx.fill();
				game.ctx.restore();
				if(this.boomAlpha < 0.1){
					this.sceneNumber = 4;
					this.init(this.sceneNumber);
				}
			}
			break;
		case 4:
			game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
			this.overY+= 4;
			switch(game.life){
				case 3:
					game.ctx.save();
					game.ctx.drawImage(game.res["x"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 2:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xx"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 1:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxx"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
				case 0:
					game.ctx.save();
					game.ctx.drawImage(game.res["xf"], game.canvas.width - 81, 10);
					game.ctx.drawImage(game.res["xxf"], game.canvas.width - 59, 10);
					game.ctx.drawImage(game.res["xxxf"], game.canvas.width - 32, 10);
					game.ctx.restore();
					break;
			}
			game.ctx.save();
			game.ctx.drawImage(game.res["score"], 10, 10);
			game.ctx.fillStyle = "#fd9d1c";
			game.ctx.font = 'bold 36px 微软雅黑';
			game.ctx.fillText(`${game.score}`,50,40);
			game.ctx.restore();
			game.ctx.save();
			game.ctx.drawImage(game.res["game-over"], (game.canvas.width - 490) / 2, this.overY);
			game.ctx.restore();
			if(this.overY > 180){
				this.overY = 180;
			}
			if(this.overY == 180){
				if(game.knifeX > (game.canvas.width - 490) / 2 && game.knifeX < (game.canvas.width - 490) / 2 + 490 && game.knifeY > 180 && game.knifeY < 265){
					this.sceneNumber = 0;
					this.init(this.sceneNumber);
					document.getElementById("over").pause();
				}
			}
			for(var i = 0; i < knifeArr.length; i++){
				knifeArr[i].render();
				knifeArr[i].update();
			}
			break;
	}
};