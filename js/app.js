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
				const $icon1 = $(`<img src="${this.player1.icon}" class='icon' id="p1Icon" height="100%" width="100%">`)
				const $icon2 = $(`<img src="${this.player2.icon}" class='icon' id="p1Icon" height="100%" width="100%">`)

				if (i === 1 && j === 1) {
					$div.append($icon1)
					this.player1.currentPosition = $div
				} else if (i === 10 && j === 10) {
					$div.append($icon2)
					this.player2.currentPosition = $div
				}
			}
			this.board.push(boardRow);

			// const $div = $('<div/>');
			// $div.css({
			// 	'width':'10%',
			// 	'height':'10%'
			// });
			// if (i === 1) {
			// 	const $icon = $(`<img src="${this.player1.icon}" id="p1Icon" height="100%" width="100%">`)
			// 	$div.append($icon)
			// } else if (i === 109) {
			// 	const $icon = $(`<img src="${this.player2.icon}" id="p2Icon" height="100%" width="100%">`)
			// 	$div.append($icon)
			// }
			// if (i%11 !== 0) {
			// 	if (i%2) {
			// 		$div.css('background-color','white')
			// 	} else {
			// 		$div.css('background-color','black')
			// 	}
			// 	$('#game-board').append($div)
			// }
		}
	},

	placeIcons(){
		const $icon1 = $(`<img src="${this.player1.icon}" class='icon' id="p1Icon" height="100%" width="100%">`)
		const $icon2 = $(`<img src="${this.player2.icon}" class='icon' id="p1Icon" height="100%" width="100%">`)
		this.game.board.forEach((row, i) =>{
			row.forEach((sq, j) =>{
				if (sq.player === 1) {

				}
			})
		})
	},

	startGame(){
		this.makeBoard();
		$('.p1Hidden').css('visibility','visible')
		this.updateStats()

	},

	updateStats(){
		$('#p1HP').text(this.player1.HP)
		$('#p2HP').text(this.player2.HP)
	}
}

// game.makeBoard();

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
