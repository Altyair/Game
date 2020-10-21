import React, {Component} from 'react';
import {render} from 'react-dom';

class Canvas2 extends Component {
	constructor(props, ownProps) {
		super(props);
	}

  
	componentDidMount(){
		
	  	window.cancelRequestAnimFrame = ( function() {
			return window.cancelAnimationFrame          ||
				window.webkitCancelRequestAnimationFrame    ||
				window.mozCancelRequestAnimationFrame       ||
				window.oCancelRequestAnimationFrame     ||
				window.msCancelRequestAnimationFrame        ||
				clearTimeout
		} )();

		var canvas  = document.getElementById('canvas'),
			requestId,
			W = 600,
			H = 400,
			ctx = canvas.getContext('2d'),
			currentAngle = {
				index: 0.01,
				min: 0,
				max: 1,
			},
			cathetus = {},
			hypotenuse,

			keys = {
				left: 37,
				right: 39
			},

			ball = {
				r: 10,
				_x: null,
				_y: null,
				x: W/2,
				y: H/2,
				vx: 1,
				vy: 1,
				gravity: 0,
				fillStyle: 'green',

				draw:  function() {

					ctx.beginPath();
					ctx.arc( this.x, this.y, this.r, 0, 2 * Math.PI, false);
					ctx.fillStyle = this.fillStyle;
					ctx.fill();
				}
			},

			line = {
				position: {
					x2: W * 1/3,
					y2: H/2,
					x1: W * 2/3, 
					y1: H/2
				},

				len: 0,
				index: 1,
				angle: 0,

				strokeStyle: 'red',
			
				draw: function( moveTo, lineTo ) {
					ctx.beginPath();
				    ctx.lineWidth = this.lineWidth;
				    ctx.strokeStyle = this.strokeStyle;
				    ctx.moveTo( this.position.x1, this.position.y1 );
				    ctx.lineTo( this.position.x2, this.position.y2 );
				    ctx.stroke();
				}
			},

			arc = {
				radius: 100,
				strokeStyle: 'red',

				draw: function() {
					ctx.beginPath();
					ctx.arc( W/2, H/2, this.radius, 0, 2 * Math.PI, false);
					ctx.strokeStyle = this.strokeStyle;
					ctx.stroke();
				}
			};

			
		canvas.width = W;
		canvas.height = H;

		// Function to paint canvas
		function paintCanvas() {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, W, H);

			ctx.font = "22px Verdana";
			ctx.fillStyle = "white";
		  	ctx.fillText("Press left or right button", 20, 40);
		}


		// events
		document.addEventListener('keydown', function(e) {
			if( event.keyCode  === keys.right ) {

				if( currentAngle.min * Math.PI < 0.7 ) {
					currentAngle.min += currentAngle.index;
					currentAngle.max += currentAngle.index;

					changePositionLine();

					findAngleLine();
				}
			}

			else if( event.keyCode  === keys.left ) {
				if( currentAngle.min * Math.PI > - 0.7 ) {
					currentAngle.min -= currentAngle.index;
					currentAngle.max -= currentAngle.index;

					changePositionLine();

					findAngleLine();
				}
			}
		});

		function changePositionLine() {
			line.position.x1 = Math.round(Math.cos( currentAngle.min * Math.PI ) * arc.radius)  + W/2;
			line.position.y1 = Math.round(Math.sin( currentAngle.min * Math.PI ) * arc.radius)  + H/2;

			line.position.x2 = Math.round(Math.cos(	currentAngle.max * Math.PI ) * arc.radius) + W/2;
			line.position.y2 = Math.round(Math.sin(	currentAngle.max * Math.PI ) * arc.radius) + H/2;

			line.position.x3 = line.position.x1;
			line.position.y3 = line.position.y2
		}


		function findAngleLine() {
			cathetus.x = line.position.x3 - line.position.x2;
			cathetus.y = line.position.y1 - line.position.y3;

			line.angle = Math.atan2(cathetus.y, cathetus.x).toFixed(2);
		}

	  	function animate( draw, duration ) {
	  		var start = performance.now();

		  	requestId = requestAnimationFrame(function animate(time) {
					var timePassed = time - start;

					if (timePassed > duration) timePassed = duration;

					let timeFraction = (time - start) / duration;

			  	draw( timePassed  );

			  	// console.log( timePassed );

			  	if (timePassed < duration) {
			      requestAnimationFrame(animate);
			    } else {
			    	cancelAnimationFrame(requestId);
			    }	


		  	});
	  	}


	  	function update() {


	  		if(!ball.out) {
		  		if( Math.round(line.len) < arc.radius - ball.r && Math.round(line.len) > - arc.radius + ball.r && line.angle != 0.00) 
		  		{
		  			ball.gravity += 0.1;
					line.len += line.index * line.angle;
					if(line.angle > 0) {
						line.len += ball.gravity;
					}
					else if(line.angle < 0) {
						line.len -= ball.gravity;
					}
				}
				else if( Math.round(line.len) >= arc.radius - ball.r && line.angle < 0) {
					ball.gravity += 0.1;
				 	line.len += line.index * line.angle - ball.gravity;
				}
				else if( Math.round(line.len) <= - arc.radius + ball.r && line.angle > 0) {
					ball.gravity += 0.1;
				 	line.len += line.index * line.angle + ball.gravity;
				} else {
					ball.gravity = 0;
				}

				hypotenuse = arc.radius - Math.round(line.len);

				var newAngle = currentAngle.min + 3/2 * Math.PI;

				ball.x = (line.position.x1 - hypotenuse * Math.cos(line.angle)) + Math.cos(newAngle) * 12;
				ball.y = (line.position.y1 - hypotenuse * Math.sin(line.angle)) + Math.sin(newAngle) * 12;
			}
	  	}

		animate(function ( timePassed ) {
			paintCanvas();

			arc.draw();

			line.draw();

			update();

			ball.draw();

	  	}, 200000);
	}

	render() {


		return (
			<canvas id="canvas"></canvas>
		)
			
	}

}

export default Canvas2;