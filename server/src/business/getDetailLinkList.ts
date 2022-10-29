export const getDetailLinkList = (initList) => {
  return initList.map((item) => {
    const arr = ["watch", "-episode"];
    const animePart = "anime";

    const separator = new RegExp(arr.join("|"), "i");

    const [url, animeToken] = item.split(separator);

    const animeHref = `${url}${animePart}${animeToken}`;

    return animeHref;
  });
};
