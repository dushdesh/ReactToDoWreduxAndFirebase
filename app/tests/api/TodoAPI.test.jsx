var expect = require('expect');
var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('todos'); 
  });
  
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });
  
  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var todos = [{
        id: '11',
        text: 'abc',
        completed: false
      }];
      TodoAPI.setTodos(todos);
      
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      
      expect(actualTodos).toEqual(todos);
    });
    
    it('should not set invalid todos array', () => {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);
      
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });
  
  describe('getTodos', () => {
    it('should return empty array for inalid localStorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });
    
    it('should return valid array for valid localStirage data', () => {
      var todos = [{
        id: '11',
        text: 'abc',
        completed: false
      }];
      
      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoAPI.getTodos('todos');
      
      expect(actualTodos).toEqual(todos);
    });
  });
  
  describe('filteredTodos', () => {
    var todos = [{
      id: 1,
      text: 'abc',
      completed: true
    }, {
      id: 2,
      text: 'def',
      completed: false
    }, {
      id: 3,
      text: 'ghi',
      completed: true
    }];
    
    it('should return all items if showCompleted is true', () => {
      var fiteredTodos = TodoAPI.filteredTodos(todos, true, '');
      expect(fiteredTodos.length).toBe(3);
    });
    
    it('should return non completed todos if showCompleted is false', () => {
      var fiteredTodos = TodoAPI.filteredTodos(todos, false, '');
      expect(fiteredTodos.length).toBe(1);
    });
    
    it('should sort by completed status', () => {
      var fiteredTodos = TodoAPI.filteredTodos(todos, true, '');
      expect(fiteredTodos[0].completed).toBe(false);
    });
    
    it('should filter todos by search text', () => {
      var fiteredTodos = TodoAPI.filteredTodos(todos, true, 'ef');
      expect(fiteredTodos.length).toBe(1);
    });
    
    it('should return all items if no search text', () => {
      var fiteredTodos = TodoAPI.filteredTodos(todos, true, '');
      expect(fiteredTodos.length).toBe(3);
    });
    
  });
  
});