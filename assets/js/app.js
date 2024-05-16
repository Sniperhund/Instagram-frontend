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
    fetch("https://instagrom.masrmedia.dk/api/user", {
        headers: {
            Authorization: getCookie("accessToken"),
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const profiles = document.getElementsByClassName("profilePicture")

            for (let element of profiles) {
                element.src = data.avatar
            }
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
