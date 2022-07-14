import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import { useEffect, useState } from 'react';

const CommentAddForm = ({ roomId, setComments }) => {
  const [content, setContent] = useState('');
  const [writerId, setWriterId] = useState('');
  const [user, setUser] = useState();
  const useratom = useRecoilValue(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (content.length === 0) {
      alert('내용을 입력하세요.');
    } else {
      try {
        await Api.post('comment', {
          roomId,
          content,
        });
        const res = await Api.get('comments', roomId);
        setComments(res.data);
        setContent('');
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    setUser(useratom);
  }, [user]);
  return (
    <>
      {user && (
        <div className="my-2 mx-1 max-w-l flex gap-3 rounded-md bg-white p-2 text-black shadow">
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
                <a href="#" className="text-amber-400 hover:underline">
                  {user.name}
                </a>
              </div>
              <div className="p-1">
                <input
                  rows="3"
                  className="border p-2 rounded w-full mx-5"
                  placeholder="댓글을 입력하세요."
                  value={content}
                  maxLength="50"
                  onChange={(e) => setContent(e.target.value)}
                ></input>
              </div>
              <div className="flex justify-between mx-3">
                <div>
                  <button
                    className="px-4 py-1 bg-amber-400 text-white rounded font-light hover:bg-amber-500 hover:shadow-lg mx-5"
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
