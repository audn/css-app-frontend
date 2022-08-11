import { Button } from '../../../components/Buttons';
import Animate from '../../../components/layout/Animate';
import Bravo from '../../../components/layout/headings/Bravo';
import P from '../../../components/layout/headings/P';
import { fadeIn } from '../../../utils/data/animations';

function Login() {
  return (
    <Animate variants={fadeIn} className="flex flex-col items-center ">
      <div className="flex flex-col items-center p-8 px-12 rounded-2xl bg-types-100">
        <Bravo>Let the brainstorming begin!</Bravo>
        <P className="mb-8 text-lg text-on-150">
          Do you have an idea of what css.app can be built into?
        </P>
        <Button.TwitterAuth />
      </div>
    </Animate>
  );
}

export default Login;
