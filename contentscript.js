var isCommandBarOpen = false;

// Autocomplete
var commands = [
    { id: 1, name: "Make background red", script: "$('*').css('background', 'red');" },
    { id: 2, name: "Make background blue", script: "$('*').css('background', 'blue');"}
];

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
                source: function(request, response) {
                    response(
                        commands.filter(function(value) {
                            return value.name.indexOf(request.term) > -1
                        }).map(function(value) {
                            return {
                                label: value.name,
                                id: value.id
                            }
                        })
                    );
                },
                select: function(event, ui) {
                    // Exacute the command
                    commands.map(function(value) {
                        if (value.id == ui.item.id) {
                            eval(value.script);
                        }
                        // Remove the commandbar
                        $("input.command_bar").remove();
                    })
                }
            });
        } else {
            // Close the command bar
            $("input.command_bar").remove();
        }
        isCommandBarOpen = !isCommandBarOpen;
    }
});
