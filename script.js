function boxClicked(feature) {
    const output = document.getElementById('output');
    output.textContent = `You clicked on "${feature}"!`;
    output.style.color = "#ffd700"; // Highlight the message
    output.style.animation = "pulse 1s infinite"; // Add an animation to the message
}

function openPayroll() {
    // Get the modal and content elements
    const modal = document.getElementById("payrollModal");
    const content = document.getElementById("payrollContent");

    // Add the payroll program HTML content to the modal
    content.innerHTML = `
        <header>
            <h1>Payroll Calculator</h1>
            <p>Compute your Gross Pay, Deductions, and Net Pay effortlessly!</p>
        </header>
        <main>
            <div class="tool-container">
                <form id="payrollForm" class="modern-form">
                    <label for="hoursWorked">Hours Worked:</label>
                    <input type="number" id="hoursWorked" placeholder="e.g., 40" min="0" required>

                    <label for="hourlyRate">Hourly Rate (PHP):</label>
                    <input type="number" id="hourlyRate" placeholder="e.g., 250" min="0" required>

                    <label for="deductions">Deductions (PHP):</label>
                    <input type="number" id="deductions" placeholder="e.g., 500" min="0" required>

                    <button type="button" class="btn-modern" onclick="calculatePayroll()">Calculate Payroll</button>
                </form>

                <div id="results" class="result-box" style="display: none;">
                    <h2>Payroll Results</h2>
                    <p id="grossPay"><strong>Gross Pay:</strong> PHP 0.00</p>
                    <p id="totalDeductions"><strong>Total Deductions:</strong> PHP 0.00</p>
                    <p id="netPay"><strong>Net Pay:</strong> PHP 0.00</p>
                </div>
            </div>
            <a href="conversion.html" class="btn-modern">Back to Conversion Tool</a>
        </main>
        <footer>
            <p>&copy; 2024 Payroll Calculator. All Rights Reserved.</p>
        </footer>
    `;

    // Display the modal
    modal.style.display = "block";
}

function closePayroll() {
    // Close the modal
    const modal = document.getElementById("payrollModal");
    modal.style.display = "none";
}

function calculatePayroll() {
    const hoursWorked = parseFloat(document.getElementById('hoursWorked').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const deductions = parseFloat(document.getElementById('deductions').value);

    if (isNaN(hoursWorked) || isNaN(hourlyRate) || isNaN(deductions) || hoursWorked < 0 || hourlyRate < 0 || deductions < 0) {
        alert('Please enter valid non-negative numbers for all fields.');
        return;
    }

    const grossPay = hoursWorked * hourlyRate;
    const netPay = grossPay - deductions;

    document.getElementById('grossPay').innerHTML = `<strong>Gross Pay:</strong> PHP ${grossPay.toFixed(2)}`;
    document.getElementById('totalDeductions').innerHTML = `<strong>Total Deductions:</strong> PHP ${deductions.toFixed(2)}`;
    document.getElementById('netPay').innerHTML = `<strong>Net Pay:</strong
