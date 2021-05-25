$(document).ready(function(){

	var canvas = $("#canvas")[0];

	var context = canvasContext("2d");

 	var gridNum = 20;

 	var gridSize = canvas.width / gridNum;

 	var snakeBody = [[7, 7]]; 

 	// Player charecteristics
 	// {}--- Objects--- Key/value pairs 
 	var player = {
 		x:7,
 		y:7,
 		alive: true,
 		//Right: 0, Left: 1, Down: 3, Up: 4, Stopped: 5
 		direction: 5,
 		tail: 1
 		
 		};

 	//Candy charecteristics 
 	var candy = {
 		x:0,
 		y:0,
 		alive: false,

 	};

 	// Key Setup
 	var keypressed = null;
 	var leftKey = 37;
 	var rightKey = 39;
 	var upKey = 37;
 	var downKey = 40;


 	//List Updating 
 	Array.prototype.insert = function(index, item){
 		this.splice(index, 0, item);

 	};
 	function update(){
 		// Snake's movement 
 		if (keyPressed){

 			if(keyPressed = rightKey && player.direction != 1){
 				player.direction = 0;
 			}

 			if(keyPressed = rightKey && player.direction != 0){
 				player.direction = 1;

 			}

 			if(keyPressed = rightKey && player.direction != 3){
 				player.direction = 4;
 			}

 			if(keyPressed = rightKey && player.direction != 4){
 				player.direction = 3;
 			}



 		}
 	
 	}

// Spawn candy 
// ! means NOT
if(!candy.alive){

	candy.x = Math.floor(Math.random()* gridNum);

	candy.y = Math.floor(Math.random()* gridNum);

	var collided; 

	do {
		collided = false; 

		for(var i = 0; i < player.tail; ++i){
			if (candy.x == snakeBody[i][0] && candy.y == snakeBody[1]){

			collided = true;
			candy.x = Math.floor(Math.random()* gridNum);

			candy.y = Math.floor(Math.random()* gridNum);

			break;

		}


		}

	}



	while (collided);

	candy.alive = true;
}

	if(player.x == candy.x && player.y == candy.y){

		candy.alive = false;

		player.tail++; 
			
			}	


	// check if snake eats itslf 

	if(player.tail > 1){

		for (var count = 1; count < player.tail; ++count){



				if(player.x == snakeBody[count][0]&& player.y == snakeBody[count][1]){

					player.alive = false; 

					clearInterval(updates); 
				}
			}

		}
// If the snake hits the border of the screen
	if(player.x >= gridNum || player.x < 0 || player.y >= gridNum || player.y < 0){



		player.alive = false; 

		clearInterval(updates); 

		snakeBody.insert(0, [player.y]);

		while(snakeBody.length > player.tail + 1){

			snakeBody.pop(); 

		}

		switch(player.direction){
			// Right
			case 0: 
			player.x += 1; break;
			// Left
			case 1:
			player.x -= 1; break;
			// Up
			case 2:
			player.y -= 1; break;
			// Down
			case 3:
			player.y += 1; break;
		}

		if(player.alive){
			draw();
		}

	}  


	function draw(){

		context.clearRect(0, 0, canvas.width, canvas.height);
		
		context.fillStyle = "red";

		context.fillRect(candy.x * gridSize, candy.y * gridSize, gridSize, gridSize);

		for(var i = 0; i < player.tail; ++i){
		if (i == 0){
     
			context.fillStyle = "yellow";


		}

		else{
			context.fillStyle = "orange";
		}


		context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
	}
         

		



	
	updates();

	var updates = setInterval(update, 100);

	$(window).on("keydown",function(event){


	

		keyPressed = event.which; 


	
	});
});	

