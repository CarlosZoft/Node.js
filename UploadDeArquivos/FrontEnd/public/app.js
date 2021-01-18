let bytesAmount = 0
const API_URL = 'https://localhost:1267';
const ON_UPLOAD_EVENT = "file-updated"
const formatBytes = (bytes, decimals = 2) => {
    if(bytes === 0 ) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["bytes", "KB", "MB" , "GB" , "TB", "PB"];
    const i = Math.floor(Math.log(bytes)/ Math.log(k))

    return (
        parseFloat((bytes /Math.pow(k ,i)).toFixed(dm)) + " " + sizes[i]
    )
}
const updateStatus = (size) => {
    const text = `Pending Bytes to Upload: <strong>${size}</strong>`
    document.getElementById("size").innerHTML = text
}

function showSize (){
    const {files : fileElements} = document.getElementById("file");
    if(!fileElements.length) return;

    const files = Array.from(fileElements)
    const {size} = files
            .reduce((prev,next) => ({size: prev.size + next.size}), { size: 0})
    
    bytesAmount = size;
    updateStatus(size);

    /*const interval = setInterval(
        () => {
            console.count();
            const result = bytesAmount - 5e6
            bytesAmount = result < 0 ? 0 : result
            updateStatus(bytesAmount)
            if(bytesAmount === 0) clearInterval(interval)
        }, 50)*/
}
const onload = () => {
    const ioClient = io.connect(API_URL,{withCredentials: false})
    ioClient.on("connect", (msg) => {
        console.log("connected", ioClient.id)
    })
    ioClient.on(ON_UPLOAD_EVENT, (bytesReceived) => {
        console.log("received", bytesReceived)
        bytesAmount = bytesAmount - bytesReceived
        updateStatus(bytesAmount)
    })
    updateStatus(0)
}

window.onload = onload
window.showSize = showSize