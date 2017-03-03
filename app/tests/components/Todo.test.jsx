var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
import * as actions from 'actions';
import {Todo} from 'Todo';

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
    var action = actions.startToggleTodo(todo.id, !todo.completed);
    
    var spy = expect.createSpy();
    var todo = TestUtils.renderIntoDocument(<Todo {...todo} dispatch={spy}/>);
    
    var $el = $(ReactDOM.findDOMNode(todo));
    TestUtils.Simulate.click($el[0]);
    
    expect(spy).toHaveBeenCalledWith(action);
  });
  
});