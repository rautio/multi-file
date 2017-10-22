[![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://travis-ci.org/rautio/multi-file-reader.svg?branch=master
[travis-url]: https://travis-ci.org/rautio/multi-file-reader
[npm-image]: https://img.shields.io/npm/v/multi-file-reader.svg
[npm-url]: https://npmjs.org/package/multi-file-reader
[downloads-image]: https://img.shields.io/npm/dm/multi-file-reader.svg
[downloads-url]: https://npmjs.org/package/multi-file-reader

Read multiple files line by line and run operations on the same lines from each file.

# THIS PROJECT IS DEPRECATED

This module is deprecated. Please use [iterate-multiple-files](https://www.npmjs.com/package/iterate-multiple-files) instead. It has a more future-proof design and is a better tested evolution of this package. Also it will support more functionality and already allows you to iterate through more than 2 files at once (this package is limited to 2).

# Install
```npm install multi-file-reader```

# Code Example

```javascript
import mf from 'multi-file-reader';

let runningSum = 0;

//The function will receive the line from file1, the line from file2 and what line number each of them is within the file
function operation(file1_line, file2_line, lineNumber){
  // The return statement will ensure that the value gets appended to the final
  // array returned either in the promise or callback. If you do not return anything
  // then nothing will be saved to the array - this is good if dealing with large 
  // files and running out of memory.

  // Do any operation in here
  const lineSum = parseInt(file1_line) + parseInt(file2_line);
  runningSum += lineSum;
  return lineSum
}

//Using a promise:
mf.read('path-to-file1','path-to-file2',operation)
  .then(function(result){
    //Do something with the result
    //Result is an array of each line's sum
  })
  .catch(function(err){
    //Handle the error
  });
```
### Using a callback
```javascript
//Using a callback:
mf.read('path-to-file1','path-to-file2',operation, function(err, result){
  if(err){
    //Handle the error
  }
  //Do something with result  
});
```

# Motivation
Perform operations line by line on files too large to load in memory.

# Contributors
If you are interested in contributing please contact oskari.rautiainen@gmail.com

# License

[MIT](https://vjpr.mit-license.org)