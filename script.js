let started = false;
let timer = 0;
let pauseValue = {};

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
function start() {
  if (started) {
    return;
  }
  started = true;
  let nobrs = [...document.querySelectorAll("nobr")].map(nobr => {
    return +nobr.textContent;
  });
  let [hh, mm, ss] = nobrs;
  timer = setInterval(startTimer, 100);
  function startTimer() {
    ss -= 1;
    if (ss < 0) {
      (ss = 59), (mm -= 1);
    }
    if (mm < 0) {
      (mm = 59), (hh -= 1);
    }

    if (hh < 0) {
      hh = 23;
    }
    if (ss + mm + hh === 0) {
      clearInterval(timer);
    }
    if (isEmpty(pauseValue)) {
      document.querySelector("#hh").innerText = ("" + hh).padStart(2, "0");
      document.querySelector("#mm").innerText = ("" + mm).padStart(2, "0");
      document.querySelector("#ss").innerText = ("" + ss).padStart(2, "0");
    } else {
      document.querySelector("#hh").innerText = ("" + pauseValue.hh).padStart(
        2,
        "0"
      );
      document.querySelector("#mm").innerText = ("" + pauseValue.mm).padStart(
        2,
        "0"
      );
      document.querySelector("#ss").innerText = ("" + pauseValue.ss).padStart(
        2,
        "0"
      );
      pauseValue = {};
    }
  }
}
function stop() {
  if (!started) {
    return;
  }
  started = false;
  document.querySelector("#hh").innerText = "00";
  document.querySelector("#mm").innerText = "05";
  document.querySelector("#ss").innerText = "00";
  clearInterval(timer);
}

function pause() {
  pauseValue.hh = document.querySelector("#hh").innerHTML;
  pauseValue.mm = document.querySelector("#mm").innerHTML;
  pauseValue.ss = document.querySelector("#ss").innerHTML;
  if (timer) {
    started = false;
    clearInterval(timer);
    timer = null;
  }
}
function showTimeChange(id) {
  let el = document.getElementById("select");
  if (el.style.display == "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}
function OnSelectionChange(select) {
  switch (select.id) {
    case "second":
      console.log("Second:", select.value);
      document.querySelector("#ss").innerText = ("" + select.value).padStart(
        2,
        `0 ${select.value}`
      );
      break;
    case "minutes":
      console.log("minutes:", select.value);
      document.querySelector("#mm").innerText = ("" + select.value).padStart(
        2,
        `0 ${select.value}`
      );
      break;
    case "hours":
      console.log("Hours:", select.value);
      document.querySelector("#hh").innerText = ("" + select.value).padStart(
        2,
        `0 + ${select.value}`
      );
      break;
    default:
  }
}



