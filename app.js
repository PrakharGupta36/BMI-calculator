let height = document.getElementById("height");
let weight = document.getElementById("weight");
let answer = document.getElementById("answer");
const submit = document.getElementById("submit");

var audio = new Audio("click.mp3");
const ctx = document.getElementById("myChart").getContext("2d");
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
let BMI;
let BmiText;
let weightText;
let heightText;
let dateText;
let dataInner;
let dataContainerDiv = document.querySelector(".data-container");

let data = [];

function dataContainer() {
  BmiText = document.createElement("h4");
  weightText = document.createElement("p");
  heightText = document.createElement("p");
  dateText = document.createElement("p");
  dataInner = document.createElement("div");

  weightText.className = "weightText";
  dateText.className = "dateText";
  heightText.className = "heightText";
  dataInner.className = "data-inner";

  let dataTexts = [BmiText, weightText, heightText, dateText];

  for (let i = 0; i < dataTexts.length; i++) {
    dataInner.appendChild(dataTexts[i]);
  }
  dataContainerDiv.appendChild(dataInner);
}

dataContainer();

function map(arr) {
  dataContainerDiv.innerHTML = " ";
  let heading = document.createElement("h5");
  heading.textContent = `Recent BMI Data`;
  dataContainerDiv.appendChild(heading);
  arr.forEach((i) => {
    BmiText.innerText = `${i.bmi}`;
    weightText.innerText = `Weight: ${i.weight}kg`;
    heightText.innerText = `Height: ${i.height}cm`;
    dateText.innerText = `Date: ${i.date}`;
    dataContainer();
  });
}
function chart() {
  let labels = [];
  let BmiTables = [];

  labels.push(`${day}/${month}/${year}`);
  BmiTables.push(BMI.toFixed(2));

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "BMI Chart",
          data: BmiTables,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// chart()

if (localStorage.getItem("data") !== null) {
  data = JSON.parse(localStorage.getItem("data"));
  map(data);
}

submit.onclick = () => {
  audio.play();
  if (height.value.length > 0 && weight.value.length > 0) {
    BMI = weight.value / ((height.value / 100) * (height.value / 100));
    answer.innerText = `Your BMI is ${BMI.toFixed(2)}`;
    data.push({
      weight: weight.value,
      height: height.value,
      date: `${day}/${month}/${year}`,
      bmi: BMI.toFixed(2),
    });

    localStorage.setItem("data", JSON.stringify(data));
  } else {
    answer.innerText = `Provide a valid height or weight`;
  }

  map(data);

  answer.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 25e1,
    iterations: 1,
  });

  chart();
};

// localStorage.clear()
