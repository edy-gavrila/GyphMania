const img = document.querySelector("img");
const form = document.querySelector("form");

const findGyph = async (searchString) => {
  try {
    
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?s=${searchString}&api_key=kO3uOTLWzAIMjLW1Eq3gZRoIQ89zWY8p`
    );
    if (!response.ok) throw new Error("Network Error");
    const data = await response.json();
    console.log(data);
    if (!data.data.images)
      throw new Error("No results for the given search string!");
    return {
      url: data.data.images.original.url,
    };

  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

const getGyphAndSet = async (searchStr = "cats") => {
  const result = await findGyph(searchStr);
  if (result.url) {
    img.src = result.url;
  } else {
    img.src = "not-found.jpg";
  }
};

getGyphAndSet("cats");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchStr = document.getElementById("search").value.trim();
  getGyphAndSet(searchStr);
});
