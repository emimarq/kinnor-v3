export const prompts = [
    {
        piano: true,
        octaves: true,
        prompt: "An octave is the distance between two pitches with the same letter name. Press C4.",
        targetNotes: ["C4"],
        keyHints: ["C4"]
    },
    {
        piano: true,
        octaves: true,
        prompt: "Now press C5 in the next octave. (Use the arrows to change octaves)",
        targetNotes: ["C5"],
        keyHints: ["C5"]
    },
    {
        piano: true,
        octaves: true,
        prompt: "Press D5, then press D4.",
        targetNotes: ["D5", "D4"],
    },
    {
        piano: true,
        octaves: true,
        prompt: "Press G4, then press G3.",
        targetNotes: ["G4", "G3"],
    },
    {
        piano: true,
        octaves: true,
        prompt: "Press A3, then press A4.",
        targetNotes: ["A3", "A4"],
    }
]