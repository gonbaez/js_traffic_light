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

  const buttonClick = function (e) {
    if (document.querySelector(`.${e.target.id}`).classList.contains("on")) {
      document.querySelector(`.${e.target.id}`).classList.remove("on");
    } else {
      document.querySelector(`.${e.target.id}`).classList.add("on");
    }
  };

  // Turn light on with button
  document.querySelector("footer").addEventListener("click", buttonClick);

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

  // Automatic light
  const startAutomaticLights = function () {
    // Remove hover from lights
    removeHover();

    // Remove listener from footer
    document.querySelector("footer").removeEventListener("click", buttonClick);

    // Start timers
    automaticLights.start();
  };

  const stopAutomaticLights = function () {
    // Stop timer
    automaticLights.stop();

    // Add hover
    addHover();

    // Add listener to footer
    document.querySelector("footer").addEventListener("click", buttonClick);
  };

  const automaticLights = {
    stopTime: 3000,
    cautionTime: 1000,
    goTime: 5000,

    start() {
      // Do one loop outside while we wait for the interval
      allLightsOff();
      buttonClick({ target: { id: "stop" } });

      this.timeOutIds = [];

      this.timeOutIds.push(
        setTimeout(() => {
          buttonClick({ target: { id: "caution" } });

          this.timeOutIds.push(
            setTimeout(() => {
              allLightsOff();
              buttonClick({ target: { id: "go" } });

              this.timeOutIds.push(
                setTimeout(() => {
                  allLightsOff();
                  buttonClick({ target: { id: "stop" } });
                }, this.goTime)
              );
            }, this.cautionTime)
          );
        }, this.stopTime)
      );

      // Interval loop
      this.intervalId = setInterval(() => {
        this.timeOutIds.push(
          setTimeout(() => {
            buttonClick({ target: { id: "caution" } });
            this.timeOutIds.push(
              setTimeout(() => {
                allLightsOff();
                buttonClick({ target: { id: "go" } });
                this.timeOutIds.push(
                  setTimeout(() => {
                    allLightsOff();
                    buttonClick({ target: { id: "stop" } });
                  }, this.goTime)
                );
              }, this.cautionTime)
            );
          }, this.stopTime)
        );
      }, this.goTime + this.stopTime + this.cautionTime);
    },

    stop() {
      clearInterval(this.intervalId);
      this.timeOutIds.forEach((itemId) => {
        clearTimeout(itemId);
      });
      allLightsOff();
    },
  };

  // Start and Stop buttons
  document.querySelector("header").addEventListener("click", (e) => {
    if (e.target.id === "start-timer") {
      startAutomaticLights();
    } else {
      stopAutomaticLights();
    }
  });
});
