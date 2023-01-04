import { NextSeo } from 'next-seo';
import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '../../common/components/Buttons';
import { Form } from '../../common/components/Form';
import LoadingIcon from '../../common/components/misc/LoadingIcon';
import { DefaultLayout } from '../../common/layouts/Default';
import { API } from '../../common/lib/interfaces';
import useAuthState from '../../common/store/auth';
import { editUser } from '../../common/utils/hooks/api/user';

function UserSettings() {
  const user = useAuthState((s) => s.user);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [data, setData] = useState<Partial<API.Models.User>>(user);
  const unsavedChanges = JSON.stringify(user) !== JSON.stringify(data);

  useEffect(() => {
    setData(user);
  }, [user]);

  const update = (key: keyof API.Models.User, value: string | boolean) => {
    setData((d) => ({
      ...d,
      [key]: value,
    }));
  };
  async function saveChanges(event: SyntheticEvent) {
    event.preventDefault();
    const msg = toast.loading('Saving...');
    setIsSaving(true);

    const { error } = await editUser(user.id!, data as any);
    if (!error) {
      toast.success('Saved!', { id: msg });
    } else {
      toast.error(JSON.stringify(error), { id: msg });
    }
    setIsSaving(false);
  }

  return (
    <DefaultLayout className="max-w-4xl mx-auto">
      <NextSeo title="Profile Settings" />
      <div className="overflow-hidden border rounded-md bg-types-100 border-types-150">
        <div className="p-4 px-6 border-b border-types-150">
          <div className="flex flex-col">
            <h1 className="mb-1 text-lg font-semibold text-white">Account</h1>
            <h3>Change your public information.</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center p-4 mb-4 text-sm text-white bg-blue-500 rounded-md bg-opacity-20">
            <div className="flex mr-4">
              <i className="text-2xl text-blue-500 fa-brands fa-twitter" />
            </div>
            <div className="flex items-center">
              This account is connected to your Twitter account{' '}
              <span className="font-semibold contents">{user.username}</span>.
              Some of your details such as profile picture can only be changed
              from Twitter.
            </div>
          </div>
          <Form.Wrapper column={true}>
            <Form.Input
              inputClassName=""
              label="Display Name"
              placeholder={'Display Name'}
              onChange={(val) => update('displayName', val)}
              id="displayName"
              value={data.displayName}
            />
            <Form.Textarea
              label="Bio"
              placeholder={'Biography'}
              onChange={(val) => update('bio', val)}
              id="bio"
              value={data.bio}
            />
          </Form.Wrapper>
          <Button.Wrapper className="justify-end mt-3">
            <Button.Primary
              title={isSaving ? <LoadingIcon /> : 'Save'}
              onClick={saveChanges}
              disabled={!unsavedChanges || isSaving}
            />
          </Button.Wrapper>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default UserSettings;
