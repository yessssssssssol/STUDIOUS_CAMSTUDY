function CommentCard({ ?, comment, setComments, comments }) {
  //useState로 isEditing 상태를 생성함.import React, { useState } from "react";
  const handleDelete = async (e) => {
    //  페이지가 리프레쉬 되는 고유의 브라우저 동작을 preventDefault()로 막아줌
    e.preventDefault();
    // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰이는 함수
    e.stopPropagation();

    const userId = ?;

    // comment.id로 조회하여 데이터 삭제
    await Api.delete(`comments/${comment.id}`);

    // "comments/:roomId" 엔드포인트로 GET 요청함.
    const res = await Api.get('comments', roomId);

    setComments(res.data);
  };

  return (
    <div>
      <div className=" mr-3 align-items-center">
        <div>{comment.userName}</div>
        <div>{comment.content}</div>

        <div>
          <button onClick={handleDelete} className=" mr-3 align-items-center">
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
