function doPost(e) {
  try {
    // Get the form data from the request parameters
    const data = e.parameter;
    
    // Log the received data for debugging
    Logger.log("Received data: " + JSON.stringify(data));
    
    // Open the spreadsheet by ID
    // Replace with your new spreadsheet ID
    const spreadsheetId = 'YOUR_NEW_SPREADSHEET_ID';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    // Get the first sheet
    const sheet = spreadsheet.getSheets()[0];
    
    // Check if headers exist, if not add them
    const headers = sheet.getRange(1, 1, 1, 10).getValues()[0];
    if (headers[0] === '' || headers[0] === null) {
      sheet.getRange(1, 1, 1, 10).setValues([
        ['Timestamp', 'Name', 'Email', 'Country', 'Company Name', 'Company Website', 
         'Business Nature', 'Desired Outcome', 'Budget Range', 'Form Submission Date']
      ]);
    }
    
    // Prepare the data row
    const timestamp = new Date().toISOString();
    const formattedDate = new Date().toLocaleDateString();
    
    // Extract data from parameters
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
    
    // Log the row data for debugging
    Logger.log("Row data to append: " + JSON.stringify(rowData));
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added to spreadsheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    Logger.log("Error: " + error.toString());
    
    // Return error response
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