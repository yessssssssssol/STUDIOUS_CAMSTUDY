import { useRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as Api from '../../pages/api/api';
import { useState } from 'react';

const CommentEdit = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await API.put('comment', {
      _id: comment._id,
      content: comment.content,
    });
    const updatedUser = await res.data;
    setUser(updatedUser);
  };

  const handleContentChange = (e) => {
    setUser((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  return (
    <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
      <div className="mt-2">
        <img
          className="w-16 rounded-full shadow"
          src={comment.userInfo.profileUrl}
          alt=""
        />
      </div>
      <div className="flex">
        <div className="flex flex-row items-center justify-between py-1 pr-2">
          <div>
            <a
              href="#"
              className="text-blue-400 hover:underline"
              value={comment.userName}
            ></a>
            <span
              className="text-sm font-thin text-gray-500"
              value={comment.createdAt}
            ></span>
          </div>
          <div className="p-1">
            <p
              className="text-gray-900 border-l-2 px-1 border-blue-500 bg-gray-100 rounded"
              value={comment.content}
              onChange={handleContentChange}
            ></p>
          </div>
          <button onClick={submitHandler} className=" mr-3 align-items-center">
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEdit;
