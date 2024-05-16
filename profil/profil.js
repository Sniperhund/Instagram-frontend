var profilGallery = document.getElementById("profil-gallery")

fetch("https://instagrom.masrmedia.dk/api/user", {
    headers: {
        Authorization: getCookie("accessToken"),
    },
})
    .then((res) => res.json())
    .then((data) => {
        fetch("https://instagrom.masrmedia.dk/api/user/"+window.user.id+"/posts", {
    headers: {
        Authorization: getCookie("accessToken"),
    },
})
    .then((res) => res.json())
    .then((data) => {
        for (let post of data) {
            const postImg = document.createElement("img")
            postImg.src = `https://instagrom.masrmedia.dk/${post.image}`
            profilGallery.appendChild(postImg)
        }
    }).catch((err) => {
        console.error(err)
    })
        var profileImages = document.querySelectorAll(".profilePicture")

        for (let imageSrc of profileImages) {
            imageSrc.src = `https://instagrom.masrmedia.dk/${data.avatar}`
        }

        var brugernavn = document.getElementById("username")
        brugernavn.innerText = data.username
        var fullName = document.querySelector(".profil-fullname")
        fullName.innerText = data.fullName
    })
    .catch((err) => {
        console.error(err)
    })

var images = document.querySelectorAll("#profil-gallery img")
var postModal = document.querySelector(".post-modal")
var postImage = document.getElementById("post-modal-image")

images.forEach((image) => {
    image.addEventListener("click", function () {
        postImage.src = this.src
        toggleModal()
    })
})

function toggleModal() {
    postModal.classList.toggle("active")
}
