function TermBoxKey(props: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center border rounded-md p-4 w-[28rem] flex-shrink-0 h-84">
      <img
        src={props.image}
        alt={props.title}
        className="mb-2 w-96 h-48 rounded-md border-black border-2 object-cover "
      />
      <h2 className=" text-3xl font-medium mb-2">{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
export default TermBoxKey;
