const createConnection = (currUrl: string): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket(currUrl);
    webSocket.onopen = () => {
      resolve(webSocket);
    };

    webSocket.onerror = () => {
      reject("err");
    };
    webSocket.onclose = () => {
      console.log("close from createConnection ");
      reject("err");
    };
  });
};

export async function findAnimeWebSocket(
  animeName: string,
  controller: AbortController
): Promise<string> {
  const currUrl = "ws://localhost:3000/findName";

  const webSocket = await createConnection(currUrl);

  return new Promise((resolve, reject) => {
    var msg = {
      type: "message",
      text: animeName,
    };

    webSocket.send(JSON.stringify(msg));

    webSocket.onmessage = (event) => {
      const resAnime: string = event.data;
      resolve(resAnime);
    };

    webSocket.onclose = () => {
      reject("err");
    };

    webSocket.onerror = () => {
      reject("err");
    };

    controller.signal.addEventListener("abort", () => {
      reject("abort socket");
      webSocket.close();
    });
  });
}
