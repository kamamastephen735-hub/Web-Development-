
// Select the registration form
const form = document.getElementById("regform");

// Select all input, select, and textarea elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderSelect = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const bioTextarea = document.getElementById("bio");

// Select each field's error element
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const dobError = document.getElementById("dobError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");
const bioError = document.getElementById("bioError");

// Select the success message
const successMsg = document.getElementById("successMsg");

// Select the registered members list and counter
const memberList = document.getElementById("memberList");
const memberCounter = document.getElementById("count");

// Select the Dark Mode button
const themeButton = document.getElementById("theme");

// Select the empty-list message
const emptyNote = document.getElementById("emptyNote");


console.log("Registration Form:", form);

console.log("Name Input:", nameInput);
console.log("Email Input:", emailInput);
console.log("Password Input:", passwordInput);
console.log("Confirm Password Input:", confirmPasswordInput);
console.log("Gender Select:", genderSelect);
console.log("Date of Birth Input:", dobInput);
console.log("Country Input:", countryInput);
console.log("Phone Input:", phoneInput);
console.log("Bio Textarea:", bioTextarea);

console.log("Name Error:", nameError);
console.log("Email Error:", emailError);
console.log("Password Error:", passwordError);
console.log("Confirm Password Error:", confirmError);
console.log("Gender Error:", genderError);
console.log("Date of Birth Error:", dobError);
console.log("Country Error:", countryError);
console.log("Phone Error:", phoneError);
console.log("Bio Error:", bioError);

console.log("Success Message:", successMsg);
console.log("Member List:", memberList);
console.log("Member Counter:", memberCounter);
console.log("Dark Mode Button:", themeButton);
console.log("Empty Message:", emptyNote);


form.addEventListener("submit", function (event) {

// Prevent the browser from reloading the page
event.preventDefault();

// Hide the previous success message
successMsg.textContent = "";
successMsg.classList.add("hidden");

// Validate all fields
const isValid = validateForm();

// Register the member only if all fields are valid
if (isValid) {
    registerMember();
}

});



function validateForm() {

let isValid = true;

// Get field values and remove unnecessary spaces
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const password = passwordInput.value;
const confirmPassword = confirmPasswordInput.value;
const gender = genderSelect.value;
const dob = dobInput.value;
const country = countryInput.value.trim();
const phone = phoneInput.value.trim();
const bio = bioTextarea.value.trim();

// Clear all previous validation errors
clearAllErrors();


// VALIDATE FULL NAME
if (name === "") {

    showError(nameError, "Full name is required.");
    isValid = false;

} else if (name.length < 2) {

    showError(nameError, "Name must contain at least 2 characters.");
    isValid = false;

} else if (/\d/.test(name)) {

    showError(nameError, "Name must not contain numbers.");
    isValid = false;

}


// VALIDATE EMAIL
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (email === "") {

    showError(emailError, "Email address is required.");
    isValid = false;

} else if (!emailPattern.test(email)) {

    showError(emailError, "Please enter a valid email address.");
    isValid = false;

}


// VALIDATE PASSWORD
if (password === "") {

    showError(passwordError, "Password is required.");
    isValid = false;

} else if (password.length < 8) {

    showError(
        passwordError,
        "Password must contain at least 8 characters."
    );

    isValid = false;

} else if (!/[A-Z]/.test(password)) {

    showError(
        passwordError,
        "Password must contain at least one uppercase letter."
    );

    isValid = false;

} else if (!/[a-z]/.test(password)) {

    showError(
        passwordError,
        "Password must contain at least one lowercase letter."
    );

    isValid = false;

} else if (!/[0-9]/.test(password)) {

    showError(
        passwordError,
        "Password must contain at least one number."
    );

    isValid = false;

}


// VALIDATE CONFIRM PASSWORD
if (confirmPassword === "") {

    showError(confirmError, "Please confirm your password.");
    isValid = false;

} else if (password !== confirmPassword) {

    showError(confirmError, "Passwords do not match.");
    isValid = false;

}


// VALIDATE GENDER
if (gender === "") {

    showError(genderError, "Please select your gender.");
    isValid = false;

}


// VALIDATE DATE OF BIRTH
if (dob === "") {

    showError(dobError, "Date of birth is required.");
    isValid = false;

} else {

    const selectedDate = new Date(dob + "T00:00:00");
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {

        showError(dobError, "Please enter a valid date.");
        isValid = false;

    } else if (selectedDate > today) {

        showError(dobError, "Date of birth cannot be in the future.");
        isValid = false;

    }

}


// VALIDATE COUNTRY
if (country === "") {

    showError(countryError, "Country is required.");
    isValid = false;

} else if (country.length < 2) {

    showError(countryError, "Please enter a valid country name.");
    isValid = false;

} else if (/\d/.test(country)) {

    showError(countryError, "Country name must not contain numbers.");
    isValid = false;

}


// VALIDATE PHONE NUMBER
const phoneDigits = phone.replace(/\D/g, "");

if (phone === "") {

    showError(phoneError, "Phone number is required.");
    isValid = false;

} else if (!/^\+?[\d\s()-]+$/.test(phone)) {

    showError(phoneError, "Please enter a valid phone number.");
    isValid = false;

} else if (phoneDigits.length < 10 || phoneDigits.length > 15) {

    showError(
        phoneError,
        "Phone number must contain 10 to 15 digits."
    );

    isValid = false;

}


// VALIDATE BIO
if (bio === "") {

    showError(bioError, "Please tell us something about yourself.");
    isValid = false;

} else if (bio.length < 10) {

    showError(
        bioError,
        "Bio must contain at least 10 characters."
    );

    isValid = false;

} else if (bio.length > 500) {

    showError(bioError, "Bio cannot exceed 500 characters.");
    isValid = false;

}

// Return true if all fields are valid
return isValid;

}


