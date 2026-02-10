const form = document.querySelector("form");
const users = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("input[type=text]").value.trim();
    const password = document.querySelector("input[type=password]").value.trim();
    
    if(!name || !password) {
        alert("Barcha maydonlarni to'ldiring...");
        return;
    }

    if(name.length  < 3 || password.length < 8) {
        alert("Foydalanuvchi nomi 3 ta password esa 8 ta belgidan ko'p bo'lishi shart");
        return;
    }

    if(!users.find(user => user.name === name && user.password === password)) {
        alert("Foydalanuvchi nomi yoki parol xato");
        return;
    } else{
        alert("Tizimga muffaqiyatli kirdingiz");

        setTimeout(() => {
            window.location = "../index.html";
        }, 1500)
    }

    form.reset();
})