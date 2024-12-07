function boxClicked(feature) {
    const output = document.getElementById('output');
    output.textContent = `You clicked on "${feature}"!`;
    output.style.color = "#ffd700";
    output.style.animation = "pulse 1s infinite";
}

function showCalculator() {
    const calculator = document.getElementById('calculator');
    calculator.style.display = 'block';

    const output = document.getElementById('output');
    output.textContent = 'Income Tax Calculator is now active!';
    output.style.animation = "fadeIn 1s";
}

function computeTax() {
    const income = parseFloat(document.getElementById("income").value);
    let tax = 0;

    if (income <= 250000) tax = 0;
    else if (income <= 400000) tax = 0.2 * (income - 250000);
    else if (income <= 800000) tax = 30000 + 0.25 * (income - 400000);
    else if (income <= 2000000) tax = 130000 + 0.3 * (income - 800000);
    else if (income <= 8000000) tax = 490000 + 0.32 * (income - 2000000);
    else tax = 2410000 + 0.35 * (income - 8000000);

    document.getElementById("result").innerText = tax.toFixed(2);
}
