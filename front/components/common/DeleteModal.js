import { useEffect, useRef } from 'react';
import Button from './Button';
import * as API from '../../pages/api/api';
import { useRouter } from 'next/router';
const DeleteModal = (props) => {
  const { setShow, title, myroomInfo, isBoard } = props;
  const ref = useRef(null);
  const router = useRouter();
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  }
  function onClick() {
    setShow(false);
  }
  const deleteClick = async (e) => {
    e.preventDefault();
    console.log(isBoard);

    try {
      const res = API.delete('deleteroom', myroomInfo.roomId);
      alert('게시글이 삭제 되었습니다.');
      setShow(false);
      if (isBoard === true) {
        router.push('/');
        console.log(isBoard, 'true');
      } else {
        location.reload();
        console.log(isBoard, 'false');
      }
    } catch (error) {
      alert('게시글 삭제에 실패했습니다.');
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            ref={ref}
          >
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex justify-evenly">
              <Button text={'삭제'} onClick={deleteClick} />
              <Button color={'bg-red-400'} onClick={onClick} text={'취소'} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DeleteModal;
