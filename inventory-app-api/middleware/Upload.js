import multer from "multer"

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const filename = file.originalname

        req.normalizedImagePath = filename.replace(/\\\\/g, "\\")

        cb(null, filename)
    },
})

const upload = multer({ storage: storage })

export default upload