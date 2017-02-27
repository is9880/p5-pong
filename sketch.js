/*
*isabelle simek (is9880@bard.edu) 2.27.17
*I worked alone on this assignment
*initially my plan with this was to make a lot of aesthetic changes to the base provided for us, and to add a collision
*system wherein there would be blocks at the top of the screen that would be removed as you hit them.  i realized that that
*wasn't really pong, though, so i decided to stick to a simpler version, but added a leveling system.  re: play, each level
*is basically the same, but the colors change to make it seem like you're progressing.  in the future i'd like to play
*with the idea of adding different tasks for each level (things in the background that change color when your ball pass over
*them, blocks at the top, added speed, etc.) but for now i'm really pleased with this simple game.
*one-sided pong
*/

var paddle_x, paddle_y;
var paddle_w, paddle_h;
var paddle_step;

var ball_x, ball_y;
var ball_r;
var ball_x_step, ball_y_step;

//score & lives
var score;
var lives;

function setup() {
   createCanvas(600,300);
   paddle_h = 16;
   paddle_w = 6 * paddle_h;
   paddle_x = width / 2;
   paddle_y = height - paddle_h;
   paddle_step = 0;
   ball_r = 13; 
   score = 0;
   lives = 3;
   reset();
}

function draw() {
  background(251, 203, 193);
  
  //move paddle
  //paddle_x += (mouseX - paddle_x) * .1;
  paddle_x = paddle_x + paddle_step;
  
  // is the ball hitting the right or left wall?
  if (ball_x - ball_r < 0 || ball_x + ball_r > width) {
    ball_x_step = -ball_x_step;
  }
  
  //hitting the top?
  if (ball_y - ball_r < 0) {
    ball_y_step = -ball_y_step;
  }
  
  //hitting the paddle?
  if (ball_y + ball_r > paddle_y) {
    if (ball_x >= paddle_x && ball_x <= paddle_x + paddle_w) {
      ball_y_step = -ball_y_step;
      ball_y = paddle_y - ball_r;
    }
    else if (ball_y + ball_r > paddle_y){
      reset();
    }
  }
  
  //move ball by ball_x_step and ball_y_step
  ball_x = ball_x + ball_x_step;
  ball_y = ball_y + ball_y_step;
  
  //score count
  if (ball_y + ball_r > paddle_y) {
    if (ball_x >= paddle_x && ball_x <= paddle_x + paddle_w) {
      ball_y_step = -ball_y_step;
      ball_y = paddle_y - ball_r;
      score = score + 10;
    }
  }
    
  //lives count
  if (ball_y + ball_r > paddle_y) {
    if (ball_x >= paddle_x && ball_x <= paddle_x + paddle_w) {
      ball_y_step = -ball_y_step;
      ball_y = paddle_y - ball_r;
    }
    else if (ball_y + ball_r > paddle_y){
      lives=lives-1;;
    }
  }
  
  
  //level 2
  if (score == 50) {
    background(133, 206, 186);
    fill(243, 201, 221);
    textSize(20);
    textFont("Arial");
    text("LEVEL 2", 270, 25); 
  }
  if(score > 50 && score < 100) {
    background(133, 206, 186);
  }
  
  //level 3
  if (score == 100) {
    background(200, 134, 162);
    fill(167, 187, 195);
    textSize(20);
    textFont("Arial");
    text("LEVEL 3", 270, 25);
  }
  if (score > 100 && score < 150) {
    background(200, 134, 162);
  }
  
  //level 4
  if (score == 150) {
    background(120, 137, 160);
    fill(133, 108, 107);
    textSize(20);
    textFont("Arial");
    text("LEVEL 4", 270, 25);
  }
  if (score > 150 && score < 200) {
    background(120, 137, 160);
  }
  
  //level 5
  if (score == 200) {
    background(251, 239, 206);
    fill(140, 165, 151);
    textSize(20);
    textFont("Arial");
    text("LEVEL 5", 270, 25);
  }
  if (score > 200 && score < 300) {
    background(251, 239, 206);
  }
  
  
  //draw ball
  noStroke();
  fill(206, 236, 247);
  ellipse(ball_x, ball_y, ball_r * 2, ball_r *2);
  
  //draw paddle
  fill(206, 236);
  rect(paddle_x, paddle_y, paddle_w, paddle_h);
  
  //draw score
  fill(255);
  textSize(12);
  text(score, 10, 15);
  
  //draw life
  text(lives, 585, 15);  
  
  //game over
    if (lives===0){
    stroke(0);
    fill(232, 134, 108);
    background(73, 69, 70);
    textSize(60);
    text("GAME OVER", 130, 150);
    reset();
  }
  
  //winner
  if (score == 300) {
    fill(random(220), random(220), random(220));
    background(255);
    textSize(60);
    text("winner!!!!", mouseX, mouseY);
    reset();
  }
}


function reset() {
  ball_x = random(ball_r, width - ball_r);
  ball_y = random(ball_r, height / 2);
  ball_x_step = random(-3, 3);
  ball_y_step = random(1, 3);
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    paddle_step = -3;
  } else if (keyCode == RIGHT_ARROW) {
    paddle_step = 3;
  } else if (key == ' ') {
    reset();
  }
}

function keyReleased() {
  paddle_step = 0;
}
