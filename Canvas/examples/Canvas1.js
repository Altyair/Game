import React, {Component} from 'react';
import {render} from 'react-dom';

class Canvas1 extends Component {
	constructor(props, ownProps) {
		super(props);
	}

  
	componentDidMount(){
		// получим контекст canvas
		var canvas  = document.getElementById('canvas'),
			W = 600,
			H = 400,
			ctx = canvas.getContext('2d'),

			currentAngle = 0,

			obj = {
				x: 50,
				y: 50,
				radius: 50,
				fillStyle: '#fff',
				vx:  W / 2 + 200,
				vy: H / 2 + 200,

				draw: function (  ) {
					ctx.beginPath();
				    ctx.lineWidth = 2;
				    ctx.strokeStyle = 'red';
				    ctx.moveTo( W / 2, H / 2 );
				    ctx.lineTo( obj.vx + W / 2, obj.vy + H / 2 );
				    ctx.stroke();
				}
			};
			

		canvas.width = W;
		canvas.height = H;

		// Function to paint canvas
		function paintCanvas() {
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, W, H);
		}



		function draw() {
			paintCanvas();

			obj.draw();

			update();

	  	};

	  	function update() {
	  		// считаем косинус текущего значения угла
		   //  и умножаем на значение радиуса
		    obj.vx = Math.cos(currentAngle) * obj.radius;

		    // считаем синус текущего значения угла
		    // и умножаем на значение радиуса
		    obj.vy = Math.sin(currentAngle) * obj.radius;


		    // увеличиваем значение угла
			currentAngle += 0.01;
			
		  	requestAnimationFrame(draw);
	  	}


		draw();
	}

	
	render() {


		return (
			<canvas id="canvas"></canvas>
		)
			
	}

}

export default Canvas1;