const carousel = document.getElementsByClassName("carousel")[0]

setInterval(() => {
    if (carousel.scrollLeft !== 700) {
        carousel.scrollBy({ left: 1, top: 0, behavior: "smooth" })
    } else {
        carousel.scrollBy({ left: -800, top: 0, behavior: "smooth" })
    }
}, 4000)
