import { useEffect, useRef } from 'react';
import Button from './Button';

const DeleteModal = (props) => {
  const { setShow, title, children } = props;
  const ref = useRef(null);
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
              <Button text={'삭제'} />
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
