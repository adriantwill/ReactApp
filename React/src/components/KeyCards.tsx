function KeyCards(props: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-4xl font-semibold mx-6 mb-3">{props.title}</h1>
      <div className="flex gap-8 overflow-scroll mx-6">{props.children}</div>
    </>
  );
}
export default KeyCards;
