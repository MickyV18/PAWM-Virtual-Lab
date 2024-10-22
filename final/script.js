
// Buat variabel global untuk posisi awal kotak
let position = 0; // posisi horizontal awal kotak
let velocity = 0; // kecepatan awal
let isRunning = false; // status simulasi berjalan atau tidak
let animationFrame; // variabel untuk menyimpan ID animasi

const toggleButton = document.getElementById('toggleButton');
const learnMoreButton = document.getElementById('learnMoreButton');
const introSection = document.getElementById('introSection');
const simulationSection = document.getElementById('simulationSection');
const theorySection = document.getElementById('theorySection');

const massSlider = document.getElementById('mass');
const massLabel = massSlider.nextElementSibling;
const forceSlider = document.getElementById('force');
const forceLabel = forceSlider.nextElementSibling;
const frictionSlider = document.getElementById('friction');
const frictionLabel = frictionSlider.nextElementSibling;


toggleButton.addEventListener('click', toggleSections);
learnMoreButton.addEventListener('click', toggleSections);

// Fungsi untuk memperbarui posisi dan tampilan kotak
function updateBlockPosition(acceleration) {
    if (!isRunning) return;

    velocity += acceleration; // Update kecepatan berdasarkan percepatan
    position += velocity; // Update posisi berdasarkan kecepatan

    // Cegah kotak agar tidak keluar dari area simulasi
    const maxPosition = simulationArea.clientWidth - 50; // batas kanan area simulasi
    if (position > maxPosition) {
        position = maxPosition;
        velocity = 0; // berhenti jika mencapai batas
    }

    // Update posisi visual kotak
    const block = document.querySelector('.simulation-area div');
    block.style.left = `${position}px`;

    // Jalankan fungsi ini terus menerus untuk animasi
    animationFrame = requestAnimationFrame(() => updateBlockPosition(acceleration));
}

// Event Listener untuk memulai simulasi
document.getElementById('startSimulation').addEventListener('click', function() {
    const mass = parseFloat(massSlider.value);
    const force = parseFloat(forceSlider.value);
    const frictionCoefficient = parseFloat(frictionSlider.value);

    const gravity = 9.8; // gravitasi
    const normalForce = mass * gravity; // gaya normal
    const frictionForce = frictionCoefficient * normalForce; // gaya gesek
    const netForce = force - frictionForce; // gaya bersih
    const acceleration = netForce / mass; // percepatan

    // Update tampilan percepatan
    accelerationDisplay.textContent = acceleration.toFixed(2) + " m/s²";

    // Set status simulasi berjalan
    isRunning = true;

    // Mulai pergerakan kotak
    updateBlockPosition(acceleration);
});

// Event Listener untuk reset simulasi
document.getElementById('resetSimulation').addEventListener('click', function() {
    // Reset semua slider dan tampilan
    massSlider.value = 0;
    massLabel.textContent = massSlider.value + " kg";
    forceSlider.value = 0;
    forceLabel.textContent = forceSlider.value + " N";
    frictionSlider.value = 0;
    frictionLabel.textContent = frictionSlider.value;

    // Reset hasil simulasi
    velocity = 0;
    position = 0;
    isRunning = false;
    cancelAnimationFrame(animationFrame); // Hentikan animasi yang berjalan

    accelerationDisplay.textContent = "0 m/s²";
    velocityDisplay.textContent = "0 m/s";

    // Bersihkan area simulasi
    simulationArea.innerHTML = '<div style="position: relative; width: 50px; height: 50px; background-color: blue; left: 0px;"></div>';
});

// Update label when sliders change
massSlider.addEventListener('input', function() {
    massLabel.textContent = massSlider.value + " kg";
});

forceSlider.addEventListener('input', function() {
    forceLabel.textContent = forceSlider.value + " N";
});

frictionSlider.addEventListener('input', function() {
    frictionLabel.textContent = frictionSlider.value;
});

