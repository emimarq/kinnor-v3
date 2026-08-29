export const prompts = [
    {
        piano: true,
        stave: true,
        prompt: "The treble clef is known as the G-clef because it wraps around the 2nd line from the bottom. Play a G note.",
        targetNotes: ["G4"],
        highlightLines: [
            { line: 4, color: "#8a2be2", width: "2px", height: "20px" }
        ],
        notation: `
            X:
            T:
            M:
            L: 1/8
            K:C clef=treble
            G2 G2 G2 G2|
        `
    },
    {
        piano: true,
        octaves: true,
        stave: true,
        prompt: "The treble clef has five lines with the notes: E4, G4, B4, D5 and F5. Play them.",
        targetNotes: ["E4"],
        //noteHints: [1, 2],
        notation: `
            X:1
            T:
            M:
            L: 1/8
            K:C clef=treble
            E2 G2 B2 d2 f2|
        `
    },
    {
        piano: true,
        octaves: true,
        stave: true,
        prompt: "The treble clef has five lines with the notes: E4, G4, B4, D5 and F5. Play them.",
        targetNotes: ["E4"],
        noteHints: [0, 3],
        notation: `
            X:1
            T:
            M:
            L: 1/8
            K:C clef=treble
            E2 G2 B2 d2 f2|
        `
    }
];

/* notation: `
X:1
T:
M:
L:1/8
K:C clef=bass
G,, B2,, D3, F4, A8,|G, A, B, c''|
` */