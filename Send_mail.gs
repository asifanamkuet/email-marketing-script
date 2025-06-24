function sendDraftsWithRecipients() {
  var drafts = GmailApp.getDrafts();
  var failedDrafts = [];

  for (var i = 0; i < drafts.length; i++) {
    var draft = drafts[i];
    var message = draft.getMessage();
    var recipients = message.getTo();
    if (recipients && recipients.length > 0) { // Check if there are recipients
      try {
        draft.send(); // Send the draft email
        Utilities.sleep(5000); // Delay for 5 seconds (5000 milliseconds)
      } catch (error) {
        // If sending fails, add the draft to the list of failed drafts
        failedDrafts.push(draft);
        console.error('Error sending draft: ' + draft.getId(), error);
      }
    }
  }

  // If there are failed drafts, cache them and schedule a re-run
  if (failedDrafts.length > 0) {
    cacheFailedDrafts(failedDrafts);
    scheduleRetry();
  }
}

// Function to cache failed drafts
function cacheFailedDrafts(failedDrafts) {
  var cache = CacheService.getScriptCache();
  cache.put('failedDrafts', JSON.stringify(failedDrafts), 3600); // Cache for 1 hour (3600 seconds)
}

// Function to schedule a retry
function scheduleRetry() {
  var trigger = ScriptApp.newTrigger('retryFailedDrafts')
    .timeBased()
    .after(300000) // Retry after 5 minutes (300000 milliseconds)
    .create();
}

// Function to retry sending failed drafts
function retryFailedDrafts() {
  var cache = CacheService.getScriptCache();
  var failedDraftsJSON = cache.get('failedDrafts');
  if (failedDraftsJSON) {
    var failedDrafts = JSON.parse(failedDraftsJSON);
    failedDrafts.forEach(function(draft) {
      try {
        draft.send();
        Utilities.sleep(5000); // Delay for 5 seconds (5000 milliseconds)
      } catch (error) {
        console.error('Error sending draft on retry: ' + draft.getId(), error);
      }
    });
    // Clear cache after retrying
    cache.remove('failedDrafts');
  }
}