// Placeholder for simulation logic
document.getElementById('startSimulation').addEventListener('click', function() {
    // Implement simulation start logic here
});

document.getElementById('resetSimulation').addEventListener('click', function() {
    // Reset all sliders and labels
    massSlider.value = 0;
    massLabel.textContent = massSlider.value + " kg";
    forceSlider.value = 0;
    forceLabel.textContent = forceSlider.value + " N";
    frictionSlider.value = 0;
    frictionLabel.textContent = frictionSlider.value;
});

const accelerationDisplay = document.getElementById('acceleration');
const velocityDisplay = document.getElementById('velocity');
const simulationArea = document.querySelector('.simulation-area');

function toggleSections() {
    if (introSection.style.display !== 'none') {
        introSection.style.display = 'none';
        simulationSection.style.display = 'block';
        toggleButton.textContent = 'Kembali';
    } else {
        introSection.style.display = 'block';
        simulationSection.style.display = 'none';
        toggleButton.textContent = 'Mulai Simulasi';
    }
}

toggleButton.addEventListener('click', toggleSections);
learnMoreButton.addEventListener('click', toggleSections);

// Update label when sliders change
massSlider.addEventListener('input', function() {
    massLabel.textContent = massSlider.value + " kg";
});

forceSlider.addEventListener('input', function() {
    forceLabel.textContent = forceSlider.value + " N";
});

frictionSlider.addEventListener('input', function() {
    frictionLabel.textContent = frictionSlider.value;
});

// Placeholder for simulation logic
document.getElementById('startSimulation').addEventListener('click', function() {
    const mass = parseFloat(massSlider.value); // massa dalam kg
    const force = parseFloat(forceSlider.value); // gaya dalam N
    const frictionCoefficient = parseFloat(frictionSlider.value); // koefisien gesek

    const gravity = 9.8; // gravitasi dalam m/s²
    const normalForce = mass * gravity; // gaya normal
    const frictionForce = frictionCoefficient * normalForce; // gaya gesek
    const netForce = force - frictionForce; // gaya bersih (F_net = F_applied - F_friction)

    const acceleration = netForce / mass; // percepatan (a = F_net / m)

    // Update the acceleration and velocity displays
    accelerationDisplay.textContent = acceleration.toFixed(2) + " m/s²";

    // Simulate object movement
    velocity += acceleration; // Update velocity (simple approximation)
    velocityDisplay.textContent = velocity.toFixed(2) + " m/s";

    // Visual feedback (move a "block" in the simulation area)
    simulationArea.innerHTML = `<div style="position: relative; width: 50px; height: 50px; background-color: blue; left: ${velocity * 10}px;"></div>`;
});

document.getElementById('resetSimulation').addEventListener('click', function() {
    // Reset all sliders and labels
    massSlider.value = 0;
    massLabel.textContent = massSlider.value + " kg";
    forceSlider.value = 0;
    forceLabel.textContent = forceSlider.value + " N";
    frictionSlider.value = 0;
    frictionLabel.textContent = frictionSlider.value;

    // Reset simulation results
    velocity = 0;
    accelerationDisplay.textContent = "0 m/s²";
    velocityDisplay.textContent = "0 m/s";

    // Clear simulation area
    simulationArea.innerHTML = '';
});

// Get the header element
const header = document.querySelector('header');

// Get the offset position of the header
const headerOffset = header.offsetTop;

