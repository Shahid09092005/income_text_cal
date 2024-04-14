document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("resultModal");
    const closeButton = document.querySelector(".close");
    const incomeInput = document.getElementById("income");
    const extraIncomeInput = document.getElementById("extraIncome");
    const deductionsInput = document.getElementById("deductions");
    const ageInput = document.getElementById("age");
    const errorIcons = document.querySelectorAll(".error-icon");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        hideErrorIcons();

        if (!validateInputs()) {
            return;
        }

        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value) || 0;
        const deductions = parseFloat(deductionsInput.value) || 0;
        const age = ageInput.value;

        let tax = 0;

        if (income + extraIncome - deductions > 800000) {
            if (age === "<40") {
                tax = 0.3 * (income + extraIncome - deductions - 800000);
            } else if (age === ">=40&<60") {
                tax = 0.4 * (income + extraIncome - deductions - 800000);
            } else if (age === ">=60") {
                tax = 0.1 * (income + extraIncome - deductions - 800000);
            }
        }

        showModal(tax);
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    function validateInputs() {
        let isValid = true;

        if (!incomeInput.checkValidity()) {
            showErrorIcon(incomeInput);
            isValid = false;
        }

        if (!ageInput.checkValidity()) {
            showErrorIcon(ageInput);
            isValid = false;
        }

        return isValid;
    }

    function showErrorIcon(input) {
        input.nextElementSibling.style.display = "inline";
    }

    function hideErrorIcons() {
        errorIcons.forEach(icon => {
            icon.style.display = "none";
        });
    }

    function showModal(tax) {
        const taxResult = document.getElementById("taxResult");
        taxResult.textContent = `Tax to be paid: ${tax.toFixed(2)} Lakhs`;
        modal.style.display = "block";
    }
});
