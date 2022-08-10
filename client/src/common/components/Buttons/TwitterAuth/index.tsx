import { Button } from '../../../lib/interfaces';
import concat from '../../../utils/helpers/concat';

function TwitterAuth({ className }: Button.Base) {
  return (
    <a
      href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dTdacThkLVZER0pCZkZ6SklUTjI6MTpjaQ&redirect_uri=http://localhost:4000/auth/twitter/callback&scope=tweet.read%20users.read%20follows.read&state=state&code_challenge=challenge&code_challenge_method=plain"
      className={concat(
        className ? className : '',
        'flex items-center justify-start px-8 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 animate ring-0 focus:ring-types-150 focus:ring-4 ',
      )}
    >
      <i className="mr-2 fa-brands fa-twitter" /> Sign in with Twitter
    </a>
  );
}

export default TwitterAuth;
