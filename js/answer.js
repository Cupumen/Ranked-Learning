document.addEventListener("DOMContentLoaded", function () {
    const answersContainer = document.getElementById("answers-list");
    const userAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];

    quizData.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<b>Soal ${index + 1}:</b> ${item.question} <br> 
                              <b>Jawaban Anda:</b> ${userAnswers[index] || "Belum Dijawab"}`;
        answersContainer.appendChild(listItem);
    });
});
