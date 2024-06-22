import { createServer } from "node:http";
import next from "next";
import SocketService from "./src/lib/api/socket/socketServices";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.NEXT_PUBLIC_URL || "localhost";
const port = Number(process.env.PORT) || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


app.prepare().then(() => {
    const httpServer = createServer(handler);

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });

    const socketService = new SocketService({ httpServer: httpServer });

    socketService.initListeners();
});