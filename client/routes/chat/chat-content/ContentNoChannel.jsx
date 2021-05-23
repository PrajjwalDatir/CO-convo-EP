import React from "react";
import ContentContainer from "./ContentContainer";
import noChannelsImage from "#/assets/images/undraw_messaging_app.svg";

function ContentNoChannel() {
  return (
    <ContentContainer>
      <div className="relative flex flex-grow items-center overflow-hidden">
        {/* <img
          className="absolute opacity-0 select-none right-0"
          alt="Chat Icon"
          src={noChannelsImage}
        /> */}
        <div className="mx-12 mb-8 z-10">
          <h1
            className="text-5xl whitespace-normal leading-tight font-bold"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            No chat selected
          </h1>
          <p className="text-gray-700 text-xl mt-4">
            To start chatting, join or create a group from the sidebar
          </p>
        </div>
      </div>
    </ContentContainer>
  );
}

export default ContentNoChannel;
