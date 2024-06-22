import { Server } from "socket.io";
import { type Server as HttpServer } from "http";
import { GameById } from "@/lib/db/schema/games";

class SocketService {
    private _io: Server;

    constructor({ httpServer }: { httpServer: HttpServer }) {
        console.log("Socket service created");
        this._io = new Server(httpServer);
    }


    public initListeners() {
        const io = this.io;
        console.log("Socket service initialized");

        io.on("connection", (socket) => {
            console.log("New socket connected", socket.id);

            socket.on("event:joinRoom", ({ roomId }: { roomId: string }) => {
                socket.join(roomId);
            })

            socket.on("event:gameUpdate", (game: GameById) => {
                io.to(game!.id.toString()).emit("event:gameUpdate", game);
            })

            socket.on("disconnect", () => {
                console.log('user disconnected:', socket.id);
            });

        })

    }

    get io() {
        return this._io;
    }
}

export default SocketService;