function LiveCard() {
  return (
    <div className="bg-slate-200 w-48 rounded-md hover:scale-110 hover:cursor-pointer ">
      <div className="flex justify-center pt-2">3rd 1:12</div>
      <div className="flex justify-between p-4 pb-2">
        <span className="text-xl">DET</span>
        <span className="text-xl">12</span>
      </div>
      <div className="flex justify-between p-4 pt-2">
        <span className="text-xl">GRE</span>
        <span className="text-xl">6</span>
      </div>
    </div>
  );
}

export default LiveCard;
