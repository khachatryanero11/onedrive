const openBtn = document.getElementById('openTestsModal')
const modal = document.getElementById('testsModal')
const closeBtn = document.getElementById('closeTestsModal')
const modalLinks = document.querySelectorAll('.modal-link')

openBtn.addEventListener('click', e => {
	e.preventDefault()
	modal.classList.add('active')
})

closeBtn.addEventListener('click', () => {
	modal.classList.remove('active')
})

modal.addEventListener('click', e => {
	if (e.target === modal) {
		modal.classList.remove('active')
	}
})

modalLinks.forEach(link => {
	link.addEventListener('click', () => {
		modal.classList.remove('active')
	})
})

const swiper = new Swiper('.mySwiper', {
	spaceBetween: 20,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		clickable: true,
	},
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	breakpoints: {
		992: {
			spaceBetween: 20,
			slidesPerView: 3,
		},
		768: {
			spaceBetween: 10,
			slidesPerView: 2,
		},
		360: {
			spaceBetween: 10,
			slidesPerView: 1,
		},
	},
})

function openTab(evt, tabName) {
	var i, tabcontent, tablinks
	tabcontent = document.getElementsByClassName('tabcontent')
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none'
	}
	tablinks = document.getElementsByClassName('tablinks')
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '')
	}
	document.getElementById(tabName).style.display = 'block'
	evt.currentTarget.className += ' active'
}
