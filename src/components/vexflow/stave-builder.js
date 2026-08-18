export function renderStave(targetId) {
    const staveContainer = document.getElementById(targetId);

    // Measure actual inner width (accounting for padding)
    const padding = 10; 
    const actualWidth = staveContainer.offsetWidth - padding;

    const notation = "M:4/4\nK:C\n C C C C";

    // Render ABCJS with staffwidth matching the exact container size
    ABCJS.renderAbc(targetId, notation, {
        add_classes: true,
        responsive: "resize",
        staffwidth: actualWidth, 
        paddingleft: 0,         
        paddingright: 0,         
        paddingtop: 0,
        paddingbottom: 10
    });
}