function showError(errorElement, message) {

errorElement.textContent = message;

}


// Associate every input with its matching error element
const fields = [
{ input: nameInput, error: nameError },
{ input: emailInput, error: emailError },
{ input: passwordInput, error: passwordError },
{ input: confirmPasswordInput, error: confirmError },
{ input: genderSelect, error: genderError },
{ input: dobInput, error: dobError },
{ input: countryInput, error: countryError },
{ input: phoneInput, error: phoneError },
{ input: bioTextarea, error: bioError }
];

// Clear the error when the user edits a field
fields.forEach(function (field) {

field.input.addEventListener("input", function () {

    field.error.textContent = "";

});

field.input.addEventListener("change", function () {

    field.error.textContent = "";

});

});

// Clear every validation message
function clearAllErrors() {

fields.forEach(function (field) {

    field.error.textContent = "";

});

}


function registerMember() {

// Collect member information
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const gender = genderSelect.value;
const dob = dobInput.value;
const country = countryInput.value.trim();
const phone = phoneInput.value.trim();
const bio = bioTextarea.value.trim();

// Create a new list item
const memberItem = document.createElement("li");

memberItem.classList.add("member-item");

// Create a container for the member's details
const details = document.createElement("div");

details.classList.add("member-details");

// Create the member's name
const memberName = document.createElement("h3");

memberName.textContent = name;

// Create the member's information
const memberEmail = document.createElement("p");
memberEmail.textContent = "Email: " + email;

const memberGender = document.createElement("p");
memberGender.textContent = "Gender: " + gender;

const memberDob = document.createElement("p");
memberDob.textContent = "Date of Birth: " + dob;

const memberCountry = document.createElement("p");
memberCountry.textContent = "Country: " + country;

const memberPhone = document.createElement("p");
memberPhone.textContent = "Phone: " + phone;

const memberBio = document.createElement("p");
memberBio.textContent = "Bio: " + bio;

// Add member details to the container
details.appendChild(memberName);
details.appendChild(memberEmail);
details.appendChild(memberGender);
details.appendChild(memberDob);
details.appendChild(memberCountry);
details.appendChild(memberPhone);
details.appendChild(memberBio);

// Create a Remove button
const removeButton = document.createElement("button");

removeButton.type = "button";
removeButton.textContent = "Remove";
removeButton.classList.add("remove-btn");

// Add the details and Remove button to the list item
memberItem.appendChild(details);
memberItem.appendChild(removeButton);

// Remove the initial empty-list message
if (emptyNote) {
    emptyNote.remove();
}

// Add the new member to the list
memberList.appendChild(memberItem);

// Update the member counter
updateMemberCounter();

// Display the success message
successMsg.textContent = "Success! " + name + " has been registered.";

successMsg.classList.remove("hidden");

// Reset the form fields
form.reset();

// Clear any remaining validation errors
clearAllErrors();

}


function updateMemberCounter() {

const totalMembers = memberList.querySelectorAll(
    ".member-item"
).length;

memberCounter.textContent = totalMembers;

}


// Use event delegation to handle Remove buttons
memberList.addEventListener("click", function (event) {

if (event.target.classList.contains("remove-btn")) {

    // Find the member's list item
    const memberItem = event.target.closest(".member-item");

    if (memberItem) {

        // Remove the member from the page
        memberItem.remove();

        // Update the member counter
        updateMemberCounter();

        // Show the empty-list message if no members remain
        if (
            memberList.querySelectorAll(".member-item").length === 0
        ) {

            const message = document.createElement("li");

            message.classList.add("empty");
            message.id = "emptyNote";

            message.textContent =
                "No members yet. Register someone to begin.";

            memberList.appendChild(message);

        }

    }

}

});


themeButton.addEventListener("click", function () {

// Toggle dark mode on the entire page
document.body.classList.toggle("dark-mode");

// Check whether dark mode is enabled
const darkModeEnabled = document.body.classList.contains("dark");

// Update the button text
if (darkModeEnabled) {
    themeButton.textContent = "Light Mode";
} else {
    themeButton.textContent = "Dark Mode";
}

console.log("Dark Mode:", darkModeEnabled);

});


updateMemberCounter();