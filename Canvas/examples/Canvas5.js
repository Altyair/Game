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
					amount: 15,
					maxHeight: 100,
					radius: 10,
					distance: 10,
					span: Math.PI,
					speed: Math.PI/180
				},

				arr = new Array( opts.amount + 1 ).fill().map( (el, ind) => {
					return {
						th: opts.span / opts.amount * ind,
						x: ( opts.distance + opts.radius * 2 ) * ind
					}

				}),
				width = ( opts.distance + opts.radius * 2 ) * opts.amount;

		let w = c.width = window.innerWidth,
			h = c.height = window.innerHeight;


		// Function to paint canvas
		function paintCanvas() {
			$.fillStyle = "black";
			$.fillRect(0, 0, W, H);

			$.font = "22px Verdana";
			$.fillStyle = "white";
		  	$.fillText("Preloader", 20, 40);
		}

		function draw() {
			paintCanvas();

			arr.forEach( (el, ind) => {
				el.th += opts.speed;
				$.beginPath();
				$.arc( el.x + W/2 - width/2, Math.sin(el.th) * opts.maxHeight + H/2, opts.radius, 0, pi2, false)
				$.fillStyle = "hsl("+ el.th*30 +", 50%, 50%)";
				$.fill();
			});

			requestAnimationFrame( draw );
		}

		draw();

	}

	
	render() {


		return (
			<canvas id="canvas"></canvas>
		)
			
	}

}

export default Canvas4;