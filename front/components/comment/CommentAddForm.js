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
    <div class="flex justify-center items-center">
      <div class=" bg-white p-2 pt-4 rounded shadow-lg">
        <div class="flex ml-3">
          <div class="mr-3">
            <img src={profileUrl} alt="" class="h-16 w-16 m-2 rounded-full" />
          </div>
          <div>
            <BoldText text={name} />
          </div>
        </div>

        <div class="mt-3 p-3 w-full">
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
  );
};

export default CommentAddForm;
