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
    $('#name').keyup(function(){
        var name=$('#name').val();
        if(!(name.match(/^[A-Za-z ,'-]{1,25}$/)))
        {
            $('#nameerror').show();
            $('#nameerror').text("type correct.");
            $('#nameerror').css({"font-size":"10px",'color':'red'});

        }
        else
        {
            $('#nameerror').hide();
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
    //       'username': {
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
        var email=$('#email').val();
        var password=$('#password').val();
        var name=$('#name').val();
        if((email.match(/^[a-zA-Z0-9.!#$%&’*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-]/))&&(password.length>0)&&(name.match(/^[A-Za-z ,'-]{1,25}$/)))
        {
            var formData = {
                'username'              : $('input[name=username]').val(),
                'password'    : $('input[name=password]').val()
            };
            $.ajax({
                type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url         : '/signup', // the url where we want to POST
                data        : formData, // our data object
                dataType    : 'json', // what type of data do we expect back from the server
                encode          : true
            })
                .done(function(data) {
                    console.log(data);
                    if(!data)
                    {
                        alert('fail');
                    }
                    else
                    {
                        if(data.indexOf('fail')<0)
                        {
                            alert(data);
                            window.location.href='/'+localStorage.getItem('language');

                        }
                        else{
                            alert(data);

                        }
                    }
                });
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
                var name=$('#name').val();
                if(!(name.match(/^[A-Za-z ,'-]{1,25}$/)))
                {
                    $('#nameerror').show();
                    $('#nameerror').text("Invaild Format.");
                    $('#nameerror').css({"font-size":"10px",'color':'red'});

                }
                else
                {
                    $('#nameerror').hide();
                }

        }
        //$('form').validatr();

        event.preventDefault();
    });

});