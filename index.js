const feed = document.getElementById("feed-container")

function fetchFeed() {
    fetch("https://instagrom.masrmedia.dk/api/posts", {
        headers: {
            Authorization: getCookie("accessToken"),
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            for (let post of data) {
                const postElement = document.createElement("div")
                postElement.classList.add("post")

                postElement.innerHTML = `
                <ul class="post-top">
                    <li>
                        <img
                            src="https://instagrom.masrmedia.dk/${post.author.avatar}"
                            class="profilePicture"
                        />
                    </li>
                    <li><h2>${post.author.username}</h2></li>
                    <li>
                        <a href="#"><i class="fa-solid fa-ellipsis"></i></a>
                    </li>
                </ul>
                <img src="https://instagrom.masrmedia.dk/${post.image}" alt="" style="max-width: 1000px" />
                <ul class="post-bar">
                    <li>
                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                    </li>
                    <li>
                        <a href="#"
                            ><i
                                class="fa-regular fa-comment"
                            ></i
                        ></a>
                    </li>
                    <li>
                        <a href="#"
                            ><i class="fa-regular fa-paper-plane"></i
                        ></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa-regular fa-bookmark"></i></a>
                    </li>
                </ul>
                <div class="post-description">
                    <p>69 Synes godt om</p>
                    <p>
                        <strong>${post.author.username}</strong> ${post.content}
                    </p>
                </div>`

                feed.appendChild(postElement)
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

fetchFeed()
