import * as Api from '../../api';
import CommentCard from './CommentCard';
import CommentAddForm from './CommentAddForm';

function Comments({ aaaa }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // "commentlist/유저id"로 GET 요청하고, response의 data로 comments를 세팅함.
    Api.get('commentlist', ?).then((res) => setComments(res.data));
  }, [aaaa]);

  return (
    <div>
      <div>
        <div>Comments</div>
        <CommentAddForm Id={aaaa} setComments={setComments} />
        {comments.map((comment) => (
          <CommentCard
            Id={aaa}
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
