function boxClicked(feature) {
    const output = document.getElementById('output');
    output.textContent = `You clicked on "${feature}"!`;
    output.style.color = "#ffd700"; // Highlight the message
    output.style.animation = "pulse 1s infinite"; // Add an animation to the message
}
