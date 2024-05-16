var profilGallery = document.getElementById("profil-gallery")

fetch("https://instagrom.masrmedia.dk/api/user", {
    headers: {
        Authorization: getCookie("accessToken"),
    },
})
    .then((res) => res.json())
    .then((data) => {
        var profileImages = "https://instagrom.masrmedia.dk/" + data.images

        for (let imageSrc of profileImages) {
            var image = profilGallery.createElement("img")

            image.src = "https://instagrom.masrmedia.dk/" + data.avatar
        }
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
