# Google Sheets Form Integration Setup

This document explains how to set up the Google Sheets integration for the contact form.

## Step 1: Create a Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the code from `google-sheets-script.js` into the script editor
4. Save the project with a name like "Picolo Contact Form Handler"

## Step 2: Deploy the Web App

1. Click on "Deploy" > "New deployment"
2. Select "Web app" as the deployment type
3. Set the following options:
   - Description: "Picolo Contact Form Handler"
   - Execute as: "Me (upadhayaynaitik2712@gmail.com)"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL that is generated

## Step 3: Update the Contact Form Code

1. Open `src/components/ContactForm.tsx`
2. Find the line with `const scriptURL = 'https://script.google.com/macros/s/AKfycbwXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';`
3. Replace the placeholder URL with the Web App URL you copied in Step 2

## Step 4: Verify Spreadsheet Access

1. Make sure the Google account (upadhayaynaitik2712@gmail.com) has edit access to the spreadsheet
2. The spreadsheet ID in the script should match the ID in the URL of your spreadsheet:
   - Spreadsheet URL: https://docs.google.com/spreadsheets/d/1TDgKGmsWqz0SY8MQn9henlKFA3RkYyrxsXAacxFPxsE/edit?gid=0#gid=0
   - Spreadsheet ID: 1TDgKGmsWqz0SY8MQn9henlKFA3RkYyrxsXAacxFPxsE

## Step 5: Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check the Google Spreadsheet to verify that the data was added correctly

## Troubleshooting

If the form submission is not working:

1. Check the browser console for any errors
2. Verify that the Web App URL is correct
3. Make sure the Google account has permission to edit the spreadsheet
4. Try running the Apps Script manually to see if there are any errors