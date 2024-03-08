document.addEventListener('DOMContentLoaded', () => {
    let headlines = []; // Holds fetched headlines
    let currentHeadlineIndex = 0; // Tracks the current headline index
    let responses = []; // Stores user responses

    // Fetches headlines from the JSON file
    const fetchHeadlines = () => {
        fetch('https://ammirb.github.io/headline-experiment/headlines.json')
            .then(response => response.json())
            .then(data => {
                headlines = data; // Load the headlines into the array
                // No need to call prepareHeadlines here as it's called after form submission
            })
            .catch(error => console.error('Error loading the headlines:', error));
    };

    // Prepares headlines: Shows the first 30 in order, then randomizes the rest
    const prepareHeadlines = () => {
        if (headlines.length > 30) {
            const fixedHeadlines = headlines.slice(0, 30);
            let randomHeadlines = headlines.slice(30);
            randomHeadlines.sort(() => Math.random() - 0.5); // Simple shuffle
            headlines = fixedHeadlines.concat(randomHeadlines);
        }
        displayNextHeadline();
    };

    // Displays the next headline or ends the experiment
    const displayNextHeadline = () => {
        if (currentHeadlineIndex < headlines.length) {
            document.getElementById('headline').textContent = headlines[currentHeadlineIndex].text;
            currentHeadlineIndex++;
        } else {
            document.getElementById('headline').textContent = "Experiment completed. Thank you!";
            document.getElementById('buttonsContainer').style.display = 'none';
            // Optionally, display results or statistics here
        }
    };

    // Records user's response and shows the next headline
    const recordResponse = (choice) => {
        if (currentHeadlineIndex <= headlines.length) {
            // Fetch the current headline based on the index
            const currentHeadline = headlines[currentHeadlineIndex - 1];
            responses.push({
                headlineIndex: currentHeadlineIndex - 1, // Adjust for 0-based index
                choice: choice,
                headlineText: currentHeadline.text,
                realValue: currentHeadline.label, // Store the actual label of the headline
            });
        }
    };
    

    // Add event listeners for the Real and Satire buttons
    document.getElementById('realButton').addEventListener('click', () => {
        recordResponse('Real');
        displayNextHeadline();
    });

    document.getElementById('satireButton').addEventListener('click', () => {
        recordResponse('Satire');
        displayNextHeadline();
    });

    // Handle the form submission to start the experiment
    document.getElementById('startForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Hide the registration form and show the experiment container
        document.getElementById('registrationContainer').style.display = 'none';
        document.getElementById('experimentContainer').style.display = 'block';

        const username = document.getElementById('username').value; // Collect the username
        console.log('Username:', username); // Example usage, store or use the username as needed

        prepareHeadlines(); // Prepare and display the headlines
    });

    // Initially hide the experiment and show the registration form
    document.getElementById('experimentContainer').style.display = 'none';

    fetchHeadlines(); // Fetch headlines as soon as the page is loaded
});
