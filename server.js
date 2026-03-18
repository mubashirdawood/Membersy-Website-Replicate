const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

/**
 * STEP 1: STATIC FILES
 * This line is the "fix." It tells Node.js to look in your folder
 * for index.html, style.css, and images automatically.
 */
app.use(express.static(__dirname));

/**
 * STEP 2: FORM PARSING
 * This allows Node.js to read the text you type into the form.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * STEP 3: THE EMAIL ROUTE
 * When you click "Send" on your form, it looks for this '/send' path.
 */
app.post("/send", (req, res) => {
 
  const { user_name, user_email, user_message } = req.body;
  console.log("Submit Button CLick");
  console.log("Received form data(((()))):", { req_body: req.body });

  // Setup the Gmail connection
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mubashirdawood05@gmail.com",
      pass: "ccsm smqf yrlx ftfu", // Your 16-digit App Password
    },
  });

  // Define what the email looks like
  let mailOptions = {
    from: "mubashirdawood05@gmail.com",
    to: "mubashirdawood05@gmail.com",
    subject: `New Message from ${user_name}`,
    html: `
            <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px;">
                <h2>New Website Message</h2>
                <p><strong>Name:</strong> ${user_name}</p>
                <p><strong>Email:</strong> ${user_email}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${user_message}</p>
            </div>
        `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.send(
        "<h1>Oops!</h1><p>Something went wrong. Please check your terminal for the error.</p>",
      );
    }
    // After sending, show a success message with a link to go back
    res.send(`
            <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
                <h1 style="color: #28a745;">Success!</h1>
                <p>Thank you ${user_name}, your message has been sent.</p>
                <a href="/">Click here to return to the website</a>
            </div>
        `);
  });
});

/**
 * STEP 4: START THE SERVER
 */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server is running!`);
  console.log(`Open your browser to: http://localhost:${PORT}`);
  console.log(`=========================================`);
});
