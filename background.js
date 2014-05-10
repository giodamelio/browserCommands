chrome.commands.onCommand.addListener(function(command) {
    // Send a message to the active tab telling it to open the command bar
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "toggle-command-bar"});
    });
});
