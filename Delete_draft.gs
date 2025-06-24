function sendDraftsWithRecipientss() {
  var drafts = GmailApp.getDrafts();
  
  for (var i = 0; i < drafts.length; i++) {
    var draft = drafts[i];
      draft.deleteDraft();
    
    }
  }
