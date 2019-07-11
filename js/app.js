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

	makePlayer1(){
		if ($('#p1Input').val() === '' || game.player1Class === null) {
			$('#message-box').text('Please input your name and choose a class!')
			game.animateMessage();
		} else {
			if (game.player1Class === 'fighter') {
				game.player1 = new Fighter($('#p1Input').val())
			} else if (game.player1Class === 'wizard') {
				game.player1 = new Wizard($('#p1Input').val())
			} else if (game.player1Class === 'rogue') {
				game.player1 = new Rogue($('#p1Input').val())
			}
			$('#p1StartScreen').remove()
			$('#message-box').text('')
		} 
	},

	makePlayer2(){
		if ($('#p2Input').val() === '' || game.player2Class === null) {
			$('#message-box').text('Please input your name and choose a class!')
			game.animateMessage();
		} else {
			if (game.player2Class === 'fighter') {
				game.player2 = new Fighter($('#p2Input').val())
			} else if (game.player2Class === 'wizard') {
				game.player2 = new Wizard($('#p2Input').val())
			} else if (game.player2Class === 'rogue') {
				game.player2 = new Rogue($('#p2Input').val())
			}
			$('#p2StartScreen').remove()
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
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.isInvisible}' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.isInvisible}' id=2 height="100%" width="100%">`)

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
		// console.log('new board printed');
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
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.isInvisible}' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.isInvisible}' id=2 height="100%" width="100%">`)

				// $div.text(`${j+1}/${i+1}`)
				//re print the icons
				if (sq.player === 1) {
					// console.log($div);
					$div.append($icon1);
					this.player1.currentPosition = $div
					$div.on('click',(e) => {

						// this.printBoard()
						this.highlightMoves(e.currentTarget);


					})
				} else if (sq.player === 2) {
					// console.log(sq.player);
					$div.append($icon2);
					this.player2.currentPosition = $div
					$div.on('click',(e) => {

						// this.printBoard()
						this.highlightMoves(e.currentTarget);


					})
				}
				$('#game-board').append($div)
			})
		})
		for (let i = 1; i <= this.totalPlayers; i++){
			$(`.p${i}Hidden`).css('visibility','hidden')

			//use player current postion to set opacity to 0
			//handle insisibility own function



		}
		$(`.p${this.whichPlayer}Hidden`).css('visibility','visible')
		$('#game-board').css({'box-shadow': '10px 10px 5px black'})
	},

	startGame(){
		this.makeBoard();
		this.updateStats()
		$('#p1HP').on('click',game.player1.ability)

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
		// console.log(this);

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

						if ($($(board[i]).children()[0]).attr('class') !== 'icon') {
							// console.log($($(board[i]).children()[0]).attr('class'),'--',board[i]);
							$(board[i]).addClass('moveSpace')
							// console.log(curPlay);
							$(board[i]).on('click',(el)=>{
								const e = el.target
								this[`player${game.whichPlayer}`].move(e)
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

							if ($($(board[i]).children()[0]).attr('class') !== 'icon') {
								// console.log($($(board[i]).children()[0]).attr('class'),'--',board[i]);
								$(board[i]).addClass('moveSpace');
								// console.log(curPlay);
								$(board[i]).on('click',(el)=>{
									const e = el.target
									this[`player${game.whichPlayer}`].move(e)
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

	checkTurnEnding(){
		const curPlay = game[`player${game.whichPlayer}`];
		if (curPlay.moveUsed === true && curPlay. attackUsed === true) {
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

			if (curPlay.isInvisible !== null) {
				curPlay.inisibleTurns++
				console.log('inivible counter',curPlay.inisibleTurns);
			}
			if (curPlay.inisibleTurns > 2) {
				curPlay.isInvisible = null;
			}


			// console.log(`it is now player${game.whichPlayer} turn!`);
			
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
			const $div = $(`<div></div>`)
			$div.addClass('endScreen')
			$p = $(`<p>${winner.name} the ${winner.class} Wins!</p>`)
			$p.css({
				'color': 'black',
				'text-align': 'center',
				'font-size': '5vh',

			})
			$div.append($p);
			$('#game-board').empty();
			$('#game-board').append($div);
		}
	},

	animateMessage(){
		$('#message-box').addClass('messageAnimate')
		let time = 0;
		const timer = setInterval(()=>{
			// console.log(time);
			time++;
			if (time === 6) {
				$('#message-box').removeClass('messageAnimate')
				clearInterval(timer)
			}
		},1000)
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
	// console.log(e.target);
	game.player2Class = $(e.target).attr('id');
	// console.log(game.player2Class);
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


