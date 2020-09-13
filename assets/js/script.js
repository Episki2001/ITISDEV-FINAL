// const { validationResult } = require("express-validator");
// const { pluralize } = require("mongoose");
// const { default: validator } = require("validator");

function calculatePrice(val) {
    var sellingPrice = $('#newSale_sellingPrice').val();
    var totalPrice = val * sellingPrice;
    /*display the result*/
    console.log(totalPrice);
    $('#newSale_total').val(totalPrice.toFixed(2));
}

$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {

        var user = $('#id').val();
        var pass = $('#pword').val();

        // checking if fields are not empty
        if (validator.isEmpty(user)) {
            alert('No user id provided');
        }
        if (validator.isEmpty(pass)) {
            alert('No password provided');
        }

        if (!validator.isEmpty(user) && !validator.isEmpty(pass)) {
            $.post('/', { user: user, pass: pass }, function(result) {
                switch (result.status) {
                    case 200:
                        {
                            window.location.href = '/a/suppliers';
                            break;
                        }
                    case 401:
                    case 500:
                        {
                            alert('case 500' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#newSale_checkID').click(function() {
        var prodID = $('#newSale_prodID').val();
        console.log(prodID);

        if (validator.isEmpty(prodID)) {
            $('#newSale_qty').attr("placeholder", "Quantity Sold");
            $('#newSale_qty').removeAttr("max");
            $('#newSale_sellingPrice').val(0.00);
            alert('Please input product ID');
        }

        if (!validator.isEmpty(prodID)) {
            $.post('/newSale/' + prodID, function(result) {
                if (result.sellingPrice) {
                    console.log('result:' + result);
                    var sellingPrice = result.sellingPrice;
                    console.log(sellingPrice);
                    $('#newSale_qty').attr("placeholder", "Current Stock: " + result.currentStock);
                    $('#newSale_qty').attr("max", result.currentStock);
                    $('#newSale_sellingPrice').val(sellingPrice.toFixed(2));
                } else
                    alert('Product not found');
            });
        }
    });

    $('#submitNewSale').click(function() {
        var quantity = $('#newSale_qty').val();
        var sellingPrice = $('#newSale_sellingPrice').val();
        var total = $('#newSale_total').val();
        var dateSold = $('#newSale_dateSold').val();
        var productID = $('#newSale_prodID').val();

        //validate productID
        /**check if productID exsist*/
        //validate quantity
        /**check if quantity is less than or equal to stock */
        //validate dateDold
        /**check if date is valid*/
        // 
        $.post('/newSale_submit', { quantity: quantity, sellingPrice: sellingPrice, total: total, dateSold: dateSold, productID: productID }, function(result) {

        });
    });

    $('#submitNewUser').click(function() {
        var fName = $('#fName').val();
        var lName = $('#lName').val();
        var birthdate = $('#birthdate').val();
        var gender = $('#gender').val();
        var address = $('#phoneNum').val();
        var password = $('#password').val();
        var confirm = $('#confirm').val();
        var hireDate = new Date();

        console.log(fName);
        console.log(lName);
        console.log(birthdate);
        console.log(gender);
        console.log(hireDate);

    });
});