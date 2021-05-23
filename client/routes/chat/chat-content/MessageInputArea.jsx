import React, { Fragment } from 'react';
import uuidv4 from 'uuid/v4';
import * as R from 'ramda';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import MessageTextArea from './MessageTextArea';
import { ChatContext } from '../reducer';
import EmotionHappyIcon from '#/icons/EmotionHappyIcon';
import PopupMenu from '#/components/popup-menu';
import { theme } from '#/../utils';
import './message-input-area.css';

function MessageInputArea() {
  const [state] = React.useContext(ChatContext);
  const [emojiMenuOpen, setEmojiMenuOpen] = React.useState(false);
  const messageInputRef = React.useRef(null);

  const handleBackgroundClick = React.useCallback(() => {
    setEmojiMenuOpen(false);
  }, []);

  const handleEmojiMenuButton = React.useCallback(() => {
    setEmojiMenuOpen(R.not);
  }, []);

  const handleEmojiClick = React.useCallback(
    emoji => {
      messageInputRef.current.value += emoji.native;
    },
    [messageInputRef],
  );

  const displayWhoIsTyping = React.useMemo(
    () =>
      R.compose(
        R.cond([
          [R.isEmpty, () => <>&nbsp;</>],
          [xs => xs.length === 1, person => <>{person} is typing...</>],
          // (length + 1) / 2 counts the number of users typing since
          // the array contains users as well as a string in between.
          // [<>user1</>, " and ", <>user2</>]
          [xs => (xs.length + 1) / 2 <= 3, users => <>{users} are typing...</>],
          [R.T, () => 'Several people are typing...'],
        ]),
        R.map(node => <Fragment key={uuidv4()}>{node}</Fragment>),
        R.intersperse(' and '),
        R.map(username => <span className="font-bold">{username}</span>),
      )(state.whoIsTyping),
    [state.whoIsTyping],
  );

  return (
    <div className="mt-6 mb-1 mx-6">
      <div className="flex items-center -mb-1">
        <div className="rounded-lg bg-gray-200 flex w-full">
          <MessageTextArea messageInputRef={messageInputRef} />
          <button
            className="px-2 text-gray-600 hover:text-gray-700"
            type="button"
            onClick={handleEmojiMenuButton}
          >
            <EmotionHappyIcon className="fill-current" />
          </button>
          <PopupMenu onClose={handleBackgroundClick} isOpen={emojiMenuOpen}>
            <div className="absolute right-0 bottom-0 mb-12 shadow-md">
              <Picker
                set="google"
                emoji=""
                title=""
                onSelect={handleEmojiClick}
                color={theme.colors.blue[500]}
              />
            </div>
          </PopupMenu>
        </div>
      </div>
      <div className="ml-2 text-gray-700 mt-1">{displayWhoIsTyping}</div>
    </div>
  );
}

export default React.memo(MessageInputArea);
