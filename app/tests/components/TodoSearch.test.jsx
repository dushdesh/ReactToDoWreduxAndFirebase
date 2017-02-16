var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
import {TodoSearch} from 'TodoSearch'

describe('TodoSearch', () => {
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });
  
  it('should call onSearch with the entered input text', () => {
    var searchText = 'abc';
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    todoSearch.refs.searchText.value = searchText;
    
    TestUtils.Simulate.change(todoSearch.refs.searchText);
    expect(spy).toHaveBeenCalledWith({
      type: 'SET_SEARCH_TEXT',
      searchText
    });
  });
  
  it('should call onSearch with proper checked value', () => {
    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    todoSearch.refs.showCompleted.checked = true;
    
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_SHOW_COMPLETED'
    });
  });
});