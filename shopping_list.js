function toggleRow(checkbox) 
{
    let row = checkbox.parentElement.parentElement; // Get the <tr>
    row.classList.toggle("selected", checkbox.checked);
}

function openPopup(id) 
{
    console.log("this function was called!")
    document.getElementById(id).style.display = "block"; /*makes it visible*/
    document.getElementById("overlay").style.display = "block";
    if(id === 'remove-item-popup')
    {
        let checkedItems = getCheckedItems();
        let selector = "#" + id + " h3";
        for(let i = 0; i < checkedItems.length; i++)
        {
            document.querySelector(selector).innerHTML += (" \"" + checkedItems[i]) + "\"";
            if(i === (checkedItems.length - 2)) //have reached 2nd to last element in list
            {
                document.querySelector(selector).innerHTML += " and";
            }
            else if(i != (checkedItems.length - 1)) document.querySelector(selector).innerHTML += ", "; //else if not last item
        }
        document.querySelector(selector).innerHTML += "?";
    }
}

function closePopup(id) 
{
    document.getElementById(id).style.display = "none"; /*makes it inivisible*/
    document.getElementById("overlay").style.display = "none";

    if(id === 'remove-item-popup') 
    {
        let selector = "#" + id + " h3";
        document.querySelector(selector).innerHTML = "Are you sure you want to remove item(s)";
    }
}

function addItem() 
{
    let input = document.getElementById("newItemInput").value.trim();
    if (input === "") 
    {
        alert("Please enter an item name!");
        return;
    }

    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    cell1.innerHTML = `<input type="checkbox" onclick="toggleRow(this)">`;
    cell2.textContent = input;
    cell3.textContent = localStorage.getItem("username");

    document.getElementById("newItemInput").value = ""; // Clear input field
    closePopup('add-item-popup');
}

//check if remove is valid (there are items in the list, at least 1 item is checked, and user confirms ok to remove)
function checkRemove() {
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    if(rows.length === 0)
    {
        alert("There are no items in the list!");
        return;
    } 

    //check if at least 1 item is checked
    let checkedItems = getCheckedItems();
    if(checkedItems.length == 0)
    {
        alert("You must select at least 1 item!");
        return;
    }

    openPopup('remove-item-popup');
}

function removeSelectedItems()
{
    closePopup('remove-item-popup');
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    // Loop from the end because we change size of array as we delete I think
      for (let i = rows.length - 1; i >= 0; i--) {
        let checkbox = rows[i].getElementsByTagName("input")[0]; 
        if (checkbox && checkbox.checked) {
            table.deleteRow(i); 
        }
    }
}

function getCheckedItems()
{
    let table = document.getElementById("shopping-list").getElementsByTagName("tbody")[0]; 
    let rows = table.getElementsByTagName("tr"); 
    
    let checkedItems = [];

    for(let i = 0; i < rows.length; i++)
    {
        let checkbox = rows[i].getElementsByTagName("input")[0];
        let itemName = rows[i].cells[1].textContent; 
        if (checkbox && checkbox.checked) 
        {
            checkedItems.push(itemName);
        }
    }
    return checkedItems;
}