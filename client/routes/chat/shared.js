// eslint-disable-next-line import/prefer-default-export
export function getInitialState() {
  return {
    socket: {
      emit: jest.fn(),
    },
    channels: [],
    whoIsTyping: [],
    chatMessages: [],
    typingTimeout: undefined,
    currentChannel: undefined,
    isTyping: false,
    fetchingChannel: false,
    contentShouldScrollDown: false,
  };
}
