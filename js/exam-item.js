const confirmButtons = document.querySelectorAll('.confirm')
const resultContainer = document.querySelector('.result')
const timerEl = document.getElementById('timer')
const mainFinishBtn = document.getElementById('mainFinishBtn')

let score = 0
let timeLeft = 30 * 60

// Таймер
const timerInterval = setInterval(() => {
	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60
	timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`

	if (timeLeft <= 60) timerEl.classList.add('warning')
	if (timeLeft <= 0) finishExam()
	timeLeft--
}, 1000)

// Логика завершения
mainFinishBtn.addEventListener('click', () => {
	// Проверка: сколько вопросов отмечено
	const checkedRadios = document.querySelectorAll('input[type="radio"]:checked')

	if (checkedRadios.length < confirmButtons.length) {
		if (
			!confirm(
				`Կա բաց թողնված ${20 - checkedRadios.length} հարց: Ավարտե՞լ թեստը:`,
			)
		) {
			return
		}
	}

	finishExam()
})

function finishExam() {
	clearInterval(timerInterval)
	score = 0

	confirmButtons.forEach(btn => {
		const correctIndex = parseInt(btn.dataset.correct)
		const form = btn.previousElementSibling
		const inputs = form.querySelectorAll('input')

		let userAnswer = -1
		inputs.forEach((input, i) => {
			if (input.checked) userAnswer = i
			input.disabled = true // Блокируем выбор
		})

		// Красим результаты
		inputs.forEach((input, i) => {
			const label = input.parentElement
			if (i === correctIndex) {
				label.style.background = '#b6fcb6'
			} else if (userAnswer === i) {
				label.style.background = '#ffb3b3'
			}
		})

		if (userAnswer === correctIndex) score++
	})

	showFinalResult()
}

function showFinalResult() {
	const passed = score >= 18
	const maxExams = 60
	mainFinishBtn.style.display = 'none'

	const currentUrl = window.location.href
	const match = currentUrl.match(/exam(\d+)\.html/)

	let nextUrl = ''
	let showNextBtn = false
	if (match) {
		const currentNumber = parseInt(match[1])

		if (currentNumber < maxExams) {
			nextUrl = `exam${currentNumber + 1}.html`
			showNextBtn = true
		} else {
			nextUrl = 'index.html'
			showNextBtn = false
		}
	}

	resultContainer.style.display = 'block'
	resultContainer.style.background = passed ? '#28a745' : '#dc3545'

	resultContainer.innerHTML = `
    <h2 style="color: white">Թեստը ավարտված է</h2>
    <p style="color: white">Ճիշտ պատասխաններ՝ <strong>${score}</strong> / ${confirmButtons.length}</p>
    <p style="font-size: 18px; font-weight: bold; color: ${passed ? '#05ff05' : 'white'}">
      ${passed ? '🎉 Շնորհավորում ենք, Դուք հաջողությամբ անցաք թեստը' : '❌ Ցավոք, Դուք չանցաք թեստը'}
    </p>
    <button id="retryBtn" style="display: inline-block; font-weight: 400; font-size:14px;  padding: 10px 20px; cursor: pointer; background: #fff; text-decoration: none; color: #000; border-radius: 5px;">Կրկին փորձել</button>
    ${
			showNextBtn
				? `<a href="${nextUrl}" style="display: inline-block; font-weight: 400; font-size:14px; line-height: 123%; padding: 10px 20px; cursor: pointer; background: #fff; text-decoration: none; color: #000; border-radius: 5px;">Հաջորդը</a>`
				: `<a href="exam.html" style="display: inline-block; font-weight: 400; font-size:14px; line-height: 123%; padding: 10px 20px; cursor: pointer; background: #fff; text-decoration: none; color: #000; border-radius: 5px;">Բոլոր թեստերը</а>`
		}
		
		
  `

	const retryBtn = document.getElementById('retryBtn')
	retryBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		setTimeout(() => {
			location.reload()
		}, 1300)
	})
}
