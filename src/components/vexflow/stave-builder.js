// src/components/stave/staveBuilder.js
import Vex from 'vexflow';

export function renderStave(targetId, options = {}) {
  const container = document.getElementById(targetId);
  if (!container) return;

  // Clear existing content in the container
  container.innerHTML = '';

  const {
    notes = 'C4/q, D4, E4, F4',
    clef = 'treble',
    timeSig = '4/4',
    width = 400,
    height = 150
  } = options;

  // Initialize VexFlow Factory attached to target element
  const vf = new Vex.Flow.Factory({
    renderer: {
      elementId: targetId,
      width: width,
      height: height
    }
  });

  const score = vf.EasyScore();
  const system = vf.System();

  // Create staff, add clef, time signature, and notes
  system
    .addStave({
      voices: [score.voice(score.notes(notes))]
    })
    .addClef(clef)
    .addTimeSignature(timeSig);

  // Format and draw
  vf.draw();
}