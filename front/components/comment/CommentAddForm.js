import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import { useEffect, useState } from 'react';

const CommentAddForm = ({ roomId, setComments, writerId }) => {
  const [content, setContent] = useState('');
  const [wirterId, setWriterId] = useState('');
  const [user, setUser] = useState();
  const useratom = useRecoilValue(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // roomId를 user_id 변수에 할당함.
    // const userName = writeId;

    await Api.post('comment', {
      // writerId,
      roomId,
      content,
      // createdAt,
    });
    const res = await Api.get('comments', roomId);
    setComments(res.data);
  };
  useEffect(() => {
    setUser(useratom);
  }, [user]);
  return (
    <>
      {user && (
        <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
          <div className="mt-2">
            <img
              src={user.profileUrl}
              alt=""
              className="h-16 w-16 m-2 rounded-full"
            />
          </div>
          <div className="flex">
            <div className="flex flex-row items-center justify-between py-1 pr-2">
              <div>
                <a href="#" className="text-blue-400 hover:underline">
                  {user.name}
                </a>
              </div>
              <div className="p-1">
                <textarea
                  rows="3"
                  className="border p-2 rounded w-full"
                  placeholder="Write something..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-between mx-3">
                <div>
                  <button
                    className="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentAddForm;
