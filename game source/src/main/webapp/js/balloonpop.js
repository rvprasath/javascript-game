/**
 * balloon pop
 */

// Initializing game
// declaring window dimensions
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var playername = '';

// Declaring variables
var difficultyLevel = 50;
var ax = 0;
var ay = 0;
var player;
var opponent;
var x = 0;
var y = 0;
var score = 0;
var myopponent = [];
var balloon = [ './sprites/balloon1.png', './sprites/balloon2.png',
		'./sprites/balloon3.png', './sprites/rock1.png' ];
var img = new Image();
var friction = 0.9;
var velX = 0;
var velY = 0;
var speed = 2;
var opponentSpeed = 5;
var scoreReduceValue = 3;
var velY = 0;
var velX = 0;
var speed = 200;
var playPause = 0;
var keys = [];
var lifeBalloonHit = 0;
var balloonBursting = [ "./sprites/balloonBursting1.png",
		"./sprites/balloonBursting2.png", "./sprites/balloonBursting3.png" ];

// Declaring variable for game area dimensions
var gameAreaWidth = 0;
var gameAreaHeight = 0;
var sword = './sprites/sword1.png';

$(document).ready(
		function() {

			$('#randomNumber').val(Math.random());

			$('#container').css('width', windowWidth);
			$('#wrapper').css('height', windowHeight - 20);
			gameAreaWidth = ($('#gameArea').width()) - 4;
			gameAreaHeight = ($('#gameArea').height()) - 4;

			// applying start button overlay on canvas
			// introduction start window
			$('#startBtnCanvas').css('width', gameAreaWidth);
			$('#startBtnCanvas').css('height', gameAreaHeight - 20);

			// About window
			$('#popup').css('width', gameAreaWidth - 100);
			$('#popup').css('height', gameAreaHeight - 50);

			// player details window
			$('#playerDetails').css('width', gameAreaWidth - 100);
			$('#playerDetails').css('height', gameAreaHeight - 50);

			// playPause window
			$('#playPause').css('width', gameAreaWidth + 3);
			$('#playPause').css('height', gameAreaHeight - 228);

			// playPause window
			$('#restart').css('width', gameAreaWidth);
			$('#restart').css('height', gameAreaHeight - 210);

			// restartTimer window
			$('#restartTimer').css('width', gameAreaWidth);
			$('#restartTimer').css('height', gameAreaHeight - 210);

			var gameAreaHead = $('#gameAreaContainer').innerHeight()
					- $('#gameArea').innerHeight();
			var startCanvasHeight = gameAreaHead
					+ $('#headerContainer').innerHeight();

			// set canvas height and width to the overlay
			$('#startBtnCanvas').css('margin-top', startCanvasHeight);
			$('#popup').css('margin-top', startCanvasHeight + 25);
			$('#playerDetails').css('margin-top', startCanvasHeight + 25);
			$('#playPause').css('margin-top', startCanvasHeight);
			$('#restart').css('margin-top', startCanvasHeight);
			$('#restartTimer').css('margin-top', startCanvasHeight);

			// Enabling start button click function to start game
			$('#startBtn').click(function() {
				$('#startBtnCanvas').hide();
				$('#popup').show().animate({
					opacity : '1'
				});
			});

			$('#next').click(function() {
				$('#popup').hide().animate({
					opacity : '1'
				});
				;
				$('#playerDetails').show().animate({
					opacity : '1'
				});
			});

			$('#submit').click(
					function() {
						if ($('#playerDetailsName').val() != ""
								&& $('#playerDetailsUrl').val() != ""
								&& $('#playerDetailsCompany').val() != "") {
							$('#playerNameSubmit').val(
									$('#playerDetailsName').val());
							$('#playerUrlSubmit').val(
									$('#playerDetailsUrl').val());
							$('#playerCompany').val(
									$('#playerDetailsCompany').val());
							if ($('#playerDetailsName').val() != '') {
								$('#playerName').html(
										$('#playerDetailsName').val()
												+ "'s Score");
							}
							startGame();
							$('#playerDetails').hide();
						} else {
							$('#displayLoginCredentials').html(
									"<b>Please fill the details</b>").css(
									'color', 'red').fadeIn(1000);
							$('#displayLoginCredentials').html(
									"<b>Please fill the details</b>").css(
									'color', 'red').fadeOut(2000);
						}
					});

			// Changing Sword
			$('.changeSword').click(function() {
				sword = $(this).attr('src');
			});

			// game play again or quit
			$('.playAgain').click(function() {
				$('#restart').hide();
				lifeBalloonHit = 0;
				score = 0;
				scoreReduceValue = 3;
				for (var i = 0; i < myopponent.length; i++) {
					myopponent.splice(i);
				}

				// reset score to 0
				document.getElementById("scoreCard").innerHTML = 0;
				document.getElementById("lives").innerHTML = 3;

				var timeDisplay = 3;
				var timer = setInterval(function() {
					$('#restartTimer').show();
					$('#restartTimer').html(timeDisplay--);
					if (timeDisplay == 0) {
						clearInterval(timer);
					}
				}, 500);
				var restartInterval = setInterval(function() {
					$('#restartTimer').hide();
					gameArea.start();
					clearInterval(restartInterval);
				}, 2000);

				refreshScore = setInterval(polling, 2000);
			});

			$('.quit').click(function() {
				$('#restart').hide();
				window.location.reload();
			});

		});

