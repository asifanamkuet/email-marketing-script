function sendDraftsWithRecipientsst() {
  try {
    var drafts = GmailApp.getDrafts();
  
    for (var i = 0; i < drafts.length; i++) {
      var draft = drafts[i];
      var message = draft.getMessage();
      var recipients = message.getTo();
      if (recipients && recipients.length > 0) { // Check if there are recipients
        draft.send(); // Send the draft email
        Utilities.sleep(500); // Delay for 5 seconds (5000 milliseconds)
      }
    }
  } catch (error) {
    Logger.log("An error occurred: " + error);
    // If an error occurs, rerun the function
    sendDraftsWithRecipientsst();
  }
}