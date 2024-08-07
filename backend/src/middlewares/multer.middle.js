import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

function multerFunc(req, res, next) {
    // Multer storage configuration
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            const random = uuidv4();
            cb(null, `${random}-${file.originalname}`);
        },
    });

    // File filter to accept images and videos
    const fileFilter = (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/mpeg', 'video/quicktime'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'), false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for files and limit to 2 files
        fileFilter: fileFilter,
    }).any()

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Multer error: ' + err.message });
        } else if (err) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded or unsupported file types' });
        }
        next();
    });
}

export default multerFunc;
