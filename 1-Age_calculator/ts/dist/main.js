"use strict";
class AgeCalculator {
    constructor() {
        this.dateOfBirthInput = document.getElementById("dateOfBirth");
        this.currentDateInput = document.getElementById("birthday");
        this.calculateButton = document.querySelector("button");
        this.resultCard = document.getElementById("result-card");
        this.yearsElement = document.getElementById("years");
        this.monthsElement = document.getElementById("months");
        this.daysElement = document.getElementById("days");
        this.init();
    }
    init() {
        this.setCurrentDate();
        this.setupEventListeners();
    }
    setCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.currentDateInput.value = `${year}-${month}-${day}`;
    }
    setupEventListeners() {
        this.calculateButton.addEventListener('click', () => {
            this.calculateAge();
        });
        this.dateOfBirthInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculateAge();
            }
        });
    }
    calculateAge() {
        const birthDate = new Date(this.dateOfBirthInput.value);
        const currentDate = new Date(this.currentDateInput.value);
        if (!this.dateOfBirthInput.value) {
            this.showError("Please enter your date of birth");
            return;
        }
        if (birthDate > currentDate) {
            this.showError("Birth date cannot be in the future");
            return;
        }
        const ageResult = this.calculateAgeDetail(birthDate, currentDate);
        this.displayResult(ageResult);
    }
    calculateAgeDetail(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();
        if (days < 0) {
            months--;
            const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            days += lastDayOfMonth;
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        return { years, months, days };
    }
    displayResult(result) {
        this.yearsElement.textContent = result.years.toString();
        this.monthsElement.textContent = result.months.toString();
        this.daysElement.textContent = result.days.toString();
        this.resultCard.classList.remove("d-none");
        this.resultCard.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
    showError(message) {
        alert(message);
        this.dateOfBirthInput.focus();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});
//# sourceMappingURL=main.js.map