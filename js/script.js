const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')

burger.addEventListener('click', () => {
	burger.classList.toggle('active')
	nav.classList.toggle('active')
})

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav a').forEach(link => {
	link.addEventListener('click', () => {
		burger.classList.remove('active')
		nav.classList.remove('active')
	})
})
