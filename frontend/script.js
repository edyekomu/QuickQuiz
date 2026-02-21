function renderQuiz(quizData) {
  const scoreContainer = document.getElementById("score-container");
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML = "";
  scoreContainer.innerHTML = "";

  let score = 0;

  quizData.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className =
      "mb-6 p-4 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700";

    const questionTitle = document.createElement("h3");
    questionTitle.className = "font-semibold text-lg mb-3";
    questionTitle.textContent = `Q${index + 1}: ${item.question}`;
    questionDiv.appendChild(questionTitle);

    item.choices.forEach((choiceText, choiceIndex) => {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choiceText;

      choiceButton.className =
        "block w-full text-left px-4 py-2 mb-2 rounded border " +
        "border-gray-300 dark:border-gray-600 " +
        "bg-gray-100 dark:bg-gray-800 " +
        "hover:bg-gray-200 dark:hover:bg-gray-700 transition";

      choiceButton.addEventListener("click", () => {
        if (questionDiv.dataset.answered) return;
        questionDiv.dataset.answered = "true";

        const buttons = questionDiv.querySelectorAll("button");

        if (choiceIndex === item.correctIndex) {
          choiceButton.classList.remove("bg-gray-100", "dark:bg-gray-800");
          choiceButton.classList.add(
            "bg-green-500",
            "text-white",
            "border-green-600"
          );
          score++;
        } else {
          choiceButton.classList.remove("bg-gray-100", "dark:bg-gray-800");
          choiceButton.classList.add(
            "bg-red-500",
            "text-white",
            "border-red-600"
          );

          const correctBtn = buttons[item.correctIndex];
          correctBtn.classList.remove("bg-gray-100", "dark:bg-gray-800");
          correctBtn.classList.add(
            "bg-green-500",
            "text-white",
            "border-green-600"
          );
        }

        const explanation = document.createElement("div");
        explanation.className =
          "mt-3 p-3 rounded bg-gray-100 dark:bg-gray-800 text-sm";
        explanation.textContent = "Explanation: " + item.explanation;
        questionDiv.appendChild(explanation);

        scoreContainer.textContent = `Score: ${score} / ${quizData.length}`;
        scoreContainer.className =
          "mt-4 text-lg font-semibold text-center";
      });

      questionDiv.appendChild(choiceButton);
    });

    quizContainer.appendChild(questionDiv);
  });
}

// File upload logic
const uploadBtn = document.getElementById("upload-btn");
const fileUpload = document.getElementById("file-upload");
const output = document.getElementById("output");

uploadBtn.addEventListener("click", () => {
  const file = fileUpload.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const quizData = JSON.parse(event.target.result);
      renderQuiz(quizData);
    } catch (error) {
      console.error("Invalid JSON file:", error);
    }
  };

  reader.readAsText(file);
});