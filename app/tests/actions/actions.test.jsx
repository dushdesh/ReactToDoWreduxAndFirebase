var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);
    
    expect(res).toEqual(action);
  });
  
  it('should add todo text', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Some todo text'
    };
    var res = actions.addTodo(action.text);
    
    expect(res).toEqual(action);
  });
  
  it('should toggle show completed', () => {
    var res = actions.toggleShowCompleted();
    
    expect(res).toEqual({type:'TOGGLE_SHOW_COMPLETED'});
  });
  
  it('should toggle todo', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 121
    };
    var res = actions.toggleTodo(action.id);
    
    expect(res).toEqual(action);
  });
  
  it('should add todos', () => {
    var todos = [{
      id: 111,
      text: 'Something to do',
      completed: false,
      completedAt: undefined,
      createdAt: 3000
    }];
    
    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var res = actions.addTodos(todos);
    
    expect(res).toEqual(action);
  });
});