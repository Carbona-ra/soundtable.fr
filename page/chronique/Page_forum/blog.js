function sendMessage() {
    var username = document.getElementById("username").value;
    var message = document.getElementById("message").value;

    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<p><strong>${username}:</strong> ${message}</p>`;

    playNotificationSound();
}

function playNotificationSound() {
    var audio = document.getElementById("notificationSound");

    if (audio.readyState >= 2) {
        audio.currentTime = 0; 
        audio.play();
    } else {
        audio.addEventListener("canplaythrough", function onCanPlayThrough() {
            audio.currentTime = 0; 
            audio.play();

            audio.removeEventListener("canplaythrough", onCanPlayThrough);
        });
    }
}