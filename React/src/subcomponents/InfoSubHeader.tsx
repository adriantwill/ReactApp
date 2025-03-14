function InfoSubHeader(props: { text: string }) {
  return (
    <p className="text-3xl ml-5 tracking-tighter border-b-2 font-bold border-gray-400 pb-1 inline-block">
      {props.text}
    </p>
  );
}
export default InfoSubHeader;
