import numpy as np
import sounddevice as sd

# Parameters for the sound
frequency = 5  # Frequency in Hz (infrasound)
duration = 5   # Duration of the sound in seconds
sample_rate = 44100  # Sampling rate in Hz

# Generate the sound wave (sine wave at 5 Hz)
t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)  # Time vector
waveform = 0.5 * np.sin(2 * np.pi * frequency * t)  # Sine wave at 5 Hz

# Play the sound
sd.play(waveform, samplerate=sample_rate)
sd.wait()  # Wait until the sound is finished playing
