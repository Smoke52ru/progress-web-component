const progressComponent = document.querySelector('progress-circle')

const valueInput = document.querySelector("input#value")

valueInput.addEventListener('input', (e) => {
    let value = +e.target.value
    if (value > 100) {
        value = 100
        e.target.value = value
    } else if (value < 0) {
        value = 0
    }

    progressComponent.setAttribute('value', value.toString())
})

const animateInput = document.querySelector('input#animate')

animateInput.addEventListener('change', (e) => {
    const value = e.target.checked
    console.log('event', value)
    progressComponent.toggleAttribute('animated', value)
})

const hideInput = document.querySelector('input#hide')
hideInput.addEventListener('change', (e) => {
    const value = e.target.checked
    console.log('event', value)
    progressComponent.toggleAttribute('hide', value)
})