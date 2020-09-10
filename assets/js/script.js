$(document).ready(function() {

    /* LOGIN METHODS */

    // LOGIN: validation of form when submitting
    $('#submitLogin').click(function() {
        console.log('login method start');

        var user = $('#id').val();
        var pass = $('#pword').val();

        $('#usErr').text('');
        $('#pwErr').text('');

        console.log('post');

        // send post request, check if user exists
        console.log('typeof result: ' + typeof result);
        // $.post('/', { user: user, pass: pass }, function(result) {
        //     console.log('switch');
        //     alert(result.status);
        //     switch (result.status) {
        //         case 200:
        //             {
        //                 window.location.href = '/a/suppliers';
        //                 console.log('window.location.href');
        //                 break;
        //             }
        //         case 401:
        //         case 500:
        //             {
        //                 alert(result.msg);
        //                 break;
        //             }
        //     }
        //     console.log('switch done');
        // });

        $.ajax({
            type: "POST",
            url: "/",
            data: { user: user, pass: pass },
            success: function(result) {
                switch (result.status) {
                    case 200:
                        {
                            window.location.href = '/a/suppliers';
                            console.log('window.location.href');
                            break;
                        }
                    case 401:
                    case 500:
                        {
                            alert(result.msg);
                            break;
                        }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {

                alert("Error, status = " + textStatus + ", " +
                    "error thrown: " + errorThrown
                );

            },
            complete: function() {
                console.log('complete');
            }
        });
        alert('end');
    });
});