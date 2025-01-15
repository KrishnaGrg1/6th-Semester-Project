let btn = document.getElementById("btn");
let p = document.querySelector("p");

btn.addEventListener("click", async () => {
  try {
    // const response = await fetch("https://api.chucknorris.io/jokes/random");
    // const text=await response.json();
    // let jokes=text.value
    // jokes=jokes.replace(/Chuck Norris/g, "Bishal");
    // p.innerHTML=jokes;

    const response = await fetch("http://localhost:8001/jokes");
    const data = await response.json();
    const jokes = data.jokes;
    p.innerHTML = jokes;
  } catch (error) {
    p.innerText = "Sorry, could not fetch a joke!";
  }
});
