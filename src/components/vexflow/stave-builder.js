export function vexflow(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 310;
    const height = 120;

    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental, Beam } = Vex.Flow;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, height);

    const context = renderer.getContext();

    // Transparent background - CSS handles container styling
    context.rect(0, 0, width, height, {
        fill: "transparent"
    });

    // Stave position
    const stavePadding = 5;
    const staveWidth = width - (stavePadding * 2);
    const stave = new Stave(stavePadding, 5, staveWidth);

    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Notes
    const note1 = new StaveNote({ keys: ["c/4"], duration: "8", clef: "treble" });
    const note2 = new StaveNote({ keys: ["e/4"], duration: "8", clef: "treble" });
    const note3 = new StaveNote({ keys: ["g#/4"], duration: "q", clef: "treble" });
    
    const sharpAccidental = new Accidental("#");
    note3.addAccidental(0, sharpAccidental);

    const note4 = new StaveNote({ keys: ["c/5"], duration: "h", clef: "treble" });

    const beam = new Beam([note1, note2]);
    const notes = [note1, note2, note3, note4];

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    const availableWidth = staveWidth - stave.getNoteStartX() + stavePadding;
    new Formatter().joinVoices([voice]).format([voice], availableWidth);

    voice.draw(context, stave);
    beam.setContext(context).draw();
}