interface AgeResult {
    years: number;
    months: number;
    days: number;
}

class AgeCalculator {
    private dateOfBirthInput: HTMLInputElement;
    private currentDateInput: HTMLInputElement;
    private calculateButton: HTMLButtonElement;
    private resultCard: HTMLDivElement;
    private yearsElement: HTMLElement;
    private monthsElement: HTMLElement;
    private daysElement: HTMLElement;

    constructor() {
        this.dateOfBirthInput = document.getElementById("dateOfBirth") as HTMLInputElement;
        this.currentDateInput = document.getElementById("birthday") as HTMLInputElement;
        this.calculateButton = document.querySelector("button") as HTMLButtonElement;
        this.resultCard = document.getElementById("result-card") as HTMLDivElement;
        this.yearsElement = document.getElementById("years") as HTMLElement;
        this.monthsElement = document.getElementById("months") as HTMLElement;
        this.daysElement = document.getElementById("days") as HTMLElement;

        this.init();
    }

    private init(): void {
        this.setCurrentDate();
        this.setupEventListeners();
    }

    private setCurrentDate(): void {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        this.currentDateInput.value = `${year}-${month}-${day}`;
    }

    private setupEventListeners(): void {
        this.calculateButton.addEventListener('click', () => {
            this.calculateAge();
        });

        this.dateOfBirthInput.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.calculateAge();
            }
        });
    }

    private calculateAge(): void {
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

    private calculateAgeDetail(birthDate: Date, currentDate: Date): AgeResult {
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

        return { years, months, days };
    }

    private displayResult(result: AgeResult): void {
        this.yearsElement.textContent = result.years.toString();
        this.monthsElement.textContent = result.months.toString();
        this.daysElement.textContent = result.days.toString();

        this.resultCard.classList.remove("d-none");

        this.resultCard.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    private showError(message: string): void {
        alert(message);
        this.dateOfBirthInput.focus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});