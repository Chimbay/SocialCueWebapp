const carousel = document.getElementsByClassName("carousel")[0]
const carouselButtons = document.getElementsByClassName("carousel-button-container")[0].children
let interval = setInterval(carouselTimer, 4000)

function carouselTimer() {
    if (carousel.scrollLeft !== 1800) {
        carousel.scrollBy({ left: 900, top: 0, behavior: "smooth" })
    } else {
        carousel.scrollBy({ left: -1800, top: 0, behavior: "smooth" })
    }
}

for (let i = 0; i < carouselButtons.length; i++) {
    carouselButtons[i].addEventListener("click", () => {
        clearInterval(interval)
        carousel.scrollTo({
            left: (i * 900), top: 0, behavior: "smooth"
        })
        interval = setInterval(carouselTimer, 4000)
    })
}