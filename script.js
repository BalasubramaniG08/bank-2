let customers = [];

function addCustomer() {
  if (customers.length >= 3) {
    alert("Only 3 customers allowed.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const account = document.getElementById("account").value.trim();
  const balance = parseFloat(document.getElementById("balance").value);

  if (!name || !account || isNaN(balance)) {
    alert("Please fill all fields correctly.");
    return;
  }

  customers.push({
    name,
    account,
    initialBalance: balance,
    currentBalance: balance,
  });

  document.getElementById("name").value = "";
  document.getElementById("account").value = "";
  document.getElementById("balance").value = "";

  displayCustomers();
}

function displayCustomers() {
  const container = document.getElementById("customerDetails");
  container.innerHTML = "";

  customers.forEach((cust, i) => {
    const div = document.createElement("div");
    div.className = "customer-box";
    div.innerHTML = `
      <p><strong>Name:</strong> ${cust.name}</p>
      <p><strong>Account:</strong> ${cust.account}</p>
      <p><strong>Initial Balance:</strong> ₹${cust.initialBalance}</p>
    `;
    container.appendChild(div);
  });
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if (isNaN(amount) || amount <= 0) return alert("Enter valid amount.");

  if (!customers[0]) return alert("Customer 1 not available.");
  customers[0].currentBalance += amount;
  document.getElementById(
    "outbox-deposit"
  ).textContent = `Deposited ₹${amount} to ${customers[0].name}`;
  document.getElementById("depositAmount").value = "";
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if (isNaN(amount) || amount <= 0) return alert("Enter valid amount.");

  if (!customers[1]) return alert("Customer 2 not available.");

  if (customers[1].currentBalance >= amount) {
    customers[1].currentBalance -= amount;
    document.getElementById(
      "outbox-withdraw"
    ).textContent = `Withdrew ₹${amount} from ${customers[1].name}`;
  } else {
    document.getElementById(
      "outbox-withdraw"
    ).textContent = `Insufficient balance for ${customers[1].name}`;
  }

  document.getElementById("withdrawAmount").value = "";
}

function transfer() {
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if (isNaN(amount) || amount <= 0) return alert("Enter valid amount.");

  if (!customers[2]) return alert("Customer 3 not available.");

  if (customers[2].currentBalance >= amount) {
    customers[2].currentBalance -= amount;
    document.getElementById(
      "outbox-transfer"
    ).textContent = `Transferred ₹${amount} from ${customers[2].name}`;
  } else {
    document.getElementById(
      "outbox-transfer"
    ).textContent = `Insufficient balance for ${customers[2].name}`;
  }

  document.getElementById("transferAmount").value = "";
}

function showBalance(type) {
  if (customers.length < 3) {
    document.getElementById("outbox-balance").textContent =
      "Add 3 customers first.";
    return;
  }

  if (type === "deposit") {
    document.getElementById(
      "outbox-balance"
    ).textContent = `Customer 1 Balance: ₹${customers[0].currentBalance}`;
  } else if (type === "withdraw") {
    document.getElementById(
      "outbox-balance"
    ).textContent = `Customer 2 Balance: ₹${customers[1].currentBalance}`;
  } else if (type === "transfer") {
    document.getElementById(
      "outbox-balance"
    ).textContent = `Customer 3 Balance: ₹${customers[2].currentBalance}`;
  }
}

function deleteLastCustomer() {
  if (customers.length > 0) {
    const removed = customers.pop();
    alert(`Deleted ${removed.name}`);
    displayCustomers();
  } else {
    alert("No customer to delete.");
  }
}
