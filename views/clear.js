const btn = document.getElementById('button');

btn.addEventListener('click', function handleClick(event) {
  // 👇️ if you are submitting a form (prevents page reload)
  event.preventDefault();

  const nameInput = document.getElementById('name');

  // Send value to server
  console.log(nameInput.value);

  // 👇️ clear input field
  nameInput.value = '';
});