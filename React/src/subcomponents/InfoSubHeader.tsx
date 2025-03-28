function InfoSubHeader(props: { text: string }) {
  return (
    <div className="text-3xl tracking-tighter border-b-2 font-bold border-blue-700 mb-4 inline-block w-fit">
      {props.text}
    </div>
  );
}
export default InfoSubHeader;
