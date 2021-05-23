import React from "react";
import axios from "axios";
import { ChatContext } from "../reducer";
import MessageInputArea from "./MessageInputArea";
import ChatMessage from "./ChatMessage";
import ContentNoChannel from "./ContentNoChannel";
import ContentLoading from "./ContentLoading";
import ContentError from "./ContentError";
import ContentContainer from "./ContentContainer";
import ChatIcon from "#/icons/ChatIcon";

function ChatContent() {
  const [state, dispatch] = React.useContext(ChatContext);
  // either chatchannel or error object
  const [channelData, setChannelData] = React.useState(undefined);
  // reference to messages container. it's used to set scroll position
  const chatMessagesRef = React.useRef(null);

  React.useEffect(() => {
    if (state.contentShouldScrollDown && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [state.contentShouldScrollDown]);

  React.useEffect(() => {
    setChannelData(undefined);

    // if a channel is selected, fetch the channel data.
    if (state.currentChannel) {
      axios
        .get(`/api/chat-channels/${state.currentChannel._id}?limit=9999`)
        .then((response) => response.data)
        .then((data) => data.chatChannel)
        .then(setChannelData)
        .then(() => dispatch({ type: "scroll-chat-to-bottom" }))
        .catch(() => setChannelData(new Error("A server error has occurred.")));
    }
  }, [state.currentChannel, dispatch]);

  if (!state.currentChannel) {
    return <ContentNoChannel />;
  }

  if (!channelData) {
    return <ContentLoading />;
  }

  if (channelData instanceof Error) {
    return <ContentError />;
  }

  return (
    <ContentContainer direction="flex-col">
      <div className="mt-4 mb-1 mx-6">
        <h1 className="text-xl font-bold text-gray-900">
          <ChatIcon className="fill-current inline mr-4 text-gray-700" />
          {channelData.name}
        </h1>
      </div>
      <hr />
      <div className="flex-grow px-6 overflow-y-scroll" ref={chatMessagesRef}>
        <div className="relative">
          <div className="absolute py-4 w-full break-words pr-24">
            {channelData.messages &&
              channelData.messages.map((chatMessage) => (
                <ChatMessage key={chatMessage._id} message={chatMessage} />
              ))}
            {state.chatMessages.map((chatMessage) => (
              <ChatMessage key={chatMessage._id} message={chatMessage} />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <MessageInputArea />
    </ContentContainer>
  );
}

export default React.memo(ChatContent);
