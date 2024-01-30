const modal = document.getElementById('modal');
const profileBioArea = document.getElementById('profile-bio');
const profileUsername = document.getElementById('profile-username');

const updateButton = document.getElementById('update-bio');
const closeButton = document.getElementById('close-modal-button');

let bioText = undefined;
let currentUserId = undefined;

async function showModal(userId) {
    const response = await fetch('/users/profile/' + userId);
    const userProfile = await response.json();

    profileUsername.innerText = userProfile.username;
    profileBioArea.value = userProfile.bio;

    currentUserId = userId;
    bioText = userProfile.bio;

    modal.classList.remove('d-none');
}

function hideModal() {
    modal.classList.add('d-none');
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

closeButton.addEventListener('click', hideModal);

updateButton.addEventListener('click', async () => {
    await fetch('/users/profile/' + currentUserId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({ bio: bioText }).toString()
    });
});

profileBioArea.addEventListener('keyup', () => {
    bioText = profileBioArea.value;
});