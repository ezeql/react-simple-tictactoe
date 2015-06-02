'use strict';

describe('TictactoeApp', function () {
  var React = require('react/addons');
  var TictactoeApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TictactoeApp = require('components/TictactoeApp.js');
    component = React.createElement(TictactoeApp);
  });

  it('should create a new instance of TictactoeApp', function () {
    expect(component).toBeDefined();
  });
});
