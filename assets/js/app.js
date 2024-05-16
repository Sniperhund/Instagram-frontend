window.user = null

function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function checkIfLoggedIn() {
    if (getCookie("accessToken")) return

    if (
        window.location.pathname == "/login/" ||
        window.location.pathname == "/signup/"
    )
        return

    window.location.href = "/login/"
}

checkIfLoggedIn()

function updateProfilePicture() {
    getUser()
        .then((data) => {
            const profiles = document.getElementsByClassName("profilePicture")

            for (let element of profiles) {
                element.src = `https://instagrom.masrmedia.dk/${data.avatar}`
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

updateProfilePicture()

function more(event) {
    event.preventDefault()

    const ctxMenu = document.getElementById("context-menu")

    ctxMenu.classList.toggle("open")
}

function login(accesstoken) {
    setCookie("accessToken", accesstoken, 1)
    window.location.href = "/"
}

function logout(event) {
    event.preventDefault()

    setCookie("accessToken", "", -1)
    window.location.href = "/login/"
}

function getUser() {
    return new Promise((resolve, reject) => {
        if (!getCookie("accessToken")) reject("Not logged in")
        fetch("https://instagrom.masrmedia.dk/api/user", {
            headers: {
                Authorization: getCookie("accessToken"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.id = data._id
                window.user = data
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

getUser()

const modalOpretContainer = document.getElementById("upload-modal-container")

function toggleOpretModal() {
    modalOpretContainer.classList.toggle("active-opret")

    if (!modalOpretContainer.classList.contains("active-opret")) {
        const modalContent = document.getElementById("upload-modal-content")
        const firstStage = document.getElementById("first-stage")
        const secondStage = document.getElementById("second-stage")
        const delKnap = document.getElementById("del")

        firstStage.style.display = "flex"
        secondStage.style.display = "none"
        modalContent.classList.remove("content-second-stage")
        delKnap.style.display = "none"
    }
}

function uploadImage(event) {
    event.preventDefault()

    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*"
    fileInput.onchange = (e) => {
        const file = e.target.files[0]

        console.log(file)

        const modalContent = document.getElementById("upload-modal-content")
        const firstStage = document.getElementById("first-stage")
        const secondStage = document.getElementById("second-stage")
        const delKnap = document.getElementById("del")
        const image = document.getElementById("post-image")

        firstStage.style.display = "none"
        secondStage.style.display = "flex"
        modalContent.classList.add("content-second-stage")
        delKnap.style.display = "block"

        image.src = URL.createObjectURL(file)
    }

    fileInput.click()
}
