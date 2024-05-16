var modalContainer = document.getElementById("modal-container")
const modal = document.getElementById("modal")

function toggleModal() {
    modalContainer.classList.toggle("open")
    modal.classList.toggle("animation")
}

function upload(e) {
    e.preventDefault()
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "image/*"
    fileInput.onchange = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
    
        fetch("https://instagrom.masrmedia.dk/api/user", {
            method: "PATCH",
            headers: {
                Authorization: getCookie("accessToken"),
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                updateProfilePicture()
                toggleModal()
            })
    }

    fileInput.click()
}

function remove(e) {
    e.preventDefault()

    fetch("https://instagrom.masrmedia.dk/api/user/"+window.user.id+"/avatar", {
        method: "DELETE",
        headers: {
            Authorization: getCookie("accessToken"),
        },
    })
        .then((res) => res.json())
        .then((data) => {
            updateProfilePicture()
            toggleModal()
        })
}

updateProfilePicture()