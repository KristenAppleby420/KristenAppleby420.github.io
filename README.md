
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        form {
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input, textarea, select {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            background-color: #28a745;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>

<form id="userForm" onsubmit="return validateForm();">
    <label for="name">Name:</label>
    <input type="text" id="name" placeholder="First Last" required>

    <label for="address">Address:</label>
    <input type="text" id="address" placeholder="Street Address, City, State, Zip" required>

    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" placeholder="(XXX) XXX-XXXX" required>

    <label for="email">Email Address:</label>
    <input type="email" id="email" placeholder="name@domain.extension" required>

    <label for="birthdate">Birth Date:</label>
    <input type="date" id="birthdate" required>

    <label for="message">Message:</label>
    <textarea id="message" rows="4" required></textarea>

    <label for="captcha">What is the last name of the current president?</label>
    <input type="text" id="captcha" required>

    <button type="submit">Submit</button>
</form>

<script>
    function validateForm() {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const birthdate = new Date(document.getElementById('birthdate').value);
        const message = document.getElementById('message').value.trim();
        const captcha = document.getElementById('captcha').value.trim();

        // Validate Name
        if (!name.includes(' ')) {
            alert("Please enter both first and last names.");
            return false;
        }

        // Validate Address (basic example)
        const addressParts = address.split(',');
        if (addressParts.length < 2) {
            alert("Please enter a valid address (Street, City, State, Zip).");
            return false;
        }

        // Validate Phone Number
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number (e.g., (123) 456-7890).");
            return false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Validate Birth Date
        const today = new Date();
        if (birthdate >= today) {
            alert("Please enter a valid birth date.");
            return false;
        }

        // Validate Message
        if (message.length === 0) {
            alert("Please enter a message.");
            return false;
        }

        // Validate Confirmation (simple security question)
        if (captcha.toLowerCase() !== "current president's last name") {
            alert("Incorrect answer to the security question.");
            return false;
        }

        // If everything is valid, redirect to confirmation page
        const confirmationMessage = `Name: ${name}\nAddress: ${address}\nPhone: ${phone}\nEmail: ${email}\nBirth Date: ${birthdate.toDateString()}\nMessage: ${message}`;
        alert("Form submitted successfully!\n" + confirmationMessage);
        window.location.href = `mailto:your_email@example.com?subject=Form Submission&body=${encodeURIComponent(confirmationMessage)}`;
        return false; // Prevent default form submission
    }
</script>

</body>
</html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Calculator with Plotting</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script> <!-- Include Plotly -->
</head>
<body>
    <h1>Non-Linear Calculator</h1>
    <form id="calculatorForm">
        Amplitude (A): <input type="number" id="amplitude" value="1" step="0.1"><br>
        Frequency (B): <input type="number" id="frequency" value="1" step="0.1"><br>
        Phase Shift (C): <input type="number" id="phaseShift" value="0" step="0.1"><br>
        X Min: <input type="number" id="xMin" value="-10"><br>
        X Max: <input type="number" id="xMax" value="10"><br>
        <button type="button" onclick="calculateAndPlot()">Calculate & Plot</button>
    </form>
    <div id="plot"></div> <!-- Container for the plot -->
</body>
</html>

<script>
    function calculateAndPlot() {
        // Retrieve values from input fields
        const amplitude = parseFloat(document.getElementById("amplitude").value);
        const frequency = parseFloat(document.getElementById("frequency").value);
        const phaseShift = parseFloat(document.getElementById("phaseShift").value);
        const xMin = parseFloat(document.getElementById("xMin").value);
        const xMax = parseFloat(document.getElementById("xMax").value);
        
        // Generate x and y values within range
        const xValues = [];
        const yValues = [];
        
        for (let x = xMin; x <= xMax; x += 0.1) {
            xValues.push(x);
            const y = amplitude * Math.sin(frequency * x + phaseShift);
            yValues.push(y);
        }
        
        // Plot using Plotly
        const trace = {
            x: xValues,
            y: yValues,
            mode: 'lines',
            name: 'y = A*sin(Bx + C)'
        };
        
        const layout = {
            title: 'Plot of y = A*sin(Bx + C)',
            xaxis: {title: 'X-axis'},
            yaxis: {title: 'Y-axis'}
        };
        
        Plotly.newPlot('plot', [trace], layout);
    }
</script>

