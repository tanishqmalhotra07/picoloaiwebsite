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
    const headers = sheet.getRange(1, 1, 1, 8).getValues()[0];
    if (headers[0] === '') {
      sheet.getRange(1, 1, 1, 8).setValues([
        ['Timestamp', 'Name', 'Email', 'Country', 'Company Name', 'Company Website', 
         'Business Nature', 'Desired Outcome', 'Budget Range', 'Form Submission Date']
      ]);
    }
    
    // Prepare the data row
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString();
    
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.country || '',
      data.companyName || '',
      data.companyWebsite || '',
      data.businessNature || '',
      data.desiredOutcome || '',
      data.budgetRange || '',
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