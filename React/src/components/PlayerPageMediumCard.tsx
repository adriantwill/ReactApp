function PlayerPageMediumCard(props: {
  title: string;
  children: React.ReactNode;
  tailwind: string;
  color: string;
}) {
  return (
    <div className="w-[43rem] mb-6 bg-white rounded-md shadow-surround">
      <h1 className="text-4xl font-bold text-center pt-4 pb-2 ">
        {props.title}
      </h1>
      <div className="h-2" style={{ backgroundColor: `#${props.color}` }}></div>
      <div className={`h-[23rem] px-8 py-6 ${props.tailwind} `}>
        {props.children}
      </div>
    </div>
  );
}
export default PlayerPageMediumCard;
