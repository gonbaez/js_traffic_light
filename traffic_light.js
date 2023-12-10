// 1. Wire up the buttons to the lights

// You'll have to select and store the lights as a variable (although it may help you later to have a reference to all of them at once via the 'light' class)

// You'll have to select and store the buttons as separate variables

// then, add an event listener to each of the buttons

// in the 'handler' (the function you give to the listener) you add a class of 'on' to the relevant light

// Also make the lights go on and off on hover (of the light!!)

// 2. (Extra credit): Have a go at making it so that only one light can be on at one time

// 3. (wild&crazy credit) See if you can set up a timer of some sort to do that automatically (You'll have to add new start and stop buttons to the page)

const { log } = console;

document.addEventListener("DOMContentLoaded", () => {
  // Turn all lights off function
  const allLightsOff = function () {
    Array.from(document.getElementsByClassName("light")).forEach((light) => {
      light.classList.remove("on");
    });
  };

  // Footer button click
  const footerButtonClick = function (e, turnOff = true) {
    if (e.target.tagName == "BUTTON") {
      if (document.querySelector(`.${e.target.id}`).classList.contains("on")) {
        document.querySelector(`.${e.target.id}`).classList.remove("on");
      } else {
        if (turnOff) {
          allLightsOff();
        }
        document.querySelector(`.${e.target.id}`).classList.add("on");
      }
    }
  };

  // Turn light on with button
  document.querySelector("footer").addEventListener("click", footerButtonClick);

  // Lights on and off on hover
  const removeOnClassToLight = function (e) {
    e.target.classList.remove("on");
  };

  const addOnClassToLight = function (e) {
    allLightsOff();
    e.target.classList.add("on");
  };

  const addHover = function () {
    Array.from(document.getElementsByClassName("light")).forEach((light) => {
      light.addEventListener("mouseover", addOnClassToLight);

      light.addEventListener("mouseleave", removeOnClassToLight);
    });
  };

  const removeHover = function () {
    Array.from(document.getElementsByClassName("light")).forEach((light) => {
      light.removeEventListener("mouseover", addOnClassToLight);

      light.removeEventListener("mouseleave", removeOnClassToLight);
    });
  };

  addHover();

  // AUTOMATIC LIGHTS

  let timer;

  let i = 0;

  const sequence = [
    { duration: 1000, items: ["stop"] },
    { duration: 2000, items: ["stop", "caution"] },
    { duration: 3000, items: ["caution"] },
    { duration: 500, items: [] },
    { duration: 500, items: ["caution"] },
    { duration: 500, items: [] },
    { duration: 500, items: ["caution"] },
    { duration: 500, items: [] },
    { duration: 500, items: ["caution"] },
    { duration: 5000, items: ["go"] },
  ];

  function next() {
    allLightsOff();
    for (let j = 0; j < sequence[i].items.length; j++) {
      footerButtonClick(
        { target: { id: sequence[i].items[j], tagName: "BUTTON" } },
        j == 0
      );
    }

    timer = setTimeout(() => {
      next();
    }, sequence[i].duration);

    i++;

    if (i >= sequence.length) {
      i = 0;
    }
  }

  // Start and Stop buttons
  document.querySelector("header").addEventListener("click", (e) => {
    if (e.target.id === "start-timer") {
      // Clear existing timeout just in case.
      clearTimeout(timer);

      // Always start sequence from 0
      i = 0;

      // Remove hover from lights
      removeHover();

      // Remove listener from footer
      document
        .querySelector("footer")
        .removeEventListener("click", footerButtonClick);

      next();
    } else {
      clearTimeout(timer);

      allLightsOff();

      // Add hover
      addHover();

      // Add footer button click
      document
        .querySelector("footer")
        .addEventListener("click", footerButtonClick);
    }
  });
});
