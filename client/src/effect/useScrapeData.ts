import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAnime } from "../business/findAnime";
import { State } from "../types";

export function useScrapeData() {
  const [doEffect] = useSelector((state: State) => [state.doEffect]);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (doEffect?.type) {
      case "!dataScrape": {
        const data = findAnime(doEffect.data);
        data.then(
          (res) => {
            console.log("res", res);
            dispatch({
              type: "dataReceived",
              payload: res,
            });
          },
          (rej) => {
            console.log("rej", rej);
          }
        );

        break;
      }
      default: {
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doEffect]);
}
