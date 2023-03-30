const baseURL = "http://localhost:3000/monsters";
let page = 1;

// Dom Selectors
const mContainer = document.getElementById("monster-container");
const mForm = document.getElementById("create-monster");
const bBtn = document.getElementById("back");
const fBtn = document.getElementById("forward");

// Event Listeners
mForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createMonster(event);
});

bBtn.addEventListener("click", (e) => {
  page -= 1;
  fetchAll();
});

fBtn.addEventListener("click", (e) => {
  page += 1;
  fetchAll();
});

//Fetches
const fetchAll = () => {
  fetch(`${baseURL}/?_limit=50&_page=${page}`)
    .then((response) => response.json())
    .then((monArray) => {
      console.log(monArray);
      renderMonsters(monArray);
    });
};

//Render
const renderMonsters = (monArray) => {
  mContainer.innerHTML = "";
  monArray.forEach((monObj) => {
    const hTag = document.createElement("h1");
    hTag.textContent = monObj.name;
    const pTag = document.createElement("h2");
    pTag.textContent = "age: " + monObj.age;
    const h2Tag = document.createElement("h3");
    h2Tag.textContent = "Description: " + monObj.description;
    mContainer.append(hTag, pTag, h2Tag);
  });
};

const form = () => {
  mForm.innerHTML = `
        <h4>Add New Monster</h4>
        <form id="mon-form">
            <div>
                <label for="name">Name</label>
                <input type="text" id="mon-name" />
            </div>
            <div>
                <label for="age">Age</label>
                <input type="number" id="mon-age" />
            </div>
            <div>
                <label for="Description">Description</label>
                <input type="text" id="mon-description" />
            </div>
            <input type="submit" value="Add Monster" />
        </form>`;
};

const createMonster = (event) => {
  const name = event.target.querySelector("#mon-name").value;
  const age = event.target.querySelector("#mon-age").value;
  const description = event.target.querySelector("#mon-description").value;
  const monster = { name, age, description };
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(monster),
  })
    .then((response) => response.json())
    .then((newMonster) => {
      const monArray = [newMonster];
      renderMonsters(monArray);
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => event.target.reset());
};

// init
const init = () => {
  fetchAll();
  form();
};
init();
