var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
var {Todo} = require('Todo');

describe('Todo', ()=> {
  it('should exist', () => {
    expect(Todo).toExist();  
  });
  
  it('should dipatch toggleTodo action on click', () => {
    var todo = {
      id: 11,
      text: 'abc',
      completed: true
    };
    
    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todo} dispatch={spy}/>);
    
    var $el = $(ReactDOM.findDOMNode(todo));
    TestUtils.Simulate.click($el[0]);
    
    expect(spy).toHaveBeenCalledWith({
      type: 'TOGGLE_TODO',
      id: 11
    });
  });
  
});