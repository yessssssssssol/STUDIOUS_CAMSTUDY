export default function CategoryBox({ myroomInfo, color }) {
  return (
    <div
      className={`flex justify-between bg-amber-300  hover:bg-amber-400 shadow-amber-400/50 shadow-lg hover:shadow-2xl rounded-xl mx-[100px] h-[100px] my-[50px]`}
    >
      <section className="flex items-center ml-[30px] font-bold">
        {myroomInfo.roomName}
      </section>
      <section className="flex items-center mr-[30px] font-bold"></section>
    </div>
  );
}
