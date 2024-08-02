document.querySelector('button[type="submit"]').addEventListener('click', addExpense);

function addExpense() {
    let item = document.querySelector('.item').value;
    let cost = document.querySelector('.cost').value;
    let select = document.querySelector('.select').value;
    let date = document.querySelector('.date').value;

    if (item && cost && select && date) {
        let table = document.querySelector('#expense-table');
        let newRow = table.insertRow();

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.textContent = item;
        cell2.textContent = cost;
        cell3.textContent = select;
        cell4.textContent = date;
        cell5.innerHTML = '<button onclick="editRow(this)">Edit</button> <button onclick="deleteRow(this)">Delete</button>';

        updateTotalCost();
        clearInputs();
    } else {
        alert('Please fill in all fields');
    }
}

function deleteRow(button) {
    let row = button.closest('tr');
    row.remove();
    updateTotalCost();
}

function editRow(button) {
    let row = button.closest('tr');
    let cells = row.getElementsByTagName('td');

    document.querySelector('.item').value = cells[0].textContent;
    document.querySelector('.cost').value = cells[1].textContent;
    document.querySelector('.select').value = cells[2].textContent;
    document.querySelector('.date').value = cells[3].textContent;

    row.remove();
    updateTotalCost();
}

function clearInputs() {
    document.querySelector('.item').value = '';
    document.querySelector('.cost').value = '';
    document.querySelector('.select').value = 'FOOD';
    document.querySelector('.date').value = '';
}

function updateTotalCost() {
    let totalCost = 0;
    let rows = document.querySelectorAll('#expense-table tr');
    rows.forEach(row => {
        let cost = parseFloat(row.cells[1].textContent);
        totalCost += cost;
    });
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

function filterExpenses() {
    let filter = document.getElementById('filter-category').value;
    let rows = document.querySelectorAll('#expense-table tr');
    rows.forEach(row => {
        let category = row.cells[2].textContent;
        if (filter === 'ALL' || category === filter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
