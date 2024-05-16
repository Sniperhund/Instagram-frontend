var images = document.querySelectorAll("#profil-gallery img")
var postModal = document.querySelector(".post-modal")
var postImage = document.getElementById("post-modal-image")

console.log(images)

images.forEach((image) => {
    image.addEventListener("click", function () {
        postImage.src = this.src
        toggleModal()
    })
})

function toggleModal() {
    postModal.classList.toggle("active")
}
