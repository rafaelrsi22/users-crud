const userForm = document.getElementById('user-form');
const usernameInput = document.getElementById('username-input');

const deleteButtons = document.getElementsByClassName('delete-button');
const usernameInputs = document.getElementsByClassName('input-read');

const noUserWarn = document.getElementById('nouser-warn');

async function deleteUser(id) {
    console.log(id)
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
    const rowId = button.parentElement.parentElement.id;
    const userId = parseInt(rowId.replace('user-', ''));

    button.addEventListener('click', () => deleteUser(userId));
}

for (const input of usernameInputs) {
    const lastValue = input.value;

    input.addEventListener('focusout', () => {
        input.value = lastValue;
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value !== lastValue) {
            console.log('update!');
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