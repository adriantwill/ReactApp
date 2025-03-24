function ChacteristicBoxKey(props: { title: string; description: string }) {
  return (
    <div className="border rounded-md p-4 w-[28rem] flex-shrink-0 h-84">
      <h2 className="text-2xl font-medium mb-2">{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
export default ChacteristicBoxKey;
