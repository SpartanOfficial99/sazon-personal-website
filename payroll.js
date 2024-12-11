let payroll = [];

// Format numbers to 2 decimal places
function formatDecimal(value) {
  return isNaN(value) ? "" : value.toFixed(2);
}

// Compute gross and net pay
function computePay() {
  const daysWorked = parseFloat(document.getElementById("daysWorked").value) || 0;
  const dailyRate = parseFloat(document.getElementById("dailyRate").value) || 0;
  const deduction = parseFloat(document.getElementById("deduction").value) || 0;

  const grossPay = daysWorked * dailyRate;
  const netPay = grossPay - deduction;

  document.getElementById("grossPay").value = formatDecimal(grossPay);
  document.getElementById("netPay").value = formatDecimal(netPay);
}

// Add employee to payroll
function addEmployee() {
  const name = document.getElementById("employeeName").value;
  const daysWorked = parseFloat(document.getElementById("daysWorked").value) || 0;
  const dailyRate = parseFloat(document.getElementById("dailyRate").value) || 0;
  const deduction = parseFloat(document.getElementById("deduction").value) || 0;

  if (!name || daysWorked <= 0 || dailyRate <= 0) {
    alert("Please fill in valid employee details.");
    return;
  }

  const grossPay = daysWorked * dailyRate;
  const netPay = grossPay - deduction;

  payroll.push({ name, daysWorked, dailyRate, grossPay, deduction, netPay });
  updatePayrollTable();
}

// Update the payroll table
function updatePayrollTable() {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = "";
  let totalNetPay = 0;

  payroll.forEach((employee, index) => {
    totalNetPay += employee.netPay;
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.daysWorked}</td>
        <td>${formatDecimal(employee.dailyRate)}</td>
        <td>${formatDecimal(employee.grossPay)}</td>
        <td>${formatDecimal(employee.deduction)}</td>
        <td>${formatDecimal(employee.netPay)}</td>
      </tr>`;
  });

  document.getElementById("totalamount").textContent = formatDecimal(totalNetPay);
  document.getElementById("employeeCount").textContent = payroll.length;
}

// Show confirmation modal
function showModal(message, actionType) {
  document.getElementById("dlgmsg").innerText = message;
  dlgConfirmCancel.returnValue = actionType;
  dlgConfirmCancel.showModal();
}

// Show secondary modal
function showSecondaryModal(message) {
  document.getElementById("dlgmsg2").innerText = message;
  dlgAreYouSure.showModal();
}

// Event Listeners for Modals
const dlgConfirmCancel = document.getElementById("dlgConfirmCancel");
const dlgAreYouSure = document.getElementById("dlgAreYouSure");

document.getElementById("btnConfirm").addEventListener("click", () => {
  const actionType = dlgConfirmCancel.returnValue;
  if (actionType === "clear") {
    showSecondaryModal("Are you sure you want to clear the payroll?");
  } else if (actionType === "delete") {
    const rowIndex = parseInt(document.getElementById("delitem").value) - 1;
    if (rowIndex >= 0 && rowIndex < payroll.length) {
      payroll.splice(rowIndex, 1);
      updatePayrollTable();
    }
  }
  dlgConfirmCancel.close();
});

document.getElementById("btnCancel").addEventListener("click", () => {
  dlgConfirmCancel.close();
});

document.getElementById("btnYes").addEventListener("click", () => {
  payroll = [];
  updatePayrollTable();
  dlgAreYouSure.close();
});

document.getElementById("btnNo").addEventListener("click", () => {
  dlgAreYouSure.close();
});

// Event Listeners for Buttons
document.getElementById("btnaddtocart").addEventListener("click", addEmployee);
document.getElementById("btndelete").addEventListener("click", () => {
  const rowIndex = parseInt(document.getElementById("delitem").value) - 1;
  if (rowIndex >= 0 && rowIndex < payroll.length) {
    showModal(Delete employee #${rowIndex + 1}?, "delete");
  } else {
    alert("Invalid row number.");
  }
});

document.getElementById("btnclearcart").addEventListener("click", () => {
  showModal("Clear the payroll?", "clear");
});

document.getElementById("daysWorked").addEventListener("input", computePay);
document.getElementById("dailyRate").addEventListener("input", computePay);
document.getElementById("deduction").addEventListener("input", computePay);
