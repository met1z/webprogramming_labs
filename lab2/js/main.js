function displayMediaItems() {
	const mediaList = document.getElementById('media-list')
	if (!mediaList) return
	mediaList.innerHTML = ''

	const mediaStorage = JSON.parse(localStorage.getItem('media')) || []

	mediaStorage.forEach(media => {
		const mediaItem = document.createElement('div')
		mediaItem.classList.add('media-list-item')

		mediaItem.innerHTML = `
			<h3>${media.title}</h3>
			<p>Описание: ${media.description}</p>
			<p>Тип: ${media.type}</p>
			<p>Дата: ${media.date}</p>
		`

		mediaList.appendChild(mediaItem)
	})
}

function showFormBasedOnUserStatus() {
	const user = JSON.parse(localStorage.getItem('user'))
	if (!document.getElementById('login-form')) return

	console.log(user)

	if (user) {
		document.getElementById('login-form').classList.remove('hidden')
	} else {
		document.getElementById('register-form').classList.remove('hidden')
	}
}

window.onload = () => {
	displayMediaItems()
	showFormBasedOnUserStatus()
}

document.addEventListener('DOMContentLoaded', function () {
	if (document.querySelector('#slider')) {
		let currentSlide = 0
		const slides = document.querySelectorAll('.slide')
		setInterval(() => {
			slides[currentSlide].classList.remove('active')
			currentSlide = (currentSlide + 1) % slides.length
			slides[currentSlide].classList.add('active')
		}, 5000)

		document.getElementById('change-bg').addEventListener('click', function () {
			document.body.style.backgroundColor =
				document.body.style.backgroundColor === 'lightblue'
					? '#f0f0f0'
					: 'lightblue'
		})
	}

	if (document.querySelector('#gallery')) {
		document
			.getElementById('filter-weekday')
			.addEventListener('click', function () {
				document.querySelectorAll('.media-item').forEach(item => {
					item.style.display = item.classList.contains('weekday')
						? 'block'
						: 'none'
				})
			})

		document
			.getElementById('filter-holiday')
			.addEventListener('click', function () {
				document.querySelectorAll('.media-item').forEach(item => {
					item.style.display = item.classList.contains('holiday')
						? 'block'
						: 'none'
				})
			})

		document
			.getElementById('filter-all')
			.addEventListener('click', function () {
				document.querySelectorAll('.media-item').forEach(item => {
					item.style.display = 'block'
				})
			})
	}

	if (document.querySelector('#upload-form')) {
		document
			.getElementById('upload-form')
			.addEventListener('submit', function (event) {
				event.preventDefault()

				const media = {
					title: document.getElementById('title').value,
					description: document.getElementById('description').value,
					type: document.getElementById('type').value,
					date: document.getElementById('date').value,
				}

				let mediaStorage = JSON.parse(localStorage.getItem('media')) || []
				mediaStorage.push(media)
				localStorage.setItem('media', JSON.stringify(mediaStorage))

				alert('Медиа загружено!')

				displayMediaItems()
			})
	}

	if (document.querySelector('#register-form')) {
		document
			.getElementById('register-form')
			.addEventListener('submit', function (event) {
				event.preventDefault()

				const name = document.getElementById('name').value
				const email = document.getElementById('email').value
				const password = document.getElementById('password').value
				const confirmPassword =
					document.getElementById('confirm-password').value

				if (password !== confirmPassword) {
					alert('Пароли не совпадают!')
					return
				}

				const user = { name, email, password }
				localStorage.setItem('user', JSON.stringify(user))
				alert('Регистрация успешна!')

				document.getElementById('register-form').classList.add('hidden')
				document.getElementById('login-form').classList.remove('hidden')
			})
	}

	if (document.querySelector('#login-form')) {
		document
			.getElementById('login-form')
			.addEventListener('submit', function (event) {
				event.preventDefault()

				const email = document.getElementById('login-email').value
				const password = document.getElementById('login-password').value
				const user = JSON.parse(localStorage.getItem('user'))

				if (user && user.email === email && user.password === password) {
					alert('Авторизация успешна!')
				} else {
					alert('Неверный email или пароль!')
				}
			})
	}

	if (document.querySelector('#contact-form')) {
		setInterval(() => {
			document.body.classList.toggle('night-mode')
		}, 10000)
	}
})
