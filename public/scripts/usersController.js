const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username-input');

const deleteButtons = document.getElementsByClassName('delete-button');
const profileButtons = document.getElementsByClassName('profile-button');
const usernameInputs = document.getElementsByClassName('input-read');

const noUserWarn = document.getElementById('nouser-warn');

function parseUserId(rowId) {
    return parseInt(rowId.replace('user-', ''));
}

async function deleteUser(id) {
    await fetch('/users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({ id }).toString()
    });

    location.reload();
}

for (const button of deleteButtons) {
    const userId = parseUserId(button.parentElement.parentElement.id);

    button.addEventListener('click', () => deleteUser(userId));
}

for (const button of profileButtons) {
    const userId = parseUserId(button.parentElement.parentElement.id);

    button.addEventListener('click', () => showModal(userId));
}

for (const input of usernameInputs) {
    const lastValue = input.value;

    input.addEventListener('focusout', () => {
        input.value = lastValue;
    });

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && input.value !== lastValue) {
            const userId = parseUserId(input.parentElement.parentElement.id);
            const newUsername = input.value;

            await fetch('/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams({ id: userId, username: newUsername }).toString()
            });

            location.reload();
        }
    });
}

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