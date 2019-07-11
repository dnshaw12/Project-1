class Player {
	constructor(name, playerNum) {
		this.name = name;
		this.playerNum = playerNum

		// if(playerType === 'fighter') {
		// 	this.class = 'Fighter';
		// 	this.HP = 18;
		// 	this.speed = 4;
		// 	this.damage = 5;
		// 	this.range = 1;
		// 	this.icon = 'images/fighter-icon.png'
		// 	this.pow = 'images/pow.png'
		// }
		// if(playerType === 'wizard'){
		// 	this.class = 'Wizard';
		// 	this.HP = 15;
		// 	this.speed = 3;
		// 	this.damage = 5;
		// 	this.range = 40;
		// 	this.icon = 'images/wiz-icon.png'
		// 	this.fireball = 'images/fireball.gif'
		// 	this.fire = 'images/fire.gif'
		// }
		// if(playerType === 'rogue'){
		// 	this.class = 'Rogue';
		// 	this.HP = 12;
		// 	this.speed = 50;
		// 	this.damage = 4;
		// 	this.range = 100;
		// 	this.icon = 'images/rogue-icon.png';
		// 	this.blood = 'images/blood.png'
		// }

		this.currentPosition = null;
		this.moveUsed = false;
		this.attackUsed = false;
		this.isAlive = true;
		this.abilityTurns = 0;
		this.abilityActive = null;
		this.abilityUsed = false;
		this.opacity = 1;
	}

	attack(e){
		game.printBoard()
		game.buttonsActive = false;

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

		//distination angle from right side

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


	const calculateDamage = () => {

		const $opponent = $($(this).children()[0])
		const opponent = game[`player${$opponent.attr('id')}`]
		if ($opponent.hasClass('icon')){

			let $opponentHP = game[`player${$opponent.attr('id')}`].HP
			const $currPlayerDamage = game[`player${game.whichPlayer}`].damage

			if (!$opponent.hasClass('shielded')) {
				if (!$opponent.hasClass('invisible')) {

					if ($opponentHP - $currPlayerDamage < 0) {
						console.log(1);
						opponent.HP = 0;
						console.log($opponentHP);
					} else {
						opponent.HP -= $currPlayerDamage;
						game.lastTurnDamage = $currPlayerDamage;
						console.log(1);
					}
				} else if ($opponent.hasClass('invisible')) {

					game.handleInvisible($opponent.attr('id'))
					
					if ($opponentHP - $currPlayerDamage < 0) {
						console.log(1);
						opponent.HP = 0;
					} else {
						opponent.HP -= $currPlayerDamage;
						game.lastTurnDamage = $currPlayerDamage;
						console.log(1);
					}
				}
			} else {

				if ($opponentHP - $currPlayerDamage/2 < 0) {

					console.log(1);
					opponent.HP = 0;
				} else {
					console.log(1);
					opponent.HP -= $currPlayerDamage/2;
					game.lastTurnDamage = $currPlayerDamage/2;
				}
			}
		} else {
			$('#message-box').text('You missed!')
			game.animateMessage()
			console.log(1);
		}		
	}


		if (curPlay.class === 'Wizard') {
			console.log('wizard animation');
			const $fireball = $(`<img/>`)
			$fireball.attr('src',curPlay.fireball)

			$fireball.css({
				'width': '10%',
				'height': '10%',
				'margin-top': currentTop,
				'margin-left': currentLeft,
				'transform':`rotate(${degrees}deg)`,
				'z-index': '1'
			})

			$('#overlay').css('visibility','visible');

			$('#overlay').append($fireball)

			$fireball.animate({
				'margin-top': enemyTop,
				'margin-left': enemyLeft,
			}, 1500,'easeInQuint', function(){
				$fireball.attr('src',curPlay.fire)
				$fireball.css('transform','rotate(0deg)')
				$fireball.animate({
					'opacity': '0'
				},2000, function(){
					$('#overlay').css('visibility','hidden');
					$('#overlay').empty();
					game.printBoard();
					game.buttonsActive = true;

					calculateDamage()

					game.checkForWin()
					game.checkTurnEnding()
				})
			})


		} else if (curPlay.class === 'Fighter') {
			console.log('fighter animation');
			let fighterIcon;
			for (let i = 0; i < board.length; i++){
				if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
					fighterIcon = $($(board[i]).children()[0]);
				}
			}

			const $shield = $(`<img/>`)

			$shield.attr('src',curPlay.icon)
			console.log(curPlay.icon);
			$shield.css({
				'width': '10%',
				'height': '10%',
				'margin-top': currentTop,
				'margin-left': currentLeft,
				'transform':`rotate(${degrees - 90}deg)`
			})

			$('#overlay').css('visibility','visible');

			$('#overlay').append($shield)

			
			fighterIcon.hide()

			$shield.animate({
				'margin-top': enemyTop,
				'margin-left': enemyLeft,
			}, 750, 'easeInElastic', function(){
				$shield.css({
					'transform':`rotate(0deg)`
				})
				$shield.attr('src',curPlay.pow)
				$shield.animate({
					'width': '10%',
					'height': '10%',
				},400, function(){
					$shield.attr('src',curPlay.icon)
					$shield.css({
						'transform':`rotate(${degrees - 90}deg)`
					})
					$shield.animate({
						'margin-top': currentTop,
						'margin-left': currentLeft,
						'rotate':`0deg`
					},1000,'swing', function(){
						fighterIcon.show()
						$('#overlay').css('visibility','hidden');
						$('#overlay').empty();
						game.printBoard();
						game.buttonsActive = true;	

						calculateDamage()

						game.checkForWin()
						game.checkTurnEnding()
					})	
				})
			})
			
		} else if (curPlay.class === 'Rogue') {
			let rogueIcon;
			for (let i = 0; i < board.length; i++){
				if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
					rogueIcon = $($(board[i]).children()[0]);
				}
			}

			const $knife = $(`<img/>`)

			$knife.attr('src',curPlay.icon)
			$knife.css({
				'width': '10%',
				'height': '10%',
				'margin-top': currentTop,
				'margin-left': currentLeft,
				'transform':`rotate(${degrees+225}deg)`,
				'position': 'absolute',
				'opacity': game[`player${game.whichPlayer}`].opacity
			})


			const $blood = $(`<img/>`)

			$blood.attr('src',curPlay.blood)
			$blood.css({
				'width': '10%',
				'height': '10%',
				'margin-top': enemyTop,
				'margin-left': enemyLeft,
				'z-index': '20',
				'position': 'absolute'
			})

			$('#overlay').css('visibility','visible');
			$('#overlay2').css('visibility','visible');

			$('#overlay').append($knife)

			rogueIcon.hide()

			$knife.animate({
				'margin-top': enemyTop,
				'margin-left': enemyLeft,
			},500,'easeInBack',function(){
				$('#overlay2').append($blood)
				$blood.animate({'opacity': '0'},2000,'easeInCubic')
				$knife.animate({
					'margin-top': currentTop,
					'margin-left': currentLeft,
				},2000,function(){
					rogueIcon.show()
					$('#overlay').css('visibility','hidden');
					$('#overlay2').css('visibility','hidden');
					$('#overlay').empty();
					game.printBoard();
					game.buttonsActive = true;

					calculateDamage()

					game.checkForWin()
					game.checkTurnEnding()
				})
			})
		}




		game[`player${game.whichPlayer}`].attackUsed = true;
	}

	move(e){
		game.printBoard()
		game.buttonsActive = false;
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
			'opacity': game[`player${game.whichPlayer}`].opacity
		})
		game.printBoard()
		$('#overlay').css('visibility','visible');

		$('#overlay').append($icon)

		if (game[`player${game.whichPlayer}`].abilityActive === 'teleport') {
			game[`player${game.whichPlayer}`].abilityTurns++
			console.log('ability teleport',game[`player${game.whichPlayer}`].abilityTurns);

			$icon.animate({
				'opacity': '0'
			}, 500, ()=>{
				$icon.animate({
					'margin-top': destinationTop,
					'margin-left': destinationLeft
				}, 500, () => {
					$icon.animate({
						'opacity': '1'
					}, 1000, () => {
						$('#overlay').css('visibility','hidden');
						$('#overlay').empty();
						game.buttonsActive = true;
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
				})
			})

		} else {
			$icon.animate({
				'margin-top': destinationTop,
				'margin-left': destinationLeft,
			}, 1500, ()=>{
				$('#overlay').css('visibility','hidden');
				$('#overlay').empty();
				game.buttonsActive = true;
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
		
		// custom class animations


	}

	initiateAbility(){
		this.abilityUsed = true
	}
}

class Fighter extends Player {
	constructor(name, playerNum){
		super(name, playerNum);
		this.class = 'Fighter';
		this.HP = 18;
		this.speed = 4;
		this.damage = 5;
		this.range = 1;
		this.icon = 'images/fighter-icon.png'
		this.pow = 'images/pow.png'
		this.shielded = 'images/fighter-icon-shield.png'
	}
	useAbility() {
		super.initiateAbility()
		/// Shield Up (helf damage for 2 turns)

		game[`player${game.whichPlayer}`].abilityActive = `shielded`

		const curPlay = game[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		const $shield = $(`<img/>`)

		$shield.attr('src',curPlay.shielded)
		$shield.css({
			'width': '10%',
			'height': '10%',
			'margin-top': currentTop,
			'margin-left': currentLeft,
			'opacity': '0'
		})

		$('#overlay').css('visibility','visible');

		$('#overlay').append($shield)

		console.log(curPlay);

		$shield.animate({
			'opacity': '1'
		}, 2000,'easeOutBounce', function(){
			console.log('animation shield');
			curPlay.icon = 'images/fighter-icon-shield.png'
			$('#overlay').css('visibility','hidden');
			$('#overlay').empty();
			game.printBoard();
			game.buttonsActive = true;							
			game.checkForWin()
			game.checkTurnEnding()
		})

	}
}

class Wizard extends Player {
	constructor(name, playerNum){
		super(name, playerNum);
		this.class = 'Wizard';
		this.HP = 15;
		this.originalSpeed = 3;
		this.speed = this.originalSpeed;
		this.damage = 5;
		this.range = 5;
		this.icon = 'images/wiz-icon.png'
		this.fireball = 'images/fireball.gif'
		this.fire = 'images/fire.gif'
		this.teleport = 'images/teleport.gif'
	}
	useAbility() {
		super.initiateAbility()
		/// teleport
		game[`player${game.whichPlayer}`].abilityActive = `teleport`
		game[`player${game.whichPlayer}`].speed = 20;

		const curPlay = game[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		const $teleport = $(`<img/>`)

		$teleport.attr('src',curPlay.teleport)
		console.log(curPlay.icon);
		$teleport.css({
			'width': '10%',
			'height': '10%',
			'margin-top': currentTop,
			'margin-left': currentLeft,
			'opacity': '0',
		})

		$('#overlay').css('visibility','visible');

		$('#overlay').append($teleport)

		

		$teleport.animate({
			'opacity': '1',
		}, 1000, function(){
			$teleport.animate({
				'opacity': '0',
			}, 1000,function(){
				$('#overlay').css('visibility','hidden');
				$('#overlay').empty();
				game.printBoard();
				game.buttonsActive = true;							
				game.checkForWin()
				game.checkTurnEnding()
			})
		})	
	}
}

class Rogue extends Player {
	constructor(name, playerNum){
		super(name, playerNum);
		this.class = 'Rogue';
		this.HP = 13;
		this.speed = 5;
		this.damage = 4;
		this.range = 1;
		this.icon = 'images/rogue-icon.png';
		this.blood = 'images/blood.png'
	}
	useAbility(){
		//go invisible
		super.initiateAbility()

		game[`player${game.whichPlayer}`].abilityActive = `invisible`
		game[`player${game.whichPlayer}`].opacity = 0.3

		const curPlay = game[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		let icon;
		for (let i = 0; i < board.length; i++){
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				icon = $($(board[i]).children()[0]);
			}
		}

		const $knife = $(`<img/>`)

		$knife.attr('src',curPlay.icon)
		console.log(curPlay.icon);
		$knife.css({
			'width': '10%',
			'height': '10%',
			'margin-top': currentTop,
			'margin-left': currentLeft,
		})

		$('#overlay').css('visibility','visible');

		$('#overlay').append($knife)

		
		icon.hide()

		$knife.animate({
			'opacity': '0.2',
		}, 1500, function(){
			icon.show()
			$('#overlay').css('visibility','hidden');
			$('#overlay').empty();
			game.printBoard();
			game.buttonsActive = true;							
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