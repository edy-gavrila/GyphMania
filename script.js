const img = document.querySelector("img");
const form = document.querySelector("form");

const findGyph = (searchString) => {
  return fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${searchString}&api_key=kO3uOTLWzAIMjLW1Eq3gZRoIQ89zWY8p`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Network Error, ${res.status}`);
      }
    })
    .then((data) => {
      if (data.data.images) {
        return {
          url: data.data.images.original.url,
          status: "OK",
        };
      } else {
        throw new Error("No data for the given search string!");
      }
    })
    .catch((error) => {
      console.error(error);
      return { error: error };
    });
};

const getGyphAndSet = (searchStr = "cats") => {
  findGyph(searchStr)
    .then((res) => {
      if (res.error) {
        img.src = "not-found.jpg";
        return;
      }
      img.src = res.url;
    })
    .catch((err) => {
      console.error(err);
    });
};

getGyphAndSet("cats");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchStr = document.getElementById("search").value.trim();
  getGyphAndSet(searchStr);
});
