function TeamCard() {
  return (
    <div
      className="h-40 m-5 w-[34rem]"
      style={{ backgroundColor: `#${"0076B6"}` }}
    >
      <div className="flex ">
        <img
          src={"https://a.espncdn.com/i/teamlogos/nfl/500-dark/det.png"}
          className="h-40 mx-4"
        />
        <div className="justify-center flex flex-col text-white">
          <div className="text-4xl font-bold ">{"Philadelphia Eagles"}</div>
          <div className="text-2xl font-medium text-cente">{"NFC North"}</div>
        </div>
      </div>
    </div>
  );
}
export default TeamCard;
