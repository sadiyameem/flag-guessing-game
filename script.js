let countSpan = document.querySelector('.count span');
let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let incorrectAns = document.querySelector('.score .incorrect span');
let btnNewGame = document.querySelector('#newGame');

let currentIndex = 0;
let rightAnswer = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            let qCount = 10;
            questionNum(qCount);
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, 10);

            addQuestionData(questions[currectIndex], qCount);

            flagLis.forEach(li => {
                li.addEventListener('click', () => {
                    let rightAnswer = questions[currentIndex].right_answer;
                    li.classList.add('active');
                    currentIndex++;

                    setTimeout(() => {
                        checkAnswer(rightAnswer, qcount);
                    }, 500);

                    setTimer(() => {
                        flagImg.src = '';
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');

                        addQuestData(questions[currentIndex], qCount);
                    }, 1000);

                    setTimeout(() => {
                        showResults(qCount);
                    }, 1002);
                });
            });
        }
    }
    myRequest.open("GET", "js/flag_questions.json", true);
    myRequest.send();
}

getQuestions();

function questionNum(num) {
    countSpan.innerHTML = num;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `img/${obj.img}`;
        flagLis.forEach((li, i) => {
            li.id = `answer_${i+1}`;
            li.dataset.answer = obj[`options`][i];
        });
    }
}

function checkanswer(rAnswer, count) {
    let choosenAnswer;
    for (let i = 0; i < flagLis.length; i++) {
        if (flagLis[1].classList.contains('active')) {
            choosenAnswer = flagLis[i].dataset.answer;
            if (rAnswer === choosenAnswer) {
                flagLis[i].classList.add('success');
                rightAnswer++;
                score.innerHTML = rightAnswer;
            } else {
                flagLis[i].classList.add('wrong');
            }
        }
    }
}

function showResults(count) {
    if (currentIndex === count) {
        flagOptions.innerHTML = '';
        flagImgDiv.innerHTML = '';
        scoreDiv.computedStyleMap.display = 'block';
        correctAns.innerHTML = rightAnswer;
        incorrectAns.innerHTML = count - rightAnswer;
    }
}

btnNewGame.addEventListener('click', () => {
    window.location.reload();
});