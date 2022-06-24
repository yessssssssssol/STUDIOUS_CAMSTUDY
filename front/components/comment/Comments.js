import * as API from '../../pages/api/api';
import CommentCard from './CommentCard';
import CommentAddForm from './CommentAddForm';
import { useState, useEffect } from 'react';

function Comments({ roomId, writerId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // "comments/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    API.get('comments', roomId).then((res) => setComments(res.data));
  }, [roomId]);

  return (
    <div>
      <div>
        <div>Comments</div>
        <CommentAddForm
          roomId={roomId}
          setComments={setComments}
          // writerId={writeId}
        />
        {comments.map((comment) => (
          <CommentCard
            roomId={roomId}
            // writerId={writeId}
            key={comment.id}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
