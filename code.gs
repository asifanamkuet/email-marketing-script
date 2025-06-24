function createDraftsFromExcel() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Change "Sheet1" to your sheet's name
  var data = sheet.getDataRange().getValues();
  
  for (var i = 0; i < data.length; i++) { // Start from row 2 to skip header row
    var row = data[i];
    var recipient = row[0]; // Assuming email addresses are in the first column
    var companyName = row[1]; // Assuming company names are in the second column
    var subject = row[1]; // Assuming subjects are in the third column
    var drafts = GmailApp.search("subject:" + "TEST");
    
    if (drafts.length > 0) {
      var draft = drafts[0].getMessages()[0]; // Assuming you want to use the first message from the first thread with the specified subject
      var body = draft.getBody();
      
      // Replace placeholders with actual values
      body = body.replace("{{company_name}}", companyName);
      
      // Combine "I want to sell book" with subject
      var combinedSubject = "Promoting My Business Growth Book for " + subject;
      
      // Create a draft email with HTML content
      GmailApp.createDraft(recipient, combinedSubject, "", { htmlBody: body });
    }
  }
}