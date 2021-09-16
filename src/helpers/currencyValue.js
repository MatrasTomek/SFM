export const currencyValueEUR = () => {
  const url = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/last/`;
  fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return { status: "404" };
      } else return res.json();
    })
    .then((json) => {
      if (json.status === "404") {
        return console.log(`Nie ma kursu waluty w podanej dacie`);
      } else {
        return json.rates;
      }
    })

    .catch(function (e) {
      console.log(e);
      return console.log("podaj datę");
    });
};
export const currencyValueUSD = () => {
  const url = `http://api.nbp.pl/api/exchangerates/rates/A/USD/last/`;
  fetch(url)
    .then((res) => {
      if (res.status !== 200) {
        return { status: "404" };
      } else return res.json();
    })
    .then((json) => {
      if (json.status === "404") {
        return console.log(`Nie ma kursu waluty w podanej dacie`);
      } else {
        return console.log(json.rates);
      }
    })

    .catch(function (e) {
      console.log(e);
      return console.log("podaj datę");
    });
};
