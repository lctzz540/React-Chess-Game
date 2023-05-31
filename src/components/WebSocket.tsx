import React from "react";

const WebSocketTest = () => {
  React.useEffect(() => {
    // WebSocket endpoint URL
    const endpoint = "ws://localhost:3000/ws/100";

    // Create a new WebSocket connection
    const socket = new WebSocket(endpoint);

    // Connection opened
    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");

      // Send a message to the server
      socket.send("Hello, WebSocket server!");
    });

    // Listen for incoming messages from the server
    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);

      // Process the received message
      // ...
    });

    // Connection closed
    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return <div>{/* Your component JSX */}</div>;
};

export default WebSocketTest;
