var React = require('react/addons');
var assert = require('assert');
var should = require('should');
var MainSearchBar = require('../client/src/components/MainSearchBar');
var TestUtils = React.addons.TestUtils;

describe('MainSearchBar', function(){
  before('render and locate element', function() {
    var renderedComponent = TestUtils.renderIntoDocument(
      <MainSearchBar onChange='handleSearchChange'/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    // ??
    this.inputElement = inputComponent.getDOMNode();
  });

  describe('Basic functionality', function() {
    it('<input> should be of type "search"', function() {
      assert(this.inputElement.getAttribute('type') === 'search');
    });

    it('<input> should be empty on initialization', function() {
      assert(this.inputElement.value === '');
    });
  });

});