document.getElementById('ano').textContent = new Date().getFullYear();

document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const icon = item.querySelector('.faq-icon');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    icon.textContent = isOpen ? '–' : '+';
  });
});

const form = document.getElementById('quote-form');

const validators = {
  nome: (value) => (value.trim().length < 2 ? 'Digite seu nome completo.' : ''),
  origem: (value) => (value.trim().length < 3 ? 'Diz de onde a carga sai.' : ''),
  destino: (value) => (value.trim().length < 3 ? 'Diz pra onde a carga vai.' : ''),
  tipo: (value) => (!value ? 'Selecione o tipo de carga.' : '')
};

const getFieldEls = (name) => {
  const input = form.elements[name];
  const label = input.closest('.field');
  const help = label.querySelector('.field-help');
  return { input, label, help };
};

const validateField = (name) => {
  const validate = validators[name];
  if (!validate) return true;
  const { input, label, help } = getFieldEls(name);
  const mensagem = validate(input.value);
  const valido = !mensagem;
  label.classList.toggle('has-error', !valido);
  input.setAttribute('aria-invalid', String(!valido));
  help.textContent = valido ? help.dataset.default : mensagem;
  return valido;
};

Object.keys(validators).forEach((name) => {
  const { input } = getFieldEls(name);
  input.addEventListener('blur', () => validateField(name));
  input.addEventListener('input', () => {
    if (input.closest('.field').classList.contains('has-error')) validateField(name);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.currentTarget;
  const v = (name) => (f.elements[name]?.value || '').trim();

  const validacoes = Object.keys(validators).map((name) => validateField(name));
  if (validacoes.includes(false)) {
    const primeiroInvalido = Object.keys(validators).find((name) => !validateField(name));
    getFieldEls(primeiroInvalido).input.focus();
    return;
  }

  const formatarData = (iso) => {
    if (!iso) return 'a combinar';
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const linhas = [
    'Olá! Quero um orçamento de frete.',
    '',
    'Nome: ' + v('nome'),
    'Origem: ' + v('origem'),
    'Destino: ' + v('destino'),
    'Tipo de carga: ' + v('tipo'),
    'Data: ' + formatarData(v('data')),
    'Observações: ' + (v('obs') || '—')
  ];

  const url = 'https://wa.me/5592999842312?text=' + encodeURIComponent(linhas.join('\n'));
  window.open(url, '_blank', 'noopener');
});
