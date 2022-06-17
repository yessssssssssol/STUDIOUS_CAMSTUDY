import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import { useState } from 'react';
import BoldText from '../common/BoldText';

const CommentAddForm = () => {
  const [content, setContent] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const { name, profileUrl } = user;
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Id를 user_id 변수에 할당함.
    // const userId = Id;

    await Api.post('comment', {
      hostId: userId,
      content,
    });
    const res = await Api.get('commentlist', userId);
    setComments(res.data);
  };

  return (
    <div class="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
      <div class="mt-2">
        <img src={profileUrl} alt="" class="h-16 w-16 m-2 rounded-full" />
      </div>
      <div class="flex">
        <div class="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a href="#" class="text-blue-400 hover:underline">
              {name}
            </a>
          </div>
          <div class="p-1">
            <textarea
              rows="3"
              class="border p-2 rounded w-full"
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div class="flex justify-between mx-3">
            <div>
              <button
                class="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentAddForm;
