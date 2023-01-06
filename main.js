const amountInput = document.getElementById("bill_input");
const tipInputBtn = document.getElementsByClassName("tipPercentage");
const tipCustomInput = document.getElementById("select_tip_custom_val");
const numberOfPeopleInput = document.getElementById("num_of_ppl");
const resetBtn = document.getElementById("reset-btn");

const tipAmountDisplay = document.getElementById("tip_amount");
const totalAmountDisplay = document.getElementById("total_amount");

let billData = {
    amount: 0,
    tipPercentage: 0,
    numberOfPeople: 0
};

// THIS FN WILL DISPLAY THE TIP P.P. AND AMOUNT P.P.
const getTipAndTotalAmount = () => {
    let tipPerPerson = ((billData.amount / billData.numberOfPeople) / (100 / billData.tipPercentage));
    let amountPerPerson = (billData.amount / billData.numberOfPeople) + tipPerPerson;

    
    if (billData.amount != 0 && billData.tipPercentage != 0 && billData.numberOfPeople != 0) {
        tipAmountDisplay.innerText = '$' + tipPerPerson.toFixed(2);
        totalAmountDisplay.innerText = '$' + amountPerPerson.toFixed(2);
        resetBtn.classList.add("activeResetBtn");
    }
};

// INPUTS EVENT LISTENERS
amountInput.addEventListener("change", () => {
    billData.amount = amountInput.value;
    console.log("New Bill Amount: ", billData.amount);

    // OUTLINES WITH RED IF BILL INPUT IS 0
    if (amountInput.value == 0) {
        amountInput.classList.add("invalidInput")
    } else {
        amountInput.classList.remove("invalidInput")
    }

    getTipAndTotalAmount();
});

tipCustomInput.addEventListener("change", () => {
    billData.tipPercentage = Number(tipCustomInput.value);
    console.log("New Tip Percentage: ", billData.tipPercentage);

    //  SETTING ALL TIP PERCENTAGE OPTION BTNS AS INACTIVE
    for (var y = 0; y < tipInputBtn.length; y++) {
        tipInputBtn[y].classList.replace('activeBtn', 'inactiveBtn');
    }
    
    getTipAndTotalAmount();
});

numberOfPeopleInput.addEventListener("change", () => {
    billData.numberOfPeople = numberOfPeopleInput.value;
    console.log("New Num Of People: ", billData.numberOfPeople);

    // OUTLINES WITH RED IF NUM OF PPL INPUT IS 0
    if (numberOfPeopleInput.value == 0) {
        numberOfPeopleInput.classList.add("invalidInput")
    } else {
        numberOfPeopleInput.classList.remove("invalidInput")
    }
    
    getTipAndTotalAmount();
});

// ADDING A CLICK LISTENER ON EACH OF THE 5 PERCENTAGE OPTIONS
for (var i = 0; i < tipInputBtn.length; i++) { 
    let newValue = Number(tipInputBtn[i].value.replace("%", ""));
    let target = tipInputBtn[i];

    tipInputBtn[i].addEventListener("click", () => {
        billData.tipPercentage = newValue;
        console.log("New Tip Percentage: ", billData.tipPercentage);

        // THIS LOOP MAKES SURE ONLY 1 BUTTON IS ACTIVE
        for (var y = 0; y < tipInputBtn.length; y++) {
            tipInputBtn[y].classList.replace('activeBtn', 'inactiveBtn');
        }
        target.classList.add("activeBtn");
        tipCustomInput.value = null; //RESETTING CUSTOM TIP INPUT WHEN A PERCENTAGE BTN IS ACTIVE


        getTipAndTotalAmount();
    });
};

// RESET BUTTON FUNCTIONALITY
resetBtn.addEventListener("click", () => {
    billData.amount = 0;
    tipPercentage = 0;
    numberOfPeople = 1;

    // RESETTING INPUTS
    amountInput.value = "";
    tipCustomInput.value = "";
    numberOfPeopleInput.value = "";

    // RESETTING TIP AND TOTAL DISPLAYS
    tipAmountDisplay.innerText = "$0.00";
    totalAmountDisplay.innerText = "$0.00";

    // SETTING ALL TIP PERCENTAGE OPTION BTNS AS INACTIVE
    for (var y = 0; y < tipInputBtn.length; y++) {
        tipInputBtn[y].classList.replace('activeBtn', 'inactiveBtn');
    }

    getTipAndTotalAmount();
    resetBtn.classList.remove("activeResetBtn");
    
    console.log("billData reset!")
});