$(document).ready(function() {
	$('.life').html(scoreReduceValue);
});

// Set Difficulty Level
function gameDifficulty(newVal) {
	var result = 0;
	if (newVal > 0) {
		result = 65 - newVal;
	}
	difficultyLevel = result;
	if (result < 22) {
		opponentSpeed = 8;
		// scoreReduceValue = 5;
		document.getElementById("difficultyDisplay").innerHTML = '<b style="color:red;">Professional</b>';
	} else if (result >= 22 && result < 40) {
		opponentSpeed = 7;
		// scoreReduceValue = 5;
		document.getElementById("difficultyDisplay").innerHTML = '<b style="color:green;">Expert</b>';
	} else {
		opponentSpeed = 5;
		// scoreReduceValue = 3;
		document.getElementById("difficultyDisplay").innerHTML = '<b style="color:#000;">Beginner</b>';
	}
}

// gameover display overlay
function restart() {
	$('#restart').show();
}

// Start game function
function startGame() {
	player = new imgComponent((gameAreaWidth - 30) / 2, gameAreaHeight - 50,
			50, 30, sword);
	gameArea.start();
}

// create gameArea
var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = gameAreaWidth + 3;
		this.canvas.height = gameAreaHeight - 18;
		this.canvas.setAttribute("class", "myCanvas");
		this.context = this.canvas.getContext("2d");
		var game = document.getElementById("gameArea");
		game.insertBefore(this.canvas, game.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
		this.frameNo = 0;
		this.pollingFrameNo = 0;
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function() {
		myopponent.splice(0, 1);
	},
	gameOver : function() {
		clearInterval(this.interval);
		clearInterval(refreshScore);
		restart();
	}
}

function imgComponent(x, y, height, width) {
	this.width = width;
	this.height = height;
	// canvas size reduced so y value reduced by 18
	this.x = x;
	this.y = y - 18;
	this.update = function() {
		ctx = gameArea.context;
		img.src = sword;
		// img.onload = function(){
		ctx.drawImage(img, this.x, this.y, this.width, this.height);
		// }
		if (this.y > gameAreaHeight) {
			myopponent.splice(0, 1);
			document.getElementById("scoreCard").innerHTML = --score;
		}
		x = this.x;
		y = this.y;
	}, this.moveLeftRight = function() {
		ctx = gameArea.context;
		ctx.drawImage(img, this.x += ax, this.y, this.width, this.height);
	}, this.moveUpDown = function() {
		ctx = gameArea.context;
		ctx.drawImage(img, this.x += ay, this.y, this.width, this.height);
	}, this.clear = function() {
		ctx = gameArea.context;
		ctx.fillStyle = color;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}, this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}

