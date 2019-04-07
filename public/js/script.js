const form = document.querySelector('form')
const input = document.querySelector('input')
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")



form.addEventListener('submit', e => {
    e.preventDefault()
    const address = input.value;

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                message1.textContent = `Error: ${data.error}`
            } else {
                message1.textContent = `LOCATION: ${data.location} (${data.temperature} deg)`
                message2.textContent = `SUMMARY: ${data.summary}`
            }
        })
    })
})