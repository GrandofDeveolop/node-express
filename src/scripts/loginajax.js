$(document).ready(function() {
    $('form').submit(function(event) {
        console.log("ajax connect");
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
                if(data.includes('sussess'))
                {
                    alert('Successful!');
                    window.location.href='/';
                }

            });
        event.preventDefault();
    });

});