// Intantiate the opponent component
function opponentComponent(x, y, height, width, item) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.item = item;
			this.update = function(heightFunction, widthFunction, itemFunction) {
				if (itemFunction != null && heightFunction != null
						&& widthFunction != null) {
					item = itemFunction;
					this.height = heightFunction;
					this.width = widthFunction;
				}
				ctx = gameArea.context;
				img.src = item;
				// img.onload = function(){
				ctx.drawImage(img, this.x, this.y, this.width, this.height);
				// }

				// If missing item is balloon score reduces but not for rock
				if (this.y > gameAreaHeight) {
					if (myopponent[0].item != "./sprites/rock1.png") {
						myopponent.splice(0, 1);
						lifeBalloonHit++;
						// Display the score value upto zero and hide the score
						// value below zero in the score board

						if (score >= 0) {
							if (lifeBalloonHit == 3) {
								--scoreReduceValue;
								document.getElementById("lives").innerHTML = scoreReduceValue;
								lifeBalloonHit = 0;
							}
						}
					} else {
						myopponent.splice(0, 1);
					}
				}
				x = this.x;
				y = this.y;
			},
			this.moveLeftRight = function() {
				ctx = gameArea.context;
				ctx.drawImage(img, this.x += ax, this.y, this.width,
						this.height);
			},
			this.moveUpDown = function() {
				ctx = gameArea.context;
				ctx.drawImage(img, this.x += ay, this.y, this.width,
						this.height);
			},
			this.clear = function() {
				ctx = gameArea.context;
				ctx.fillStyle = color;
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}, this.crashWith = function(otherobj) {
				var myleft = this.x;
				var myright = this.x + (this.width);
				var mytop = this.y;
				var mybottom = this.y + (this.height);
				var otherleft = otherobj.x;
				var otherright = otherobj.x + (otherobj.width);
				var othertop = otherobj.y;
				var otherbottom = otherobj.y + (otherobj.height);
				var crash = true;
				if ((mybottom < othertop) || (mytop > otherbottom)
						|| (myright < otherleft) || (myleft > otherright)) {
					crash = false;
				}
				return crash;
			}
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function() {
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		if (this.y > gameAreaHeight) {
			myopponent.splice(0, 1);
			document.getElementById("scoreCard").innerHTML = --score;
		}
		x = this.x;
		y = this.y;
	}, this.moveLeftRight = function() {
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x += ax, this.y, this.width, this.height);
	}, this.moveUpDown = function() {
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y += ay, this.width, this.height);
	}, this.clear = function() {
		ctx = gameArea.context;
		this.ctx.clearRect(0, 0, 0, 0);
	}, this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}, this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}
}

