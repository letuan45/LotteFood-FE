import Subtitle from "../Typography/Subtitle";

function TitleCard({ title, children, TopSideButtons, isLong}) {
  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl"}>
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div
            className="inline-block float-right"
            style={{width: isLong ? "500px" : "250px"}}
          >
            {TopSideButtons}
          </div>
        )}
      </Subtitle>

      <div className="divider mt-1"></div>

      {/** Card Body */}
      <div className="h-full w-full pb-1 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;
