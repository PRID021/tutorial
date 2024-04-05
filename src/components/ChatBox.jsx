import { useState } from "react";
import Markdown from "react-markdown";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ChatBoxHeader from "./ChatBoxHeader";

let messagesCounter = 0;
const ChatBox = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showHeader, setShowHeader] = useState(true);

  const handleSendMessage = (value) => {
    if (showHeader) {
      setShowHeader(false);
    }
    let userInputContent = value ?? userInput.trim();
    if (userInputContent !== "") {
      messagesCounter += 1;
      let huMessage = {
        id: messagesCounter,
        role: "hu",
        content: userInputContent,
      };
      setUserInput("");
      setMessages([...messages, huMessage]);
      try {
        const url = `http://localhost:8080/chat?conversation_id=9&message=${userInputContent}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
          responseType: "stream",
        };
        fetch(url, options).then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          messagesCounter += 1;
          let stringBuffer = "";
          let aiMessage = {
            id: messagesCounter,
            role: "ai",
            message: stringBuffer,
          };
          setMessages([...messages, huMessage, aiMessage]);
          // Create a transform stream to convert Uint8Array to string
          const utf8Decoder = new TextDecoder("utf-8");
          const stream = response.body.pipeThrough(
            new TransformStream({
              async transform(chunk, controller) {
                // Convert Uint8Array chunk to string
                const stringChunk = utf8Decoder.decode(chunk);
                // Enqueue the string chunk
                controller.enqueue(stringChunk);
              },
            })
          );
          // Read from the stream
          const reader = stream.getReader();
          reader.read().then(function processText({ done, value }) {
            if (done) {
              console.log("Stream reading complete.");
              return;
            }
            // Process the chunk of data
            console.log(value); // Example: log the chunk of data to console
            stringBuffer += value;
            // Read the next chunk
            setMessages([
              ...messages,
              huMessage,
              { role: "ai", id: aiMessage.id, content: stringBuffer },
            ]);
            reader.read().then(processText);
          });
        });
      } catch (error) {
        console.error("Error fetching stream:", error);
      }
    }
  };
  return (
    <div
      id="chatBox"
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        position: "absolute",
        alignSelf: "center",
        bottom: 100,
        padding: 10,
        width: "80%",
        height: "80%",
        margin: "auto",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        color: "#000",
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "none" /* Initially hidden */,
        flexDirection: "column",
        zIndex: 99999,
      }}
    >
      {showHeader && (
        <ChatBoxHeader
          onTapHeader={(value) => {
            handleSendMessage(value);
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1 /* Takes remaining space */,
          overflowY: "auto" /* Enable scrolling if messages overflow */,
        }}
      >
        {[...messages].reverse().map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              margin: "4px 0",
            }}
          >
            <i
              style={{
                width: 40,
                height: 40,
                fontSize: 24,
                color: "#555",
                borderRadius: "50%",
                padding: "8px",
              }}
              className={
                message.role === "hu" ? "fas fa-user" : "fas fa-rocket"
              }
            ></i>

            <div
              style={{
                background: "#fff",
                borderRadius: 10,
                paddingLeft: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "fit-content",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {message.role == "hu" ? "You" : "AI"}
                </p>
                <Markdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={materialLight}
                          PreTag="div"
                          language={match[1]}
                          children={String(children).replace(/\n$/, "")}
                          {...props}
                        />
                      ) : (
                        <code className={className ? className : ""} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content === "" ? "...." : message.content}
                </Markdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "8px 8px",
        }}
      >
        <input
          type="text"
          id="messageInput"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          style={{
            flex: 1,
            padding: "16px 16px 16px 16px",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
