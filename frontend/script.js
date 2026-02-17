const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");

const uploadBtn = document.getElementById("upload-btn");
const pdfUpload = document.getElementById("pdf-upload");
const output = document.getElementById("output");

uploadBtn.addEventListener("click", async () => {
  console.log("Upload button clicked");
  const file = pdfUpload.files[0];

  if (!file) {
    alert("Please select a PDF file to upload.");
    return;
  }

  console.log(file);
});

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

      updateScore();
    });

    questionDiv.appendChild(choiceButton);
  });

  quizContainer.appendChild(questionDiv);
});

function updateScore() {
  scoreContainer.textContent = `Score: ${score} / ${quizData.length}`;
}