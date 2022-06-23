import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentState } from '../../core/atoms/createCommentState';
import { userAtom } from '../../core/atoms/userState';

export default function CreateComment() {
  const [comment, setComment] = useRecoilState(commentState);
  const { content, setContent } = comment;

  // const [content, setContent] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  const { name, profileUrl } = user;
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onCommentChange = (e) => {
    setComment((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };

  return (
    <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
      <div className="mt-2">
        <img src={profileUrl} alt="" className="h-16 w-16 m-2 rounded-full" />
      </div>
      <div className="flex">
        <div className="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a href="#" className="text-blue-400 hover:underline">
              {name}
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
  );
}
