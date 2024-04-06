import "../styles/global.css";
import ChatBoxHeaderItem from "./ChatBoxHeaderItem";

const ChatBoxHeader = ({ onTapHeader }) => {
  const chatHeaderSytle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Add transition for box-shadow
    overflow: "hidden",
    margin: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const pStyle = {
    fontWeight: "bold",
    fontSize: 18,
    lignHeight: 1.8,
    justifyContent: "center",
    textAlign: "center",
  };
  return (
    <div style={chatHeaderSytle}>
      <p style={pStyle}>
        If you want to known about me, fell free to ask! <br />
        I'm here to help.
      </p>

      <div className="ChatBoxHeader">
        <ChatBoxHeaderItem
          content={"The information about the developer!"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"What work experience the developer have?"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"What current thing's the developer interesting on?"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"The vision of the developer about future career."}
          onTap={onTapHeader}
        />
      </div>
    </div>
  );
};

export default ChatBoxHeader;
