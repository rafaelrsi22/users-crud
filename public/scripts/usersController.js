const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username-input');

const noUserWarn = document.getElementById('nouser-warn');

window.addEventListener('DOMContentLoaded', async () => {
    const users = await fetch('/users');
    const usersInfo = await users.json();
    
    if (usersInfo.length > 0) {
        noUserWarn.classList.add('d-none');
    }

    usersInfo.forEach((value) => {
        const id = value.id;

        insertUserRow(value, async () => {
            await fetch('/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams({ id }).toString()
            });

            location.reload();
        });
    });
});

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value;
    await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({ username }).toString()
    });

    location.reload();
});