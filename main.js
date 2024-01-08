const urlApi = "https:/api.genderize.io";

const inputElement = document.getElementById("inputname");

function showResult(name, gender, probability) {
  const predictElement = document.getElementById("predictionresult");
  const probabilityPercentage = probability * 100;

  // console.log(name, gender, probability);

  const predictionText = `Hello ${name}, your probability gender is ${gender} with percentage ${probabilityPercentage}%`;
  // console.log(predictionText);

  predictElement.textContent = predictionText;

  blurImage(gender);

}

function blurImage(predictedGender) {
  const maleImg = document.getElementById("male-img");
  const femaleImg = document.getElementById("female-img");

  maleImg.style.filter = "none";
  femaleImg.style.filter = "none";

  if (predictedGender === "male") {
    femaleImg.style.filter = "blur(10px)";
  } else if(predictedGender === "female") {
    maleImg.style.filter = "blur(10px)";
  } else {
    console.log("None");
  }
}

async function predict(event) {
  if (event.key == "Enter") {
    const firstName = event.target.value;
    if (inputElement.value === "") {
      alert("please enter your first name");
      return;
    }
    const queryUrl = `${urlApi}/?name=${firstName}&country_id=DE`;
    const response = await fetch(queryUrl);

    // console.log(result);
    
    try {
      const result = await response.json();
      showResult(result.name, result.gender, result.probability);
      inputElement.value = "";
      
    } catch(error) {
        console.error("Error", error)
    }

  }
}
