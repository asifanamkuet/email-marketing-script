function sendDraftsWithRecipientsAndCheckBounceBack() {
  var drafts = GmailApp.getDrafts();
  var bounceBackMessages = [];
   
  // Check for bounce back emails
  var threads = GmailApp.search('Subject:"Delivery Status Notification (Failure)"');
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject(); // Retrieve the subject of the bounce back email
      var body = message.getPlainBody();
      var match = body.match(/Final-Recipient: rfc822;(.*)/); // Extract recipient from body
      if (match && match.length > 1) {
        var recipient = match[1].trim();
        bounceBackMessages.push({ message: message, subject: subject, recipient: recipient });
      }
    }
  }

  var threads = GmailApp.search('Subject:"postmaster"');
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject(); // Retrieve the subject of the bounce back email
      var body = message.getPlainBody();
      var match = body.match(/Final-Recipient: rfc822;(.*)/); // Extract recipient from body
      if (match && match.length > 1) {
        var recipient = match[1].trim();
        bounceBackMessages.push({ message: message, subject: subject, recipient: recipient });
      }
    }
  }
  
  // Log bounce back emails
  if (bounceBackMessages.length > 0) {
    Logger.log("Bounce back emails found:");
    for (var k = 0; k < bounceBackMessages.length; k++) {
      Logger.log("Subject: " + bounceBackMessages[k].subject + ", Recipient: " + bounceBackMessages[k].recipient);
    }
    
    // Remove recipients from the Google Sheet
    removeRecipientsFromSheet(bounceBackMessages.map(function(message) { return message.recipient; }));
    
    // Mark bounce back emails as read
    markBounceBackEmailsAsRead(bounceBackMessages.map(function(message) { return message.message; }));
  } else {
    Logger.log("No bounce back emails found.");
  }
}

function removeRecipientsFromSheet(recipientsToRemove) {
  var sheet = SpreadsheetApp.openById('1aX0O0rVrCiXysyQBtpdh8eHOq_opi9hj4mM28IZV8b4').getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = data.length - 1; i >= 0; i--) {
    var recipient = data[i][0]; // Assuming recipient email addresses are in the first column
    if (recipientsToRemove.indexOf(recipient) !== -1) {
      sheet.deleteRow(i + 1); // Adjust index for header row
      Logger.log("Recipient " + recipient + " removed from the sheet.");
    }
  }
}

function markBounceBackEmailsAsRead(messages) {
  for (var i = 0; i < messages.length; i++) {
    var thread = messages[i].getThread();
    GmailApp.markThreadRead(thread);
    Logger.log("Bounce back email marked as read - Subject: " + messages[i].getSubject());
  }
}
