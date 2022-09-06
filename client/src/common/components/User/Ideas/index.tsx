import { User } from '../../../lib/interfaces';
import { fadeIn } from '../../../utils/data/animations';
import IdeaCard from '../../IdeaCard';
import Animate from '../../layout/Animate';

function UserIdeas({ user }: { user?: User.User }) {
  return (
    <Animate variants={fadeIn} className="grid grid-cols-1 gap-5">
      {user?.ideas?.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </Animate>
  );
}

export default UserIdeas;
