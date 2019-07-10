class Player {
	constructor(name, playerType) {
		this.name = name;

		if(playerType === 'fighter') {
			this.class = 'Fighter';
			this.HP = 1;
			this.speed = 4;
			this.damage = 5;
			this.range = 1;
			this.icon = 'images/fighter-icon.png'
		}
		if(playerType === 'wizard'){
			this.class = 'Wizard';
			this.HP = 100;
			this.speed = 10;
			this.damage = 5;
			this.range = 40;
			this.icon = 'images/wiz-icon.png'
			this.fireball = 'images/fireball.gif'
			this.fire = 'images/fire.gif'
		}
		if(playerType === 'rogue'){
			this.class = 'Rogue';
			this.HP = 12;
			this.speed = 5;
			this.damage = 4;
			this.range = 1;
			this.icon = 'images/rogue-icon.png'
		}

		this.currentPosition = null;
		this.moveUsed = false;
		this.attackUsed = false;
		this.isAlive = true;
	}

	attack(e){
		if ($($(this).children()[0]).attr('class') === 'icon') {

			if (game[`player${$($(this).children()[0]).attr('id')}`].HP - game[`player${game.whichPlayer}`].damage < 0) {

				game[`player${$($(this).children()[0]).attr('id')}`].HP = 0
			} else {
				game[`player${$($(this).children()[0]).attr('id')}`].HP -= game[`player${game.whichPlayer}`].damage;
			}

			const board = $('#game-board').children()
			const curPlay = game[`player${game.whichPlayer}`]

			//get current players location
			let currentLeft;
			let currentTop
			let currCol
			let currRow

			for (let i = 0; i < board.length; i++) {
				if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
					currCol = $(board[i]).data('columnNum')
					currRow = $(board[i]).data('rowNum')
					currentLeft = `${(currCol*10) - 10}%`;
					currentTop = `${(currRow*10) - 10}%`;
				};
			}

			// enemy location

			let enemyCol = $(this).data('columnNum')
			let enemyRow = $(this).data('rowNum')
			let enemyLeft = `${(enemyCol*10) - 10}%`;
			let enemyTop =  `${(enemyRow*10) - 10}%`;

			//distination angle from 90deg

			Math.degrees = function(radians) {
			  	return radians * 180 / Math.PI;
			};

			const sideA = enemyCol - currCol;
			const sideB = enemyRow - currRow;

			let degrees;

			if (sideA >= 0 && sideB >= 0 || sideA > 0 && sideB <= 0 || sideA === 0 && sideB <= 0) {
				degrees = Math.degrees(Math.atan(sideB/sideA))
			} else if (sideA < 0 && sideB <= 0 || sideA <= 0 && sideB >= 0) {
				degrees = Math.degrees(Math.atan(sideB/sideA)) + 180
			}

			// const degrees = Math.degrees(Math.atan(sideB/sideA))

			console.log(sideA);
			console.log(sideB);
			console.log(degrees,' degrees'); 


			console.log(enemyLeft,enemyTop);

			if (curPlay.class === 'Wizard') {
				console.log('wizard animation');
				const $fireball = $(`<img/>`)
				$fireball.attr('src',curPlay.fireball)

				$fireball.css({
					'width': '10%',
					'height': '10%',
					'margin-top': currentTop,
					'margin-left': currentLeft,
					'transform':`rotate(${degrees}deg)`
				})

				$('#overlay').css('visibility','visible');

				$('#overlay').append($fireball)

				$fireball.animate({
					'margin-top': enemyTop,
					'margin-left': enemyLeft,
				}, 1500, function(){
					$fireball.attr('src',curPlay.fire)
					$fireball.css('transform','rotate(0deg)')
					$fireball.animate({
						'opacity': '0'
					},2000, function(){
						$('#overlay').css('visibility','hidden');
						$('#overlay').empty();
					})
				})


			}


			game[`player${game.whichPlayer}`].attackUsed = true;
			game.printBoard();
			game.checkTurnEnding()
			game.checkForWin()
		}
	}

	move(e){
		game.printBoard()
		let currentLeft;
		let currentTop;

		game.board.forEach((row) => {
			row.forEach((sq) => {

				if (sq.player == game.whichPlayer) {
						currentLeft = `${(sq.column*10) - 10}%`;
						currentTop = `${(sq.row*10) - 10}%`;
						sq.player = 0;
				}
			})
		})
		const destinationTop = `${($(e).data('rowNum')*10) - 10}%` 
		const destinationLeft = `${($(e).data('columnNum')*10) - 10}%`

		const $icon = $(`<img/>`)
		$icon.attr('src',game[`player${game.whichPlayer}`].icon)

		$icon.css({
			'width': '10%',
			'height': '10%',
			'margin-top': currentTop,
			'margin-left': currentLeft,
		})
		game.printBoard()
		$('#overlay').css('visibility','visible');

		$('#overlay').append($icon)

		// custom class animations

		$icon.animate({
			'margin-top': destinationTop,
			'margin-left': destinationLeft,
			'transform': 'rotate (360deg)'
		}, 1500, ()=>{
			$('#overlay').css('visibility','hidden');
			$('#overlay').empty();
			game.board.forEach((row) => {
			row.forEach((sq) => {

				if ($(e).attr('id') == sq.id) {
					sq.player = game.whichPlayer;
				}
			})
		})
		game[`player${game.whichPlayer}`].moveUsed = true;
		game.printBoard()
		game.checkForWin()
		game.checkTurnEnding()
		})		

	}
}

class Square {
	constructor(row, col){
		this.id = `${col}-${row}`;
		this.row = row;
		this.column = col;
		if (row === 1 && col === 1) {
			this.player = 1;
		} else if (row === 10 && col === 10) {
			this.player = 2;
		} else {
			this.player = 0;
		}
	}
}