function MediumCardTitle(props: { title: string; color: string }) {
  return (
    <>
      <h1 className="text-3xl font-medium tracking-tight text-center py-2 ">
        {props.title}
      </h1>
      <div className="h-1" style={{ backgroundColor: `#${props.color}` }}></div>
    </>
  );
}
export default MediumCardTitle;
