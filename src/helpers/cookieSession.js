export const addCookie = () => {
  const data = new Date();
  const days = 1;
  data.setTime(data.getTime() + days * 1 * 30 * 60 * 1000);
  document.cookie = `sfmAppSession; path=/; max-age=${data}`;
};

export const deleteCoockie = () => {
  document.cookie = "sfmAppSession; path=/; max-age=-1";
};

export const checkCookie = () => {
  if (document.cookie === "sfmAppSession") {
    const cookieObj = {
      cookie: "sfmAppSession",
    };
    return cookieObj;
  } else return;
};
