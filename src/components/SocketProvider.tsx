"use client";

import { GameById } from "@/lib/db/schema/games";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface ISocketContext {
  joinRoom: (roomId: string) => any;
  game?: GameById;
  updateGame: (game: GameById) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`State is undefined`);
  return state;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>();
  const [game, setGame] = useState<GameById>();

  const updateGame: ISocketContext["updateGame"] = useCallback(
    (game) => {
      if (socket) {
        socket.emit("event:gameUpdate", game);
      }
    },
    [socket],
  );

  const joinRoom: ISocketContext["joinRoom"] = useCallback(
    (roomId: string) => {
      if (socket) {
        socket.emit("event:joinRoom", { roomId });
      }
    },
    [socket],
  );

  const onGameUpdate = useCallback((game: GameById) => {
    setGame(game);
  }, []);

  useEffect(() => {
    const _socket = io();
    _socket.on("event:gameUpdate", onGameUpdate);
    setSocket(_socket);

    return () => {
      _socket.off("event:joinRoom");
      _socket.off("event:gameUpdate", onGameUpdate);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, [onGameUpdate]);

  return (
    <SocketContext.Provider
      value={{
        joinRoom,
        game,
        updateGame,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
