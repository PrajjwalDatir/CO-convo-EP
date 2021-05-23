import React from 'react';
import { Link } from 'react-router-dom';
import Button from '#/components/button';
import { UserContext } from '#/Provider';

function HomeActionButtons() {
  const [user] = React.useContext(UserContext);

  const primaryButtonClasses =
    'bg-blue-500 hover:bg-blue-800 text-gray-100 px-8 font-bold';

  if (user) {
    return (
      <Link to="/chat">
        <Button className={primaryButtonClasses} overrideColors>
          Start Chatting
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Link to="/register">
        <Button className="mr-6 px-8 font-bold">Sign Up</Button>
      </Link>
      <Link to="/login">
        <Button className={primaryButtonClasses} overrideColors>
          Log in
        </Button>
      </Link>
    </>
  );
}

export default HomeActionButtons;
