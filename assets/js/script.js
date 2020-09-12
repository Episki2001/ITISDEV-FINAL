$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {

        var user = $('#id').val();
        var pass = $('#pword').val();


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
    });
});