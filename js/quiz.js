class Question {
  constructor(jsonData) {
    this.category = jsonData.category;
    this.type = jsonData.type;
    this.difficulty = jsonData.difficulty;
    this.text = jsonData.question;
    this.correctAnswer = jsonData.correct_answer;
    this.choices = [jsonData.correct_answer, ...jsonData.incorrect_answers];
  }

  isCorrect(userAnswer) {
    return userAnswer === this.correctAnswer;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.possibleScore = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  answerCurrentQuestion(userAnswer) {
    const actualQuestion = this.getCurrentQuestion();

    let pointsForQuestion = 0;

    switch (actualQuestion.difficulty) {
      case 'easy':
        pointsForQuestion = 1;
        break;
      case 'medium':
        pointsForQuestion = 2;
        break;
      case 'hard':
        pointsForQuestion = 3;
        break;
      default:
        pointsForQuestion = 0;
    }

    if (actualQuestion.isCorrect(userAnswer)) {
      this.score += pointsForQuestion;
    }

    this.possibleScore += pointsForQuestion;
    this.currentQuestionIndex++;
  }

  isFinished() {
    return this.currentQuestionIndex === this.questions.length;
  }
}

let resultArray = [];
const localStorageKey = 'quiz-result';

const startLabel = document.querySelectorAll('label');
const startQuizNumberQuestion = document.querySelector('#quiz-number-question');
const startQuizDiff = document.querySelector('#quiz-difficulty');

const startQuizButton = document.querySelector('#quiz-start-button');

const nextButton = document.querySelector('#next-button');
const questionContainer = document.querySelector('#question-container');
const resultContainer = document.querySelector('#result-container');
const answerButtonsContainer = document.querySelector('#answer-buttons');

async function fetchQuestionsFromAPI(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results.map((jsonData) => new Question(jsonData));
  } catch (error) {
    console.error('Błąd pobierania danych z API:', error);
  }
}

function renderQuestion() {
  if (quiz.isFinished()) {
    showResult();
  } else {
    startQuizButton.style.display = 'none';
    startQuizDiff.style.display = 'none';
    startQuizNumberQuestion.style.display = 'none';

    startLabel.forEach((label) => {
      label.style.display = 'none';
    });

    nextButton.style.display = 'block';
    const currentQuestion = quiz.getCurrentQuestion();
    questionContainer.innerHTML = `<h2>${currentQuestion.text}</h2>
									   <p>Question difficulty: ${currentQuestion.difficulty}`;
    answerButtonsContainer.innerHTML = '';

    const sortedChoices = [...currentQuestion.choices];
    sortedChoices.sort();

    sortedChoices.forEach((choice) => {
      const answerButton = document.createElement('button');
      answerButton.textContent = choice;
      answerButton.classList.add('quiz-button');
      answerButtonsContainer.appendChild(answerButton);
      answerButton.addEventListener('click', () => handleAnswerClick(choice));
    });
    nextButton.disabled = true;
  }
}

function handleAnswerClick(userAnswer) {
  const answerButtons = answerButtonsContainer.querySelectorAll('.quiz-button');
  const currentQuestion = quiz.getCurrentQuestion();
  console.log(currentQuestion);

  answerButtons.forEach((button) => {
    button.disabled = true;

    if (button.textContent === userAnswer) {
      if (userAnswer === currentQuestion.correctAnswer) {
        button.style.backgroundColor = 'green';
      } else {
        button.style.backgroundColor = 'red';
      }
    }
    if (button.textContent === currentQuestion.correctAnswer) {
      button.style.backgroundColor = 'green';
    }
  });
  quiz.answerCurrentQuestion(userAnswer);

  nextButton.disabled = false;
  nextButton.addEventListener('click', renderQuestion);
}

function showResult() {
  questionContainer.innerHTML = '';
  nextButton.style.display = 'none';
  answerButtonsContainer.style.display = 'none';

  const resultListArray = getResultFromLocalStorage();

  if (resultListArray && resultListArray.length > 0) {
    const table = document.createElement('table');
    table.classList.add('result-table');

    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
    const headers = ['Score', 'Possible Score'];
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    const tableBody = table.createTBody();
    resultListArray.forEach((result) => {
      const row = tableBody.insertRow();
      const scoreCell = row.insertCell();
      scoreCell.textContent = result.score;
      const possibleScoreCell = row.insertCell();
      possibleScoreCell.textContent = result.possibleScore;
    });

    resultContainer.innerHTML = `<p>Your score: ${quiz.score} / ${quiz.possibleScore}</p>`;
    resultContainer.appendChild(table);
  } else {
    resultContainer.innerHTML = `<p>Your score: ${quiz.score} / ${quiz.possibleScore}</p>`;
  }

  const refreshButton = document.createElement('button');
  refreshButton.classList.add('quiz-start-button');
  refreshButton.textContent = 'PLAY AGAIN';

  resultContainer.appendChild(refreshButton);

  refreshButton.addEventListener('click', () => {
    location.reload();
  });

  const result = {
    score: quiz.score,
    possibleScore: quiz.possibleScore,
  };
  resultArray.push(result);
  updateLocalStorage(resultArray);
}

const updateLocalStorage = (newArray) => {
  const newArrayAsString = JSON.stringify(newArray);

  localStorage.setItem(localStorageKey, newArrayAsString);
};

const getResultFromLocalStorage = () => {
  const resultListAsString = localStorage.getItem(localStorageKey);
  return JSON.parse(resultListAsString);
};

async function startQuiz() {
  let apiQuestions = 0;

  const resultListArray = getResultFromLocalStorage();
  if (resultListArray != null) {
    resultArray = [...resultListArray];
  }

  startQuizButton.addEventListener('click', async () => {
    const difficulty = startQuizDiff.value;
    const questionCount = startQuizNumberQuestion.value;
    let apiUrl = `https://opentdb.com/api.php?amount=${questionCount}`;
    if (difficulty !== 'any') {
      apiUrl += `&difficulty=${difficulty}`;
    }
    apiQuestions = await fetchQuestionsFromAPI(apiUrl);
    quiz = new Quiz(apiQuestions);
    renderQuestion();
  });
}

startQuiz();
