document.querySelector(".usersearchBtn").addEventListener("click", async function() {
    const searchData = document.querySelector("#searchData").value;

    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();
        const matchingUser = users.find(user => user.username === searchData);

        if (matchingUser) {
            window.location.href = `/api/users/by-username/${encodeURIComponent(matchingUser.username)}`;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
});