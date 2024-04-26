const carousel = document.getElementsByClassName("carousel")[0]
const carouselButtons = document.getElementsByClassName("carousel-buttons")[0].children

setInterval(() => {
    if (carousel.scrollLeft !== 700) {
        carousel.scrollBy({ left: 1, top: 0, behavior: "smooth" })
    } else {
        carousel.scrollBy({ left: -800, top: 0, behavior: "smooth" })
    }
}, 4000)

console.log(carouselButtons)

for (let i = 0; i < carouselButtons.length; i++) {
    carouselButtons[i].addEventListener("click", () => {
        console.log("test")
        carousel.scrollTo({
            left: (i * 350), top: 0, behavior: "smooth"
        })
    })
}
