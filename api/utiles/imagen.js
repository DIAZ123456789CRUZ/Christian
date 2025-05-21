const path = require("path");
const fs = require("fs");

function getFilePath(file) {
    console.log("getFilePath recibió:", file); // <-- LOG

    const fileName = `${Date.now()}_${file.originalFilename}`;
    const uploadDir = path.join(__dirname, "..", "uploads");
    const newPath = path.join(uploadDir, fileName);

    try {
        fs.renameSync(file.path, newPath);
        console.log("Imagen movida a:", newPath); // <-- LOG
    } catch (err) {
        console.error("Error moviendo la imagen:", err); // <-- LOG
    }

    return newPath;
}

module.exports = {
    getFilePath
}