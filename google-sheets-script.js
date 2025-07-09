// This code should be deployed as a Google Apps Script Web App
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Deploy as a web app (accessible to anyone, even anonymous)
// 5. Copy the web app URL and use it in your ContactForm.tsx

function doPost(e) {
  try {
    // Get the form data
    const data = e.parameter;
    
    // Open the spreadsheet by ID
    // Replace with your actual spreadsheet ID from the URL
    const spreadsheetId = '1TDgKGmsWqz0SY8MQn9henlKFA3RkYyrxsXAacxFPxsE';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // Get the first sheet
    const sheet = spreadsheet.getSheets()[0];
    
    // Check if headers exist, if not add them
    const headers = sheet.getRange(1, 1, 1, 12).getValues()[0];
    if (headers[0] === '') {
      sheet.getRange(1, 1, 1, 12).setValues([
        ['Timestamp', 'Name', 'Email', 'Role', 'Company Name', 'Company Website', 
         'Company Size', 'Company Revenue', 'Project Budget', 'Services', 'Message', 'Form Submission Date']
      ]);
    }
    
    // Prepare the data row
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString();
    
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.role || '',
      data.companyName || '',
      data.companyWebsite || '',
      data.companySize || '',
      data.companyRevenue || '',
      data.projectBudget || '',
      data.services || '',
      data.message || '',
      formattedDate
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added to spreadsheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error('Error processing form submission:', error);
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function is needed to test the web app
function doGet() {
  return ContentService.createTextOutput('The Google Apps Script is working correctly. Use POST to submit form data.');
}