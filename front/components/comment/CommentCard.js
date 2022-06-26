import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '../../core/atoms/userState';
import * as API from '../../pages/api/api';

function CommentCard({ roomId, writerId, comment, setComments }) {
  const [user, setUser] = useRecoilState(userAtom);
  const { name, description, profileUrl } = user;
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const handleDelete = async (e) => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    // comment.id로 조회하여 데이터 삭제
    await API.delete(`comment/${comment._id}`);

    // "comments/:roomId" 엔드포인트로 GET 요청함.
    const res = await API.get('comments', roomId);

    setComments(res.data);
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
            <a href="#" className="text-blue-400 hover:underline">
              {comment.userName}
            </a>
            <span className="text-sm font-thin text-gray-500">
              {comment.createdAt}
            </span>
          </div>
          <div className="p-1">
            <p className="text-gray-900 border-l-2 px-1 border-blue-500 bg-gray-100 rounded">
              {comment.content}
            </p>
          </div>
          <button onClick={handleDelete} className=" mr-3 align-items-center">
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
