import chatReducer from './reducer';
import { getInitialState } from './shared';

jest.useFakeTimers();

describe('Chat reducer', () => {
  const user = {
    email: 'some@email.com',
    username: 'user',
  };

  let initialState;

  beforeEach(() => {
    initialState = getInitialState();
  });

  it('should update the message', () => {
    const state = chatReducer(initialState, {
      type: 'update-message',
      payload: { message: 'hello world', user },
    });

    expect(state.message).toBe('hello world');
  });

  it('should set the typing prop when stop-typing is dispatched', () => {
    const state = chatReducer(
      { ...initialState, isTyping: true },
      { type: 'stop-typing', payload: { user } },
    );

    expect(state.isTyping).toBe(false);
  });

  it('should notify other users when stop-typing is dispatched', () => {
    const state = chatReducer(
      { ...initialState, isTyping: true },
      { type: 'stop-typing', payload: { user } },
    );

    expect(state.socket.emit).toHaveBeenCalled();
  });

  it('should send a message to other users', () => {
    const state = chatReducer(
      { ...initialState, message: 'hello world' },
      { type: 'send-message', payload: { user } },
    );

    expect(state.socket.emit).toHaveBeenCalled();
  });

  it('should clear the message state after sending message', () => {
    const state = chatReducer(
      { ...initialState, message: 'hello world' },
      { type: 'send-message', payload: { user } },
    );

    expect(state.message).toBe('');
  });

  it('should stop typing after sending message', () => {
    const state = chatReducer(
      { ...initialState, message: 'hello world' },
      { type: 'send-message', payload: { user } },
    );

    expect(state.isTyping).toBe(false);
  });

  it('should add to list of messages when recieved', () => {
    const state = chatReducer(initialState, {
      type: 'recieve-message',
      payload: { chatMessage: { user: 'user', message: 'some message' } },
    });

    expect(state.chatMessages).toHaveLength(1);
  });

  it('should add a user to the typing list', () => {
    const state = chatReducer(initialState, {
      type: 'add-user-typing',
      payload: { username: 'user' },
    });

    expect(state.whoIsTyping).toHaveLength(1);
    expect(state.whoIsTyping[0]).toBe('user');
  });

  it('should not add a duplicate user to the typing list', () => {
    const state = chatReducer(
      { ...initialState, whoIsTyping: ['user', 'user2'] },
      {
        type: 'add-user-typing',
        payload: { username: 'user' },
      },
    );

    expect(state.whoIsTyping).toHaveLength(2);
  });

  it('should remove a user from the typing list', () => {
    const state = chatReducer(
      { ...initialState, whoIsTyping: ['user', 'user2'] },
      {
        type: 'remove-user-typing',
        payload: { username: 'user' },
      },
    );

    expect(state.whoIsTyping).toHaveLength(1);
    expect(state.whoIsTyping[0]).toBe('user2');
  });
});
