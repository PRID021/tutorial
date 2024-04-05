import ChatBoxHeaderItem from "./ChatBoxHeaderItem";
import "../styles/global.css";

const ChatBoxHeader = ({ onTapHeader }) => {
  return (
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
      />
      <ChatBoxHeaderItem
        content={"The vision of the developer about future career."}
        onTap={onTapHeader}
      />
    </div>
  );
};

export default ChatBoxHeader;
