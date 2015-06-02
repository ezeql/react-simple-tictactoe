'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var $ = require("jQuery");


var Square = React.createClass({
  render: function() {
    return (
      <div onClick={this.props.onClick} className="Square">{this.props.data}</div>
    );
  }
});


var TictactoeApp = React.createClass({
  getInitialState() {
    return { player:"O", items:["","","","","","","","",""]};
  },
  render: function() {
  	
    return (
      <div className="TictactoeApp">
      	{
      		this.state.items.map(function(item,index){
				return ( 
					<Square data={item} key={index} onClick={item === "" ? this.onClick : null }> 
					</Square>);
			},this)
      	}
      </div>
    );
  },
  onClick: function(e) {
    var el = $(e.target);
    var positionClicked = el.data('reactid').slice(-1);
    var items = this.state.items.slice();

    items[positionClicked] = this.state.player; 

    this.setState({items:items, player : this.state.player === "O" ? "X" : "O"});

    var result = this.checkWin(items,this.state.player);
    if( result !== "") {
      this.reset();
    } else {
    	var gameEnded = items.reduce(function(prev,cur){
    		return prev && (cur !=="");
    	},true);

    	if(gameEnded) {
    		this.reset();
    	}
    }
  },
  reset: function() {
	this.setState( { player:"O", items:["","","","","","","","",""]} );
  },
  checkWin: function(items,player){

    var combinations = [ {start:0, inc:1 }, //1st row
                         {start:3, inc:1 }, //2nd row
                         {start:6, inc:1 }, //3rd row
                         {start:0, inc:3 }, //1st col
                         {start:1, inc:3 }, //2st col
                         {start:2, inc:3 }, //3st col
                         {start:0, inc:4 }, //main diagonal
                         {start:2, inc:2 }]; //antidiagonal 


    var flag = false;
    for (var i = 0; (i < combinations.length) && (!flag); i++) {
      var pointer = combinations[i].start;
      flag = items[pointer] === player;
      if ( flag ) {
        for (var j = 1; j < 3; j++) {
          pointer += combinations[i].inc;
          flag = flag && items[pointer] === player;
        }
      }
    }
   
    return flag ? player : "";
  }

});













React.render(<TictactoeApp />, document.getElementById('content')); // jshint ignore:line

module.exports = TictactoeApp;
