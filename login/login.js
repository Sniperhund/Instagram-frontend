let inputs = document.getElementsByTagName("label")

document.addEventListener("input", () => {
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i].children[1]

        if (input.value.length != 0) {
            inputs[i].classList.add("active")
        } else {
            inputs[i].classList.remove("active")
        }
    }
})
