$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {
        console.log('login' + 'method start');

        var user = $('#id').val();
        var pass = $('#pword').val();

        $('#usErr').text('');
        $('#pwErr').text('');

        console.log('post');

        // send post request, check if user exists
        $.post('/', { user: user, pass: pass }, function(result) {
            switch (result.status) {
                case 200:
                    {
                        window.location.href = '/';
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


        // send post request, check if user exists
        console.log('login' + 'method done');

    });
});