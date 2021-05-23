import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ChatContent from "./chat-content/ChatContent";
import ChatChannelSidebar from "./sidebar/ChatChannelSidebar";
import chatReducer, { ChatContext, init } from "./reducer";
import { UserContext } from "#/Provider";
import useEffectOnce from "#/hooks/useEffectOnce";
import AppBarView from "./appBar/appBar";
import TreeView from "../treeView/treeView";
import FAB from "../treeView/floatingActionButton";

function Chat() {
  const [{ state, performEffect }, dispatch] = React.useReducer(
    chatReducer,
    undefined,
    init
  );
  const history = useHistory();
  const [user] = React.useContext(UserContext);

  // subscribe to socket emit events
  useEffectOnce(() => {
    const { socket } = state;

    // handle chat messages
    socket.on("chat message", (chatMessage) =>
      dispatch({ type: "recieve-message", payload: { chatMessage } })
    );

    // handle "user is typing"
    socket.on("start typing", (username) =>
      dispatch({ type: "add-user-typing", payload: { username } })
    );

    // remove "user is typing"
    socket.on("stop typing", (username) =>
      dispatch({ type: "remove-user-typing", payload: { username } })
    );

    return socket.close.bind(socket);
  });

  // go to login page if user is logged out
  useEffectOnce(() => {
    if (!user) {
      history.replace("/login");
    }
  }, [history, user]);

  // perform side effect after state update
  React.useEffect(() => {
    if (performEffect) {
      performEffect(dispatch);
    }
  }, [dispatch, performEffect]);

  const chatContextValue = React.useMemo(() => [state, dispatch], [state]);

  const [treeViewVisible, setTreeViewVisible] = useState(false);

  const [groupType, setGroupType] = useState(0);

  return (
    <div>
      <AppBarView groupType={groupType} setGroupType={setGroupType} />
      <ChatContext.Provider value={chatContextValue}>
        <div className="flex">
          <ChatChannelSidebar channels={state.channels} groupType={groupType} />

          <div className="h-screen-85 mt-20 mr-4 flex flex-grow">
            {treeViewVisible ? (
              <TreeView
                setTreeViewVisible={setTreeViewVisible}
                channels={state.channels}
                groupType={groupType}
              />
            ) : (
              <ChatContent />
            )}
          </div>
        </div>
        <FAB
          treeViewVisible={treeViewVisible}
          setTreeViewVisible={setTreeViewVisible}
        />
      </ChatContext.Provider>
    </div>
  );
}

export default Chat;
