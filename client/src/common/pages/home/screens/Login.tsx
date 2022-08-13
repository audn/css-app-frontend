import { Button } from '../../../components/Buttons';
import Animate from '../../../components/layout/Animate';
import Alpha from '../../../components/layout/headings/Alpha';
import Charlie from '../../../components/layout/headings/Charlie';
import { fadeIn } from '../../../utils/data/animations';

function Login() {
  return (
    <Animate variants={fadeIn} className="flex flex-col items-center ">
      <div className="flex flex-col items-center p-6 text-center sm:p-8 sm:px-12 rounded-2xl">
        <Alpha>Brainstorm ideas!</Alpha>
        <Charlie className="mb-8 !font-medium !text-lg text-on-100">
          Do you have an idea of what css.app can be built into?
        </Charlie>
        <Button.TwitterAuth />
      </div>
    </Animate>
  );
}

export default Login;
