 document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("studentlogin.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {

            if (data.status === "success") {
                message.style.color = "white";
                message.innerText = data.message;

                setTimeout(() => {
                    window.location.href = "studentdashboards.php";
                }, 1500);

            } else {
                message.style.color = "yellow";
                message.innerText = data.message;
            }

        })
        .catch(() => {
            message.innerText = "Server error!";
        });
    });
});