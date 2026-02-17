# Quick Quiz

## 📃 Description
This is a simple quiz generation web application.

It is locally hosted for now, but will soon be pushed to Github Pages or Vercel.

## ⭐ Features
- Clean UI for testing knowledge
- Explanations upon answering
- Score tabulation and calculation

## ✏️ Usage
### Uploading Data
For now file uploads are not supported, it will be statically loaded as the file `quizData.js`. It accepts the following format:

**Example:**
```
const quizData = [
  {
    question: "What does SMB stand for?",
    choices: [
      "Server Message Block",
      "Simple Mail Bridge",
      "Secure Message Broker",
      "System Memory Buffer"
    ],
    correctIndex: 0,
    explanation: "SMB stands for Server Message Block, a protocol used for file and printer sharing in Windows networks."
  },
  {
    question: "Which port does HTTP typically use?",
    choices: [
      "21",
      "22",
      "80",
      "443"
    ],
    correctIndex: 2,
    explanation: "HTTP typically runs on port 80. Port 443 is used for HTTPS."
  }
];
```

### Hosting
Hosting is currently local.
