import axios from "axios";

// PART 1: Show Dog Photo
const getDogImageButton = document.querySelector("#get-dog-image");
const dogImageContainer = document.querySelector("#dog-image");

getDogImageButton.addEventListener("click", showDogPhoto);

async function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div

  // clear current dog immage if one exists
  dogImageContainer.innerHTML = "";

  try {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random");

    console.log(result.data.message);

    const imageElement = document.createElement("img");
    imageElement.src = result.data.message;
    dogImageContainer.appendChild(imageElement);
  } catch (err) {
    console.log(err);
  }
}

// PART 2: Show Weather
const weatherZipInput = document.querySelector("#zipcode-field");
const weatherButton = document.querySelector("#weather-button");
const weatherInfo = document.querySelector("#weather-info");

weatherButton.addEventListener("click", showWeather);

async function showWeather(evt) {
  weatherInfo.innerHTML = "";
  const zipcode = weatherZipInput.value;

  try {
    const result = await axios(`/weather.txt/?zipcode=${zipcode}`);
    console.log(result.data);
    weatherInfo.innerHTML = `${result.data.forecast} - ${result.data.temp}`;
  } catch (error) {
    console.log(error);
  }

  // TODO: request weather with that URL and show the forecast in #weather-info
}

// PART 3: Order Cookies
const orderForm = document.querySelector("#order-form");
const qtyInput = document.querySelector("#qty-field");
const cookieyTypeInput = document.querySelector("#cookie-type-field");
const orderStatus = document.querySelector("#order-status");

orderForm.addEventListener("submit", orderCookies);

async function orderCookies(evt) {
  evt.preventDefault();

  let qty = qtyInput.value;
  let type = cookieyTypeInput.value;
  console.log(qty, type);

  try {
    const result = await axios.post("/order-cookies.json", {
      qty: qty,
      cookieType: type,
    });
    console.log(result.data);
    if (result.data.resultCode === "ERROR") {
      orderStatus.className = "order-error";
    } else {
      orderStatus.className = "";
    }
    orderStatus.innerHTML = `${result.data.resultCode} - ${result.data.message}`;
  } catch (err) {
    console.log(err);
  }

  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

// PART 4: iTunes Search
const itunesForm = document.querySelector("#itunes-search-form");
const searchField = document.querySelector("#search-term");
const itunesResult = document.querySelector("#itunes-results");

itunesForm.addEventListener("submit", iTunesSearch);

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = searchField.value;
  itunesResult.innerHTML = "";

  const formData = { term: searchTerm };
  console.log(formData);
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;

  try {
    const result = await axios.get(url);
    console.log(result.data);

    for (const track of result.data.results) {
      let trackItem = document.createElement("li");
      let artistName = track.artistName;
      let trackName = track.trackName;
      trackItem.innerHTML = `${artistName} - ${trackName}`;
      itunesResult.appendChild(trackItem);
    }
  } catch (err) {
    console.log(err);
  }

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
