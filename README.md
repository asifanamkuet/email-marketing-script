# Google Apps Script: Advanced Email Marketing Tool

## Overview
This Google Apps Script helps manage email marketing campaigns efficiently by handling bounce-back emails and automating the process of cleaning email lists in Google Sheets. It can send drafts with recipients, monitor bounce-back emails, and remove those recipients from the list to ensure that emails are not sent to invalid addresses. This tool can help improve deliverability by preventing emails from ending up in spam or promotion folders.

## Features
- **Send Emails to Draft Recipients**: Sends pre-drafted emails to recipients stored in your Gmail account.
- **Bounce-Back Detection**: Identifies bounce-back emails and logs them for further action.
- **Recipient Removal**: Removes invalid email addresses from your Google Sheets list, preventing future bounce-backs.
- **Read Bounce-Back Emails**: Marks bounce-back emails as read to prevent clutter in your inbox.

## Functions

### `sendDraftsWithRecipientsAndCheckBounceBack`
- **Description**: This function iterates through all drafts and checks for bounce-back emails. It looks for "Delivery Status Notification (Failure)" and "postmaster" subject lines, extracts the recipient email addresses from the bounce-back messages, and logs the failures.
- **Parameters**: None
- **Returns**: None
- **Process**:
    - Fetches drafts in Gmail.
    - Searches for bounce-back emails.
    - Extracts failed recipient email addresses.
    - Removes invalid recipients from the Google Sheets list.
    - Marks the bounce-back emails as read.

### `removeRecipientsFromSheet`
- **Description**: This function removes the email addresses from a Google Sheets file that are identified as invalid (i.e., bounced).
- **Parameters**:
    - `recipientsToRemove`: An array of email addresses to be removed from the sheet.
- **Returns**: None
- **Process**:
    - Searches the active Google Sheet for email addresses in the first column.
    - Deletes rows containing bounced email addresses.
    - Logs the removal of each recipient.

### `markBounceBackEmailsAsRead`
- **Description**: This function marks the bounce-back email threads as read to keep your inbox organized.
- **Parameters**:
    - `messages`: An array of bounced email messages.
- **Returns**: None
- **Process**:
    - Marks the email threads as read and logs the action.

## Setup Instructions

1. **Create a Google Sheets File**: 
   - Create a Google Sheet to store the list of email addresses that will receive your marketing emails. The email addresses should be in the first column.
   
2. **Get Google Sheet ID**: 
   - You will need to replace `'1aX0O0rVrCiXysyQBtpdh8eHOq_opi9hj4mM28IZV8b4'` in the script with the actual ID of your Google Sheet. You can get the Sheet ID from the URL of the document.

3. **Deploy the Script**:
   - Open the [Google Apps Script editor](https://script.google.com/) and paste the provided code.
   - Click on the clock icon (Triggers) and set up triggers for the `sendDraftsWithRecipientsAndCheckBounceBack` function to run periodically (e.g., daily or weekly).

4. **Grant Permissions**:
   - The script will ask for permissions to manage your Gmail account and access your Google Sheets. You must authorize these permissions for the script to function correctly.

## Example Usage
- **Triggering the Script**: You can either set up a time-driven trigger to run this script automatically or run it manually within the Apps Script editor.
