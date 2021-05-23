import React from 'react';
import ContentContainer from './ContentContainer';
import styles from './content-loading.module.css';

function ContentLoading() {
  return (
    <ContentContainer>
      <div className="flex flex-grow justify-center items-center">
        <h1 className="text-2xl text-gray-700">Loading...</h1>
        <div
          className={`w-48 h-48 flex justify-center items-center ${
            styles['spinner-parent']
          }`}
        >
          <div
            className={`rounded-full w-20 h-20 bg-blue-200 ${styles.spinner}`}
          />
        </div>
      </div>
    </ContentContainer>
  );
}

export default ContentLoading;
