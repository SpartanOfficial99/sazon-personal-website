let payrollData = [];

function formatAmount(value) {
  return isNaN(value) ? "" : value.toFixed(2);
}

function calculatePay() {
  const daysWorked = parseFloat(document.getElementById("daysWorked").value) || 0;
  const dailyRate = parseFloat(document.getElementById("dailyRate").value) || 0;
  const deduction = parseFloat(document.getElementById("deduction").value) || 0;

  const grossPay = daysWorked * dailyRate;
  const netPay = grossPay - deduction;

  document.getElementById("grossPay").value = formatAmount(grossPay);
  document.getElementById("netPay").value = formatAmount(netPay);
}

function addEmployeeToPayroll() {
  const employeeName = document.getElementById("employeeName").value;
  const daysWorked = parseFloat(document.getElementById("daysWorked").value) || 0;
  const dailyRate = parseFloat(document.getElementById("dailyRate").value) || 0;
  const deduction = parseFloat(document.getElementById("deduction").value) || 0;

  if (!employeeName || daysWorked <= 0 || dailyRate <= 0) {
    alert("Please provide valid employee details.");
    return;
  }

  const grossPay = daysWorked * dailyRate;
  const netPay = grossPay - deduction;

  payrollData.push({ employeeName, daysWorked, dailyRate, grossPay, deduction, netPay });
  updatePayrollTable();
}

function updatePayrollTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  let totalNetPay = 0;

  payrollData.forEach((employee, index) => {
    totalNetPay += employee.netPay;
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${employee.employeeName}</td>
        <td>${employee.daysWorked}</td>
        <td>${formatAmount(employee.dailyRate)}</td>
        <td>${formatAmount(employee.grossPay)}</td>
        <td>${formatAmount(employee.deduction)}</td>
        <td>${formatAmount(employee.netPay)}</td>
      </tr>
    `;
  });

  const totalRow = `
    <tr>
      <td colspan="6" style="text-align: right;">Total Net Pay:</td>
      <td>${formatAmount(totalNetPay)}</td>
    </tr>
  `;
  tableBody.innerHTML += totalRow;
}

document.getElementById("addEmployeeBtn").addEventListener("click", addEmployeeToPayroll);
