const express = require("express");
// const os = require('os');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer);
const disk = require('diskusage');
// const { error } = require("console");

const PORT = process.env.PORT || 3001;
const allowedFileTypes = '.mp4,.mp3,.wav,.avi,.mkv,.ogg,.flv';
const uploadsDirectoryPath = path.resolve(__dirname, './uploads');

async function getFreeSpace(path) {
    try {
        const { free } = await disk.check(path);
        return free
    } catch (err) {
        console.error(err)
        return 0
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

io.on('connection', (socket) => {
    console.log('new client connected');
});

app.post("/api/dht", (req, res) => {
    io.emit("dht", {
        temp: req.query.temp,
        humidity: req.query.humidity
    })
    res.send();
});

app.post("/api/media", async (req, res) => {
    let freeSpace = await getFreeSpace('/');

    const upload = multer({
        storage: storage,
        limits: { fileSize: freeSpace - 1024 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            let fileExtension = path.extname(file.originalname);
            if (allowedFileTypes.includes(fileExtension)) {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Invalid File Format'));
            }
        }
    }).single('media');

    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err.message);
        }
        res.send(req.file);
    });
});

app.post('/api/shutdown', (req, res) => {
    const { exec } = require('child_process');
    const ls = exec('sudo shutdown -h now', function (error, stdout, stderr) {
    });
    res.send();
});

app.delete('/api/media', (req, res) => {
    let fileName = req.query.file;
    let filePath = path.resolve(__dirname, `./uploads/${fileName}`)
    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(400).send();
            return;
        }
        res.send();
    });
})

app.get("/api/media", (req, res) => {
    fs.readdir(uploadsDirectoryPath, function (err, files) {
        if (err) {
            res.send([]);
        }
        res.send(files.map(x => {
            return {
                fileName: x
            };
        }));
    });
})

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../ClientApp/build')));

// Serve videos in uploads folder
app.use(express.static(uploadsDirectoryPath));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../ClientApp/build', 'index.html'));
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const python = spawn('python3', ['dht.py']);