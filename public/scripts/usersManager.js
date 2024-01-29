const usersTable = document.getElementById('users-table');

function insertUserRow(info, onDelete) {
    const tableRow = document.createElement('tr');
    const usernameInput = document.createElement('input');
    const usernameCell = document.createElement('td');
    const creationCell = document.createElement('td');
    const updateCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    let lastUsernameInput = info.username;

    tableRow.id = `user-${info.id}`;

    usernameInput.value = info.username;
    creationCell.innerText = info.created_at;
    updateCell.innerText = info.updated_at;
    deleteButton.innerText = "Delete";

    usernameInput.autocomplete = "off";
    usernameInput.classList.add('input-read');
    usernameInput.type = "text";

    deleteButton.addEventListener('click', onDelete);

    usernameInput.addEventListener('focusout', () => {
        usernameInput.value = lastUsernameInput;
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('submit')
        }
    });

    deleteCell.appendChild(deleteButton);
    usernameCell.appendChild(usernameInput);
    tableRow.append(usernameCell, creationCell, updateCell, deleteCell);

    usersTable.appendChild(tableRow);
}