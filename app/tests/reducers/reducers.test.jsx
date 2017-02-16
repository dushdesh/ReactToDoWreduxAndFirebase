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
        text: 'thing to do'
      };
      var res = reducers.todosReducer(df([]), df(action))
      
      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
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
    
    it('toggle todo', () => {
      var action = {
        type: 'TOGGLE_TODO',
        id: 121
      };
      var todos = [{
        id: 121,
        completed: false
      }];
      var res = reducers.todosReducer(df(todos), df(action))
      
      expect(res[0].completed).toEqual(true);
      expect(res[0].completedAt).toExist();
    });
  });
});