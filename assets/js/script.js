$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {

        var user = $('#id').val();
        var pass = $('#pword').val();

        if (validator.isEmpty(user)) {
            alert('lol');
        }
        if (validator.isEmpty(pass)) {
            alert('Please fill in all fields');
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
});