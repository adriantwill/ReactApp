function MediumCardTitle(props: { title: string; color: string }) {
  return (
    <>
      <h1 className="text-4xl font-bold text-center py-4 ">{props.title}</h1>
      <div className="h-1" style={{ backgroundColor: `#${props.color}` }}></div>
    </>
  );
}
export default MediumCardTitle;
