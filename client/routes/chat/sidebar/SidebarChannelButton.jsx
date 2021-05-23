import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";
import { ChatContext } from "../reducer";
import { UserContext } from "#/Provider";

function SidebarChannelButton({ channel, groupType }) {
  const [state, dispatch] = React.useContext(ChatContext);
  const [user] = React.useContext(UserContext);

  const changeChannel = React.useCallback(
    () => dispatch({ type: "change-channel", payload: { channel, user } }),
    [dispatch, user, channel]
  );

  return groupType === 0 ? (
    <button
      className={`block w-full text-left p-1 pl-4 rounded-lg truncate font-bold ${
        state.currentChannel && state.currentChannel._id === channel._id
          ? "text-blue-700 hover:text-blue-900 bg-blue-100"
          : "hover:text-gray-900 hover:bg-gray-200"
      }`}
      type="button"
      onClick={state.fetchingChannel ? R.always() : changeChannel}
    >
      {channel.name}
    </button>
  ) : groupType === 1 && channel.groupType === 1 ? (
    <button
      className={`block w-full text-left p-1 pl-4 rounded-lg truncate font-bold ${
        state.currentChannel && state.currentChannel._id === channel._id
          ? "text-blue-700 hover:text-blue-900 bg-blue-100"
          : "hover:text-gray-900 hover:bg-gray-200"
      }`}
      type="button"
      onClick={state.fetchingChannel ? R.always() : changeChannel}
    >
      {channel.name}
    </button>
  ) : groupType === 2 && channel.groupType === 2 ? (
    <button
      className={`block w-full text-left p-1 pl-4 rounded-lg truncate font-bold ${
        state.currentChannel && state.currentChannel._id === channel._id
          ? "text-blue-700 hover:text-blue-900 bg-blue-100"
          : "hover:text-gray-900 hover:bg-gray-200"
      }`}
      type="button"
      onClick={state.fetchingChannel ? R.always() : changeChannel}
    >
      {channel.name}
    </button>
  ) : (
    <></>
  );
}

SidebarChannelButton.propTypes = {
  channel: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    groupType: PropTypes.number,
  }).isRequired,
};

export default React.memo(SidebarChannelButton);
