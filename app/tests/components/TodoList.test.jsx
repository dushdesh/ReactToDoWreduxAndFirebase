var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var {Provider} = require('react-redux');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');
import ConnectedTodoList, {TodoList} from 'TodoList'
import ConnectedTodo, {Todo} from 'Todo'
import {configure} from 'configureStore'

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });
  
  it('should render one todo component for each todo item', () => {
    var todos = [
      {
        id: 1,
        text: 'Do something',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      } , {
        id: 2,
        text: 'Do anything',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      }
    ];
    
    var store = configure({todos});
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);
    
    expect(todoComponents.length).toBe(todos.length);
  });
  
  it('should render a message if no todos', () => {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var $el = $(ReactDOM.findDOMNode(todoList));
    
    expect($el.find('.container__message').length).toBe(1);
  });
});