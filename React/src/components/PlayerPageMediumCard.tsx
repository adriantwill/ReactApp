type Props = { title: string; children: React.ReactNode };
function PlayerPageMediumCard({ title, children }: Props) {
  return (
    <div className="w-[43rem] my-6 bg-primary rounded-md shadow-lg">
      <h1 className="text-4xl font-bold text-center bg-secondary -mt-6 py-4 rounded-md shadow-xl">
        {title}
      </h1>
      {children}
    </div>
  );
}
export default PlayerPageMediumCard;
