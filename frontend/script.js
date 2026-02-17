function renderQuiz(quizData) {
  const scoreContainer = document.getElementById("score-container");
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML = "";
  scoreContainer.innerHTML = "";

  let score = 0;

  quizData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `Q${index + 1}: ${item.question}`;
    questionDiv.appendChild(questionTitle);

    item.choices.forEach((choiceText, choiceIndex) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choiceText;
      choiceButton.classList.add("choice");

      choiceButton.addEventListener("click", () => {
        // prevent multiple answers
        if (questionDiv.classList.contains("answered")) 
          return;

        questionDiv.classList.add("answered");

        if (choiceIndex === item.correctIndex) {
          choiceButton.classList.add("correct");
          score++;
        } else {
          choiceButton.classList.add("incorrect");
          // highlight correct answer
          questionDiv.querySelectorAll(".choice")[item.correctIndex].classList.add("correct");
        }

        const explanation = document.createElement("div");
        explanation.classList.add("explanation");
        explanation.textContent = "Explanation: " + item.explanation;
        questionDiv.appendChild(explanation);

        scoreContainer.textContent = `Score: ${score} / ${quizData.length}`;
      });

      questionDiv.appendChild(choiceButton);
    });

    quizContainer.appendChild(questionDiv);
  });
}

const uploadBtn = document.getElementById("upload-btn");
const fileUpload = document.getElementById("file-upload");
const output = document.getElementById("output");

uploadBtn.addEventListener("click", async () => {
  console.log("Upload button pressed!");
  const file = fileUpload.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    try {
      console.log("File loaded successfully!");
      const quizData = JSON.parse(event.target.result);
      renderQuiz(quizData);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
    }
  }

  reader.readAsText(file);
  
});

