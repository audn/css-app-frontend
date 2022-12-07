import React from 'react';
import { Button } from '../../Buttons';
import Link from '../Link';
import Modal from '../Modal';

function NotLoggedInModal() {
  return (
    <Modal
      open={true}
      className="max-w-xs"
      options={{ mobile: { position: 'center' } }}
    >
      <React.Fragment>
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-types-150">
            <i className="text-2xl fa-regular fa-sign-in-alt" />
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="justify-center text-xl font-bold text-center text-white">
            Not signed in :(
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-3 text-center">
          You need to login in order to access this page, sorry!
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/twitter`}
            className="mt-8"
          >
            <Button.White
              title="Sign in with Twitter"
              icon={'fa-brands fa-twitter'}
              className="w-full !py-3 !text-white bg-blue-500"
            />
          </Link>
        </div>
      </React.Fragment>
    </Modal>
  );
}

export default NotLoggedInModal;
