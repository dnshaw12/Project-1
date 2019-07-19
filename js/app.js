const game = {
	player1Class: null,
	player2Class: null,
	player3Class: null,
	player4Class: null,
	player1Name: null,
	player2Name: null,
	player3Name: null,
	player4Name: null,
	players: [],
	turn: 1,
	totalPlayers: 0,
	whichPlayer: 1,
	buttonsActive: true,
	lastTurnDamage: 0,
	board:[],
	classDesc: {
		rogue: "Fast and silent fighter. Moves quickly but less damage. Ability: Invisibility",
		fighter: "Sturdy and persistent combatant. Well rounded stats. Ability: Shield Up",
		wizard: "Powerful magic user. Has ranged attack but slow moving. Ability: Teleport"
	},

	// create multiple players

	// function() creates class selection screen based on totalPlayers

	// initiatePlayers() {

	// 	for (let i = 1; i <= game.totalPlayers; i++){
	// 		const $div = $(`<div id="p${i}StartScreen"></div>`)
	// 		const $h1 = $(`<h1>Player ${i}! Ready yourself!</h1>`)
	// 		const $input = $(`<input type="text" name="name" placeholder="Your name!" autofocus id="p${i}Input">`)
	// 		const $h2 = $(`<h2>Classes</h2>`)
	// 		const $classDiv = $(`<div id="p${i}Buttons">`)
	// 		const $fighterButton = $(`<button class='classSelector' id="fighter">Fighter!</button>`)

	// 		const $wizardButton = $(`<button class='classSelector' id="wizard">Wizard!</button>`)

	// 		const $rogueButton = $(`<button class='classSelector' id="rogue">Rogue!</button>`)

	// 		const $submitButton = $(`<button class="submitButton" id="p${i}StartButton">Ready!</button>`)


	// 		$wizardButton.on('click', (e) => {
	// 			game.selectClass(e);
	// 		})
	// 		$fighterButton.on('click', (e) => {
	// 			game.selectClass(e);
	// 		})
	// 		$rogueButton.on('click', (e) => {
	// 			game.selectClass(e);
	// 		})
	// 		$submitButton.on('click',(e) => {
	// 			game.submitPlayer(e)	
	// 		})

	// 		$classDiv.append($fighterButton)
	// 		$classDiv.append($wizardButton)
	// 		$classDiv.append($rogueButton)
	// 		$div.append($h1)
	// 		$div.append($input)
	// 		$div.append($h2)
	// 		$div.append($classDiv)
	// 		$div.append($submitButton)

	// 		$('main').append($div)
	// 	}

	// },

	// function() makes players based on logged class

	makePlayers() {

		for (let i = 1; i <= this.totalPlayers; i++) {
			if (game[`player${i}Class`] === 'fighter') {
				game.players[`player${i}`] = new Fighter(game[`player${i}Name`],1)
			} else if (game[`player${i}Class`] === 'wizard') {
				game.players[`player${i}`] = new Wizard(game[`player${i}Name`],1)
			} else if (game[`player${i}Class`] === 'rogue') {
				game.players[`player${i}`] = new Rogue(game[`player${i}Name`],1)
			}
		}

	},

	selectClass(e){
		game[`player${game.whichPlayer}Class`] = $(e.target).attr('id');

	$('button').css({
				'color': 'black'
			})
			$(e.target).css({
				'color': 'rgb(218,165,32)'
			})
	},

	submitPlayer(e){
		if ($(`#p${game.whichPlayer}Input`).val() === '' || game[`player${game.whichPlayer}Class`] === null) {
			$('#message-box').text('Please input your name and choose a class!')
			game.animateMessage();
		} else {
			game[`player${game.whichPlayer}Name`] = $(`#p${game.whichPlayer}Input`).val();
			$(`#p${game.whichPlayer}Input`).val('');
			$('button').css({'color': 'black'});

			$('#playerNum').text(game.whichPlayer + 1);
			$(`#p${game.whichPlayer}StartScreen`).attr('id',`p${game.whichPlayer + 1}StartScreen`)
			$(`#p${game.whichPlayer}Input`).attr('id',`p${game.whichPlayer + 1}Input`)



			$('#message-box').text('')

			if (game.whichPlayer !== game.totalPlayers) {
				game.whichPlayer++;
			} else {
				game.whichPlayer = 1;
				$(e.target).parent().hide()
				// game.startGame()
			}
		}
	},

	// creates player 1

	// makePlayer1(){
	// 	//checks for empty values
	// 	if ($('#p1Input').val() === '' || game.player1Class === null) {
	// 		$('#message-box').text('Please input your name and choose a class!')
	// 		game.animateMessage();
	// 	} else {
	// 		if (game.player1Class === 'fighter') {
	// 			game.player1 = new Fighter($('#p1Input').val(),1)
	// 		} else if (game.player1Class === 'wizard') {
	// 			game.player1 = new Wizard($('#p1Input').val(),1)
	// 		} else if (game.player1Class === 'rogue') {
	// 			game.player1 = new Rogue($('#p1Input').val(),1)
	// 		}
	// 		$('#p1StartScreen').css('visibility','hidden')
	// 		$('#message-box').text('')
	// 	} 
	// },

	// //creates player 2 and starts game

	// makePlayer2(){
	// 	if ($('#p2Input').val() === '' || game.player2Class === null) {
	// 		$('#message-box').text('Please input your name and choose a class!')
	// 		game.animateMessage();
	// 	} else {
	// 		if (game.player2Class === 'fighter') {
	// 			game.player2 = new Fighter($('#p2Input').val(),2)
	// 		} else if (game.player2Class === 'wizard') {
	// 			game.player2 = new Wizard($('#p2Input').val(),2)
	// 		} else if (game.player2Class === 'rogue') {
	// 			game.player2 = new Rogue($('#p2Input').val(),2)
	// 		}
	// 		$('#p2StartScreen').css('visibility','hidden')
	// 		$('#message-box').text('')
	// 		game.startGame()
	// 	} 
	// },

	makeBoard(){

		//creates array of arrays of objects. houses current board poistions.

		for (let i = 1; i <= 10; i++){
			const boardRow = [];
			for (let j = 1; j <= 10; j++){
				// const $div = $(`<div data-column-num="${j}" id="${j}-${i}" data-row-num="${i}"></div>`);
				// $div.css({
				// 	'width':'10%',
				// 	'height':'10%',
				// 	'z-index':'0'
				// });

				// if (i%2) {
				// 	if (j%2) {
				// 		$div.css('background-color','white')
				// 	} else {
				// 		$div.css('background-color','grey')
				// 	}
				// } else {
				// 	if (j%2) {
				// 		$div.css('background-color','grey')
				// 	} else {
				// 		$div.css('background-color','white')
				// 	}
				// }
				
				//places icons on game board

				// $('#game-board').append($div)
				const sqObj = new Square(i,j);
				boardRow.push(sqObj)

				// const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.abilityActive}' id=1 height="100%" width="100%">`)
				// const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.abilityActive}' id=2 height="100%" width="100%">`)

				// if (i === 1 && j === 1) {
				// 	$div.append($icon1)
				// 	this.player1.currentPosition = $div
				// 	$div.on('click',(e) => {

				// 		this.printBoard()
				// 		this.highlightMoves(e.currentTarget);


				// 	})
				// } else if (i === 10 && j === 10) {
				// 	$div.append($icon2)
				// 	this.player2.currentPosition = $div
				// 	$div.on('click',(e) => {
				// 		this.printBoard()
				// 		this.highlightMoves(e.currentTarget);

				// 	})
				// }
			}

			this.board.push(boardRow);
		}
		if (this.totalPlayers === 4) {
			this.board[0][0].player = 1;
			this.board[0][9].player = 2;
			this.board[9][9].player = 3;
			this.board[9][0].player = 4;
		} else if (this.totalPlayers === 3) {
			this.board[0][0].player = 1;
			this.board[0][9].player = 2;
			this.board[9][9].player = 3;
		} else {
			this.board[0][0].player = 1;
			this.board[9][9].player = 2;
		}
		this.printBoard()
		$('#game-board').css({'box-shadow': '10px 10px 5px black'})
	},

	printBoard(){

		//empty and reprint entry board based of of game.board array

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

				//re print the icons

				//////

				// const $icon1 = $(`<img src="${this.player1.icon}" class='icon ${this.player1.abilityActive}' id=1 height="100%" width="100%">`)
				// const $icon2 = $(`<img src="${this.player2.icon}" class='icon ${this.player2.abilityActive}' id=2 height="100%" width="100%">`)

				// if (sq.player === 1) {
				// 	$div.append($icon1);
				// 	this.player1.currentPosition = $div
				// 	$div.on('click',(e) => {

				// 		this.highlightMoves(e.currentTarget);


				// 	})
				// } else if (sq.player === 2) {
				// 	$div.append($icon2);
				// 	this.player2.currentPosition = $div
				// 	$div.on('click',(e) => {

				// 		this.highlightMoves(e.currentTarget);


				// 	})
				// }

				//////

				for (let i = 1; i <= this.totalPlayers; i++){
					const $icon = $(`<img src="${this.players[`player${i}`].icon}" class='icon ${this.players[`player${i}`].abilityActive}' id=${i} height="100%" width="100%">`)
					if (sq.player === i) {
						$div.append($icon)
						this.players[`player${i}`].currentPosition = $div
						$div.on('click',(e) => {

						this.highlightMoves(e.currentTarget);


					})
					}
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

		//show active player's stat board

		$(`.p${this.whichPlayer}Hidden`).css('visibility','visible')

		$('#game-board').css({'box-shadow': '10px 10px 5px black'})
	},

	startGame(){
		this.makePlayers()
		this.makeBoard();
		this.updateStats()

		// print players names to stat board

		for (let i = 1; i <= this.totalPlayers; i++){
			$(`#p${i}Name`).text(this.players[`player${i}`].name+': the '+this.players[`player${i}`].class)
		}

	},

	updateStats(){

		//hide all stat bars

		$(`.stats`).css('visibility','hidden')

		//show active player's stats

		$(`.p${this.whichPlayer}Hidden`).css('visibility','visible')

		$('#turn-number').text(this.turn)

		//update players stats
		for (let i = 1; i <= this.totalPlayers; i++){
			$(`#p${i}HP`).text(this.players[`player${i}`].HP)
			$(`#p${i}Name`).text(this.players[`player${i}`].name+': the '+this.players[`player${i}`].class)
		}
	},

	highlightMoves(e){

		const curPlay = game.players[`player${game.whichPlayer}`]

		// make sure active player clicked on their own icon

		if ($($(e).children()[0]).attr('id') == this.whichPlayer) {

			// check if the player has already moved

			if (curPlay.moveUsed === true) {
				$('#message-box').text('You already moved this turn!')
				this.animateMessage();
			} else {

				this.printBoard()

				const colNum = $(e).attr('data-column-num')
				const rowNum = $(e).attr('data-row-num')
				
				const board = $('#game-board').children()

				//loop through entire board and find tiles in speed range on x and y axis of player

				for (let i = 0; i < board.length; i++) {
					if ($(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') <= parseInt(colNum) + curPlay.speed && $(board[i]).attr('data-column-num') > parseInt(colNum) || 

						$(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') >= parseInt(colNum) - curPlay.speed && $(board[i]).attr('data-column-num') < parseInt(colNum)) {

						//exclude tiles with other players

						if (!$($(board[i]).children()[0]).hasClass('icon')) {
							$(board[i]).addClass('moveSpace')
							$(board[i]).on('click',(el)=>{
								const e = el.target
								this.players[`player${game.whichPlayer}`].move(e)
							})
						}

						// manage move if there is an invisible player on the tile

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

				//same as above but catches the tiles not on the x/y axises
				
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
									this.players[`player${game.whichPlayer}`].move(e)
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
		const curPlay = game.players[`player${game.whichPlayer}`];

		const board = $('#game-board').children()

		const colNum = $(curPlay.currentPosition).attr('data-column-num')
		const rowNum = $(curPlay.currentPosition).attr('data-row-num')


		// same has highlight move function but based off of players range

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
					$(board[i]).on('click',this.players[`player${game.whichPlayer}`].attack)
				}
			}
			
			for (let i = 0; i < board.length; i++){
				for (let j = curPlay.range; j > 0; j--){

					if ($(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) ||

						$(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') >=parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) ) {
						$(board[i]).addClass('attackSpace');
						$(board[i]).on('click',this.players[`player${game.whichPlayer}`].attack)

					}
				}
			}
		}
		
	},

	handleInvisible(invisiblePlayer){

		//executes when player either steps on or attackes invisible player

		$('#message-box').text('You found an invisible person!');
		this.animateMessage();

		$unhide = this[`player${invisiblePlayer}`];

		//reset ability stats
		$unhide.abilityActive = null;
		$unhide.opacity = 1;


		const curPlay = this.players[`player${invisiblePlayer}`]
		const board = $('#game-board').children()


		//animation for unhiding

		let currCol;
		let currRow;
		let currentLeft;
		let currentTop;

		// find hidden players location

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

		//checks for end of turn

		const curPlay = game.players[`player${game.whichPlayer}`];
		let totalDead = 0;

		//counts how many players are dead

		for (let i = 1; i <= this.totalPlayers; i++){
			const player = this.players[`player${i}`]
			if (player.HP === 0 && player.isAlive === true) {
				player.isAlive = false;
				totalDead++;
			}	
		}

		// if there is more than 1 player alive, continue game

		if (curPlay.moveUsed === true && curPlay. attackUsed === true && totalDead !== this.totalPlayers - 1 ) {

			$(`.p${game.whichPlayer}Hidden`).css('visibility','hidden')

			//change turn to next players

			if (this.whichPlayer !== this.totalPlayers) {
				this.whichPlayer++;
			} else {
				this.whichPlayer = 1;
				this.turn++;
			}

			//reset game mechanics for new turn

			this.buttonsActive = false;
			curPlay.moveUsed = false;
			curPlay.attackUsed = false;
			$('#game-board').css({'box-shadow': '0px 0px 0px black'})

			// add player switch screen
			const nextPlayer = game.players[`player${game.whichPlayer}`]

			//create trurn transiation screen

			const $div = $(`<div></div>`)
			const $button = $(`<button id="start-turn">Take Turn</button>`)
			$div.addClass('turnSwitch')
			const $p = $(`<p>Turn ${this.turn}: It's ${nextPlayer.name}: the ${nextPlayer.class}'s turn!</p>`)
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

			// increase ability uses and removes them if they expire (minus teleport)

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

		//allows player to pass turn without taking all actions

		const curPlay = game.players[`player${game.whichPlayer}`];
		curPlay.moveUsed = true;
		curPlay.attackUsed = true;
		game.checkTurnEnding();
	},

	checkForWin(){
		console.log('cfw');
		//checks for a winner

		this.updateStats()
		let totalDead = 0;
		let winner;

		//counts dead players
		for (let i = 1; i <= this.totalPlayers; i++){
			const player = this.players[`player${i}`]
			if (player.HP === 0 && player.isAlive === true) {
				player.isAlive = false;
				totalDead++;
			}	
		}
		console.log(totalDead);

		// checks if there is only one player left alive
		if (totalDead === this.totalPlayers - 1) {	
			for (let i = 1; i <= this.totalPlayers; i++){
				const player = this.players[`player${i}`]
				if (player.isAlive === true) {
					winner = player;
				}
			}
		}

		// if a winner if decided
		if (winner !== undefined) {
			$('#game-board').css({'box-shadow': '0px 0px 0px black'})
			$(`.stats`).css('visibility','visible')
			this.buttonsActive = false;

			//create end game screen/message
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
		} else {
			game.checkTurnEnding()
		}
	},

	animateMessage(){

		//blinking animation fo messaging
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

		// resets all game properties and starts game over
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

$('#numSelector').on('click',(e)=>{
	game.totalPlayers = parseInt($(e.target).attr('id'));
	console.log(game.totalPlayers);
	$('#playerNumSelector').hide()

})

// $('#p1Buttons').on('click',(e)=>{
// 	game.player1Class = $(e.target).attr('id');
// })

$('.classSelector').on('click', (e) => {
	game.selectClass(e)
})

$('.submitButton').on('click', (e) => {

	game.submitPlayer(e)

	
})

// $('#p1StartButton').on('click',game.makePlayer1)

// $('#p2Buttons').on('click',(e)=>{
// 	game.player2Class = $(e.target).attr('id');
// 	$('button').css({
// 		'color': 'black'
// 	})
// 	$(e.target).css({
// 		'color': 'rgb(218,165,32)'
// 	})
// })

// $('#p2StartButton').on('click',game.makePlayer2)

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
	if (game.buttonsActive === true && game.players[`player${game.whichPlayer}`].abilityUsed === false) {
		game.players[`player${game.whichPlayer}`].useAbility()
		game.printBoard()
	} else if (game.buttonsActive !== true && game.players[`player${game.whichPlayer}`].abilityUsed === false) {
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
	$('#popupText').text(game.players[`player${game.whichPlayer}`].abilityDesc)
	$('.popup').css({'visibility':'visible'})
})

$('.abilityButton').mouseout( (e) => {
	$('.popup').css({'visibility':'hidden'})
})