// Update game Area
function updateGameArea() {
	$('.myCanvas').on('click', function() {
		if (playPause == 0) {
			clearInterval(gameArea.interval);
			$('#playPause').show();
			playPause = 1;
		}
	});

	$('#playPause').on('click', function() {
		if (playPause == 1) {
			gameArea.interval = setInterval(updateGameArea, 20);
			$('#playPause').hide();
			playPause = 0;
		}
	});

	if (keys[39]) {
		if (velX < speed) {
			velX = velX + 2;
		}
	}
	if (keys[37]) {
		if (velX > -speed) {
			velX = velX - 2;
		}
	}

	velX *= friction;
	player.x += velX;

	if (player.x >= gameAreaWidth) {
		player.x = gameAreaWidth;
	} else if (player.x <= 5) {
		player.x = 5;
	}

	// If score is less than 0 Game Over
	if (scoreReduceValue == 0 || score == -1) {
		gameArea.gameOver();
	}

	// Transferring coordiate of gameArea to player movement by mouse
	// The gameArea coordiaes is getting from the 'e.pageY' while the motion of
	// the mouse is detected then it is transferred to gameArea and again
	// it is transferred to player
	if (gameArea.x && gameArea.y) {
		player.x = gameArea.x;
		// player.y = gameArea.y;
	}
	gameArea.clear();
	var x, y, z;

	// If the sword hits the balloon the score will be added
	for (i = 0; i < myopponent.length; i += 1) {
		if (player.crashWith(myopponent[i])) {

			if (myopponent[i].item == "./sprites/balloon1.png") {

				myopponent[i].update(80, 80, balloonBursting[0]);
				var balloonPopVar = setInterval(balloonPop, 100);
			}

			if (myopponent[i].item == "./sprites/balloon2.png") {

				myopponent[i].update(80, 80, balloonBursting[1]);
				var balloonPopVar = setInterval(balloonPop, 100);
			}

			if (myopponent[i].item == "./sprites/balloon3.png") {

				myopponent[i].update(80, 80, balloonBursting[2]);
				var balloonPopVar = setInterval(balloonPop, 100);
			}

			// If sword hits the rock life reduces
			if (myopponent[i].item == "./sprites/rock1.png") {
				scoreReduceValue--;
				$(document).ready(function() {
					$('.life').html(scoreReduceValue);
				});
				gameArea.canvas.setAttribute("id", "StoneCrash");
				var StoneCrash = setInterval(remove, 100);
				function remove() {
					gameArea.canvas.removeAttribute("id", "StoneCrash");
					clearInterval(StoneCrash);
				}
			}

			// The score shouldn't be reduced if the sword hits rock
			if (myopponent[i].item !== "./sprites/rock1.png") {
				document.getElementById("scoreCard").innerHTML = ++score;
			}
			balloonPop();
			function balloonPop() {
				gameArea.stop();
				clearInterval(balloonPopVar);
			}
			return;
		}
	}

	// Creating new balloon component and pushes it into array
	gameArea.frameNo += 1;
	if (gameArea.frameNo == 1 || everyinterval(difficultyLevel)) {
		x = (Math.floor((Math.random() * 250) + 1))
		y = (Math.floor((Math.random() * 250) + 1))
		z = (Math.floor((Math.random() * 250) + 1))
		var selectBalloon = balloon[(Math.floor((Math.random() * 4) + 1)) - 1]
		myopponent.push(new opponentComponent((Math.floor((Math.random()
				* (gameAreaWidth) - 30) + 1)), 0, 50, 30, selectBalloon));
	}
	for (i = 0; i < myopponent.length; i += 1) {
		myopponent[i].y += (Math.floor((Math.random() * opponentSpeed) + 1));
		myopponent[i].update();
	}
	player.update();

}
function everyinterval(n) {
	if ((gameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function createobs() {

}

document.body.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
	keys[e.keyCode] = false;
});

var refreshScore = 0;
// var polls = 0;
$(document).ready(function() {
	refreshScore = setInterval(polling, 2000);
});

function polling() {

	if ($('#playerNameSubmit').val() != "" && $('#playerUrlSubmit').val() != ""
			&& $('#playerCompany').val() != "" && $('#scoreCard').text() != "") {
		$
				.ajax({
					url : 'score',
					type : 'POST',
					data : {
						playerName : $('#playerNameSubmit').val(),
						playerUrl : $('#playerUrlSubmit').val(),
						playerCompany : $('#playerCompany').val(),
						playerScore : $('#scoreCard').text(),
						randomNumber : $('#randomNumber').val()
					},
					success : function(score) {
						$('#loader').hide();
						var htmlr = '';
						$
								.each(
										score,
										function(key, data) {
											htmlr += '<div id="displayScoreList">'
											if (data.randomNumber == $(
													'#randomNumber').val()) {
												htmlr += '<div class="playerScoreCardUser">'
											} else {
												htmlr += '<div class="playerScoreCard">'
											}
											htmlr += '<div class="playerStatus"><img src="'
													+ data.profileLink
													+ '" style="height:30px !important; width:30px;"></div>'
											htmlr += '<div class="playerStatus1">'
											htmlr += '<div class="PlayerScoreCardName">Player : <b>'
													+ data.playerName
													+ '</b></div>'
											htmlr += '<div class="playerScoreCardCompany"><sub>Company : '
													+ data.companyName
													+ '</sub></div></div>'
											htmlr += '<div class="playerStatus2 playerStatueScore"><div>score</div>'
													+ data.score
													+ '</div></div></div>'
										});
						$('#scoreBoard').empty();
						$('#scoreBoard').append(htmlr);
					},
					complete : function() {
					}
				});
	}
}

$(document)
		.ready(
				function() {

					// initial fetching of scores
					var scoreInitial = setInterval(
							function() {
								$
										.ajax({
											url : 'scoreinitial',
											type : 'POST',
											data : {
												playerName : $(
														'#playerNameSubmit')
														.val(),
												playerUrl : $(
														'#playerUrlSubmit')
														.val(),
												playerCompany : $(
														'#playerCompany').val(),
												playerScore : $('#scoreCard')
														.text(),
												randomNumber : $(
														'#randomNumber').val()
											},
											success : function(score) {
												$('#loader').hide();
												var htmlr = '';
												$
														.each(
																score,
																function(key,
																		data) {
																	htmlr += '<div id="displayScoreList">'
																	if (data.randomNumber == $(
																			'#randomNumber')
																			.val()) {
																		htmlr += '<div class="playerScoreCardUser">'
																	} else {
																		htmlr += '<div class="playerScoreCard">'
																	}
																	htmlr += '<div class="playerStatus"><img src="'
																			+ data.profileLink
																			+ '" style="height:30px !important; width:30px;"></div>'
																	htmlr += '<div class="playerStatus1">'
																	htmlr += '<div class="PlayerScoreCardName">Player : <b>'
																			+ data.playerName
																			+ '</b></div>'
																	htmlr += '<div class="playerScoreCardCompany"><sub>Company : '
																			+ data.companyName
																			+ '</sub></div></div>'
																	htmlr += '<div class="playerStatus2 playerStatueScore"><div>score</div>'
																			+ data.score
																			+ '</div></div></div>'
																});
												$('#scoreBoard').empty();
												$('#scoreBoard').append(htmlr);
											},
											complete : function() {
												clearInterval(scoreInitial);
											}
										});
							}, 5000)

					// copyRight year dynamically processing
					$.ajax({
						url : 'copyright',
						type : 'POST',
						success : function(copyRight) {
							$('#copyRightCurrentYear').html(copyRight);
						}
					});
				});