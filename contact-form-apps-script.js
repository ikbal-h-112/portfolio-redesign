/**
 * Portfolio contact form → Google Sheet (+ email alert)
 *
 * Setup (one time, ~3 minutes):
 * 1. Create a new Google Sheet (sheets.new), name it e.g. "Portfolio Contact".
 * 2. In the sheet: Extensions → Apps Script. Delete the sample code and paste this file.
 * 3. Set ALERT_EMAIL below to your address (or '' to disable email alerts).
 * 4. Click Deploy → New deployment → type: Web app.
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Authorize when prompted (it will warn about an unverified app — Advanced → Go to project).
 * 5. Copy the Web app URL (ends in /exec) and paste it into FORM_ENDPOINT in index.html.
 *
 * Each submission appends a row: Timestamp | Name | Email | Subject | Message
 * The sheet can be opened in Excel anytime (File → Download → .xlsx).
 */

var SHEET_NAME = 'Submissions';
var ALERT_EMAIL = 'ikbalhossain112@gmail.com';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var p = (e && e.parameter) || {};

    // Honeypot field filled → silently accept but don't record (it's a bot)
    if (p.website) return json_({ ok: true });

    if (!p.name && !p.email && !p.message) {
      return json_({ ok: false, error: 'Empty submission' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([new Date(), p.name || '', p.email || '', p.subject || '', p.message || '']);

    if (ALERT_EMAIL) {
      MailApp.sendEmail({
        to: ALERT_EMAIL,
        subject: 'Portfolio contact: ' + (p.subject || '(no subject)') + ' — ' + (p.name || 'Unknown'),
        replyTo: p.email || ALERT_EMAIL,
        body:
          'New message from your portfolio contact form:\n\n' +
          'Name:    ' + (p.name || '') + '\n' +
          'Email:   ' + (p.email || '') + '\n' +
          'Subject: ' + (p.subject || '') + '\n\n' +
          (p.message || '')
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
