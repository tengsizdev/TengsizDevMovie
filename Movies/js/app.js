window.addEventListener('DOMContentLoaded', () => {
	const loaderModal = document.querySelector('.loader-modal');

	let number = Math.floor(Math.random() * 500);
	const API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${number}`;

	const moviesList = document.querySelector('.movies-list');
	let movies;

	async function getMovies() {
		try {
			const response = await fetch(API);

			if (!response.ok) {
				throw new Error('Xatolik yuz berdi ' + response.status);
			}

			const data = await response.json();
			movies = data.results;

			render('');
		} catch (err) {
			console.log(err.message);
		} finally {
			loaderModal.classList.add('hidden');
		}
	}

	getMovies();

	function render(inputValue) {
		moviesList.textContent = '';

		let data = [...movies];

		const fragment = document.createDocumentFragment();

		data = data.filter((movie) =>
			movie.original_title.toLowerCase().includes(inputValue) || movie.overview.toLowerCase().includes(inputValue)
		);

		if (data.length === 0) {
			const text = document.createElement('p');
			const kinoNomi =
				inputValue[0].toUpperCase() + inputValue.slice(1, inputValue.length);
			text.textContent = `${kinoNomi} bunday kino mavjuda emas...`;
			text.style.marginTop = '250px';
			text.style.color = "white"
			moviesList.append(text);
		}

		data.forEach((movie) => {
			// Create elements
			const movieCard = document.createElement('div');
			const hover = document.createElement('div');
			const img = document.createElement('img');
			const content = document.createElement('div');
			const title = document.createElement('div');
			const name = document.createElement('h2');
			const til = document.createElement('span');
			const date = document.createElement('h4');
			const text = document.createElement("p");

			// Class qoshish
			movieCard.classList.add('movie');
			hover.classList.add('hover');
			content.classList.add('content');
			title.classList.add('title');

			// Text content
			name.textContent = movie.original_title;
			til.textContent = movie.original_language;
			date.textContent = movie.release_date;

			if(!movie.overview) {
				text.style.marginTop = "20px";
				text.textContent = 'Bu video haqida malumot topilmadi...';
			} else if(movie.overview.length > 200) {
				text.textContent = `${movie.overview.slice(0, 180)}...`;
			} else{
				text.style.marginTop = "10px";
				text.textContent = movie.overview;
			}

			img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
			img.alt = movie.title;

			// Append
			movieCard.append(hover, content);
			content.append(title, name, text);
			hover.append(img);
			title.append(date, til);
			fragment.append(movieCard);
		});

		moviesList.append(fragment);
	}

	const searchInput = document.querySelector('.input');

	searchInput.addEventListener('input', () => {
		render(searchInput.value.trim().toLowerCase());
	});

	const scrollTop = document.querySelector(".scroll-top");

	window.addEventListener("scroll", () => {
		if(window.scrollY > 300) {
			scrollTop.classList.remove("hidden")
		} else{
			scrollTop.classList.add("hidden");
		}
	});

	scrollTop.addEventListener("click", () => {
		window.scrollTo({
			top: 0
		});
	});
});