const toppings = ["Kaas", "Tomaat", "Pepperoni", "Ananas"];
  const saldoDisplay = document.getElementById("saldo");
  const buttonsContainer = document.getElementById("buttons");
  const werkKnop = document.getElementById("work-button");
  const werkBericht = document.getElementById("work-message");
  const toppingsVak = document.getElementById("toppings-container");
  const stoomAfbeelding = document.getElementById("steam")
  
  let saldo = 1.00;
  const maxSaldo = 5.00;

  // Anneke Slagter heeft me geholpen met deze code //
  function toonSaldo() {
    saldoDisplay.textContent = "€" + saldo.toFixed(2);
  }

  function voegToppingToe(naamVanTopping) {
    if (saldo < 0.50) {
      werkBericht.style.display = "block";
      // Geluid bij geen geld: https://mixkit.co/free-sound-effects/game-over/
      new Audio("sounds/no-money.wav").play();
      return;
    }

    const afbeelding = document.createElement("img");

    // Toppings: https://nl.freepik.com/vrije-vector/set-van-pizza-elementen_4430118.htm
    afbeelding.src = "images/" + naamVanTopping + ".png";
    afbeelding.classList.add("topping");

    afbeelding.style.position = "absolute";
    afbeelding.style.left = "40px";
    afbeelding.style.top = "40px";

    toppingsVak.appendChild(afbeelding);

    saldo -= 0.50;
    toonSaldo();

      // ChatGPT-Prompt: "JavaScript: ik wil een geluid afspelen als de gekozen topping 'Ananas' is."
    if (naamVanTopping === "Ananas") {
      // Geluid bij ananas: (eigen bestand 'eww.m4a')
      new Audio("sounds/eww.m4a").play();
    }
  }

  function serveerPizza() {
    stoomAfbeelding.classList.add("steam-animate");
    stoomAfbeelding.style.opacity = "1";

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

    let emoji;
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
