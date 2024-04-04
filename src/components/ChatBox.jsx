import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

let messagesCounter = 0;
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef(null);

  const handleSendMessage = () => {
    let userInputContent = userInput.trim();
    if (userInputContent !== "") {
      messagesCounter += 1;
      let huMessage = {
        id: messagesCounter,
        role: "hu",
        content: userInputContent,
      };
      setUserInput("");
      setMessages([...messages, huMessage]);

      const url = `http://localhost:8080/chat-with-gemi/gemi?message=${userInputContent}`;
      const options = {
        method: "GET",
        responseType: "stream",
      };
      try {
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
      style={{
        position: "fixed",
        bottom: 100 /* Adjust as needed */,
        right: 100 /* Adjust as needed */,
        width: "80%" /* Adjust as needed */,
        height: "80%" /* Adjust as needed */,
        minWidth: 400,
        margin: "auto",
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        color: "#000",
        borderRadius: 8,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "none" /* Initially hidden */,
        padding: 10,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1 /* Takes remaining space */,
          overflowY: "auto" /* Enable scrolling if messages overflow */,
        }}
        ref={scrollRef}
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
                background: "#f1f1f1",
                borderRadius: 10,
                padding: "8px",
              }}
            >
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
                {message.content}
              </Markdown>
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
