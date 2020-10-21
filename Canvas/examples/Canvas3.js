import React, {Component} from 'react';
import {render} from 'react-dom';

class Canvas3 extends Component {
	constructor(props, ownProps) {
		super(props);
	}


	componentDidMount(){
		// получим контекст canvas
		var canvas  = document.getElementById('canvas'),
			W = 600, //1350,
			H = 400, //642,
			d,
			ctx = canvas.getContext('2d'),
			dontdoit=0,
			dontdoit1=0,
			dontdoit2=0,

			keys = {
				enter: 13
			},

			ball = {
				r: 10,
				tempx: 250,
				tempy: -10,
				x: 250,
				y: -10,
				dx: 0.5,
				dy: 0,
				gravity: 5,
				stopMove: true,

				fillStyle: 'green',

				draw:  function() {

					ctx.beginPath();
					ctx.arc( this.x, this.y, this.r, 0, 2 * Math.PI, false);
					ctx.fillStyle = this.fillStyle;
					ctx.fill();
				}
			},

			arc = {
				r: 100,
				strokeStyle: 'red',

				draw: function() {
					ctx.beginPath();
					ctx.arc( W/2, H/3, this.r, 0, 2 * Math.PI, false);
					ctx.strokeStyle = this.strokeStyle;
					ctx.stroke();
				}
			},


			line = {

				strokeStyle: 'red',
				lineWidth: 1,

				draw: function( moveTo, lineTo ) {
					ctx.beginPath();
				    ctx.lineWidth = line.lineWidth;
				    ctx.strokeStyle = this.strokeStyle;
				    ctx.moveTo( moveTo.x, moveTo.y );
				    ctx.lineTo( lineTo.x, lineTo.y );
				    ctx.stroke();
				}
			};



		canvas.width = W;
		canvas.height = H;

		// events
		document.addEventListener('keypress', function(event) {
			if( event.keyCode  === keys.enter && ball.stopMove) {
				ball.stopMove = false;

				ball.tempy = 0;
				ball.tempx = randomInteger( W/2 - arc.r, W/2 + arc.r );

				setPosition();
				ball.dy=0;
				ball.dx=0;
			}
		});

		// Function to paint canvas
		function paintCanvas() {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, W, H);

			ctx.font = "22px Verdana";
			ctx.fillStyle = "white";
		  	ctx.fillText("Press enter to start animation", 20, 40);
		}


		function draw() {
			paintCanvas();

			arc.draw();

			line.draw( {x: 0, y: H - H / 4}, { x: W / 2, y: H} );

			line.draw( {x: W / 2, y: H}, { x: W, y: 0} );


			ball.draw();

			update();

	  	};

	  	function update() {
	  		if(!ball.stopMove) {

				if( (d = getDistance(ball.tempx, ball.tempy,W/2,H/3)) < 110 && dontdoit < 1 ) {
					var x=ball.tempx-W/2;
					var y=H/3-ball.tempy;

					reflex( y/d,  x/d );


					dontdoit=5;
				}

				dontdoit--;

				// столкновение с плоскостями
				var cathetusY1 = getCathetusYPlane1( H/4, W/2 );
				var cathetusY2 = getCathetusYPlane2( H, W/2 );


				if( cathetusY1 <= ball.r && dontdoit1 < 1) {
					reflex( Math.sin( 0.785 ),  Math.cos( 0.785 ) );

					dontdoit1=5;
				}
				dontdoit1 --;

				if( cathetusY2 <= ball.r && dontdoit2 < 1) {
					reflex( Math.sin( 0.785 ),  -Math.cos( 0.785 ) );

					dontdoit2=5;
				}
				dontdoit2 --;


				if(Math.round(cathetusY1) <= ball.r + line.lineWidth &&
					Math.round(cathetusY2) <= ball.r + line.lineWidth &&
					Math.abs(ball.dx) < 0.5 &&
					Math.abs(ball.dy) < 0.5)
				{
					setPosition();
					ball.dy=0;
					ball.dx=0;

					ball.stopMove = true;
				}

				ball.tempx += ball.dx;
				ball.tempy += ball.dy;

				setPosition();

	  			ball.dy += 0.2; //Ускорение свободного падения
	  		}


		  	requestAnimationFrame(draw);
	  	}

	  	// console.log( getSlopePlaneValue( 100, 300 ) ); // 1/3

	  	// console.log( Math.atan2( 3 ) );

		function getCathetusYPlane1( y, x ) {
			// получаем х0 линии
			var x0 = (ball.tempy - (H-H/4)) / getSlopePlaneValue( y, x );


			// определяем длину гипотенузы
			var hypotenuse = getDistance( ball.tempx, ball.tempy - (H-H/4), x0, ball.tempy - (H-H/4) );

			// определяем катет y по углу и гипотенузе
			return Math.sin( getAnglePlaneValue( y, x ) ) * hypotenuse;
		}

		function getCathetusYPlane2( y, x ) {
			// получаем х0 линии
			var x0 = ball.tempy / getSlopePlaneValue( y, x );

			// определяем длину гипотенузы
			var hypotenuse = getDistance( ball.tempx, ball.tempy, W - x0, ball.tempy );

			// определяем катет y по углу и гипотенузе
			return Math.sin( getAnglePlaneValue( y, x ) ) * hypotenuse;
		}

	  	function getAnglePlaneValue( y, x ) {
	  		return Math.atan2( y, x );
	  	}

	  	function getSlopePlaneValue( y, x) {
	  		return y / x;
	  	}

  		// получить расстояние от точки до центра круга
		function getDistance(x1,y1,x2,y2)
		{
			return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
		}

  		// растояние
		function countPow(x,y)
		{
			return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
		}

		function randomInteger(min, max) {
		    var rand = min - 0.5 + Math.random() * (max - min + 1)
		    rand = Math.round(rand);
		    return rand;
	  	}

	  	function reflex( rsin, rcos ) {
	  		var g=countPow( ball.dx, ball.dy );

	  		//  вычислим угол движения в виде синуса и косинуса:
			var sin= ball.dx / g;  // 0
			var cos= ball.dy / g;  // 1

			var tsin = rsin * cos - rcos * sin;
			var tcos = rcos * cos + rsin * sin;

			var nsin = tsin * rcos + tcos * rsin;
			var ncos = tcos * rcos - tsin * rsin;

			var pow=g * 0.7;
			ball.dx=nsin * pow;
			ball.dy=ncos * pow;

	  	}


		function setPosition() {
			ball.x = ball.tempx;
			ball.y = ball.tempy;
		}


		draw();
	}


	render() {


		return (
			<canvas id="canvas"></canvas>
		)

	}

}

export default Canvas3;
