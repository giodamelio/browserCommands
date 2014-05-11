var isCommandBarOpen = false;

// Setup the command bar
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "toggle-command-bar") {
        // Toggle the command bar
        if (!isCommandBarOpen) {
            // Open the command bar

            // Create the command bar
            var command_bar = $("<input class=\"command_bar\">");
            $("body").prepend(command_bar);

            // Focus on it
            command_bar.focus();

            // Setup autocomplete
            command_bar.autocomplete({
                delay: 0,
                autoFocus: true,
                source: function(request, autocomplete) {
                    // Autocomplete
                    chrome.runtime.sendMessage({command: "autocomplete", text: request.term}, function(response) {
                        autocomplete(response.map(function(value) {
                            return {
                                ID: value.ID,
                                value: value.name,
                                script: value.script
                            };
                        }));
                    });
                    
                },
                select: function(event, ui) {
                    // Exacute the command
                    eval(ui.item.script);
                    $("input.command_bar").remove();
                }
            });
        } else {
            // Close the command bar
            $("input.command_bar").remove();
        }
        isCommandBarOpen = !isCommandBarOpen;
    }
});
