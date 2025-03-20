document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("answer").addEventListener("input", validateInput);
});

function validateInput() {
    let input = document.getElementById("answer").value;
    let errorMessage = document.getElementById("error-message");

    let regex = /^\d+(\.\d{1})?$/;
    if (!regex.test(input) && input !== "") {
        errorMessage.textContent = "Jawaban harus berupa angka dengan satu desimal (e.g., 10.2)";
    } else {
        errorMessage.textContent = "";
    }
}

function saveAnswer() {
    let answer = document.getElementById("answer").value;
    if (!/^\d+(\.\d{1})?$/.test(answer)) {
        alert("Jawaban harus berupa angka dengan satu angka desimal!");
        return;
    }
    alert("Jawaban berhasil disimpan!");
}

function goToAnswerPage() {
    if (confirm("Apakah Anda yakin ingin mengumpulkan jawaban?")) {
        window.location.href = "answer.html";
    }
}
