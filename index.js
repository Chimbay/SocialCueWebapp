const carousel = document.getElementsByClassName("carousel")[0]
const carouselItem = document.getElementsByClassName("carousel-item")[0]
const carouselButtons = document.getElementsByClassName("carousel-button-container")[0].children
let interval = setInterval(carouselTimer, 4000)

function carouselTimer() {
    if (carousel.scrollLeft !== carouselItem.width * 2) {
        carousel.scrollBy({ left: carouselItem.width, top: 0, behavior: "smooth" })
    } else {
        carousel.scrollBy({ left: -(carouselItem.width * 2), top: 0, behavior: "smooth" })
    }
}

for (let i = 0; i < carouselButtons.length; i++) {
    carouselButtons[i].addEventListener("click", () => {
        clearInterval(interval)
        carousel.scrollTo({
            left: (i * carouselItem.width), top: 0, behavior: "smooth"
        })
        interval = setInterval(carouselTimer, 4000)
    })
}
