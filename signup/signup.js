let inputs = document.getElementsByTagName("label")
let form = document.querySelector("form")

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

form.onsubmit = (e) => {
    e.preventDefault();
    let data = {}

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i].children[1]
        data[input.name] = input.value
    }

    fetch("https://instagrom.masrmedia.dk/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.accessToken) {
            setCookie("accessToken", data.accessToken, 1)
            window.location.assign("/")
        }
    })
    .catch(err => {
        console.error(err)
        alert("An error occurred")
    })
}