class Player {
	constructor(name, playerNum) {
		this.name = name;

		this.playerNum = playerNum

		this.currentPosition = null;
		this.moveUsed = false;
		this.attackUsed = false;
		this.isAlive = true;
		this.abilityTurns = 0;
		this.abilityActive = null;
		this.abilityUsed = false;
		this.opacity = 1;
		this.lastTurnDamage = 0;
	}

	attack(e){
		game.printBoard()
		game.buttonsActive = false;

		const board = $('#game-board').children()
		const curPlay = game.players[`player${game.whichPlayer}`]

		//get current players location
		let currentLeft;
		let currentTop
		let currCol
		let currRow

		// loop through board and find where the active player is
		//assign those coordinates percntages -10 as thats how much margin they are 

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

		//distination angle from right side in degrees

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

		//calculates and reduces HP based on attackers damage

		const $opponent = $($(this).children()[0])
		const opponent = game.players[`player${$opponent.attr('id')}`]

		// checks if the attacked tile has a player
		if ($opponent.hasClass('icon')){

			let $opponentHP = game.players[`player${$opponent.attr('id')}`].HP
			const $currPlayerDamage = game.players[`player${game.whichPlayer}`].damage

			//different senarios based on if the player has certain abilities active
			if (!$opponent.hasClass('shielded')) {
				if (!$opponent.hasClass('invisible')) {

					if ($opponentHP - $currPlayerDamage < 0) {
						opponent.HP = 0;
					} else {
						opponent.HP -= $currPlayerDamage;
						opponent.lastTurnDamage += $currPlayerDamage;
					}
				} else if ($opponent.hasClass('invisible')) {

					game.handleInvisible($opponent.attr('id'))
					
					if ($opponentHP - $currPlayerDamage < 0) {
						opponent.HP = 0;
					} else {
						opponent.HP -= $currPlayerDamage;
						opponent.lastTurnDamage += $currPlayerDamage;
					}
				}
			} else {

				if ($opponentHP - $currPlayerDamage/2 < 0) {

					opponent.HP = 0;
				} else {
					opponent.HP -= $currPlayerDamage/2;
					game.lastTurnDamage = $currPlayerDamage/2;
				}
			}
			if (opponent.HP === 0) {
				game.killPlayer(enemyCol, enemyRow)
			}
		} else { //if no player in a square
			$('#message-box').text('You missed!')
			game.animateMessage()
		}

		game.checkForWin()		
	}

		//wizard attack animation
		if (curPlay.class === 'Wizard') {
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
				})
			})


			//fighter animation
		} else if (curPlay.class === 'Fighter') {
			let fighterIcon;
			for (let i = 0; i < board.length; i++){
				if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
					fighterIcon = $($(board[i]).children()[0]);
				}
			}

			const $shield = $(`<img/>`)

			$shield.attr('src',curPlay.icon)
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
					})	
				})
			})
			//rogue animation
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
				'opacity': game.players[`player${game.whichPlayer}`].opacity
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
				})
			})
		}
		//mark active player's attack as used
		game.players[`player${game.whichPlayer}`].attackUsed = true;
	}

	move(e){
		game.printBoard()
		game.buttonsActive = false;
		let currentLeft;
		let currentTop;

		//find active players current postion

		game.board.forEach((row) => {
			row.forEach((sq) => {

				if (sq.player == game.whichPlayer) {
						currentLeft = `${(sq.column*10) - 10}%`;
						currentTop = `${(sq.row*10) - 10}%`;

						// remove player from the array so they dont get printed there again
						sq.player = 0;
				}
			})
		})

		// percentages are same as attack calulcations
		const destinationTop = `${($(e).data('rowNum')*10) - 10}%` 
		const destinationLeft = `${($(e).data('columnNum')*10) - 10}%`


		//move animation for player if they are current teleporting
		const $icon = $(`<img/>`)
		$icon.attr('src',game.players[`player${game.whichPlayer}`].icon)

		$icon.css({
			'width': '10%',
			'height': '10%',
			'margin-top': currentTop,
			'margin-left': currentLeft,
			'opacity': game.players[`player${game.whichPlayer}`].opacity
		})
		game.printBoard()
		$('#overlay').css('visibility','visible');

		$('#overlay').append($icon)

		if (game.players[`player${game.whichPlayer}`].abilityActive === 'teleport') {
			game.players[`player${game.whichPlayer}`].abilityTurns++

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
								//change players placement in baord array so new printed board will print it in the correct place
								if ($(e).attr('id') == sq.id) {
									sq.player = game.whichPlayer;

								}
							})
						})
					game.players[`player${game.whichPlayer}`].moveUsed = true;
					game.printBoard()
					game.checkForWin()
					})
				})
			})
			// animation if NOT teleporting
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
			game.players[`player${game.whichPlayer}`].moveUsed = true;
			game.printBoard()
			game.checkForWin()
			})		
		}
		
		// custom class animations


	}
	//marks ability as used
	initiateAbility(){
		this.abilityUsed = true
	}
}

class Fighter extends Player {
	constructor(name, playerNum){
		super(name, playerNum);
		this.class = 'Fighter';
		this.HP = 5;
		this.speed = 4;
		this.damage = 5;
		this.range = 1;
		this.icon = 'images/fighter-icon.png'
		this.pow = 'images/pow.png'
		this.shielded = 'images/fighter-icon-shield.png'  
		this.abilityDesc = "Shield Up: Take half damage from any attack on your next 3 turns!"
	} 
	useAbility() {
		super.initiateAbility()
		/// Shield Up (half damage for 2 turns)

		game.players[`player${game.whichPlayer}`].abilityActive = `shielded`

		const curPlay = game.players[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		// find active players position

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		//animation for ability

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

		$shield.animate({
			'opacity': '1'
		}, 2000,'easeOutBounce', function(){
			curPlay.icon = 'images/fighter-icon-shield.png'
			$('#overlay').css('visibility','hidden');
			$('#overlay').empty();
			game.printBoard();
			game.buttonsActive = true;							
			game.checkForWin()
			
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
		this.abilityDesc = "Teleport: You will be able to move to any tile on your next 2 moves!"
	}
	useAbility() {
		super.initiateAbility()
		/// teleport
		game.players[`player${game.whichPlayer}`].abilityActive = `teleport`
		game.players[`player${game.whichPlayer}`].speed = 20;

		const curPlay = game.players[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		// find active players position

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === game.whichPlayer) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		// animation or ability

		const $teleport = $(`<img/>`)

		$teleport.attr('src',curPlay.teleport)
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
				game.checkForWin
			})
		})	
	}
}

class Rogue extends Player {
	constructor(name, playerNum){
		super(name, playerNum);
		this.class = 'Rogue';
		this.HP = 14;
		this.speed = 5;
		this.damage = 4;
		this.range = 1;
		this.icon = 'images/rogue-icon.png';
		this.blood = 'images/blood.png'
		this.abilityDesc = "Invisibility: Become invisible to your opponent for the next 3 rounds!"
	}
	useAbility(){
		//go invisible
		super.initiateAbility()

		game.players[`player${game.whichPlayer}`].abilityActive = `invisible`
		game.players[`player${game.whichPlayer}`].opacity = 0.3

		const curPlay = game.players[`player${game.whichPlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		// find active players position

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

		// ability animation

		const $knife = $(`<img/>`)

		$knife.attr('src',curPlay.icon)
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
			game.checkForWi
		})	
	}
}




class Square {
	constructor(row, col){
		this.id = `${col}-${row}`;
		this.row = row;
		this.column = col;
		this.player = 0;
	}
}