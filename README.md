## multi-file-reader

Read multiple files line by line and run operations on the same lines from each file.

## Install
```npm install make-file-reader```

## Code Example

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

## Motivation
Perform operations line by line on files too large to load in memory.

## Contributors
If you are interested in contributing please contact oskari.rautiainen@gmail.com

## License

[MIT](https://vjpr.mit-license.org)