const game = {
	player1: null,
	player1Class: null,
	player2: null,
	player2Class: null,
	turn: 1,
	whichPlayer: 1,
	board:[],

	makePlayer1(){
		console.log(this);
		if ($('#p1Input').val() === '' || game.player1Class === null) {
			alert('Please input your name and choose a class!')
			console.log($('#p1Input').val());
		} else {
			game.player1 = new Player($('#p1Input').val(),game.player1Class)
			$('#p1StartScreen').remove()
		} 
	},

	makePlayer2(){
		if ($('#p2Input').val() === '' || game.player2Class === null) {
			alert('Please input your name and choose a class!')
			console.log($('#p2Input').val());
		} else {
			game.player2 = new Player($('#p2Input').val(),game.player2Class)
			$('#p2StartScreen').remove()
			game.startGame();
		} 
	},

	makeBoard(){
		for (let i = 1; i <= 10; i++){
			const boardRow = [];
			for (let j = 1; j <= 10; j++){
				const $div = $(`<div data-column-num="${j}" id="${j}-${i}" data-row-num="${i}"></div>`);
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
				// $div.text(`${j}/${i}`)
				$('#game-board').append($div)
				const sqObj = new Square(i,j);
				boardRow.push(sqObj)
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon' id=2 height="100%" width="100%">`)

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
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon' id=1 height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon' id=2 height="100%" width="100%">`)

				// $div.text(`${j+1}/${i+1}`)
				//re print the icons
				if (sq.player === 1) {
					console.log($div);
					$div.append($icon1);
					this.player1.currentPosition = $div
					$div.on('click',(e) => {

						this.printBoard()
						this.highlightMoves(e.currentTarget);


					})
				} else if (sq.player === 2) {
					console.log(sq.player);
					$div.append($icon2);
					this.player2.currentPosition = $div
					$div.on('click',(e) => {

						this.printBoard()
						this.highlightMoves(e.currentTarget);


					})
				}
				$('#game-board').append($div)
			})
		})
	},

	startGame(){
		this.makeBoard();
		$('.p1Hidden').css('visibility','visible')
		this.updateStats()
		// this.printBoard();

	},

	updateStats(){
		$('#p1HP').text(this.player1.HP)
		$('#p2HP').text(this.player2.HP)
	},

	highlightMoves(e){
		console.log(this);
		let curPlay;

		if (this.whichPlayer === 1) {
			curPlay = this.player1
		} else {
			curPlay = this.player2
		}

		if ($($(e).children()[0]).attr('id') != this.whichPlayer) {
			alert('You cannot move the opponents piece')
		} else {
			const colNum = $(e).attr('data-column-num')
			const rowNum = $(e).attr('data-row-num')
			
			const board = $('#game-board').children()

			for (let i = 0; i < board.length; i++) {
				if ($(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') <= parseInt(colNum) + curPlay.speed && $(board[i]).attr('data-column-num') > parseInt(colNum) || 

					$(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') >= parseInt(colNum) - curPlay.speed && $(board[i]).attr('data-column-num') < parseInt(colNum)) {

					$(board[i]).addClass('moveSpace')
					$(board[i]).on('click',this.moveIcon)
				}
			}

			
			for (let i = 0; i < board.length; i++){
				for (let j = curPlay.speed; j >= 0; j--){

					if ($(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.speed - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.speed + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) ||

						$(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.speed + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) || 

						$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.speed - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) ){

						$(board[i]).addClass('moveSpace');
						$(board[i]).on('click',this.moveIcon)

					}
				}
			}
		}

	},

	moveIcon(e){
		
		game.board.forEach((row) => {
			row.forEach((sq) => {
				if (sq.player == game.whichPlayer) {
						sq.player = 0;
				}
				if ($(e.target).attr('id') == sq.id) {
					sq.player = game.whichPlayer;
				}
			})
		})
		game.printBoard()
	},

	highlightAttacks(){
		let curPlay;
		if (game.whichPlayer === 1) {
			curPlay = game.player1
		} else {
			curPlay = game.player2
		}

		const board = $('#game-board').children()

		const colNum = $(curPlay.currentPosition).attr('data-column-num')
		const rowNum = $(curPlay.currentPosition).attr('data-row-num')
		
		for (let i = 0; i < board.length; i++) {
			if ($(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') <= parseInt(colNum) + curPlay.range && $(board[i]).attr('data-column-num') > parseInt(colNum) || 

				$(board[i]).attr('data-row-num') === rowNum && $(board[i]).attr('data-column-num') >= parseInt(colNum) - curPlay.range && $(board[i]).attr('data-column-num') < parseInt(colNum) ||

				$(board[i]).attr('data-column-num') === colNum && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

				$(board[i]).attr('data-column-num') === colNum && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.range && $(board[i]).attr('data-row-num') < parseInt(rowNum)

				) {
				$(board[i]).addClass('attackSpace')
				$(board[i]).on('click',this.moveIcon)
			}
		}

		
		for (let i = 0; i < board.length; i++){
			for (let j = curPlay.range; j > 0; j--){

				if ($(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) || 

					$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') >= parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) ||

					$(board[i]).attr('data-column-num') == parseInt(colNum) + j && $(board[i]).attr('data-row-num') >=parseInt(rowNum) - curPlay.range + j && $(board[i]).attr('data-row-num') < parseInt(rowNum) || 

					$(board[i]).attr('data-column-num') == parseInt(colNum) - j && $(board[i]).attr('data-row-num') <= parseInt(rowNum) + curPlay.range - j && $(board[i]).attr('data-row-num') > parseInt(rowNum) ) {
					$(board[i]).addClass('attackSpace');
					$(board[i]).on('click',this.moveIcon)

				}
			}
		}
	}
}

$('#p1Buttons').on('click',(e)=>{
	console.log(e.target);
	game.player1Class = $(e.target).attr('id');
	console.log(game.player1Class);
	$('button').css({
		'background-color': 'white',
		'color': 'black'
	})
	$(e.target).css({
		'background-color': 'black',
		'color': 'white'
	})
})

$('#p1StartButton').on('click',game.makePlayer1)

$('#p2Buttons').on('click',(e)=>{
	console.log(e.target);
	game.player2Class = $(e.target).attr('id');
	console.log(game.player2Class);
	$('button').css({
		'background-color': 'white',
		'color': 'black'
	})
	$(e.target).css({
		'background-color': 'black',
		'color': 'white'
	})
})

$('#p2StartButton').on('click',game.makePlayer2)


$('.icon').on('click',(e)=>{
	console.log(e);
	console.log(e.target);
	console.log($(e.target).data());
})

$('.attackButton').on('click',() =>{
	game.printBoard()
	game.highlightAttacks()
})

// const slider1 = () => {
// 	if ($('#player-one-stats').css('width') === '0px') {
// 		$('#player-one-stats').css('width','100%')
// 	} else {
// 		$('#player-one-stats').css('width','0%')
// 	}
// 	console.log($('#player-one-stats').css('width'));
// }

// const slider2 = () => {
// 	if ($('#player-two-stats').css('width') === '0px') {
// 		$('#player-two-stats').css('width','100%')
// 	} else {
// 		$('#player-two-stats').css('width','0%')
// 	}
// 	console.log($('#player-two-stats').css('width'));
// }

// $("#ArrB1").on('click',slider1)

// $("#ArrB2").on('click',slider2)
// [
// 	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 2],

// ]


