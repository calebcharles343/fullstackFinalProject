import React from "react";

const Calendar: React.FC = () => {
  return (
    <div
      className="border-r-[5px] border-[#052859] rounded-lg mt-4 relative w-full 
  overflow-hidden"
      style={{
        paddingTop: "56.25%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fef6f6",
        }}
      />
      <iframe
        src="https://calendar.google.com/calendar/embed?src=calebcharles343%40gmail.com&ctz=Africa%2FLagos"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "144%",
          height: "145%",
          border: 0,
          transform: "scale(0.70)",
          transformOrigin: "top left",
        }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Calendar;
