// 1. FETCH GET to API_URL + "/greetings/admin" with credentials: "include". 
// Use async/await and try/catch to handle the response and any errors that may occur. 
// If the response is successful, display the data.message in #greeting
const usersElement = document.getElementById('users');

async function fetchGreeting() {
    try {
        const response = await fetch(API_URL + "/greetings/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if  (response.status === 401 || response.status === 403) {
            window.location.href = "index.html?message=You must be logged in to view this page";
        }

        const data = await response.json();
        console.log(response)
        if (response.ok) {
            // 2. Display the data.message in #greeting in a green fashioned label. Use bootstraps classes
            document.getElementById("greeting").className = "alert alert-success";
            document.getElementById("greeting").textContent = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchGreeting();

// fetch user
const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL + '/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href =
                'index.html?message=You must be logged in to view this page';
            return;
        }

        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        usersElement.innerHTML =
            'Oops something went wrong. Please try again later!';
        console.log(error);
    }
};

function renderUsers(users) {
    usersElement.innerHTML = users
        .map(
            (user) => `
    <div class="d-flex justify-content-between align-items-center border-bottom py-2">
      <p class="mb-0">
        ${user.username}
        ${user.is_admin ? '<span class="badge bg-primary ms-2">Admin</span>' : ''}
      </p>
      <small class="text-muted">Joined: ${formatDate(user.created_at)}</small>
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
    </div>`,
        )
        .join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const deleteUser = async (id) => {
    try {
        await fetch(API_URL + `/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        fetchUsers();
    } catch (error) {
        usersElement.innerHTML =
            'Oops something went wrong. Please try again later!';
        console.log(error);
    }
};

fetchGreeting();
fetchUsers();

// 2. Create an addEventlistener for the logout button on click. The buttons ID is "#logout-btn"
document.getElementById("logout-btn").addEventListener("click", function(event) {
    event.preventDefault();
    // 3. Should make a POST request to API_URL + "/auth/logout", with credentials: "include"
    async function logout() {
        try {
            const response = await fetch(API_URL + "/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await response.json();
            // 4. On success, redirect to login.html. On failure display an error message in #logout-message
            if (response.ok) {
                window.location.href = "index.html";
            } else {
                // 5. Make the error message display in a red fashioned label. Use bootstraps classes 
                document.getElementById("logout-message").className = "alert alert-danger";
                document.getElementById("logout-message").innerHTML = "Logout failed. Please try again";
            }
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    logout();
});