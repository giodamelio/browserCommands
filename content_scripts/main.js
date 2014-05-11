var isCommandBarOpen = false;

// Extend jquerys autocomplete to add options at the end
var options = [
    {
        label: "Add command",
        value: "Add command",
        option: "add_command"
    },
    {
        label: "Edit command",
        value: "Edit command",
        option: "edit_command"
    },
    {
        label: "Delete command",
        value: "Delete command",
        option: "delete_command"
    }
];
$.widget("custom.optionscomplete", $.ui.autocomplete, {
    _renderMenu: function(ul, items) {
        var that = this;
        $.each(items, function(index, item) {
            // If we are about to add the first options, add a seperator
            if (item.option && $(ul).children(".ui-autocomplete-category").length === 0) {
                ul.append("<li class='ui-autocomplete-category'>Options</li>");
            }

            that._renderItemData(ul, item);
        });
    }
});

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
            command_bar.optionscomplete({
                delay: 0,
                autoFocus: true,
                minLength: 0,
                source: function(request, autocomplete) {
                    // Autocomplete
                    chrome.runtime.sendMessage({command: "autocomplete", text: request.term}, function(response) {
                        // Autocomplete our commands
                        var commandsCompletions = response.map(function(value) {
                            return {
                                ID: value.ID,
                                value: value.name,
                                script: value.script
                            };
                        });

                        // Autocomplete our options
                        var optionsCompletions = options.filter(function(value) {
                            return value.label.toLowerCase().indexOf(request.term.toLowerCase()) > -1;
                        });

                        // If there is no text, only show the options
                        if (request.term === "") {
                            autocomplete(optionsCompletions);
                        } else {
                            autocomplete(commandsCompletions.concat(optionsCompletions));
                        }
                    });
                },
                select: function(event, ui) {
                    if (ui.item.option) {
                        // Perform the option
                        if (ui.item.option == "add_command") {
                            addScript();
                        }
                    } else {
                        // Exacute the command
                        eval(ui.item.script);
                    }
                    $("input.command_bar").remove();
                }
            });

            // Open by default
            command_bar.optionscomplete("search", "");
        } else {
            // Close the command bar
            $("input.command_bar").remove();
        }
        isCommandBarOpen = !isCommandBarOpen;
    }
});
