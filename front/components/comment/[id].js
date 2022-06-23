import { useRouter } from 'next/router';
import Helmet from '../../../components/layout/Helmet';
import CommentAddForm from '../../../components/comment/CommentAddForm';
import ProfileCard from '../../../components/common/ProfileCard';
import Temporary from '../../../components/comment/CommentsTemporary';
import { useEffect, useState } from 'react';
import * as API from '../../../pages/api/api';

export default function Detail() {
  const [comment, setComment] = useState();
  const router = useRouter();
  useEffect(() => {
    async function getComments() {
      try {
        const res = await API.get('comments', router.query.roomId);
        console.log(res, '댓글 리스트');
        setComment(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (router.isReady) {
      getComment();
    }
  }, [router.isReady]);
  return (
    <>
      {comment && (
        <div className="my-2 mx-1 max-w-xl flex gap-3 rounded-md bg-white p-2 text-black shadow">
          <div className="mt-2">
            <img
              className="w-16 rounded-full shadow"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
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
                  {' '}
                  {comment.createdAt}{' '}
                </span>
              </div>
              <div className="p-1">
                <p className="text-gray-900 border-l-2 px-1 border-blue-500 bg-gray-100 rounded">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
