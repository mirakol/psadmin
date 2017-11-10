$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');

var App = console.log('Hello World from Browserify');

React.render(<Home />, document.getElementById('app'));