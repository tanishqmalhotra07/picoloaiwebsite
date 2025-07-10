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
   - Execute as: "Me (USE Picolo email ID)"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Copy the Web App URL that is generated

## Step 3: Update the Contact Form Code

1. Open `src/components/ContactForm.tsx`
2. The script URL has been updated to: `https://script.google.com/macros/s/AKfycbyDpre6gG8J7sbxAQMTYwjBklGNYdu_uvqT6AA5DRQ0AEI_v2EqX50TltoSRGNRgMS0MQ/exec`

## Step 4: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet
2. Name it "Picolo Contact Form Submissions"
3. Copy the spreadsheet ID from the URL:
   - Spreadsheet URL: `https://docs.google.com/spreadsheets/d/1TDgKGmsWqz0SY8MQn9henlKFA3RkYyrxsXAacxFPxsE/edit`
   - Spreadsheet ID: `1TDgKGmsWqz0SY8MQn9henlKFA3RkYyrxsXAacxFPxsE`
4. Update the spreadsheet ID in the Google Apps Script if needed

## Step 5: Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check the Google Spreadsheet to verify that the data was added correctly

## Form Fields

The form now collects the following information:

1. Name\*
2. Email\*
3. Country\* (dropdown with flags)
4. Company Name\*
5. Company website or Google URL
6. What is the nature of your business? (text area)
7. What's the main outcome you're hoping to achieve? (text area)
8. Budget range (Under $500 | $500 - $1,000 | $1,000 - $3,000 | More than $3,000)

Fields marked with \* are required.

## Troubleshooting

If the form submission is not working:

1. Check the browser console for any errors
2. Verify that the Web App URL is correct
3. Make sure the Google account has permission to edit the spreadsheet
4. Try running the Apps Script manually to see if there are any errors
