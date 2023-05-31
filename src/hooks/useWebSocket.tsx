import { useEffect, useRef } from "react";

interface WebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
}

const useWebSocket = (url: string, options?: WebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
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

    return () => {
      socket.close();
    };
  }, [url, options?.onOpen, options?.onClose]);

  const sendMessage = (message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      socketRef.current.send(jsonMessage);
    }
  };

  return sendMessage;
};

export default useWebSocket;
