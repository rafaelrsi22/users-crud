const usersTable = document.getElementById('users-table');

function insertUserRow(info, onDelete) {
    const tableRow = document.createElement('tr');
    const usernameCell = document.createElement('td');
    const creationCell = document.createElement('td');
    const updateCell = document.createElement('td');
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');

    tableRow.id = `user-${info.id}`;

    usernameCell.innerText = info.username;
    creationCell.innerText = info.created_at;
    updateCell.innerText = info.updated_at;
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener('click', onDelete);

    deleteCell.appendChild(deleteButton);
    tableRow.append(usernameCell, creationCell, updateCell, deleteCell);

    usersTable.appendChild(tableRow);
}