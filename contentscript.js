var isCommandBarOpen = false;

// Autocomplete
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
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
                source: availableTags,
                delay: 0,
                autoFocus: true
            });
        } else {
            // Close the command bar
            $("input.command_bar").remove();
        }
        isCommandBarOpen = !isCommandBarOpen;
    }
});
