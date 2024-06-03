import express from "express"
import Folder from "../models/folderModel.js";
import mongodb from "mongodb"
import jwt from "jsonwebtoken";
import { errorMessage, serverError, successMessage } from "../helpers/helperFuncs.js";
import { userExists, folderExists, userFolderAuth, validateUser } from "../middleware/authMiddleWare.js";
import User from "../models/userModel.js";
import multer from "multer";
import PdfParse from "pdf-parse";
import fs from "fs";
import File from "../models/fileModel.js";


const router = express.Router();

router.use(validateUser);
const upload = multer({ dest: 'uploads/' });

router.post('/testUpload', upload.single('file'), async (req, res) => {
    console.log("Start uploading");

    try {
        console.log("ok fine");
        res.send("djwdw");
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json({ message: "Error uploading file" });
    }
});

router.post('/upload', upload.single("file"), userExists, folderExists, userFolderAuth, async (req, res) => {
    // suppose file is uploaded and a url is generated
    console.log("start uploading");
    try {
        console.log(`end is ${req.body.folderId}`)
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await PdfParse(dataBuffer);

        const folderId = req.body.folderId;
        console.log(`again end is ${folderId}`)

        const newFile = new File({
            folderId: new mongodb.ObjectId(folderId),
            fileName: req.file.originalname,
            fileData: data.text,
            fileType: "Pdf"
        })

        const storedFile = await newFile.save();
        console.log(storedFile);

        // now add this file to file list of folder
        const updatedFolder = await Folder.findByIdAndUpdate(
            new mongodb.ObjectId(folderId),
            {
                $push: {
                    files: storedFile['_id']
                }
            }
        )

        console.log("got in the end");
        res.status(200).json(successMessage("file stored successfuly", [storedFile, updatedFolder]));
    } catch (error) {
        console.log(`error : ${error}`)
        res.status(500).json(serverError());
    }
});

router.delete('/delete/:fileId', userExists, async (req, res) => {
    try {
        const fileId = req.params.fileId;
        const userId = req.userId;
        console.log("user" + userId)
        console.log(`fileId = ${fileId}`)
        // Check if the file exists
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json(errorMessage("File not found"));
        }

        // Check if the user has permission to delete the file
        const folder = await Folder.findById(file.folderId);
        console.log("owner " + folder.owner)
        if (!folder || !folder.owner || folder.owner.toString() !== userId) {
            return res.status(403).json(errorMessage("Unauthorized"));
        }

        // Delete the file from the database
        await File.findByIdAndDelete(fileId);

        // Remove the file from the folder's file list
        await Folder.findByIdAndUpdate(folder._id, {
            $pull: {
                files: fileId
            }
        });

        res.status(200).json(successMessage("File deleted successfully"));
    } catch (error) {
        console.log(`error: ${error}`);
        res.status(500).json(serverError());
    }
});

router.post('/query', userExists, async (req, res) => {
    try {
        const documentId = req.body.documentId;
        const query = req.body.query;
        const userId = req.userId;
        console.log(documentId)
        console.log(query)
        // const response = await fetch("http://127.0.0.1:8000/ask_query", {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       "document_id": documentId,
        //       "question": query  // Changed "query" to "question"
        //     })
        // });

        // const data = await response.json();

        const data = {
            'model response': {
                output_text: 'Building an ML-enabled system is a multifaceted undertaking that combines data engineering, ML engineering, and application engineering tasks. Data engineering involves ingesting, integrating, curating, and refining data to facilitate a broad spectrum of operational tasks, data analytics tasks, and ML tasks. ML models are built and deployed in production using curated data that is usually created by the data engineering team. The models do not operate in silos; they are components of, and support, a large range of application systems, such as business intelligence systems, line of business applications, process control systems, and embedded systems. Integrating an ML model into an application is a critical task that involves making sure first that the deployed model is used effectively by the applications, and then monitoring model performance. In addition to this, you should also collect and monitor relevant business KPIs (for example, click-through rate, revenue uplift, and user experience). This information helps you understand the impact of the ML model on the business and adapt accordingly.'
            },
            'db time': 0.47408103942871094,
            'model time': 6.5733642578125
        }


        res.status(200).json(successMessage("answered", [data]));
    } catch (error) {
        console.log(`error = ${error}`);
        res.status(500).json(serverError());
    }
});

// router.delete('/delete/:folderId', userExists, async (req, res) => {
//     const folderId = req.params.folderId;
//     const userId = req.body.userId;

//     console.log("folderId" + folderId);
//     console.log("userId" + userId);

//     const folder = Folder.findById(folderId);
//     if (!folder) {
//         res.json(404).json(errorMessage("Folder Does not exist "));
//     }
//     if (folder.owner !== userId) {
//         res.json(403).json(errorMessage("Unauthorized"));
//     }
//     // Delete all files associated with this folder
//     await File.deleteMany({ _id: { $in: folder.files } });

//     // Delete the folder itself
//     await Folder.findByIdAndDelete(folderId);




// })

export default router