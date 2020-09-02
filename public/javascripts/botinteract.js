var messageStyle = 'u1';

function updateMessage(text)
{
    var audio = document.getElementById("my_audio");
    var para = document.createElement('p');
    para.className = messageStyle;
    para.innerHTML = text;
    audio.play();
    // messageStyle = (messageStyle=='u1'?'u2':'u1');
    document.getElementById("botbody").appendChild(para);
}

// Handle a messaging event
function postMessage(text)
{
    // SERVER REQUEST USING AJAX
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:8000/msg",
        data: {"msg":text},
        success: function (response)
        {
            updateMessage(response+"a");
        }
    });

    // clear input arear
    $("#message_input").val("");
    $("#send_button").attr('disabled', 'true');
    $("#message_input").focus();
}



// INITIATE  LiveChat
var bot = document.getElementsByClassName("botcontainer")[0];
bot.style.cssText = `
    display: block;
`;

// USER's INTERACTION
$("#message_input").on('keyup', function()
{
    if($(this).val() == "")
    {
        $("#send_button").attr('disabled', 'true');
    }
    else
    {
        $("#send_button").removeAttr('disabled');
    }
});

$("#send_button").click(function(e)
{
    var user_msg = $("#message_input").val();
    postMessage(user_msg);

    $("#message_input").removeAttr('placeholder');

});
