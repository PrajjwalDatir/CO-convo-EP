import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import * as R from "ramda";
import SidebarChannelButton from "./SidebarChannelButton";
import NewChannelModal from "./NewChannelModal";
// import { UserContext } from "#/Provider";
import PopupMenu from "#/components/popup-menu";
import UserIcon from "#/icons/UserIcon";
import PlusIcon from "#/icons/PlusIcon";

function ChatChannelSidebar({ channels, groupType }) {
  // const [user, setUser] = React.useContext(UserContext);
  // modal visibilty state for adding a new channel
  const [newChannelMenuOpen, setNewChannelMenuOpen] = React.useState(false);
  // menu visibilty state when user clicks on their username
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const history = useHistory();

  // close menu when user clicks outside of menu
  const handleBackgroundClick = React.useCallback(() => {
    setNewChannelMenuOpen(false);
    // setUserMenuOpen(false);
  }, []);

  const handleNewChannelMenuClick = React.useCallback(() => {
    setNewChannelMenuOpen(R.not);
  }, []);

  const handleUserButtonClick = React.useCallback(() => {
    setUserMenuOpen(R.not);
  }, []);

  // remove user from localStorage and go to homepage
  // const handleSignoutClick = React.useCallback(() => {
  //   setUser(null);
  //   history.push("/");
  // }, [setUser, history]);

  return (
    <div className="max-h-screen-85 w-64 px-2 mr-4 mt-16 overflow-y-auto">
      <div className="relative">
        <div className="absolute w-full py-12">
          {/* <button
            className="w-full hover:bg-gray-200 rounded-lg p-1 pl-2"
            type="button"
            onClick={handleUserButtonClick}
          >
            <div className="flex items-center">
              <UserIcon className="fill-current text-gray-600" />
              <span className="ml-4 font-bold text-lg text-gray-900">
                {user && user.username}
              </span>
            </div>
          </button>
          <PopupMenu onClose={handleBackgroundClick} isOpen={userMenuOpen}>
            <div className="absolute mt-2 bg-white rounded py-4 shadow-md">
              <button
                className="px-8 py-1 hover:bg-blue-100 hover:text-blue-700"
                type="button"
                onClick={handleSignoutClick}
              >
                Sign out
              </button>
            </div>
          </PopupMenu> */}
          <div className="text-gray-700 font-bold">
            <div className="mb-2 uppercase tracking-wide text-xs">Chats</div>
            <div className="w-full">
              {channels.map((channel) => (
                <SidebarChannelButton
                  key={channel._id}
                  channel={channel}
                  groupType={groupType}
                />
              ))}
            </div>
            <div className="mt-8">
              <button
                type="button"
                className="block w-full flex items-center rounded-lg hover:bg-gray-200 text-gray-700 hover:text-gray-900 p-1"
                onClick={handleNewChannelMenuClick}
              >
                <PlusIcon className="fill-current text-gray-600 mr-1" />
                New Chat
              </button>
              <div className="font-normal">
                <NewChannelModal
                  isOpen={newChannelMenuOpen}
                  onClose={handleBackgroundClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChatChannelSidebar.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

ChatChannelSidebar.defaultProps = {
  channels: [],
};

export default React.memo(ChatChannelSidebar);
