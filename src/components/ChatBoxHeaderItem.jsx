import "@styles/styles.scss";

const ChatBoxHeaderItem = ({ content, onTap }) => {
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease", // Add transition for box-shadow
    overflow: "hidden",
    margin: "20px",
    cursor: "pointer",
    padding: "20px",
  };

  return (
    <div
      className="Card"
      style={cardStyle}
      onClick={() => {
        onTap(content);
      }}
    >
      <p className="ParagraphStyle">{content}</p>
    </div>
  );
};

export default ChatBoxHeaderItem;