// Function to handle scroll
function handleScroll() {
    if (window.pageYOffset > headerOffset) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Listen for the scroll event
window.addEventListener('scroll', handleScroll);


learnMoreButton.addEventListener('click', function() {
    hukumPertama.scrollIntoView({ behavior: 'smooth' });
});

const hukumPertama = document.getElementById('hukumPertama');
const hukumKedua = document.getElementById('hukumKedua');
const hukumKetiga = document.getElementById('hukumKetiga');

// Function to hide Newton's laws
function hideNewtonsLaws() {
    hukumPertama.style.display = 'none';
    hukumKedua.style.display = 'none';
    hukumKetiga.style.display = 'none';
}

// Function to show Newton's laws
function showNewtonsLaws() {
    hukumPertama.style.display = 'block';
    hukumKedua.style.display = 'block';
    hukumKetiga.style.display = 'block';
}

// Function to toggle sections and control visibility
function toggleSections() {
    if (introSection.style.display !== 'none') {
        introSection.style.display = 'none';
        simulationSection.style.display = 'block';
        hideNewtonsLaws(); // Hide Newton's laws when simulation is active
        toggleButton.textContent = 'Kembali';
    } else {
        introSection.style.display = 'block';
        simulationSection.style.display = 'none';
        showNewtonsLaws(); // Show Newton's laws when returning to the intro
        toggleButton.textContent = 'Mulai Simulasi';
    }
}

document.getElementById('toggleButton').addEventListener('click', toggleSections);
learnMoreButton.addEventListener('click', function() {
    hukumPertama.scrollIntoView({ behavior: 'smooth' });
});

const massValue = document.getElementById('massValue');
const forceValue = document.getElementById('forceValue');
const frictionValue = document.getElementById('frictionValue');
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

let mass = parseFloat(massSlider.value);
let force = parseFloat(forceSlider.value);
let frictionCoefficient = parseFloat(frictionSlider.value);

// Update the displayed values when sliders change
massSlider.addEventListener('input', function() {
    mass = parseFloat(massSlider.value);
    massValue.textContent = `${mass} kg`;
});

forceSlider.addEventListener('input', function() {
    force = parseFloat(forceSlider.value);
    forceValue.textContent = `${force} N`;
});

frictionSlider.addEventListener('input', function() {
    frictionCoefficient = parseFloat(frictionSlider.value);
    frictionValue.textContent = frictionCoefficient.toFixed(2);
});

// Function to calculate the acceleration and velocity based on Newton's laws
function updatePhysics() {
    const gravity = 9.8; // Gravitational constant
    const normalForce = mass * gravity; // Normal force (weight of the object)
    const frictionForce = frictionCoefficient * normalForce; // Friction force
    const netForce = force - frictionForce; // Net force on the object
    const acceleration = netForce / mass; // Newton's second law: F = ma

    return { acceleration, velocity };
}

// Function to draw the simulation on canvas
function drawObject() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(position, canvas.height - 50, 50, 50); // Draw the object
}

// Function to update the object's position and velocity based on the physics
function updateSimulation() {
    if (!isRunning) return;

    const { acceleration } = updatePhysics();

    // Update velocity and position
    velocity += acceleration * 0.1; // Update velocity (scaled for smoother movement)
    position += velocity * 0.1; // Update position (scaled)

    if (position + 50 >= canvas.width) {
        // Stop the object when it reaches the end of the canvas
        velocity = 0;
        position = canvas.width - 50;
        cancelAnimationFrame(animationFrame);
    }

    // Update the displayed values
    accelerationDisplay.textContent = acceleration.toFixed(2) + " m/s²";
    velocityDisplay.textContent = velocity.toFixed(2) + " m/s";

    // Redraw the object
    drawObject();

    // Continue the simulation
    animationFrame = requestAnimationFrame(updateSimulation);
}

// Start the simulation
document.getElementById('startSimulation').addEventListener('click', function() {
    if (isRunning) return; // Prevent multiple simulations from starting at once

    isRunning = true;
    updateSimulation(); // Start the simulation loop
});

// Reset the simulation
document.getElementById('resetSimulation').addEventListener('click', function() {
    isRunning = false;
    cancelAnimationFrame(animationFrame); // Stop the simulation

    // Reset position, velocity, and canvas
    position = 0;
    velocity = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset displayed values
    accelerationDisplay.textContent = "0 m/s²";
    velocityDisplay.textContent = "0 m/s";

    // Redraw the object at the starting position
    drawObject();
});

