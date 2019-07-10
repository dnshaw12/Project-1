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
			this.HP = 15;
			this.speed = 3;
			this.damage = 5;
			this.range = 40;
			this.icon = 'images/wiz-icon.png'
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
		console.log(e);
		if ($($(this).children()[0]).attr('class') === 'icon') {

			if (game[`player${$($(this).children()[0]).attr('id')}`].HP - game[`player${game.whichPlayer}`].damage < 0) {

				game[`player${$($(this).children()[0]).attr('id')}`].HP = 0
			} else {
				game[`player${$($(this).children()[0]).attr('id')}`].HP -= game[`player${game.whichPlayer}`].damage;
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