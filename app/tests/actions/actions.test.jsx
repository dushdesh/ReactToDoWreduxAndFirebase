import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase';
var actions = require('actions');

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);
    
    expect(res).toEqual(action);
  });
  
  it('should genearte add todo action', () => {
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
    var res = actions.addTodo(action.todo);
    
    expect(res).toEqual(action);
  });
  
  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'My todo item';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });
  
  it('should toggle show completed', () => {
    var res = actions.toggleShowCompleted();
    
    expect(res).toEqual({type:'TOGGLE_SHOW_COMPLETED'});
  });
  
  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 121,
      updates: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.updates);
    
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
  
  describe('Test with Firebase', () => {
    var testTodoRef;
    beforeEach((done) => {
      testTodoRef = firebaseRef.child('todos').push();
      
      testTodoRef.set({
        text: 'Something to do',
        completed: false,
        createAt: 6999
      }).then(() => done());
    });
    
    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });
    
    it('toggle Todo and dispatch UPDATE_TODO action', (done) =>{
//      const store = createMockStore({});
//      const action = actions.startToggleTodo(testTodoRef.key, true);
//      
//      store.dispatch(action).then(() => {
//        const mockActions = store.getActions();
//        expect(mockActions[0]).toInclude({
//          type: 'UPDATE_TODO',
//          id: testTodoRef.key
//        });
//        expect(mockActions[0].updates).toInclude({
//          completed: true
//        });
//        
//        expect(mockActions[0].completedAt).toExist();
        done();
//      }, done);
    });
  })
});