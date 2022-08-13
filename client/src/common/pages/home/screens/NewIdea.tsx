import { useAuthState } from '../../../../store/auth';
import { Button } from '../../../components/Buttons';
import { Form } from '../../../components/Form';
import Animate from '../../../components/layout/Animate';
import Alpha from '../../../components/layout/headings/Alpha';
import { User } from '../../../components/User';
import { fadeIn } from '../../../utils/data/animations';
import { onPostIdea } from '../services';
import { useHomeState } from '../store';

function NewIdea() {
  const { currentUser } = useAuthState((s) => ({
    isLoggedIn: s.isLoggedIn,
    currentUser: s.user,
  }));
  const { message, ideas, error, isPosting } = useHomeState();

  return (
    <Animate
      variants={fadeIn}
      className="max-w-2xl mx-auto text-center sm:text-left"
    >
      <Alpha>Hey, {currentUser.name}👋</Alpha>
      <div className="flex mt-12">
        <User.Avatar
          user={currentUser}
          className="!w-10 !h-10 sm:!w-12 sm:!h-12 hidden sm:flex"
        />
        <div className="flex flex-col items-end w-full sm:ml-4">
          <Form.Textarea
            id="message"
            value={message}
            onChange={(message) => useHomeState.setState({ message })}
            error={error}
            placeholder="Your idea"
          />
          <Button.Primary
            label="Post idea"
            layoutClass="w-full sm:w-auto"
            className="w-full"
            onClick={(event) => onPostIdea({ event, message, ideas })}
            disabled={message.length < 10}
            isLoading={isPosting}
          />
        </div>
      </div>
    </Animate>
  );
}

export default NewIdea;
