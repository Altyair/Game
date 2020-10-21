import React, {Component} from 'react';
import {render} from 'react-dom';

class Canvas4 extends Component {
	constructor(props, ownProps) {
		super(props);
	}

  
	componentDidMount(){
		// получим контекст canvas
		const   c  = document.getElementById('canvas'),
				$ = canvas.getContext('2d'),
				pi = Math.PI,
				pi2 = pi * 2,
				W = 600,
				H = 400,

				opts = {
					bgc: "rgba(32,32,32,1)",
					radius: 50,
					thickness: 5,

				};

		let w = c.width = window.innerWidth,
			h = c.height = window.innerHeight,
			circle;

		class Circle {
			constructor() {
				this.reverse = false;
				this.theta = 0;
			}

			update() {
				this.theta += .05;

				if( this.theta > pi2 ) {
					this.theta = 0;
					this.reverse = !this.reverse;
				}

			}

			draw() {
				this.update();

				$.beginPath();
				this.reverse ? $.arc( W/2, H/2, opts.radius, this.theta, pi2, false) : $.arc( W/2, H/2, opts.radius, 0, this.theta, false);
				$.strokeStyle = 'red';
				$.lineWidth = opts.thickness;
				$.stroke();
			}
		}

		// Function to paint canvas
		function paintCanvas() {
			$.fillStyle = "black";
			$.fillRect(0, 0, W, H);

			$.font = "22px Verdana";
			$.fillStyle = "white";
		  	$.fillText("Preloader", 20, 40);
		}

		function setup () {
			circle = new Circle;

			requestAnimationFrame( loop );
		}

		function loop () {
			paintCanvas();
			circle.draw();

			requestAnimationFrame( loop );
		}
		setup();

	}

	
	render() {


		return (
			<canvas id="canvas"></canvas>
		)
			
	}

}

export default Canvas4;