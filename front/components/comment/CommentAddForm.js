import { useState } from 'react';

const CommentAddForm = ({ userName }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Id를 user_id 변수에 할당함.
    const userId = Id;

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
            <img src="http://picsum.photos/50" alt="" class="rounded-full" />
          </div>
          <div>
            <h1 class="font-semibold">Hailey{userName}</h1>
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
