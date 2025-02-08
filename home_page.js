window.onload = function() //ensures HTML is fully loaded before running javascript
{
    let storedUsername = localStorage.getItem("username");

    console.log("Retrieved username:", storedUsername);

    if (storedUsername) {
        document.getElementById("userDisplay").textContent = storedUsername;
    }
}