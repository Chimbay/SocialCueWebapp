const emotion = document.getElementsByClassName("emotion")
const modal = document.getElementById("emotion-modal")
const modalEmotionHeading = document.getElementById("emotion-heading")
const modalEmotionDescription = document.getElementById("emotion-description")
const modalExitButton = document.getElementById("exit")

modalExitButton.addEventListener("click", () => {
    modal.close()
})

const emotionDescriptions = {
    Happy: "Imagine feeling like you're a shiny balloon, floating high in the sky with a big, warm smile on your face. Your heart feels as light as a feather, and there's a sparkle in your eyes like stars in the night sky. You might feel like jumping for joy or dancing around because everything feels so wonderful and bright!",
    Sad: "Picture a rainy day when the clouds cover the sky, and you feel like a droopy flower. Your heart feels heavy, like a rock sinking in a pond. Tears might fill your eyes, and you might want to hug your favorite stuffed animal tight for comfort. It's okay to feel sad sometimes, just like the rain, it will pass.",
    Angry: "When you're angry, it's like a storm brewing inside you. Your face might feel hot, and your fists might clench tight. You might want to stomp your feet or yell loudly to let out all that fiery feeling. But remember, it's important to calm the storm and talk about what's making you angry.",
    Surprised: "Imagine opening a present and finding your favorite toy inside when you least expect it! Your eyes widen like big, round saucers, and your mouth might drop open in amazement. It's like a delightful shock that makes your heart race with excitement.",
    Scared: "Feeling scared is like being in a dark forest with shadows creeping around. Your heart might beat fast like a drum, and you might feel jittery like a leaf in the wind. It's okay to feel scared sometimes, just remember there's always a flashlight of courage to guide you through the darkness.",
    Anxious: "Anxiety feels like a little bug buzzing around in your tummy, making you feel jittery and restless. Your mind might race like a speedy car, and you might find it hard to sit still. It's important to take deep breaths and remember that everything will be okay, even if it feels a bit overwhelming right now."
}

for (const element of emotion) {
    element.addEventListener("click", () => {
        modal.showModal()
        modalEmotionHeading.innerText = element.innerText
        modalEmotionDescription.innerText = emotionDescriptions[element.innerText]
    })
}
