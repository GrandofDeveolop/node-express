$(document).ready(function() {

    var str=window.location.href;
    console.log(str);
    if(window.location.href.indexOf("?lang=")<0)
    {
        if(localStorage==null)
        {
            localStorage.setItem("language","?lang=EN");
        }
        console.log("clicked");
        window.location.href=str+localStorage.getItem("language");
        console.log("dddddddddddddddddddddddd");
    }

    //if(document.cookie.indexOf('og')>0)
    //{
    //    $('#login').hide();
    //    $('#signup').hide();
    //    $('#logout').show();
    //
    //}
    //else{
    //    $('#login').show();
    //    $('#signup').show();
    //    $('#logout').hide();
    //
    //}

});