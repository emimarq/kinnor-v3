export function renderStave(targetId, abcString, staveOptions = {}) {
    const container = document.getElementById(targetId);

    container.innerHTML = '';

    ABCJS.renderAbc(container, abcString, {
        add_classes: true,
        responsive: "resize",
        //scale: 0.0,
        staffwidth: 200,
        paddingleft: 5,
        paddingright: 5,
        paddingtop: 0,
        paddingbottom: 10
    });

    const staveLines = container.querySelectorAll(".abcjs-staff path");
    staveLines.forEach((line) => {
        line.style.stroke = "";
        line.style.strokeWidth = "";
    })

    if (staveOptions.highlightLines && Array.isArray(staveOptions.highlightLines)) {
        staveOptions.highlightLines.forEach(({ line, color, width, height }) => {
            const index = line - 1;
            if (staveLines[index]) {
                staveLines[index].style.stroke = color || "#8a2be2";
                staveLines[index].style.strokeWidth = width || "1px";
                staveLines[index].style.height = height || "1px";
            }
        });
    }
}