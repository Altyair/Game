import React, {Component} from 'react';
import {render} from 'react-dom';

import { Link } from 'react-router';
import {connect} from 'react-redux';

import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import './Canvas.less';

export default class Canvas extends Component {
	render() {
		return (
			<div className='container'>
	  	 		<h3 style={{margin: '0 0 20px 0'}}>Canvas animation</h3>
				<div className='row'>
				  	<div className='col-sm-3'>
				  	   <ul>
					        <li>
				          		<Link to="/canvas/examples/canvas1" activeClassName="active" activeStyle={{ color: 'red' }}>rotate line</Link>
			          	  	</li>
		          	  	  	<li>
				        	 	<Link to="/canvas/examples/canvas2" activeClassName="active" activeStyle={{ color: 'red' }}>ball move</Link>
					        </li>
				        	<li>
				        	 	<Link to="/canvas/examples/canvas3" activeClassName="active" activeStyle={{ color: 'red' }}>ball move and jump</Link>
					        </li>
					        <li>
				        	 	<Link to="/canvas/examples/canvas4" activeClassName="active" activeStyle={{ color: 'red' }}>simple preloader</Link>
					        </li>
					        <li>
				        	 	<Link to="/canvas/examples/canvas5" activeClassName="active" activeStyle={{ color: 'red' }}>wafe</Link>
					        </li>
					        <li>
				        	 	<Link to="/canvas/examples/canvas6" activeClassName="active" activeStyle={{ color: 'red' }}>particles</Link>
					        </li>
				      	</ul>
				  	</div>

			  	 	<div className='col-sm-9'>
	              		{this.props.children}
		            </div>
		        </div>
          	</div>
		)
	}
}