// Music player functionality
let isPlaying = false;
let currentTrackIndex = 0;
const audioElements = [];
const tracks = [
    {
        name: "New Year Celebration Song",
        element: "song1"
    },
    {
        name: "Auld Lang Syne",
        element: "song2"
    },
    {
        name: "Fireworks Dance Mix",
        element: "song3"
    }
];

// Initialize audio elements
function initializeAudio() {
    tracks.forEach(track => {
        const audio = document.getElementById(track.element);
        audioElements.push(audio);
        
        // Add ended event listener
        audio.addEventListener('ended', () => {
            nextTrack();
        });
    });

    // Initialize volume
    const volumeControl = document.getElementById('volume');
    audioElements.forEach(audio => {
        audio.volume = volumeControl.value;
    });

    // Volume change listener
    volumeControl.addEventListener('input', (e) => {
        audioElements.forEach(audio => {
            audio.volume = e.target.value;
        });
    });
}

// Update progress bar
function updateProgress(audio) {
    const progress = document.querySelector('.progress');
    const width = (audio.currentTime / audio.duration) * 100;
    progress.style.width = width + '%';
}

function togglePlay() {
    const currentAudio = audioElements[currentTrackIndex];
    
    if (isPlaying) {
        currentAudio.pause();
    } else {
        // Pause all other audio elements first
        audioElements.forEach(audio => audio.pause());
        currentAudio.play();
    }
    
    isPlaying = !isPlaying;
    document.getElementById('current-track').textContent = 
        isPlaying ? `Now playing: ${tracks[currentTrackIndex].name}` : 'Paused';
}

function nextTrack() {
    // Pause current track
    audioElements[currentTrackIndex].pause();
    audioElements[currentTrackIndex].currentTime = 0;
    
    // Move to next track
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    
    if (isPlaying) {
        audioElements[currentTrackIndex].play();
        document.getElementById('current-track').textContent = 
            `Now playing: ${tracks[currentTrackIndex].name}`;
    }
}

// Initialize audio when page loads
window.addEventListener('load', initializeAudio);

// Update progress bar while playing
setInterval(() => {
    if (isPlaying) {
        updateProgress(audioElements[currentTrackIndex]);
    }
}, 100);

// Create floating year elements
function createFloatingYears() {
    for (let i = 0; i < 5; i++) {
        const year = document.createElement('div');
        year.className = 'floating-year';
        year.textContent = '2025';
        year.style.left = Math.random() * 100 + 'vw';
        year.style.top = Math.random() * 100 + 'vh';
        year.style.animationDelay = `-${Math.random() * 20}s`;
        document.body.appendChild(year);
    }
}

// Create fireworks
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.top = Math.random() * window.innerHeight + 'px';
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(firework);
    
    // Create sparkles around firework
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = firework.style.left;
        sparkle.style.top = firework.style.top;
        sparkle.style.setProperty('--duration', `${Math.random() * 0.5 + 0.5}s`);
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    setTimeout(() => firework.remove(), 1000);
}

// Create rising particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.width = particle.style.height = Math.random() * 5 + 3 + 'px';
    particle.style.opacity = Math.random() * 0.5 + 0.5;
    particle.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 5000);
}

// Countdown timer
function updateCountdown() {
    const now = new Date();
    const newYear = new Date(2025, 0, 1);
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').textContent = 
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Error handling for audio
function handleAudioError(error) {
    console.error('Audio error:', error);
    document.getElementById('current-track').textContent = 
        'Error playing track. Please try again.';
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    initializeAudio();
    createFloatingYears();
    updateCountdown();
    
    // Start animation intervals
    setInterval(createFirework, 1000);
    setInterval(createParticle, 200);
    setInterval(updateCountdown, 1000);
    
    // Add error handling to audio elements
    audioElements.forEach(audio => {
        audio.addEventListener('error', handleAudioError);
    });
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            togglePlay();
            e.preventDefault();
            break;
        case 'ArrowRight':
            nextTrack();
            break;
    }
});