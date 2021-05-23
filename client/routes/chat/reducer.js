import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import produce from 'immer';

export const ChatContext = React.createContext(null);

export function init() {
  // reducer returns updated state and an eventual effect.
  // inspired by how Elm handles effects:
  // https://guide.elm-lang.org/effects/http.html
  return {
    state: {
      socket: io(),
      channels: [],
      whoIsTyping: [],
      chatMessages: [],
      typingTimeout: undefined,
      currentChannel: undefined,
      isTyping: false,
      contentShouldScrollDown: false,
      channelFetchError: false,
    },
    performEffect: dispatch => {
      dispatch({ type: 'fetch-channels' });
    },
  };
}

/* eslint-disable no-param-reassign */
function chatReducer(prev, action) {
  const prevState = prev.state;

  return produce(prev, draft => {
    const { payload } = action;
    const { socket } = draft.state;

    draft.state.contentShouldScrollDown = false;
    draft.performEffect = undefined;

    // eslint-disable-next-line default-case
    switch (action.type) {
      // get a list of all channels a user can join
      case 'fetch-channels':
        draft.state.channelFetchError = false;

        draft.performEffect = dispatch => {
          axios
            .get('/api/chat-channels')
            .then(response => response.data.chatChannels)
            .then(channels =>
              dispatch({ type: 'set-channels', payload: { channels } }),
            )
            .catch(() => dispatch({ type: 'channel-list-fetch-error' }));
        };
        break;

      // after fetch-channels: set the list of channels
      case 'set-channels':
        draft.state.channels = payload.channels;
        break;

      // after fetch-channels: update state after fetch error
      case 'channel-list-fetch-error':
        draft.state.channelFetchError = true;
        break;

      // user chooses a channel from the sidebar
      case 'change-channel':
        if (!socket) {
          break;
        }

        Object.assign(draft.state, {
          message: '',
          isTyping: false,
          typingTimeout: undefined,
          currentChannel:
            draft.state.currentChannel &&
            draft.state.currentChannel._id === payload.channel._id
              ? undefined
              : payload.channel,
          chatMessages: [],
          whoIsTyping: [],
        });

        draft.performEffect = () => {
          clearTimeout(prevState.typingTimeout);
          socket.emit('join channel', payload.channel._id);

          if (prevState.currentChannel) {
            socket.emit('stop typing', {
              username: payload.user.username,
              channelId: prevState.currentChannel._id,
            });

            socket.emit('leave channel', prevState.currentChannel._id);
          }
        };

        break;

      // user starts typing on text message input. emit "user is
      // typing" message and start a timeout that will remove "user
      // is typing" message
      case 'start-typing':
        if (!socket) {
          break;
        }

        draft.state.isTyping = true;

        draft.performEffect = dispatch => {
          dispatch({
            type: 'set-typing-timeout',
            payload: {
              timeout: setTimeout(() => {
                dispatch({
                  type: 'stop-typing',
                  payload: { user: payload.user },
                });
              }, 4000),
            },
          });

          if (!prevState.isTyping) {
            socket.emit('start typing', {
              username: payload.user.username,
              channelId: prevState.currentChannel._id,
            });
          }

          clearTimeout(prevState.typingTimeout);
        };

        break;

      // this action is used to perform setTimeout without making a
      // side effect on state update
      case 'set-typing-timeout':
        draft.state.typingTimeout = payload.timeout;
        break;

      // after timeout: emit "stop typing" to all users.
      case 'stop-typing':
        if (!socket) {
          break;
        }

        draft.state.isTyping = false;

        draft.performEffect = () => {
          clearTimeout(prevState.typingTimeout);

          socket.emit('stop typing', {
            username: payload.user.username,
            channelId: prevState.currentChannel._id,
          });
        };

        break;

      // send a chat message to users in the channel. this will also
      // save the same message to the database
      case 'send-message':
        if (!socket || !payload.message) {
          break;
        }

        draft.state.isTyping = false;

        draft.performEffect = () => {
          clearTimeout(prevState.typingTimeout);

          socket.emit('chat message', {
            user: payload.user,
            message: payload.message,
            channelId: prevState.currentChannel._id,
          });

          socket.emit('stop typing', {
            username: payload.user.username,
            channelId: prevState.currentChannel._id,
          });
        };

        break;

      // action used when joining channel and on a new message
      case 'scroll-chat-to-bottom':
        draft.state.contentShouldScrollDown = true;
        break;

      // add live message recieved to the current state. this is okay
      // since messages that are stale (not recieved through
      // websocket) are fetched from the database instead.
      case 'recieve-message':
        draft.state.chatMessages.push(payload.chatMessage);
        draft.state.contentShouldScrollDown = true;
        break;

      // add user to the "user is typing" section
      case 'add-user-typing':
        draft.state.whoIsTyping.push(payload.username);
        break;

      // remove user to the "user is typing" section
      case 'remove-user-typing': {
        const index = prevState.whoIsTyping.indexOf(payload.username);

        if (index !== -1) {
          draft.state.whoIsTyping.splice(index, 1);
        }

        break;
      }
    }
  });
}
/* eslint-enable no-param-reassign */

export default chatReducer;
