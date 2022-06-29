import { RiEdit2Fill } from '@react-icons/all-files/Ri/RiEdit2Fill';
import Link from 'next/link';

import { BsTrashFill } from '@react-icons/all-files/Bs/BsTrashFill';
export default function CategoryBox({ myroomInfo, color }) {
  console.log(myroomInfo);
  return (
    <div
      className={`flex justify-between bg-amber-300  hover:bg-amber-400 shadow-amber-400/50 shadow-lg hover:shadow-2xl rounded-xl mx-[100px] h-[100px] my-[50px]`}
    >
      <section className="flex items-center ml-[30px] font-bold">
        {myroomInfo.roomName}
      </section>
      <section className="flex items-center mr-[30px] font-bold">
        <Link href={`/board/edit/${myroomInfo.roomId}`}>
          <a className="cursor-pointer">
            <RiEdit2Fill />
          </a>
        </Link>

        <BsTrashFill />
      </section>
    </div>
  );
}
