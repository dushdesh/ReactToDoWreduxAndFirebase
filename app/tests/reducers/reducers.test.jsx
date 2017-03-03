var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set search text', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'some search text'
      };
      var res = reducers.searchTextReducer(df(''), df(action))
      
      expect(res).toEqual(action.searchText);
    }); 
  });
  
  describe('showCompletedReducer', () => {
    it('should toggle show comppleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action))
      
      expect(res).toEqual(true);
    }); 
  });
  
  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 111,
          text: 'Something to do',
          completed: false,
          completedAt: undefined,
          createdAt: 3000
        }
      };
      var res = reducers.todosReducer(df([]), df(action))
      
      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });
    
    
    it('should add initial todos', () => {
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
      var state = [{
        id: 110,
        text: 'Something else to do',
        completed: true,
        completedAt: 500,
        createdAt: 400
      }];
      
      var res = reducers.todosReducer(df(state), df(action))
      
      expect(res.length).toEqual(2);
      expect(res).toEqual([...state,...todos]);
    });
    
    it('should update todo', () => {
      var updates = {
        completed: false,
        completedAt: null
      };
      var todos = [{
        id: 121,
        completed: true,
        completedAt: 5000,
        createAt: 300
      }];
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };
      var res = reducers.todosReducer(df(todos), df(action))
      
      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    });
  });
});