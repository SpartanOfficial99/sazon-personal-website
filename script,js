function boxClicked(category) {
    // Display selected category
    const output = document.getElementById('output');
    output.textContent = `You clicked: ${category}`;
    
    // Optional: Add a temporary visual effect to the clicked box
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.classList.remove('selected');
        if (box.textContent === category) {
            box.classList.add('selected');
        }
    });
}
