console.log('This Java File has Loaded');

game = {
	player1 = null,
	player1Class = null,
	player2 = null,
	player2Class = null,
	turn = 1,


	makeBoard(){
		for (let i = 1; i <= 109; i++){
			const $div = $('<div/>');
			$div.css('width','10%');
			$div.css('height','10%');
			if (i%11 !== 0) {
				if (i%2) {
					$div.css('background-color','white')
				} else {
					$div.css('background-color','black')
				}
				$('#game-board').append($div)
			}
		}
	},

	makePlayer1(){
		if ($('#p1Input')[0] === null || game.player1 === null) {
			alert('Please input your name and choose a class!')
		} else {

		} 
	}
}

game.makeBoard();



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

