import React from 'react';
import PropTypes from 'prop-types';
import 'emoji-mart/css/emoji-mart.css';
import { ChatContext } from '../reducer';
import { UserContext } from '#/Provider';

const textareaStyle = { maxHeight: '16em' };

function MessageTextArea({ messageInputRef }) {
  const [, dispatch] = React.useContext(ChatContext);
  const [user] = React.useContext(UserContext);

  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault();

      dispatch({
        type: 'send-message',
        payload: { user, message: messageInputRef.current.value.trim() },
      });

      // eslint-disable-next-line no-param-reassign
      messageInputRef.current.value = '';
    },
    [dispatch, user, messageInputRef],
  );

  const handleMessageKeyDown = React.useCallback(
    event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        handleSubmit(event);
      }
    },
    [handleSubmit],
  );

  const handleMessageChange = React.useCallback(() => {
    dispatch({ type: 'start-typing', payload: { user } });
  }, [dispatch, user]);

  React.useEffect(() => {
    const inputElem = messageInputRef.current;

    if (inputElem) {
      inputElem.style.height = 'auto'; // shrink before growing
      inputElem.style.height = `${inputElem.scrollHeight}px`;
    }
  });

  return (
    <form className="flex flex-grow mr-4" onSubmit={handleSubmit}>
      <label className="w-full flex items-center" htmlFor="message-input">
        <div className="sr-only">Send a message</div>
        <textarea
          className={[
            'bg-gray-200',
            'w-full',
            'placeholder-gray-800',
            'resize-none',
            'outline-none',
            'overflow-y-auto',
            'overflow-x-hidden',
            'px-3',
            'py-2',
            'rounded-l-lg',
          ].join(' ')}
          style={textareaStyle}
          id="message-input"
          rows="1"
          placeholder="Send a message"
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
          autoComplete="off"
          ref={messageInputRef}
        />
      </label>
    </form>
  );
}

MessageTextArea.propTypes = {
  messageInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

MessageTextArea.defaultProps = {
  messageInputRef: React.createRef(),
};

export default React.memo(MessageTextArea);
