const formTitle = document.getElementById('form-title');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = 'Register';
}

function showLoginForm() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Login';
}

// 1. Create an addEventlistener for the login button on click. The buttons ID is "#login-btn"
document
.getElementById('login-btn').addEventListener('click', function (event) {
        event.preventDefault();
        // 2. SHould make a POST request to API_URL + "/auth/login",
        // with a body of {username: "username", password: "password"}. login credentials should be hardcoded.
        // And include "credentials: "include"

        // 3. Use async/await and try/catch to handle the response and any errors that may occur. If the response is successful, console log the data returned from the server.
        async function login() {
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(API_URL + '/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                    credentials: 'include',
                });
                const data = await response.json();
                // 4 On success, redirect to protected.html. On failure display an error message in #login-message
                if (response.ok) {
                    window.location.href = 'protected.html';
                } else {
                    // 5. Make the error message display in a red fashioned label. Use bootstraps classes
                    document.getElementById('login-message').className =
                        'alert alert-danger';
                    document.getElementById('login-message').innerHTML =
                        'No account found with that username and password. <a href="#" id="go-to-register">Please register</a>';
                    
                    document
                        .getElementById('go-to-register')
                        .addEventListener('click', function (event) {
                            event.preventDefault();
                            showRegisterForm();
                        });
                }
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        login();
    });

// Register
document.getElementById('register-btn').addEventListener('click', function (event) {
        event.preventDefault();

        async function register() {
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;

            try {
                const response = await fetch(API_URL + '/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();

                if (response.ok) {
                    document.getElementById('register-message').className =
                        'alert alert-success';
                    document.getElementById('register-message').innerHTML =
                        'Registration successful! You can now <a href="#" id="go-to-login">log in</a>.';
                    document.getElementById('login-message').innerHTML = '';
                    document.getElementById('login-message').className = '';

                    document
                        .getElementById('go-to-login')
                        .addEventListener('click', function (event) {
                            event.preventDefault();
                            showLoginForm();
                            document.getElementById(
                                'register-message',
                            ).innerHTML = '';
                            document.getElementById(
                                'register-message',
                            ).className = '';
                        });
                } else {
                    document.getElementById('register-message').className =
                        'alert alert-danger';
                    document.getElementById('register-message').innerHTML =
                        data.message || 'Registration failed';
                }
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        register();
    });
