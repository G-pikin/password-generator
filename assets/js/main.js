// Basic functionality for the password generator
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.querySelector('.length-value');
const generateBtn = document.querySelector('.generate-btn');
const passwordText = document.querySelector('.password-text');
const copyBtn = document.querySelector('.copy-btn');

// Update the length value when slider changes
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate password when button is clicked
generateBtn.addEventListener('click', generatePassword);

// Copy password when copy button is clicked
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordText.textContent);
    alert('Password copied to clipboard!');
});

function generatePassword() {
    const length = lengthSlider.value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('Please select at least one character type');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    passwordText.textContent = password;
    
    // Update strength indicator
    updateStrengthIndicator(password);
}

function updateStrengthIndicator(password) {
    const strengthValue = document.querySelector('.strength-value');
    const bars = document.querySelectorAll('.bar');
    
    // Simple strength calculation
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Update strength text
    let strengthText = '';
    if (strength <= 2) strengthText = 'Weak';
    else if (strength <= 4) strengthText = 'Medium';
    else strengthText = 'Strong';
    
    strengthValue.textContent = strengthText;
    
    // Update bars
    bars.forEach((bar, index) => {
        if (index < Math.min(strength, 4)) {
            bar.classList.remove('empty');
        } else {
            bar.classList.add('empty');
        }
    });
}