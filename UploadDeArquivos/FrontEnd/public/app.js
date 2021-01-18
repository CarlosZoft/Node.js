const showSize = () => {
    const {files : fileElements} = document.getElementById("file");
    if(fileElements.length) return;

    const files = Array.from(fileElements)
    const size = files
            .reduce((prev,next) => ({size: prev.size + next.size}), { size: 0})
    
    debugger
}
const onload = () => {
    console.log("Loaded!")
}

window.onload = onload