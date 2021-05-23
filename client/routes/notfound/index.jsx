import React from 'react';
import FancyLink from '#/components/fancy-link';
// import image404 from '#/assets/images/undraw_page_not_found.svg';
import image404 from '#/assets/images/404Image.jpg'
function NotFound() {
  return (
    <div className="overflow-x-hidden">
      <div className="container flex flex-col items-center justify-center mx-auto h-screen">
        <img
          className="mb-12"
          alt="404"
          src={image404}
          style={{ width: 500 }}
        />
        <FancyLink className="font-bold text-xl" to="/">
          Go to homepage
        </FancyLink>
      </div>
    </div>
  );
}

export default NotFound;
