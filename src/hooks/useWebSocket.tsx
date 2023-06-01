import { useEffect, useRef } from "react";

interface WebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (message: string) => void;
}

const useWebSocket = (url: string, options?: WebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send("connected");
      }
      if (options?.onOpen) {
        options.onOpen();
      }
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      if (options?.onClose) {
        options.onClose();
      }
    });

    socket.addEventListener("message", (event) => {
      console.log("Received message from server:", event.data);
      if (options?.onMessage) {
        options.onMessage(event.data);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, options?.onOpen, options?.onClose, options?.onMessage]);

  const sendMessage = (message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      socketRef.current.send(jsonMessage);
    }
  };

  return sendMessage;
};

export default useWebSocket;
