<!DOCTYPE html>
<html>
<head>
<title>Balloon pop</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="http://code.jquery.com/jquery-latest.min.js"
	type="text/javascript"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/css/balloonpop.css">
<link rel="icon" href="./sprites/icon.png" type="icon" sizes="16x16">

</head>
<body>
	<div id="headerContainerEnlargement">
		<div id="headerContainer">
			<input id="playerNameSubmit" type="hidden" value=""> <input
				id="playerUrlSubmit" type="hidden" value=""> <input
				id="playerCompany" type="hidden" value="">
			<div class="headerContent">
				<b id="gameName">Balloon Pop</b>
			</div>
			<div class="headerContent">
				<b>Developer : <a href="https://github.com/rvprasath/"
					target="_blank">Vishnu Prasadh</a></b>
			</div>
		</div>
	</div>
	<div id="container">
		<div id="wrapper">
			<div id="startBtnCanvas">
				<button id="startBtn">START</button>
			</div>
			<div id="popup">
				<h3>Balloon Pop</h3>
				<p>
					<b>Welcome to the world of online gaming!</b><br> <br>
					Balloon pop is a game in which player can pop the balloons and earn
					scores. here user can pop the balloons with the weapon. Don't be
					frustrated with the name weapon. The game is just for fun playing.
					Here under the weapon category, there will be three swords, player
					can use these sword to pop the balloons. player can change the
					level of difficulty, just by sliding the range meter. The player is
					provided with 3 lives. When the player losses 3 lives the game will
					come to the end. To avoid losing their lives, don't hit on the
					dropping stone. In addition to that, if a player leaves three
					balloons without popping a life will be reduced. Before the game
					starts the players has to create their profile so that they can
					compete with the other players online. The name contradiction
					doesn't matters. If the two player playing the game with the same
					name. Both of their names will be displayed in the score board, if
					they are in the list of top 10.<br> <b>To pause or play
						the game click on the game screen.</b> <br> <br> <b>Note
						: </b><span>For the expert and professional level game, the
						player will be awarded with bonus score which will be added to
						their profile when the game is submitted</span>
				</p>
				<h3>Controls</h3>
				<p>Use arrow keys to move left and right.
				<div>
					<button id="next">NEXT</button>
				</div>
				</p>
			</div>
			<div id="playerDetails">
				<div>
					<br> <br> <label for="playerDetailsName"><b>Name</b></label><br>
					<input class="inputPlayerDetails" id="playerDetailsName"
						type="text"><br> <br> <label
						for="playerDetailsUrl"><b>Url of your profile from
							social sites<small>(just open your profile image in new
								tab and copy the url and paste here)</small>
					</b></label><br> <input class="inputPlayerDetails" id="playerDetailsUrl"
						type="text"><br> <br> <label
						for="playerDetailsCompany"><b>Company Name</b></label><br> <input
						class="inputPlayerDetails" id="playerDetailsCompany" type="text"><br>
					<br>
					<div>
						<button id="submit">SUBMIT</button>
						<br> <br>
						<div id="displayLoginCredentials"></div>
					</div>
				</div>
			</div>
			<div id="playPause">||</div>
			<div id="restartTimer"></div>
			<div id="restart">
				<button id="submit" class="playAgain">Play again as same
					user</button>
				&nbsp;
				<button id="submit" class="quit">Play again as new user</button>
			</div>
			<div id="headerContainer">
				<input id="playerNameSubmit" type="hidden" value=""> <input
					id="playerUrlSubmit" type="hidden" value=""> <input
					id="playerCompany" type="hidden" value="">
				<div class="headerContent">
					<b id="gameName">Balloons Pop</b>
				</div>
				<div class="headerContent">
					<b>Developer : <a
						href="https://www.facebook.com/vishnu.prasadh.vichu.prasadh"
						target="_blank">Vishnu Prasadh</a></b>
				</div>
			</div>
			<div id="bodyContainer">
				<div id="gameAreaContainer">
					<div id="gameAreaHead">
						<div id="gameAreaHeadContainer">
							<div class="gameDetails">
								<span>Select Dificulty </span><input type="range" min="15"
									max="50" value="15" step="1"
									onchange="gameDifficulty(this.value)"><br> <br>
								<div id="difficultyDisplay">
									<b style="color: #000;">Beginner</b>
								</div>
							</div>
							<div class="gameDetails">
								Select the Sword<span><br> <img class="changeSword"
									alt="sword" src="./sprites/sword1.png"> <img
									class="changeSword" alt="sword" src="./sprites/sword2.png">
									<img class="changeSword" alt="sword" src="./sprites/sword3.png">

									<img class="balloonSprites" alt="sword"
									src="./sprites/rock1.png"> <img class="balloonSprites"
									alt="sword" src="./sprites/balloon1.png"> <img
									class="balloonSprites" alt="sword" src="./sprites/balloon2.png">
									<img class="balloonSprites" alt="sword"
									src="./sprites/balloon3.png"> <img class="balloonSprites"
									alt="sword" src="./sprites/balloonBursting1.png"> <img
									class="balloonSprites" alt="sword"
									src="./sprites/balloonBursting2.png"> <img
									class="balloonSprites" alt="sword"
									src="./sprites/balloonBursting3.png"> <input
									type="hidden" value="./sprites/balloon1.png"> <!--  
<input type="hidden" value="./sprites/balloon2.png"> 
<input type="hidden" value="./sprites/balloon3.png">  --> <!-- './sprites/balloon1.png', './sprites/balloon2.png', './sprites/balloon3.png' -->
								</span>
							</div>
							<div class="gameDetails">
								<span id="playerName">Your Score</span><input
									id="playerNameInput" type="hidden" value=""><br>
								<div id="displayScore">
									<span id="scoreCard">0</span><input type="hidden" value=""
										id="randomNumber">
								</div>
							</div>
							<div class="gameDetails1">
								<img src="./sprites/life.gif">
								<div class="life" id="lives"></div>
							</div>
						</div>
					</div>
					<div id="gameArea"></div>
				</div>
				<div id="scoreBoardContainer">
					<div id="scoreBoardData">Top Players</div>
					<div id="scoreBoard">
						<div id="loader">
							<div id="loading">Fetching Scores</div>
							<img id="loaderImg" src="./sprites/loader.gif">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="footer">
		Copy Right &copy; 2016 - <span id="copyRightCurrentYear">2017</span>
	</div>
	<script type="text/javascript"
		src="<%=request.getContextPath()%>/js/balloonpop.js"></script>
</body>
</html>

