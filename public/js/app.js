const date = document.querySelector('#input-date')
const form = document.querySelector('#form-date')
const utcMessage = document.querySelector('#message-utc')
const unixMessage = document.querySelector('#message-unix')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`/api/timestamp/${date.value}`).then(data => data.json())
    .then(res => {
      utcMessage.textContent = `Your timestamp in UTC is: ${res.utc}.`
      unixMessage.textContent = `In Unix, your timestamp is: ${res.unix}`
    })
})

