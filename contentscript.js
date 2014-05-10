var isCommandBarOpen = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "toggle-command-bar") {
        // Toggle the command bar
        if (!isCommandBarOpen) {
            // Open the command bar
            console.log("Here!")
            var command_bar = $("<input class=\"command_bar\">");
            $("body").prepend(command_bar);
        } else {
            // Close the command bar
            $("input.command_bar").remove();
        }
        isCommandBarOpen = !isCommandBarOpen;
    }
});
