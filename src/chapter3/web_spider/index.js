"use strict";

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('./utilities');

/**
 * 'No-nos':
 *
 * 1. using if...else instead of just returning
 * 2. relying on closure to provide state to the callbacks (filename)
 * 3. doing too much - downloading, creating and writing in one function - split it up
 *
 *
 */

/**
 *
 * @param url
 * @param spider_callback: function(Error err, String filename, Boolean downloaded)
 *
 * When we call this we need to provide the function to call
 * when the asynchronous operation has finished.
 *
 */
function spider(url, spider_callback){

  const filename = utilities.urlToFilename(url);

  fs.exists(filename, exists => {
    if(exists){
      return spider_callback(null, filename, false);
    }
    else {
      download(url, filename, err => {
        if(err){
          return spider_callback(err);
        }
        spider_callback(null, filename, true);
      })
    }
  });
}

function download(url, filename, download_callback){
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if(err){
      return download_callback(err);
    }
    saveFile(filename, body, err => {
      if(err){
        return download_callback(err);
      }
      console.log(`Downloaded and saved ${url}`);
      download_callback(null, body);
    })
  });
}

function saveFile(filename, body, savefile_callback){
  mkdirp(path.dirname(filename), err => {
    if(err){
      return savefile_callback(err);
    }
    fs.writeFile(filename, body, savefile_callback);
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if(err){
    console.log(err);
  }
  else if(downloaded){
    console.log(`Completed the download of ${filename}`);
  }
  else {
    console.log(`${filename} was already downloaded`);
  }

})
