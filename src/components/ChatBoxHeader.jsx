import "../styles/global.css";
import ChatBoxHeaderItem from "./ChatBoxHeaderItem";

const ChatBoxHeader = ({ onTapHeader }) => {
  const chatHeaderStyle = {
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
    lineHeight: 1.8,
    justifyContent: "center",
    textAlign: "center",
    margin: 16,
  };
  return (
    <div style={chatHeaderStyle}>
      <p style={pStyle}>
        Coding Confessions: Unmasking the Developers of Your Chatbox
      </p>

      <div className="ChatBoxHeader">
        <ChatBoxHeaderItem
          content={"The contact information of developer!"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"The working experience, the developer have!"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"The current interesting thing the developer focus on!"}
          onTap={onTapHeader}
        />
        <ChatBoxHeaderItem
          content={"The vision of the developer about future career!"}
          onTap={onTapHeader}
        />
      </div>
    </div>
  );
};

export default ChatBoxHeader;
