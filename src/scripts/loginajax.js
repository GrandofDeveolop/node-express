$(document).ready(function() {

    $('#email').keyup(function(){
        var email=$('#email').val();
        if(!(email.match(/^[a-zA-Z0-9.!#$%&’*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]/)))
        {
            $('#emailerror').show();
            $('#emailerror').text("Invaild Email.Correct like 'star@gmail.com'");
            $('#emailerror').css({"font-size":"10px",'color':'red'});

        }
        else
        {
            $('#emailerror').hide();
        }
    });
    $('#password').keyup(function(){
        var password=$('#password').val();
        if(password.length<1)
        {
            $('#passworderror').show();
            $('#passworderror').text("Invaild password.");
            $('#passworderror').css({"font-size":"10px",'color':'red'});

        }
        else
        {
            $('#passworderror').hide();
        }
    });
    //$('#userForm').formValidation({
    //    framework: 'bootstrap',
    //    icon: {
    //        valid: 'glyphicon glyphicon-ok',
    //        invalid: 'glyphicon glyphicon-remove',
    //        validating: 'glyphicon glyphicon-refresh'
    //    },
    //    fields: {
    //        'username': {
    //            validators: {
    //                notEmpty: {
    //                    message: 'The email address is required'
    //                },
    //                emailAddress: {
    //                    message: 'The input is not a valid email address'
    //                }
    //            }
    //        }
    //    }
    //});
    $('form').submit(function(event) {
        console.log("ajax connect");
        var email=$('#email').val();
        var password=$('#password').val();

        if((email.match(/^[a-zA-Z0-9.!#$%&’*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]/))&&(password.length>0))
        {
            var formData = {
                'username'              : $('input[name=username]').val(),
                'password'    : $('input[name=password]').val()
            };
            //alert("ddd");
            //console.log("ajax connect");
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : '/login', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode          : true
            })
                .done(function(data) {
                    console.log(data);
                    console.log('ddd');
                    if(!data)
                    {

                        alert('Failed!');
                    }
                    if(data.indexOf('fail')>0)
                    {
                        alert('unregistered user!');
                    }
                    if(data.includes('sussess'))
                    {
                        alert('Successful!');
                        document.cookie="logged";
                        window.location.href='/'+localStorage.getItem('language');
                    }


                });
            event.preventDefault();

        }
        else{
                var email=$('#email').val();
                if(!(email.match(/^[a-zA-Z0-9.!#$%&’*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]/)))
                {
                    $('#emailerror').show();
                    $('#emailerror').text("Invaild Email.Correct like 'star@gmail.com'");
                    $('#emailerror').css({"font-size":"10px",'color':'red'});

                }
                else
                {
                    $('#emailerror').hide();
                }
                var password=$('#password').val();
                if(password.length<1)
                {
                    $('#passworderror').show();
                    $('#passworderror').text("Invaild password.");
                    $('#passworderror').css({"font-size":"10px",'color':'red'});

                }
                else
                {
                    $('#passworderror').hide();
                }
            event.preventDefault();
        }

    });

});