/**
 * Created by ubuntu14 on 7/23/17.
 */
function replace_language(str)
{
    var present_str=window.location.href;
    var language_choose_flag1=present_str.indexOf('?lang=DK');
    var language_choose_flag2=present_str.indexOf('?lang=EN');
    var result_str;
    var change_flag=true;
    if(language_choose_flag1>0) {
        if(str.indexOf('DK')>0)
        {
            change_flag=true;
        }
        else{
            change_flag=false;
            result_str = present_str.substring(0, language_choose_flag1) + "?lang=EN";
        }

    }
    else if(language_choose_flag2>0)
    {
        if(str.indexOf('DK')>0)
        {
            change_flag=false;
            result_str=present_str.substring(0,language_choose_flag2)+"?lang=DK";
        }
        else{
            change_flag=true;
        }

    }
    else
    {
        change_flag=false;
        result_str=present_str+str;
    }
    if(change_flag==false)
    {
        window.location=result_str;

    }


}