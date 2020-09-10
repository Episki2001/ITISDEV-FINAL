$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {
        var user = $('#id').val();
        var pass = $('#pword').val();

        $('#usErr').text('');
        $('#pwErr').text('');


        // send post request, check if user exists
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
                        alert(result.msg);
                        break;
                    }
            }
        });

    });
});