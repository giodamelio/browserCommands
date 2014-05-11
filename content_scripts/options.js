// Make a hidden element to store our templates in
$("body").append("<div id='templates' class='hidden'></div>");

// Download our templates
$("#templates").load(chrome.extension.getURL("templates/add.html"));

var addCommand = function() {
    var dialog = $("#templateAdd").dialog({
        minWidth: 500,
        buttons: {
            "Cancel": function() {
                $(this).dialog("close");
            },
            "Add Command": function() {

            }
        }
    })
};
