let totalAmount = document.getElementById("total-amount");  
// total amount
let expenseAmount = document.getElementById("expense-amount");
// user-amount

const totalAmountButton = document.getElementById("total-amount-button");
const checkAmountButton = document.getElementById("check-amount-button");

const  reasonExpense = document.getElementById("reason-expense");
// product-title
const errorMessage = document.getElementById("budget-error");
// budget-error
const  reasonExpenseError  = document.getElementById("reason-expense-error");
// product-title-error

// const  productcosterror = document.getElementById("product-cost-error");

// output 
const  amount = document.getElementById("amount");
const  expenditureValue = document.getElementById("expenditure-value");
const  balanceValue = document.getElementById("balance-amount");
// list
const  list = document.getElementById("list");

let tempAmount = 0;

// set budget part
totalAmountButton.addEventListener('click', () => {
    tempAmount = parseInt(totalAmount.value);
    // empty or negative input
    if(isNaN(tempAmount) === ""  || tempAmount<=0 ) {
        errorMessage.classList.remove("hide-error");
    }else {
        errorMessage.classList.add("hide-error");
        // set budget
        amount.innerHTML = tempAmount;
        // set balance
        balanceValue.innerText = tempAmount -  
                     parseInt(expenditureValue.innerText);
        // clear input box
        totalAmount.value = "" ;
    }
});


// function to create list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = 
        `<p class="reason"> ${expenseName} </p>
         <p class="amount"> ${expenseValue} </p> ` ;

    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    //  font awesome 
    // 1. google search (font awesome cdn)
    // 2. html add link 
    // 3. google search (font awesome icon)
    // 4. search what icon you want and copy & paste
    editButton.style.fontSize = "24px";   
    editButton.addEventListener('click' , function(){
        modifyElement(this, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener('click' , function(){
        modifyElement(this);
        // Use 'this' to refer to the clicked button
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

// function to modify list element
const modifyElement = (element, edit = false) => {

    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    let parentText = parentDiv.querySelector(".reason").innerText;

    if (edit) {        
        reasonExpense.value  = parentText;
        expenseAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + 
                                parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) -  
                                        parseInt(parentAmount);
    parentDiv.remove();
};

// function to disable edit and delete button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};




// function to add expense
checkAmountButton.addEventListener("click", () =>{
    // empty checks
    if(!expenseAmount.value || !reasonExpense.value){
        reasonExpenseError.classList.remove("hide-error");
        return ;
    }
    reasonExpenseError.classList.add("hide-error");
    // enable buttons
    // disableButtons(false);
    // expense
    let expenditure = parseInt(expenseAmount.value);
    // total expense (existing + new)
   // validate expense input
   if (isNaN(expenditure) || expenditure <= 0) {
    reasonExpenseError.classList.remove("hide-error");
    return;
   }

    // update total expense and balance
    let totalExpense = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = totalExpense;
    balanceValue.innerText = tempAmount - totalExpense;

    // create list
    listCreator(reasonExpense.value , expenseAmount.value);
    // empty input 
    reasonExpense.value = "" ;
    expenseAmount.value = "" ;
});