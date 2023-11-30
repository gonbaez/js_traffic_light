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
  // Turn all lights off dunction
  const allLightsOff = function () {
    Array.from(document.getElementsByClassName("light")).forEach((light) => {
      light.classList.remove("on");
    });
  };

  // Turn light on with button
  document.querySelector("footer").addEventListener("click", (e) => {
    allLightsOff();
    document.querySelector(`.${e.target.id}`).classList.add("on");
  });

  // Lights on and off on hover
  Array.from(document.getElementsByClassName("light")).forEach((light) => {
    light.addEventListener("mouseover", (e) => {
      allLightsOff();
      e.target.classList.add("on");
    });

    light.addEventListener("mouseleave", (e) => {
      e.target.classList.remove("on");
    });
  });

  // Automatic light

  const refRedLight = document.querySelector(".light.stop");
  const refCautionLight = document.querySelector(".light.caution");
  const refGreenight = document.querySelector(".light.go");

  document.getElementById("start-timer").addEventListener("click", (e) => {
    allLightsOff();
    refRedLight.classList.add("on");

    const greenTime = 5000;
    const redTime = 3000;
    const cautionTime = 1000;

    setInterval(() => {
      setTimeout(() => {
        log("amber and red");

        refCautionLight.classList.add("on");

        setTimeout(() => {
          log("green");
          allLightsOff();
          refGreenight.classList.add("on");

          setTimeout(() => {
            log("red");
            allLightsOff();
            refRedLight.classList.add("on");
          }, greenTime);
        }, cautionTime);
      }, redTime);
    }, greenTime + redTime + cautionTime);
  });
});
