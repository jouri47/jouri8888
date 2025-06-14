let saldo = 1.00;
let maxSaldo = 5.00;

const saldoTekst = document.getElementById("saldo");
const werkKnop = document.getElementById("work-button");
const werkBericht = document.getElementById("work-message");
const toppingsPlek = document.getElementById("toppings-container");
const knoppen = document.getElementById("buttons");
const stoom = document.getElementById("steam");

function updateSaldo() {
  saldoTekst.textContent = "€" + saldo.toFixed(2);
}

let knopKaas = document.createElement("button");
knopKaas.textContent = "🧀 Kaas";
knopKaas.onclick = function() {
  voegToppingToe("Kaas");
};
knoppen.appendChild(knopKaas);

let knopTomaat = document.createElement("button");
knopTomaat.textContent = "🍅 Tomaat";
knopTomaat.onclick = function() {
  voegToppingToe("Tomaat");
};
knoppen.appendChild(knopTomaat);

let knopPepperoni = document.createElement("button");
knopPepperoni.textContent = "🍖 Pepperoni";
knopPepperoni.onclick = function() {
  voegToppingToe("Pepperoni");
};
knoppen.appendChild(knopPepperoni);

let knopAnanas = document.createElement("button");
knopAnanas.textContent = "🍍 Ananas";
knopAnanas.onclick = function() {
  voegToppingToe("Ananas");
};
knoppen.appendChild(knopAnanas);

let knopServeer = document.createElement("button");
knopServeer.textContent = "🍽️ Serveer de pizza!";
knopServeer.onclick = function() {
  serveerPizza();
};
knoppen.appendChild(knopServeer);

/*
Als je op de werkknop klikt:
- krijg je €1.00 (als je nog geen 5 euro hebt)
- het werkbericht verdwijnt weer
*/
werkKnop.onclick = function() {
  if (saldo < maxSaldo) {
    saldo = saldo + 1.00;
    updateSaldo();
    werkBericht.style.display = "none";
  }
};

function voegToppingToe(naam) {
  if (saldo < 0.50) {
    werkBericht.style.display = "block";
    // Geluid bij geen geld: https://mixkit.co/free-sound-effects/game-over/
    new Audio("sounds/no-money.wav").play();
    return;
  }

  // Toppings: https://nl.freepik.com/vrije-vector/set-van-pizza-elementen_4430118.htm
  let plaatje = document.createElement("img");
  plaatje.src = "images/" + naam + ".png";
  plaatje.className = "topping";
  plaatje.style.left = "40px";
  plaatje.style.top = "40px";
  toppingsPlek.appendChild(plaatje);

  saldo = saldo - 0.50;
  updateSaldo();

  // ChatGPT-Prompt: "JavaScript: ik wil een geluid afspelen als de gekozen topping 'Ananas' is."
  if (naam === "Ananas") {
    // Geluid bij ananas: (eigen bestand 'eww.m4a')
    new Audio("sounds/eww.m4a").play();
  }
}

function serveerPizza() {
  stoom.classList.add("steam-animate");
  stoom.style.opacity = "1";

  let alleToppings = document.querySelectorAll(".topping");
  alleToppings.forEach(function(el) {
    el.classList.add("shine-animate");
  });

  setTimeout(function() {
    stoom.classList.remove("steam-animate");
    stoom.style.opacity = "0";
    alleToppings.forEach(function(el) {
      el.classList.remove("shine-animate");
    });
  }, 2000);
}

// Startwaarde laten zien als de pagina opent
updateSaldo();
