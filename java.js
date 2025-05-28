document.addEventListener("DOMContentLoaded", function() {

  const toppings = ["Kaas", "Tomaat", "Pepperoni", "Ananas"];
  const saldoDisplay = document.getElementById("saldo");
  const buttonsContainer = document.getElementById("buttons");
  const werkKnop = document.getElementById("work-button");
  const werkBericht = document.getElementById("work-message");
  const toppingsVak = document.getElementById("toppings-container");
  const stoomAfbeelding = document.getElementById("steam");

  let saldo = 1.00;
  const maxSaldo = 5.00;

  function toonSaldo() {
    saldoDisplay.textContent = "€" + saldo.toFixed(2);
  }

  function voegToppingToe(naamVanTopping) {
    if (saldo < 0.50) {
      werkBericht.style.display = "block";
      new Audio("sounds/no-money.wav").play();
      return;
    }

    const afbeelding = document.createElement("img");
    afbeelding.src = "images/" + naamVanTopping + ".png";
    afbeelding.classList.add("topping");

    afbeelding.style.position = "absolute";
    afbeelding.style.left = "40px";
    afbeelding.style.top = "40px";

    toppingsVak.appendChild(afbeelding);

    saldo -= 0.50;
    toonSaldo();

    if (naamVanTopping === "Ananas") {
      new Audio("sounds/eww.m4a").play();
    }
  }

  function serveerPizza() {
    stoomAfbeelding.classList.add("steam-animate");

    const alleToppings = document.querySelectorAll(".topping");
    alleToppings.forEach(function(topping) {
      topping.classList.add("shine-animate");
    });

    setTimeout(function() {
      stoomAfbeelding.classList.remove("steam-animate");
      stoomAfbeelding.style.opacity = "0";

      alleToppings.forEach(function(topping) {
        topping.classList.remove("shine-animate");
      });
    }, 2000);
  }

  function werkVoorGeld() {
    if (saldo < maxSaldo) {
      saldo += 1.00;
      toonSaldo();
      werkBericht.style.display = "none";
    }
  }

  toonSaldo();

  toppings.forEach(function(naam) {
    const knop = document.createElement("button");

    if (naam === "Kaas") emoji = "🧀";
    if (naam === "Tomaat") emoji = "🍅";
    if (naam === "Pepperoni") emoji = "🍖";
    if (naam === "Ananas") emoji = "🍍";

    knop.textContent = emoji + " " + naam;
    knop.addEventListener("click", function() {
      voegToppingToe(naam);
    });

    buttonsContainer.appendChild(knop);
  });

  const serveerKnop = document.createElement("button");
  serveerKnop.textContent = "🍽️ Serveer de pizza!";
  serveerKnop.addEventListener("click", serveerPizza);
  buttonsContainer.appendChild(serveerKnop);

  werkKnop.addEventListener("click", werkVoorGeld);
});
