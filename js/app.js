
// Alternância de tema claro/escuro com persistência

document.addEventListener('DOMContentLoaded', function() {
	const btnTema = document.getElementById('btn-tema');
	const iconTema = document.getElementById('icon-tema');
	const body = document.body;

	function aplicarTema(tema) {
		if (tema === 'dark') {
			body.classList.add('dark');
			iconTema.textContent = '☀️';
		} else {
			body.classList.remove('dark');
			iconTema.textContent = '🌙';
		}
	}

	function alternarTema() {
		const temaAtual = body.classList.contains('dark') ? 'dark' : 'light';
		const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
		aplicarTema(novoTema);
		localStorage.setItem('tema', novoTema);
	}

	if (btnTema) {
		btnTema.addEventListener('click', alternarTema);
	}

	// Carregar preferência ao iniciar
	const temaSalvo = localStorage.getItem('tema');
	if (temaSalvo) {
		aplicarTema(temaSalvo);
	}
});
