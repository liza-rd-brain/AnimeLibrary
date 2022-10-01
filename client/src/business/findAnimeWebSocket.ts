import { DetailAnimeList, ResponseType } from "../types";

const createConnection = (currUrl: string): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket(currUrl);
    webSocket.onopen = () => {
      resolve(webSocket);
    };

    webSocket.onerror = () => {
      reject(new Error());
    };
  });
};

const sendName = (
  webSocket: WebSocket,
  animeName: string
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    var msg = {
      type: "message",
      text: animeName,
    };

    webSocket.send(JSON.stringify(msg));
    webSocket.onmessage = (event) => {
      const resAnime: ResponseType = event.data;
      console.log("resAnime", resAnime);

      resolve(resAnime);
    };
    webSocket.onerror = () => {
      reject(new Error());
    };
  });
};

export async function findAnimeWebSocket(animeName: string): Promise<string> {
  const currUrl = "ws://localhost:3000/findName";

  const webSocket = await createConnection(currUrl);

  return sendName(webSocket, animeName).then(
    (resAnime: ResponseType) => {
      return resAnime;
    },
    (err) => {
      return err;
    }
  );
  // const getListPromise = await connectionPromise.then(
  //   (webSocket) => {
  //     return sendName(webSocket, animeName);
  //   },
  //   (err) => {
  //     return err;
  //   }
  // );

  // return await getListPromise.then(
  //   (resAnime: ResponseType) => {
  //     return resAnime.data;
  //   },
  //   (err: Error) => {
  //     return err;
  //   }
  // );

  // return await connectionPromise.then(
  //   (webSocket) => {
  //     return sendName(webSocket, animeName).then(
  //       (resAnime: ResponseType) => {
  //         return resAnime.data;
  //       },
  //       (err) => {
  //         return err;
  //       }
  //     );
  //   },
  //   (err) => {}
  // );

  //ожидание ответа
  // return new Promise(() => {});
}
