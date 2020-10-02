function calculatePrice(val) {
    var sellingPrice = $('#newSale_sellingPrice').val();
    var totalPrice = val * sellingPrice;
    /*display the result*/
    console.log(totalPrice);
    $('#newSale_total').val(totalPrice.toFixed(2));
}

function convertToPrice(val) {
    var value = val;
    return value.toFixed(2);
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
            $.post('/', {
                user: user,
                pass: pass
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            //admin
                            window.location.href = '/a/products';
                            break;
                        }
                    case 202:
                        {
                            //manager
                            window.location.href = '/m/products';
                            break;
                        }
                    case 203:
                        {
                            //user
                            window.location.href = '/u/products';
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

    //Add Methods
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


    $('#newDiscrepancy_checkID').click(function() {
        var prodID = $('#productID').val();
        console.log(prodID);

        if (prodID != '0') {
            $.post('/newDiscrepancy/' + prodID, function(result) {
                if (result) {
                    var currentStock = result.currentStock;
                    console.log(currentStock);
                    $('#oldCount_qty').val(currentStock);
                    $('#newCount_qty').val(currentStock);
                } else
                    alert('Product not found');
            });
        } else
            alert('Please Select a Product');
    });

    $('#newMDgoods_checkID').click(function() {
        var prodID = $('#MDproductID').val();
        console.log(prodID);

        if (prodID != '0') {
            $.post('/newMDgoods/' + prodID, function(result) {
                if (result) {
                    var currentStock = result.currentStock;
                    console.log(currentStock);
                    $('#MDdmg').attr("placeholder", "Current Stock: " + currentStock);
                } else {
                    alert('Product not found');
                }
            });
        }
    })

    $('#submitNewDiscrepancy').click(function() {
        var productID = $('#productID').val();
        var oldCount = $('#oldCount_qty').val();
        var newCount = $('#newCount_qty').val();

        var fieldsEmpty = false;
        var invalidQty = false;

        if (validator.isEmpty(newCount)) {
            fieldsEmpty = true;
            alert('cannot leave empty fields');
        }
        if (parseInt(newCount) < 0) {
            invalidQty = true;
            alert('New count cannot be less than zero');
        }

        if (newCount % 1 != 0) {
            invalidQty = true;
            alert('New count must be a whole number');
        }

        if (parseInt(newCount) == parseInt(oldCount)) {
            invalidQty = true;
            alert('New count has to be different from old count');
        }

        if (!fieldsEmpty && !invalidQty) {
            $.post('/newDiscrepancy', {
                productID: productID,
                newCount: newCount,
                oldCount: oldCount
            }, function(result) {
                console.log(result);
                console.log(result.msg);
                switch (result.status) {
                    case 201:
                        {
                            alert(result.msg);
                            window.location.href = '/a/discrepancy';
                            break;
                        }
                    case 202:
                        {
                            alert(result.msg);
                            window.location.href = '/m/discrepancy';
                            break;
                        }
                    case 203:
                        {
                            alert(result.msg);
                            window.location.href = '/u/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500: ' + result.msg);
                            break;
                        }
                }
            });
        } else {
            alert('No discrepancy recorded');
        }
    });

    $('#submitNewSale').click(function() {
        var quantity = $('#newSale_qty').val();
        var sellingPrice = $('#newSale_sellingPrice').val();
        var total = $('#newSale_total').val();
        var dateSold = $('#newSale_dateSold').val();
        var productID = $('#newSale_prodID').val();

        var fieldsEmpty = false;
        var invalidQty = false;

        if (validator.isEmpty(quantity) || validator.isEmpty(sellingPrice) || validator.isEmpty(total) || validator.isEmpty(dateSold) || validator.isEmpty(productID)) {
            fieldsEmpty = true;
            alert('cannot leave empty fields');
        }
        if (parseInt(quantity) <= 0 || quantity % 1 != 0) {
            invalidQty = true;
            alert('Quantity must be more than zero and must be a whole number');
        }

        if (!fieldsEmpty && !invalidQty) {
            $.post('/newSale_submit', {
                quantity: quantity,
                sellingPrice: sellingPrice,
                total: total,
                dateSold: dateSold,
                productID: productID
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert(result.msg);
                            window.location.href = '/a/sales';
                            break;
                        }
                    case 202:
                        {
                            alert(result.msg);
                            window.location.href = '/m/sales';
                            break;
                        }
                    case 203:
                        {
                            alert(result.msg);
                            window.location.href = '/u/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500: ' + result.msg);
                            break;
                        }
                }
            });
        } else {
            alert('No sale recorded');
        }

    });

    $('#submitNewMDgoods').click(function() {
        var productID = $('#MDproductID').val();
        var numDmg = $('#MDdmg').val();
        var comment = $('#MDcomment').val();

        var fieldsEmpty = false;
        var invalidQty = false;

        if (productID == 0 || validator.isEmpty(numDmg) || validator.isEmpty(comment)) {
            fieldsEmpty = true;
            alert('cannot leave empty fields');
        }
        if (parseInt(numDmg) <= 0) {
            invalidQty = true;
            alert('number of damaged must be more than 0');
        }

        if (numDmg % 1 != 0) {
            invalidQty = true;
            alert("number of damaged must be a whole number")
        }

        if (!fieldsEmpty && !invalidQty) {
            $.post('/newMDgoods', {
                productID: productID,
                numDamaged: numDmg,
                comments: comment
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert(result.msg);
                            window.location.href = '/a/MDgoods';
                            break;
                        }
                    case 202:
                        {
                            alert(result.msg);
                            window.location.href = '/m/MDgoods';
                            break;
                        }
                    case 203:
                        {
                            alert(result.msg);
                            window.location.href = '/u/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500: ' + result.msg);
                            break;
                        }
                }
            })
        } else {
            alert('No Missing/Damaged Goods recorded');
        }
    });

    $('#approveMDGoods').click(function() {
        var dmgrecordID = $('#dmgrecordID').val();
        var numDamaged = $('#MDdmg').val();
        var productID = $('#productID').val();
        $.post('/approvalMDGoods', {
            dmgrecordID: dmgrecordID,
            approved: true,
            numDamaged: numDamaged,
            productID: productID
        }, function(result) {
            switch (result.status) {
                case 201:
                    {
                        alert(result.msg);
                        window.location.href = '/a/forApprovalMDgoods';
                        break;
                    }
                case 202:
                    {
                        alert(result.msg);
                        window.location.href = '/m/deliveries';
                        break;
                    }
                case 401:
                    {
                        alert('case 401: ' + result.msg);
                        break;
                    }
                case 500:
                    {
                        alert('case 500: ' + result.msg);
                        break;
                    }
            }
        });
    });

    $('#rejectMDGoods').click(function() {
        var dmgrecordID = $('#dmgrecordID').val();
        var numDamaged = $('#MDdmg').val();
        var productID = $('#productID').val();
        $.post('/approvalMDGoods', {
            dmgrecordID: dmgrecordID,
            approved: false,
            numDamaged: numDamaged,
            productID: productID
        }, function(result) {
            switch (result.status) {
                case 201:
                    {
                        alert(result.msg);
                        window.location.href = '/a/forApprovalMDgoods';
                        break;
                    }
                case 202:
                    {
                        alert(result.msg);
                        window.location.href = '/m/deliveries';
                        break;
                    }
                case 401:
                    {
                        alert('case 401: ' + result.msg);
                        break;
                    }
                case 500:
                    {
                        alert('case 500: ' + result.msg);
                        break;
                    }
            }
        });
    });

    $('#submitNewDelivery').click(function() {
        var productID = $('#productID').val();
        var dateDelivered = $('#dateDelivered').val();
        var numDamaged = parseFloat($('#numDamaged').val());
        var numDelivered = parseFloat($('#numDelivered').val());
        //  dateDelivered = new Date(dateDelivered.toString());
        console.log(productID);
        console.log(dateDelivered);
        console.log(numDamaged);
        console.log(numDelivered);
        if (parseInt(productID) == 0) {
            alert('Please input a product ID');
        } else if (validator.isAfter(dateDelivered)) {
            alert('Date is invalid');
        } else if (!(numDelivered > 0) || !(numDamaged >= 0)) {
            alert('Quantities invalid');
        } else if (numDamaged >= numDelivered) {
            alert('Number of Damaged must be less than number delivered');
        } else if (numDelivered % 1 != 0) {
            alert('Number of Delivered must be a whole number');
        } else if (numDamaged % 1 != 0) {
            alert('Number of Damaged must be a whole number');
        } else {
            console.log('data is valid');
            $.post('/newDelivery', {
                productID: productID,
                dateDelivered: dateDelivered,
                number_Of_Units_Delivered: numDelivered,
                number_Of_Damaged: numDamaged
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert(result.msg);
                            window.location.href = '/a/deliveries';
                            break;
                        }
                    case 202:
                        {
                            alert(result.msg);
                            window.location.href = '/m/deliveries';
                            break;
                        }
                    case 203:
                        {
                            alert(result.msg);
                            window.location.href = '/u/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500: ' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#submitNewUser').click(function() {
        var fName = $('#fName').val();
        var lName = $('#lName').val();
        var birthdate = $('#birthdate').val();
        var gender;
        var address = $('#address').val();
        var password = $('#password').val();
        var confirm = $('#confirm').val();
        var phoneNum = $('#phoneNum').val()
        if ('Male' == $('#gender').val()) {
            gender = 'M';
        } else gender = 'F';

        var today = new Date();
        var bday = new Date(birthdate);

        var valid = true;

        if (validator.isEmpty(fName) || validator.isEmpty(lName) || validator.isEmpty(address) || validator.isEmpty(password) || validator.isEmpty(confirm) || validator.isEmpty(phoneNum)) {
            valid = false;
            alert('Please Input all fields');
        }

        if (valid && phoneNum.length != 11) {
            valid = false;
            alert('Please input a valid phone number')
        }

        if (valid && confirm != password) {
            valid = false;
            alert('Passwords do not match');
        }

        if (valid && today < bday) {
            valid = false;
            alert('Birthdate cannot be after today')
        }

        if (valid) {
            console.log('firstName : ' + fName);
            console.log('lastName : ' + lName);
            console.log('birthdate : ' + birthdate);
            console.log('gender : ' + gender);
            console.log('address : ' + address);
            console.log('password : ' + password);
            console.log('confirm : ' + confirm);
            $.post('/a/newUser', {
                fName: fName,
                lName: lName,
                birthdate: birthdate,
                gender: gender,
                address: address,
                phoneNum: phoneNum,
                password: password
            }, function(result) {
                switch (result.status) {
                    case 200:
                        {
                            alert('User successfully added with userID: ' + result.userID)
                            window.location.href = '/a/users';
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

    $('#submitNewManager').click(function() {
        var userID = $('#userID').val();
        var isSysAd = $('#isSysAd').val();

        if (userID == 0) {
            alert('Please select a user');
        } else {
            $.post('/newManager', {
                userID: userID,
                isSysAd: isSysAd
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('Manager Successfully Added');
                            window.location.href = '/a/managers';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#submitNewSupplier').click(function() {
        var cName = $('#cName').val();
        var cAddress = $('#cAddress').val();
        var email = $('#email').val();
        var phoneNum = $('#phoneNum').val();

        var valid = true;

        if (validator.isEmpty(cName) || validator.isEmpty(cAddress) || !validator.isEmail(email) || validator.isEmpty(phoneNum)) {
            valid = false;
            alert('Please Input all fields');
        }

        if(valid && (phoneNum.length != 7 && phoneNum.length != 11 && phoneNum.length != 8)) {
            valid = false;
            alert('Please input a valid contact number');
        }

        if (valid) {
            console.log('companyName : ' + cName);
            console.log('companyAddress : ' + cAddress);
            console.log('email : ' + email);
            console.log('phoneNum : ' + phoneNum);
            $.post('/newSupplier', {
                companyName: cName,
                companyAddress: cAddress,
                email: email,
                phoneNum: phoneNum
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('Supplier successfully added with Supplier ID: ' + result.supplierID);
                            window.location.href = '/a/suppliers';
                            break;
                        }
                    case 202:
                        {
                            alert('Supplier successfully added with Supplier ID: ' + result.supplierID);
                            window.location.href = '/m/suppliers';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    //submit New Product
    /**
        Fields received (how to verify):
        productName (String is not empty)
        categoryCode - retrived from category (val != 0)
        supplierID (val != 0)
        sellingPrice (parseFloat > 0)
        purchasePrice (parseFloat > 0)
        
        Computed Fields
        type('F' = categoryCode 1xx, 'A' = categoryCode 2xx)
        currentStock = 0\
        productID(get the highest product ID in the database and add 1)
     */
    $('#submitNewProduct').click(function() {
        var productName = $('#productName').val();
        var categoryCode = parseInt($('#category').val());
        var supplierID = parseInt($('#supplierID').val());
        var sellingPrice = parseFloat($('#sellingPrice').val());
        var purchasePrice = parseFloat($('#purchasePrice').val());
        var valid = true;
        // console.log('Product Name : ' + productName);
        // console.log('Category Code : ' + categoryCode);
        // console.log('SupplierID : ' + supplierID);
        // console.log('sellingPrice : ' + sellingPrice);
        // console.log('purchasePrice : ' + purchasePrice);
        if (validator.isEmpty(productName)) {
            valid = false;
            alert('Please fill in product name');
        }

        // console.log(valid);
        if (supplierID == 0) {
            valid = false;
            alert('Supplier not Selected');
        }
        // console.log(valid);

        if (categoryCode == 0) {
            valid = false;
            alert('Category not selected');
        }

        // console.log(valid + ' ' + type);

        if (!(sellingPrice > 0)) {
            valid = false;
            alert('Selling Price is invalid');
        }

        // console.log(valid);

        if (!(purchasePrice > 0)) {
            valid = false;
            alert('Purchase Price is invalid');
        }

        if (valid && purchasePrice >= sellingPrice) {
            valid = false;
            alert('Selling price must be greater than purchase price');
        }
        // console.log(valid);

        if (valid) {

            $.post('/newProduct', {
                productName: productName,
                categoryCode: categoryCode,
                supplierID: supplierID,
                sellingPrice: sellingPrice,
                purchasePrice: purchasePrice
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('User successfully added with productID: ' + result.productID);
                            window.location.href = '/a/products';
                            break;
                        }
                    case 202:
                        {
                            alert('User successfully added with productID: ' + result.productID);
                            window.location.href = '/m/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('Error ' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#submitEditProduct').click(function() {
        // var productName = $('#productName').val();
        // var categoryCode = parseInt($('#category').val());
        // var supplierID = parseInt($('#supplierID').val());
        var productID = parseInt($('#productID').val());
        var sellingPrice = parseFloat($('#sellingPrice').val());
        var purchasePrice = parseFloat($('#purchasePrice').val());
        var valid = true;
        // console.log('Product Name : ' + productName);
        // console.log('Category Code : ' + categoryCode);
        // console.log('SupplierID : ' + supplierID);
        console.log(productID);
        console.log('sellingPrice : ' + sellingPrice);
        console.log('purchasePrice : ' + purchasePrice);

        if (!(sellingPrice > 0)) {
            valid = false;
            alert('Selling Price is invalid');
        }

        // console.log(valid);

        if (!(purchasePrice > 0)) {
            valid = false;
            alert('Purchase Price is invalid');
        }

        if (valid && purchasePrice >= sellingPrice) {
            valid = false;
            alert('Selling price must be greater than purchase price');
        }
        // console.log(valid);

        if (valid) {
            // alert('valid na');
            $.post('/editProduct', {
                productID: productID,
                purchasePrice: purchasePrice,
                sellingPrice: sellingPrice
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('Product successfully edited with productID: ' + result.productID);
                            window.location.href = '/a/products';
                            break;
                        }
                    case 202:
                        {
                            alert('Product successfully edited with productID: ' + result.productID);
                            window.location.href = '/m/products';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('Error ' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#submitEditSupplier').click(function() {
        var supplierID = $('#supplierID').val();
        var email = $('#email').val();
        var phoneNum = $('#phoneNum').val();

        var valid = true;

        if (!validator.isEmail(email) || (validator.isEmpty(phoneNum) || phoneNum.length != 11)) {
            valid = false;
            alert('Please input valid information');
        }

        if (valid) {
            console.log('email : ' + email);
            console.log('phoneNum : ' + phoneNum);
            console.log(supplierID);
            $.post('/editSuppliers', {
                supplierID: supplierID,
                email: email,
                phoneNum: phoneNum
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('Supplier successfully edited with Supplier ID: ' + result.supplierID);
                            window.location.href = '/a/suppliers';
                            break;
                        }
                    case 202:
                        {
                            alert('Supplier successfully edited with Supplier ID: ' + result.supplierID);
                            window.location.href = '/m/suppliers';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500' + result.msg);
                            break;
                        }
                }
            });
        }
    });

    $('#purchase_deliveryID').change(function() {
        var deliveryID = $('#purchase_deliveryID').val();
        if (deliveryID != '0') {
            $.post('/newPurchase/' + deliveryID, function(result) {
                console.log(result.amount);
                $('#purchase_amountPaid').val(convertToPrice(result.amount));
                $('#purchase_totalCost').val(convertToPrice(result.amount));
            });
        }
    });

    $('#purchase_Submit').click(function() {
        var deliveryID = $('#purchase_deliveryID').val();
        var datePaid = $('#purchase_datePaid').val();
        var amountPaid = $('#purchase_amountPaid').val();
        var totalCost = $('#purchase_totalCost').val();

        if (!validator.isEmpty(deliveryID) && !validator.isEmpty(datePaid) && !validator.isEmpty(amountPaid)) {
            $.post('/newPurchase', {
                deliveryID: deliveryID,
                datePaid: datePaid,
                amountPaid: amountPaid,
                totalCost: totalCost
            }, function(result) {
                switch (result.status) {
                    case 201:
                        {
                            alert('Purchase successfully created with purchase ID: ' + result.purchase.purchaseID);
                            window.location.href = '/a/purchases';
                            break;
                        }
                    case 202:
                        {
                            alert('Purchase successfully created with purchase ID: ' + result.purchase.purchaseID);
                            window.location.href = '/m/purchases';
                            break;
                        }
                    case 401:
                        {
                            alert('case 401: ' + result.msg);
                            break;
                        }
                    case 500:
                        {
                            alert('case 500' + result.msg);
                            break;
                        }
                }
            });
        } else {
            alert('cannot leave empty fields');
        }

    });

    $('#supplierReport_Search').click(function() {
        var supplierID = $('#supplierReport_ID').val();
        var fromDate = $('#supplierReport_start').val();
        var toDate = $('#supplierReport_end').val();

        if (supplierID != '0') {
            console.log(supplierID);
            console.log(fromDate);
            console.log(toDate);

            $.get('/supplierReport', { supplierID: supplierID, fromDate: fromDate, toDate: toDate }, function(res) {
                $('html').html(res);
            });
        } else
            alert('Select a Supplier ID');
    });

    $('#performanceReport_Search').click(function() {
        var productID = $('#productID').val();
        var fromDate = $('#performanceReport_start').val();
        var toDate = $('#performanceReport_end').val();

        if (productID != '0') {
            console.log(productID);
            console.log(fromDate);
            console.log(toDate);

            $.get('/performanceReport', { productID: productID, fromDate: fromDate, toDate: toDate }, function(res) {
                $('html').html(res);
            });
        } else
            alert('Select a Product ID');
    });

    $('#inventoryReport_Search').click(function() {
        var productID = $('#productID').val();
        var fromDate = $('#inventoryReport_start').val();
        var toDate = $('#inventoryReport_end').val();

        if (productID != '0') {
            console.log(productID);
            console.log(fromDate);
            console.log(toDate);

            $.get('/inventoryReport', { productID: productID, fromDate: fromDate, toDate: toDate }, function(res) {
                $('html').html(res);
            });
        } else
            alert('Select a Product ID');
    });
});