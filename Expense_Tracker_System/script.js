// Select HTML elements

const transactionForm = document.querySelector("#transactionForm");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

const balanceElement = document.querySelector("#balance");
const totalIncomeElement = document.querySelector("#totalIncome");
const totalExpensesElement = document.querySelector("#totalExpenses");

const transactionList = document.querySelector("#transactionList");
const filterType = document.querySelector("#filterType");

const emptyMessage = document.querySelector("#emptyMessage");
const formMessage = document.querySelector("#formMessage");


// Store transactions and current filter

let transactions = [];
let currentFilter = "all";


// Save transactions to Local Storage

function saveTransactions() {
    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(transactions)
    );
}


// Load saved transactions

function loadTransactions() {
    const savedData = localStorage.getItem("expenseTransactions");

    if (savedData === null) {
        return;
    }

    try {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
            transactions = parsedData;
        }
    } catch (error) {
        transactions = [];
    }
}


// Format amounts as Indian currency

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2
    }).format(amount);
}


// Calculate income, expenses and balance

function calculateTotals() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;

    balanceElement.textContent = formatCurrency(balance);
    totalIncomeElement.textContent = formatCurrency(totalIncome);
    totalExpensesElement.textContent = formatCurrency(totalExpenses);
}


// Return transactions according to the selected filter

function getFilteredTransactions() {
    if (currentFilter === "all") {
        return transactions;
    }

    return transactions.filter(
        transaction => transaction.type === currentFilter
    );
}


// Display transactions on the page

function renderTransactions() {
    transactionList.replaceChildren();

    const visibleTransactions = getFilteredTransactions();

    visibleTransactions.forEach(transaction => {
        const item = document.createElement("article");
        item.className = "transaction-item";

        const info = document.createElement("div");
        info.className = "transaction-info";

        const description = document.createElement("p");
        description.className = "transaction-description";
        description.textContent = transaction.description;

        const meta = document.createElement("p");
        meta.className = "transaction-meta";
        meta.textContent =
            `${transaction.category} · ${transaction.date}`;

        info.append(description, meta);

        const right = document.createElement("div");
        right.className = "transaction-right";

        const amount = document.createElement("span");
        amount.className = `transaction-amount ${transaction.type}`;

        const sign = transaction.type === "income" ? "+" : "-";

        amount.textContent =
            `${sign}${formatCurrency(transaction.amount)}`;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = transaction.id;

        right.append(amount, deleteButton);
        item.append(info, right);

        transactionList.append(item);
    });

    emptyMessage.hidden = visibleTransactions.length > 0;

    calculateTotals();
}


// Add a new transaction

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    if (
        description === "" ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        date === ""
    ) {
        formMessage.textContent =
            "Please enter valid transaction details.";
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category,
        date: date
    };

    transactions.unshift(transaction);

    saveTransactions();

    transactionForm.reset();
    formMessage.textContent = "";

    renderTransactions();
});


// Filter transactions

filterType.addEventListener("change", function () {
    currentFilter = filterType.value;

    renderTransactions();
});


// Delete a transaction using event delegation

transactionList.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");

    if (!deleteButton) {
        return;
    }

    const transactionId = Number(deleteButton.dataset.id);

    transactions = transactions.filter(
        transaction => transaction.id !== transactionId
    );

    saveTransactions();

    renderTransactions();
});


// Load saved data and display the initial UI

loadTransactions();
renderTransactions();