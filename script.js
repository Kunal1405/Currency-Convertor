const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
let updateRate=async()=>{
    let amount = document.querySelector("input").value.trim();

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        if (!exchangeRate) {
            msg.innerText = "Exchange rate not available.";
            return;
        }

        let result = (amount * exchangeRate).toFixed(2);
        msg.innerText = `${amount} ${fromCurr.value} = ${result} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate. Try again later.";
        console.error("API Fetch Error:", error);
    }
};

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    updateRate();
});
window.addEventListener("load", () => {
    updateRate();
  });