var db = new localStorageDB("commandsDb", localStorage);

// Add some example scripts if the database is empty
if(db.isNew()) {
    db.createTable("commands", ["name", "script"]);

    db.insert("commands", {name: "Background red", script: "$('*').css('background', 'red');"});
    db.insert("commands", {name: "Background blue", script: "$('*').css('background', 'blue');"});

    db.commit();
}

// Open the command bar when the keyboard shortcut is sent
chrome.commands.onCommand.addListener(function(command) {
    // Send a message to the active tab telling it to open the command bar
    sendMessage({command: "toggle-command-bar"});
});

// Handle autocompleation from the database
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "autocomplete") {
        // Query the database and send response to the command bar
        sendResponse(db.query("commands", function(row) {
            if (row.name.toLowerCase().indexOf(request.text.toLowerCase()) > -1) {
                return true;
            } else {
                return false;
            }
        }));
    }
});

// Helper to send command to current tab
var sendMessage = function(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
};
