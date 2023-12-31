//products_display.js

// get url parameters
let params = (new URL(document.location)).searchParams;
let error;
let order = [];


window.onload = function() {
    if (params.has('error')) {
        console.log("Error: No quantities selected.");
        document.getElementById('errorMessage').innerHTML = `<h2 class= "text-danger"> No quantities selected. </h2>`;
        setTimeout(() => {
            document.getElementById('errorMessage').innerHTML = "";
        }, 6000);
    } 
    else if (params.has('inputError')) {
        console.log("Input Error: Please fix errors before proceeding.");
        document.getElementById('errorMessage').innerHTML = `<h2 class= "text-danger"> Please fix errors before proceeding.</h2>`;
        setTimeout(() => {
            document.getElementById('errorMessage').innerHTML = "";
        }, 6000);

        for (let i in products) {
            let qtyInput = qty_form[`qty${[i]}_entered`];
            let qtyError = document.getElementById(`qty${[i]}_error`);

            if (params.get(`qty${i}`) !== null) {
                qtyInput.value = params.get(`qty${i}`);
            }

            let errorMessage = validateQuantity(qtyInput.value, products[i].qty_available);
            if (errorMessage.length > 0) {
                console.log("Validation Error:", errorMessage);
                qtyError.innerHTML = errorMessage.join('<br>');
                qtyInput.parentElement.style.borderColor = "red";
            } else {
                qtyError.innerHTML = "";
                qtyInput.parentElement.style.borderColor = "black";
            }
        }
    }
    if (params.has('name')) {
        document.getElementById('helloMsg').innerHTML = `Welcome back ${params.get('name')}!`;
        for (let i in products) {
            qty_form[`qty${i}`].value = params.get(`qty${i}`);
        }
    }
}

//if there is an error submitted, then show the error text in errorDiv
if(error == 'true'){
    document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">Submission Error - Please Fix Quantities!</h2><br>`;
}

// Populate the DOM Form with the product details
for (let i = 0; i < products.length; i++) {
// Products Display Grid
document.querySelector('.row').innerHTML += `
    <div class="col-md-6 product_card">
        <div>
        <br>
        <br>
        <h5 style="float: center;" class="product_name">${products[i].name}</h5>
        <h5 style="float: center;" class ="product_price">$${(products[i].price).toFixed(2)}</h5>
        </div>  
        <img src="${products[i].image}" class="img-thumbnail" alt="${products[i].alt}">
        <div style="height: 90px;">
        <table style="width: 100%; text-align: center; font-size: 18px;" id="product_table">
        <tr>
        <!-- Towels available -->
        <td style=";text-align: center; width: 20%;  ">Shoes Available: ${products[i].qty_available}</td>
        <!-- Input textbox for quantity -->
        <td style="text-align: center; width: 20%;" rowspan="2">
        <input type="text" autocomplete="off" placeholder="Enter Quantity" name="qty${[i]}" id="qty${[i]}_entered" class="inputBox" onkeyup="checkInputTextbox(this,${products[i].qty_available})" value = "0">
        <!-- Label for quantity -->
        <label id="qty${[i]}_label" style="margin: 6px 0; float: center; padding-right: 10px;">Quantity:</label>
        </td>
        </tr>
        <tr>
        <!-- Sold Quantity -->
        <td style="text-align: center; width: 35%;" id="total_sold${i}">Sold: ${products[i].qty_sold}</td>
        </tr>
        <tr>
        <!-- Error message -->
        <td colspan="3" style="padding-top: 5px;"><div id="qty${[i]}_error" style="color: red;"></div></td>
        </tr>
        </table>
        </div>  
        </div>
    `;
}

// client side validation

// Updated validateQuantity function
function validateQuantity(quantity, availableQuantity) {
    let errors = []; // Initialize an array to hold error messages

    quantity=Number(quantity);

    switch (true) {
        case (isNaN(quantity)) && (quantity != ''):
            errors.push("Not a number. Please enter a non-negative quantity to order.");
            break;
        case quantity < 0 && !Number.isInteger(quantity):
            errors.push("Negative inventory and not an Integer. Please enter a non-negative quantity to order.");
            break;
        case quantity < 0:
            errors.push("Negative inventory. Please enter a non-negative quantity to order.");
            break;
        case quantity !=0 && !Number.isInteger(quantity):
            errors.push("Not an Integer. Please enter a non-negative quantity to order.");
            break;
        case quantity > availableQuantity:
            errors.push(`We do not have ${quantity} available.`);
            break;
        // No default case needed as no errors means the array remains empty
    }

    return errors; // Return the array of errors
};

// CHECK Quantities
// Updated checkInputTextbox function
function checkInputTextbox(textBox, availableQuantity) {
    let str = String(textBox.value);

    // Check if the first character is '0' and remove it if found
    if (str.charAt(0) == '0') {
        textBox.value = Number(str.slice(0, 0) + str.slice(1, str.length));
    }

    // Convert the input value to a number
    let inputValue = Number(textBox.value);

    // Validate the user input quantity using the updated validateQuantity function
    let errorMessage = validateQuantity(inputValue, availableQuantity);

    // Route all other GET requests to serve static files from a directory named "public"

app.all('*', function (request, response, next) {
    //console.log(request.method + ' to ' + request.path);
    next();
 });

    // Check if there are any error messages and update the display
    let errorDisplay = document.getElementById(textBox.name + '_error');
    if (errorMessage.length > 0) {
        errorDisplay.innerHTML = errorMessage.join('<br>');
        errorDisplay.style.color = "red";
        textBox.parentElement.style.borderColor = "red";
    } else {
        errorDisplay.innerHTML = "";
        textBox.parentElement.style.borderColor = "black";
    }
}

if (params.has('user')) {
    document.getElementById('user-carry').innerHTML = `
    <input type="hidden" id="user" name="user" value="${params.get('user')}">
    `
}

if (params.has('submit')) {
    for (i = 0; i < 6; i++) {
        let product_values = document.getElementById(`qty${i}_entered`)
        product_values.value = parseInt(params.get(`qty${i}`));
    }
}

document.addEventListener("DOMContentLoaded", function (){
    if (params.has("submit")) {
        document.getElementById("purchase_form").submit();
    }
})
