export default function CategoryBox({ myroomInfo, color }) {
  return (
    <div
      className={`flex justify-between ${color}  rounded-[100px] mx-[100px] h-[100px] my-[50px]`}
    >
      <section className="flex items-center ml-[30px] font-bold">
        {myroomInfo.roomName}
      </section>
      <section className="flex items-center mr-[30px] font-bold"></section>
    </div>
  );
}
