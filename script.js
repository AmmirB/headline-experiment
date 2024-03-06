document.addEventListener('DOMContentLoaded', () => {
    const headlines = [
        "Bold Move: Hulu Has Announced That They’re Gonna Go Ahead And Reboot ‘Shrill’ While It’s Still On Since You Idiots Will Watch Anything",
        "New Study Reveals Most Children Unrepentant Sociopaths",
        "Local Man Relieved He Can Finally Use The Term 'Fiancée' Without Feeling Pretentious",
        // Add more headlines here
    ];

    let currentHeadlineIndex = 0;

    const displayNextHeadline = () => {
        if (currentHeadlineIndex < headlines.length) {
            document.getElementById('headline').textContent = headlines[currentHeadlineIndex];
            currentHeadlineIndex++;
        } else {
            // All headlines have been displayed, handle end of experiment here
            document.getElementById('headline').textContent = "Experiment completed. Thank you!";
            // Hide buttons after experiment ends
            document.getElementById('buttonsContainer').style.display = 'none';
        }
    };

    document.getElementById('realButton').addEventListener('click', displayNextHeadline);
    document.getElementById('satireButton').addEventListener('click', displayNextHeadline);

    // Initially display the first headline
    displayNextHeadline();
});


let responses = [];

const recordResponse = (choice) => {
    if (currentHeadlineIndex <= headlines.length) { // Adjust condition to <= because we increment currentHeadlineIndex before recording response
        responses.push({
            headlineIndex: currentHeadlineIndex - 1, // Adjust for 0-based index
            choice: choice
        });
    }
};

document.getElementById('realButton').addEventListener('click', () => {
    recordResponse('Real');
    displayNextHeadline();
});

document.getElementById('satireButton').addEventListener('click', () => {
    recordResponse('Satire');
    displayNextHeadline();
});


document.getElementById('startForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    // Hide the registration form and show the experiment container
    document.getElementById('registrationContainer').style.display = 'none';
    document.getElementById('experimentContainer').style.display = 'block';

    // You can also store the username and consent for further processing
    const username = document.getElementById('username').value;
    console.log('Username:', username); // Example: Log or store this information

    // Proceed to display the first headline
    displayNextHeadline();
});

// Initially, hide the experiment and show the registration form
document.getElementById('experimentContainer').style.display = 'none';
