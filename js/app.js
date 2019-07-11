const game = {
	player1: null,
	player1Class: null,
	player2: null,
	player2Class: null,
	turn: 1,
	totalPlayers: 2,
	whichPlayer: 1,
	buttonsActive: true,
	lastTurnDamage: 0,
	board:[],
	classDesc: {
		rogue: "Fast and silent fighter. Moves quickly but less damage. Ability: Invisibility",
		fighter: "Sturdy and persistent combatant. Well rounded stats. Ability: Shield Up",
		wizard: "Powerful magic user. Has ranged attack but slow moving. Ability: Teleport"
	},

	makePlayer1(){
		if ($('#p1Input').val() === '' || game.player1Class === null) {
			$('#message-box').text('Please input your name and choose a class!')
			game.animateMessage();
		} else {
			if (game.player1Class === 'fighter') {
				game.player1 = new Fighter($('#p1Input').val(),1)
			} else if (game.player1Class === 'wizard') {
				game.player1 = new Wizard($('#p1Input').val(),1)
			} else if (game.player1Class === 'rogue') {
				game.player1 = new Rogue($('#p1Input').val(),1)
			}
			$('#p1StartScreen').css('visibility','hidden')
			$('#message-box').text('')
		} 
	},

	makePlayer2(){
		if ($('#p2Input').val() === '' || game.player2Class === null) {
			$('#message-box').text('Please input your name and choose a class!')
			game.animateMessage();
		} else {
			if (game.player2Class === 'fighter') {
				game.player2 = new Fighter($('#p2Input').val(),2)
			} else if (game.player2Class === 'wizard') {
				game.player2 = new Wizard($('#p2Input').val(),2)
			} else if (game.player2Class === 'rogue') {
				game.player2 = new Rogue($('#p2Input').val(),2)
			}
			$('#p2StartScreen').css('visibility','hidden')
			$('#message-box').text('')
			game.startGame()
		} 
	},

	makeBoard(){
		for (let i = 1; i <= 10; i++){
			const boardRow = [];
			for (let j = 1; j <= 10; j++){
				const $div = $(`<div data-column-num="${j}" id="${j}-${i}" data-row-num="${i}"></div>`);
				$div.css({
					'width':'10%',
					'height':'10%',
					'z-index':'0'
				});

				if (i%2) {
					if (j%2) {
						$div.css('background-color','white')
					} else {
						$div.css('background-color','grey')
					}
				} else {
					if (j%2) {
						$div.css('background-color','grey')
					} else {
						$div.css('background-color','white')
					}
				}
				// $div.text(`${j}/${i}`)
				$('#game-board').append($div)
				const sqObj = new Square(i,j);
				boardRow.push(sqObj)
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.abilityActive}' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.abilityActive}' id=2 height="100%" width="100%">`)

				if (i === 1 && j === 1) {
					$div.append($icon1)
					this.player1.currentPosition = $div
					$div.on('click',(e) => {

						this.printBoard()
						this.highlightMoves(e.currentTarget);


					})
				} else if (i === 10 && j === 10) {
					$div.append($icon2)
					this.player2.currentPosition = $div
					$div.on('click',(e) => {
						this.printBoard()
						this.highlightMoves(e.currentTarget);

					})
				}
			}
			this.board.push(boardRow);
		}
		$('#game-board').css({'box-shadow': '10px 10px 5px black'})
	},

	printBoard(){
		$('#game-board').empty()
		this.board.forEach((row, i) =>{
			row.forEach((sq, j) =>{
				const $div = $(`<div data-column-num="${j+1}" id="${j+1}-${i+1}" data-row-num="${i+1}"></div>`);
				$div.css({
					'width':'10%',
					'height':'10%'
				});

				if (i%2) {
					if (j%2) {
						$div.css('background-color','white')
					} else {
						$div.css('background-color','grey')
					}
				} else {
					if (j%2) {
						$div.css('background-color','grey')
					} else {
						$div.css('background-color','white')
					}
				}
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.abilityActive}' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.abilityActive}' id=2 height="100%" width="100%">`)

				//re print the icons
				if (sq.player === 1) {
					$div.append($icon1);
					this.player1.currentPosition = $div
					$div.on('click',(e) => {

						this.highlightMoves(e.currentTarget);


					})
				} else if (sq.player === 2) {
					$div.append($icon2);
					this.player2.currentPosition = $div
					$div.on('click',(e) => {

						this.highlightMoves(e.currentTarget);


					})
				}
				$('#game-board').append($div)
			})
		})

		//check for invisibility and set opacity

		const board = $('#game-board').children()
		for (let i = 0; i < board.length; i++) {
			const $img = $($(board[i]).children()[0])
			if ($img.hasClass('invisible') && parseInt($img.attr('id')) === this.whichPlayer) {
				$img.css('opacity','0.3');
			} else if ($img.hasClass('invisible') && parseInt($img.attr('id')) !== this.whichPlayer) {
				$img.css('opacity','0')
			}
		}


		for (let i = 1; i <= this.totalPlayers; i++){

			//use player current postion to set opacity to 0
			//handle insisibility own function



		}
		$(`.p${this.whichPlayer}Hidden`).css('visibility','visible')
		$('#game-board').css({'box-shadow': '10px 10px 5px black'})
	},

	startGame(){
		this.makeBoard();
		this.updateStats()

	},

	updateStats(){
		$(`.stats`).css('visibility','hidden')
		$(`.p${this.whichPlayer}Hidden`).css('visibility','visible')
		$('#turn-number').text(this.turn)
		for (let i = 1; i <= this.totalPlayers; i++){
			$(`#p${i}HP`).text(this[`player${i}`].HP)
			$(`#p${i}Name`).text(this[`player${i}`].name+' the '+this[`player${i}`].class)
		}
	},

	highlightMoves(e){

		const curPlay = game[`player${game.whichPlayer}`]

		if ($($(e).children()[0]).attr('id') == this.whichPlayer) {

			if (curPlay.moveUsed === true) {
				$('#message-box').text('You already moved this turn!')
				this.animateMessage();
			} else{
				this.printBoard()
				const colNum = $(e).attr('data-column-num')
				const rowNum = $(e).attr('data-row-num')
				
				const board = $('#game-board').children()

				for (let i = 0; i < board.length; i++) {
					if ($(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') <= parseInt(colNum) + curPlay.speed && $(board[i]).attr('data-column-num') > parseInt(colNum) || 

						$(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') >= parseInt(colNum) - curPlay.speed && $(board[i]).attr('data-column-num') < parseInt(colNum)) {

						if (!$($(board[i]).children()[0]).hasClass('icon')) {
							$(board[i]).addClass('moveSpace')
							$(board[i]).on('click',(el)=>{
								const e = el.target
								this[`player${game.whichPlayer}`].move(e)
							})
						}
						if ($($(board[i]).children()[0]).hasClass('icon') && $($(board[i]).children()[0]).hasClass('invisible')) {
								$(board[i]).addClass('moveSpace');
								$(board[i]).on('click',(el)=>{
									$('#message-box').text('You stepped on an invisible person!');
									game.animateMessage();
									this.handleInvisible($($(board[i]).children()[0]).attr('id'));
								})
							}
					}
				}

				
				for (let i = 0; i < board.length; i++){
					for (let j = curPlay.speed; j >= 0; j--){

						if ($(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.speed - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

							$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.speed + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) ||

							$(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.speed + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) || 

							$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.speed - j && $(board[i]).attr('data-row-num') > parseInt(rowNum)){

							if (!$($(board[i]).children()[0]).hasClass('icon')) {
								$(board[i]).addClass('moveSpace');
								$(board[i]).on('click',(el)=>{
									const e = el.target
									this[`player${game.whichPlayer}`].move(e)
								})
							}
							if ($($(board[i]).children()[0]).hasClass('icon') && $($(board[i]).children()[0]).hasClass('invisible')) {
								$(board[i]).addClass('moveSpace');
								$(board[i]).on('click',(el)=>{
									this.handleInvisible($($(board[i]).children()[0]).attr('id'));
								})
							}
						}
					}
				}
			}

		}

	},

	highlightAttacks(){
		const curPlay = game[`player${game.whichPlayer}`];

		const board = $('#game-board').children()

		const colNum = $(curPlay.currentPosition).attr('data-column-num')
		const rowNum = $(curPlay.currentPosition).attr('data-row-num')

		if (curPlay.attackUsed === true) {
			$('#message-box').text('You already attacked this turn!')
			game.animateMessage();
		} else {
			for (let i = 0; i < board.length; i++) {
				if ($(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') <= parseInt(colNum) + curPlay.range && $(board[i]).attr('data-column-num') > parseInt(colNum) || 

					$(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') >= parseInt(colNum) - curPlay.range && $(board[i]).attr('data-column-num') < parseInt(colNum) ||

					$(board[i]).attr('data-column-num') === colNum && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

					$(board[i]).attr('data-column-num') === colNum && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.range && $(board[i]).attr('data-row-num') < parseInt(rowNum)

					) {
					$(board[i]).addClass('attackSpace')
					$(board[i]).on('click',this[`player${game.whichPlayer}`].attack)
				}
			}
			
			for (let i = 0; i < board.length; i++){
				for (let j = curPlay.range; j > 0; j--){

					if ($(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) ||

						$(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') >=parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) ) {
						$(board[i]).addClass('attackSpace');
						$(board[i]).on('click',this[`player${game.whichPlayer}`].attack)

					}
				}
			}
		}
		
	},

	handleInvisible(invisiblePlayer){
		$('#message-box').text('You found an invisible person!');
		this.animateMessage();
		$unhide = this[`player${invisiblePlayer}`];
		$unhide.abilityActive = null;
		$unhide.opacity = 1;


		const curPlay = this[`player${invisiblePlayer}`]
		const board = $('#game-board').children()

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		for (let i = 0; i < board.length; i++) {
			if (parseInt($($(board[i]).children()[0]).attr('id')) === $unhide.playerNum) {
				currCol = $(board[i]).data('columnNum')
				currRow = $(board[i]).data('rowNum')
				currentLeft = `${(currCol*10) - 10}%`;
				currentTop = `${(currRow*10) - 10}%`;
			};
		}

		let icon;
		for (let i = 0; i < board.length; i++){
			if (parseInt($($(board[i]).children()[0]).attr('id')) === $unhide.playerNum) {
				icon = $($(board[i]).children()[0]);
			}
		}
		
		icon.animate({
			'opacity': '1',
		}, 3000, function(){
			$('#overlay').css('visibility','hidden');
			$('#overlay').empty();
			game.printBoard();
			game.buttonsActive = true;							
		})
	},

	checkTurnEnding(){
		const curPlay = game[`player${game.whichPlayer}`];
		let totalDead = 0;
		for (let i = 1; i <= this.totalPlayers; i++){
			const player = this[`player${i}`]
			if (player.HP === 0 && player.isAlive === true) {
				player.isAlive = false;
				totalDead++;
			}	
		}
		if (curPlay.moveUsed === true && curPlay. attackUsed === true && totalDead !== this.totalPlayers - 1 ) {

			$(`.p${game.whichPlayer}Hidden`).css('visibility','hidden')

			if (this.whichPlayer !== this.totalPlayers) {
				this.whichPlayer++;
			} else {
				this.whichPlayer = 1;
				this.turn++;
			}
			this.buttonsActive = false;
			curPlay.moveUsed = false;
			curPlay.attackUsed = false;
			$('#game-board').css({'box-shadow': '0px 0px 0px black'})

			// add player switch screen
			const nextPlayer = game[`player${game.whichPlayer}`]

			const $div = $(`<div></div>`)
			const $button = $(`<button id="start-turn">Take Turn</button>`)
			$div.addClass('turnSwitch')
			const $p = $(`<p>Turn ${this.turn}: It's ${nextPlayer.name} the ${nextPlayer.class}'s turn!</p>`)
			const $p2 = $(`<p>You took ${this.lastTurnDamage} damage!</p>`)
			$p.css({
				'color': 'black',
				'text-align': 'center',
				'font-size': '5vh',

			})
			$button.on('click',()=>{
				$('.turnSwitch').remove()
				game.printBoard()
				$('#game-board').css({'box-shadow': '10px 10px 5px black'})
				game.buttonsActive = true;
				$(`.p${game.whichPlayer}Hidden`).css('visibility','visible')
				this.updateStats()
			})
			$div.append($p);
			$div.append($p2)
			$div.append($button);
			$('#game-board').empty();
			$('#game-board').append($div);

			if (curPlay.abilityActive !== null && curPlay.abilityActive !== 'teleport') {
				curPlay.abilityTurns++
			}
			if (curPlay.abilityActive === 'teleport' && curPlay.abilityTurns === 2) {
				curPlay.abilityActive = null;
				curPlay.speed = curPlay.originalSpeed;
			}
			if (curPlay.abilityTurns > 2) {
				curPlay.abilityActive = null;
				curPlay.opacity = 1;
				if (curPlay.class === 'Fighter') {
					curPlay.icon = 'images/fighter-icon.png'
				}
			}
			
			$('#message-box').text('')
			this.lastTurnDamage = 0;
		}
	},

	passTurn(){
		const curPlay = game[`player${game.whichPlayer}`];
		curPlay.moveUsed = true;
		curPlay.attackUsed = true;
		game.checkTurnEnding();
	},

	checkForWin(){
		this.updateStats()
		let totalDead = 0;
		let winner;
		for (let i = 1; i <= this.totalPlayers; i++){
			const player = this[`player${i}`]
			if (player.HP === 0 && player.isAlive === true) {
				player.isAlive = false;
				totalDead++;
			}	
		}
		if (totalDead === this.totalPlayers - 1) {	
			for (let i = 1; i <= this.totalPlayers; i++){
				const player = this[`player${i}`]
				if (player.isAlive === true) {
					winner = player;
				}
			}
		}
		if (winner !== undefined) {
			$('#game-board').css({'box-shadow': '0px 0px 0px black'})
			$(`.stats`).css('visibility','visible')
			this.buttonsActive = false;
			const $div = $(`<div id='end-game'></div>`)
			$div.addClass('endScreen')
			$p = $(`<p>${winner.name} the ${winner.class} Wins!</p>`)
			$button = $(`<button id='reset'>Play Again!</button>`)
			$div.css({

			})
			$p.css({
				'color': 'black',
				'text-align': 'center',
				'font-size': '5vh',

			})
			$button.on('click', ()=>{
				this.resetGame()
			})
			$div.append($p);
			$div.append($button);
			$('#game-board').empty();
			$('#game-board').append($div);
		}
	},

	animateMessage(){
		$('#message-box').addClass('messageAnimate')
		let time = 0;
		const timer = setInterval(()=>{
			time++;
			if (time === 6) {
				$('#message-box').removeClass('messageAnimate')
				clearInterval(timer)
			}
		},1000)
	},

	resetGame(){
		for (let i = 1; i <= this.totalPlayers; i++){
			this[`player${i}`] = null
			$(`#p${i}StartScreen`).css('visibility','visible')
			$(`.p${i}Hidden`).css('visibility','hidden')
		}
		this.board = [];
		$('#end-game').remove();
		$('input').val('')
		this.turn = 1;
		this.whichPlayer = 1;
		this.buttonsActive = true;

	}
}

$('#p1Buttons').on('click',(e)=>{
	game.player1Class = $(e.target).attr('id');
	$('button').css({
		'color': 'black'
	})
	$(e.target).css({
		'color': 'rgb(218,165,32)'
	})
})

$('#p1StartButton').on('click',game.makePlayer1)

$('#p2Buttons').on('click',(e)=>{
	game.player2Class = $(e.target).attr('id');
	$('button').css({
		'color': 'black'
	})
	$(e.target).css({
		'color': 'rgb(218,165,32)'
	})
})

$('#p2StartButton').on('click',game.makePlayer2)

$('.attackButton').on('click',() =>{
	if (game.buttonsActive === true) {
		game.printBoard()
		game.highlightAttacks()
	}
})

$('.passButton').on('click',()=>{
	if (game.buttonsActive === true) {
		game.passTurn()
	}
})

$('.abilityButton').on('click',()=>{
	if (game.buttonsActive === true && game[`player${game.whichPlayer}`].abilityUsed === false) {
		game[`player${game.whichPlayer}`].useAbility()
		game.printBoard()
	} else if (game.buttonsActive !== true && game[`player${game.whichPlayer}`].abilityUsed === false) {
		$('#message-box').text('You have already used your ability this game!')
		game.animateMessage()
	}
})

$('.classSelector').hover( (e) => {
	$('#popupText').text(game.classDesc[e.target.id])
	$('.popup').css({'visibility':'visible'})
})

$('.classSelector').mouseout( (e) => {
	$('.popup').css({'visibility':'hidden'})
})

$('.abilityButton').hover( (e) => {
	$('#popupText').text(game[`player${game.whichPlayer}`].abilityDesc)
	$('.popup').css({'visibility':'visible'})
})

$('.abilityButton').mouseout( (e) => {
	$('.popup').css({'visibility':'hidden'})
})


