document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const submitBtn = document.getElementById('submitBtn');
    let editingIndex = -1;
    
    // Sample user data (empty initially)
    let users = [];

    // Event listener for the form submission
    userForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name && email) {
            if (editingIndex === -1) {
                // Create new user
                const newUser = { name, email };
                users.push(newUser);
            } else {
                // Update existing user
                users[editingIndex] = { name, email };
                editingIndex = -1;
            }
            updateUserList();
            resetForm();
        }
    });

    // Function to update the user table
    function updateUserList() {
        // Clear the existing rows
        userTable.innerHTML = '';

        // Loop through the users and add them to the table
        users.forEach((user, index) => {
            const row = userTable.insertRow();

            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Function to delete a user
    window.deleteUser = function (index) {
        users.splice(index, 1);
        updateUserList();
    };

    // Function to edit a user
    window.editUser = function (index) {
        const user = users[index];
        nameInput.value = user.name;
        emailInput.value = user.email;
        editingIndex = index;
        submitBtn.textContent = 'Update User';
    };

    // Reset the form inputs
    function resetForm() {
        nameInput.value = '';
        emailInput.value = '';
        submitBtn.textContent = 'Add User';
    }

    // Initialize user list
    updateUserList();
});
