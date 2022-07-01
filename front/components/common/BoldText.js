export default function BoldText({ text }) {
  return (
    <>
      <div className="font-semibold text-3xl text-center lg:text-left">
        {text}
      </div>
      <div className="border-none bg-amber-400 w-20 h-1 mt-2 rounded text-xm"></div>
    </>
  );
}
