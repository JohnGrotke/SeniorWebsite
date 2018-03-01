$(document).ready(function() {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();

	var cellWidth = width/10;
	var snake_array;
	var direction;
	var food;
	var score;
	var flag; //flag that lets you know if you have already changed the direction in that frame
				//if flag is 0, that means that you haven't changed the direction
				//if the flag is 1, that means that you have already moved the direction once during that frame.
				//The flag helps eliminate the possibility of turning into yourself, although it makes navigation
				//a little bit harder because you need to be exact for each direction change.

	function init()  //starts the program with all of the default settings
	{
		direction = "right";
		create_snake();
		create_food();
		score = 0;

		if(typeof game_loop != "undefined")clearInterval(game_loop);

		game_loop = setInterval(paint, 150);  //creates a new frame every 100ms
	}
	init(); //starts the program

	function create_snake()  //I think you can guess from the name
	{
		var length = 5;
		snake_array = [];
		for(var i = length - 1; i >= 0; i--) //This loop creates a snake that is five cells long
		{

			snake_array.push({x:i, y:0});  // Each time this runs, it adds a new cell to the beginning of the array
		}									// The snake is in the first 5 X cells  so (0, 0), (1, 0), (2, 0), (3, 0), (4, 0)
		flag = 0;
	}


	function create_food()  //same with this one
	{

		//creates a food in a random cell
		food =
		{
			x: Math.round(Math.random()*(width-cellWidth)/cellWidth),  //720/30 = 0-24
			y: Math.round(Math.random()*(height-cellWidth)/cellWidth),
		};



		while(check_collision(food.x, food.y, snake_array))  //checks to make sure that the cell that was picked was not inside the snake
		{
			food =
			{
				x: Math.round(Math.random()*(width-cellWidth)/cellWidth),  //440/10 = 0-44
				y: Math.round(Math.random()*(height-cellWidth)/cellWidth),
			};
		}
	}


	function paint()
	{
		flag = 0; 	//reset the flag because it is a new frame

		//sets the background color of the canvas to white
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,width, height);

		//draws a black border around the canvas
		ctx.strokeStyle = "black";
		ctx.strokeRect(0,0,width, height);

		//The x and y variables for the head of the snake
		var headx = snake_array[0].x;
		var heady = snake_array[0].y;




		$(document).keydown(function(e){
			var key = e.which;


			if(flag == 0) //if there hasn't been any movement during this frame
			{
				change_direction(key);
				flag = 1; //set the movement flag to true so it is harder to go into yourself
			}
			else
			{
				// setTimeout(function(){change_direction(key);}, 50);  //delays the direction change for 50ms and then changes it
				flag = 1;  //there was still movement during this frame
			}
		})

		//the direction that the snake will head depending on what keys are pressed
		if(direction =="right")
		{
			headx++;
		}
		else if(direction =="left")
		{
			headx--;
		}
		else if(direction =="up")
		{
			heady--;
		}
		else if(direction =="down")
		{
			heady++;
		}

		//restarts the game if the snake goes out of bounds
		if(headx <= -1 || headx >= width/cellWidth || heady <= -1 || heady >= height/cellWidth || check_collision(headx, heady, snake_array))
		{
			//restart game
			init();
			return;
		}

		//When the head intercepts a food
		if(headx == food.x && heady == food.y)
		{
			var tail = {x:headx, y: heady};  //adds another cell where the head used to be
			create_food();
			score = score + 10;
		}

		else{ //the head did not intercept with a food so it replaces the head with the tail
			var tail = snake_array.pop();
			tail.x = headx;
			tail.y = heady;
		}

		snake_array.unshift(tail); // adds the tail to the beginning of the array and increases the length

		for (var i = 0; i < snake_array.length; i++)  //  paints the individual cells that make up the snake
		{
			var c = snake_array[i];

			paint_cells(c.x, c.y);

		}

		paint_food_cells(food.x, food.y);  // paints the food cells
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, height - 5);

	}

	function paint_cells(x,y)
	{
		//creates a blue square
		ctx.fillStyle = "blue";
		ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		//separates each square with a white outline
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

	}

  function paint_food_cells(x,y)
	{
		//creates a blue square
		ctx.fillStyle = "red";
		ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		//separates each square with a white outline
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

	}

	function check_collision(x, y, array)
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}

	function change_direction(key)
	{
		flag = 0;
		if (flag == 0) //there hasn't been a change in movement yet this frame
		{
			if(key == "37" && direction != "right")
			{
				direction = "left";
				flag = 1; // there was a change in movement this frame
			}
			else if(key == "38" && direction != "down")
			{
				direction = "up";
				flag = 1;
			}
			else if(key == "39" && direction != "left")
			{
				direction = "right";
				flag = 1;
			}
			else if(key == "40" && direction != "up")
			{
				direction = "down";
				flag = 1;
			}
		}
	}

});
