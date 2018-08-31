//Lib for storing data

// Dependecies

const fs  = require('fs');
const path = require('path');

// Container for thr module
let lib = {};

// Create a base path for the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to file
lib.create = (dir, file, data, callback ) => {
    // Open the file to writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            // Convert data to string
            let stringData = JSON.stringify(data);

            // Write data to file and close
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err) {
                    fs.close(fileDescriptor, (err) => {
                        if(!err) {
                            callback(false);
                        } else {
                            callback('Error closing the file')
                        }
                    })
                } else {
                    callback('Error writing to a file')
                }
            })
        }else{
            callback('Could not create a new file, it may already exist')
        }
    });

}
// Read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', (err, data) => {
        callback(err, data);
    })
}

// Update existing data in a file
lib.update = (dir, file, data, callback) => {
    // Open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) =>{
        if(!err){
            // Convert data to string
            let stringData = JSON.stringify(data);

            // Truncate the file
            fs.truncate(fileDescriptor, err => {
                if(!err){
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file')
                                }
                            })
                        } else {
                            callback('Error writing to existing file')
                        }
                    })
                } else{
                    callback('You')
                }
            })
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    })
    // 
}

// Delete a file
lib.delete = (dir, file, callback) => {
    // Unlik the file from the file system
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', err => {
        if(!err){
            callback(false);
        }else {
            callback('Error deleting file');
        }
    })
}

// Export lib module
module.exports = lib;