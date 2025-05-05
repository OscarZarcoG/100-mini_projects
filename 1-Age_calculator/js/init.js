document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    setupEventListeners();
});

function setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById("birthday").value = `${year}-${month}-${day}`;
}

function setupEventListeners() {
    document.querySelector('button').addEventListener('click', function() {
        calculateAge();
    });
    
    document.getElementById('dateOfBirth').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
}

function calculateAge() {
    const birthDateInput = document.getElementById("dateOfBirth");
    const birthDate = new Date(birthDateInput.value);
    const currentDate = new Date(document.getElementById("birthday").value);
    
    if (!birthDateInput.value) {
        showError("Please enter your date of birth");
        return;
    }
    
    if (birthDate > currentDate) {
        showError("Birth date cannot be in the future");
        return;
    }
    
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    if (days < 0) {
        months--;
        const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        ).getDate();
        days += lastDayOfMonth;
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    
    document.getElementById("result-card").classList.remove("d-none");
    
    document.getElementById("result-card").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function showError(message) {
    alert(message);
    document.getElementById("dateOfBirth").focus();
}