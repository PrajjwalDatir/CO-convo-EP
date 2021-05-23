import React from 'react';
import ContentContainer from './ContentContainer';
import channelErrorImage from '#/assets/images/undraw_lost.svg';

function ContentError() {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="ml-8">
          <h1
            className="text-5xl whitespace-normal leading-tight font-bold"
            style={{ fontFamily: 'Raleway, sans-serif' }}
          >
            A server error has occurred.
          </h1>
          <p className="text-gray-700 text-xl mt-2 mb-5">
            Please try again later
          </p>
        </div>
        <img
          className="w-3/5"
          alt="Man looking at map"
          src={channelErrorImage}
        />
      </div>
    </ContentContainer>
  );
}

export default ContentError;
