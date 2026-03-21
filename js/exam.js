const confirmButtons = document.querySelectorAll('.confirm')
const answersContainer = document.querySelector('.all__asnwers')
const resultContainer = document.querySelector('.result')

let score = 0

confirmButtons.forEach((btn, index) => {
	btn.addEventListener('click', e => {
		e.preventDefault()

		const correctIndexes = btn.dataset.correct.split(',').map(Number)

		const form = btn.previousElementSibling
		const inputs = form.querySelectorAll('input')

		const checkedInputs = Array.from(inputs).filter(i => i.checked)
		if (checkedInputs.length === 0) {
			alert('Խնդրում ենք ընտրել պատասխան:')
			return
		}

		let answeredCorrectly = true

		inputs.forEach((input, i) => {
			const label = input.parentElement
			const isCorrect = correctIndexes.includes(i)

			if (input.checked && isCorrect) {
				label.style.background = 'lightgreen'
			} else if (input.checked && !isCorrect) {
				label.style.background = '#ff6b6b'
				answeredCorrectly = false
			} else if (!input.checked && isCorrect) {
				label.style.background = 'lightgreen'
				answeredCorrectly = false
			}

			input.disabled = true
		})

		const ansDiv = document.createElement('div')
		ansDiv.classList.add('ans')
		ansDiv.textContent = index + 1
		ansDiv.style.background = answeredCorrectly ? '#00F700' : '#ff6b6b'
		answersContainer.append(ansDiv)

		if (answeredCorrectly) score++

		btn.remove()

		if (document.querySelectorAll('.ans').length === confirmButtons.length) {
			resultContainer.style.display = 'block'
			resultContainer.innerHTML = `
				Ճիշտ պատասխաններ՝ ${score} / ${confirmButtons.length} <br>
				<button id="retryBtn" class="btn btn-primary" style="margin-top:10px;">
					Կրկին փորձել
				</button>
			`

			const retryBtn = document.getElementById('retryBtn')
			retryBtn.addEventListener('click', () => {
				window.scrollTo(0, 0)
				setTimeout(() => location.reload(), 1000)
			})
		}
	})
})
