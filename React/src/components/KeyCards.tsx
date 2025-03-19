function KeyCards(props: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-4xl font-semibold text-center py-4">{props.title}</h1>
      <div className="flex gap-8 p-4 overflow-auto">{props.children}</div>
    </>
  );
}
export default KeyCards;
