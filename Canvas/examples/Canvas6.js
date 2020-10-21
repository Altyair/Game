import React, {Component} from 'react';
import {render} from 'react-dom';

import Vector2 from '../../../utils/Vector2D';

class Canvas6 extends Component {
	constructor(props, ownProps) {
		super(props);
	}

  
	componentDidMount(){
		// получим контекст canvas
		let   c  = document.getElementById('canvas'),
				$ = canvas.getContext('2d'),
				pi = Math.PI,
				pi2 = pi * 2,
				piD2 = Math.PI/2,
				tick = 0,
				W = 600,
				H = 400,

				opts = {
					size: 10,
					canvas: {
						amount: 30,
						bgc: "rgba(20, 20, 20, 0.2)"
					},
					minSpeed: 1,
					addedSpeed: 2.5
				},
				Colors = [
					"#2ecc71", //green
					"#3498db", //blue
					"#e67e22", //orange
					"#e74c3c", //red
					"#ecf0f1", //white
					"#9b59b6", //purple
					"#2c3e50", //night-blue
				],
				particles = [],
				Mouse = new Vector2( W/2, H/2),

				w = c.width = W,
				h = c.height = H,

				Particle = function(X, Y) {
					this.pos = new Vector2(X || 0, Y || 0);
					this.acc = new Vector2();
					this.speed = new Vector2();
					this.color = Colors[Math.floor(Math.random() * Colors.length)];
					this.maxSpeed = opts.minSpeed + Math.random()*opts.addedSpeed;
				};

		Particle.prototype.update = function() {
			this.speed.add( this.acc );
			this.pos.add( this.speed );


			this.acc.set(0);

			return this;
		}
		Particle.prototype.render = function() {
			$.fillStyle = this.color;
			// $.fillRect( this.pos.x - 415, this.pos.y - 140, opts.size, opts.size );

			var _x = this.pos.x - 415;
			var _y = this.pos.y - 140;

			var d = this.speed.direction();
			$.beginPath();


		  	$.moveTo(Math.cos(d)*opts.size+_x, Math.sin(d)*opts.size+_y);
		    $.lineTo(Math.cos(d+piD2)*(opts.size/2)+_x, Math.sin(d+piD2)*(opts.size/2)+_y);
		    $.lineTo(Math.cos(d-piD2)*(opts.size/3)+_x, Math.sin(d-piD2)*(opts.size/3)+_y);
		    $.lineTo(Math.cos(d)*opts.size+_x, Math.sin(d)*opts.size+_y);
		    $.closePath();
		    $.fill();

		}
		Particle.prototype.border = function() {}

		Particle.prototype.lookFor = function( tar ) {
			var dir = tar.copy();
			dir.sub( this.pos );
			var steer = dir.sub(this.speed);
			steer.limit( this.maxSpeed );

			this.force(steer);

			// Desired = Target - velocity
			return this;
		}

		Particle.prototype.force = function( f ) {
			this.acc.add( f );
			return this;
		}


		// Function to paint canvas
		function paintCanvas() {
			$.fillStyle = opts.canvas.bgc;
			$.fillRect(0, 0, W, H);

			$.font = "22px Verdana";
			$.fillStyle = "white";
		  	$.fillText("Particles", 20, 40);
		}

		function populate () {
			particles = [];

			for(var i = 0; i < opts.canvas.amount; i++) {
				particles[i] = new Particle(Math.random()*W, Math.random()*H);
			} 
		}

		function setup() {

			populate();

			requestAnimationFrame( loop );
		}

		function loop () {
			paintCanvas();

			particles.map(function(p) {
				p.lookFor( Mouse ).update().render();
			})



			requestAnimationFrame( loop );
		}

		window.addEventListener('mousemove', function(e) {
			Mouse.set(e.pageX, e.pageY);
		})

		setup();

	}

	
	render() {


		return (
			<canvas id="canvas"></canvas>
		)
			
	}

}

export default Canvas6;