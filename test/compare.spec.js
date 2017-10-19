import fs from 'fs';
import expect from 'expect';
import read from '../src/read.js';

describe('Verify that read() works properly', function(){
  const str1 = '1\n2\n3\n4\n';
  const str2 = '5\n6\n7\n8\n';
  const str3 = '9\n10\n11\n12\n';

  //Write a few files to disk for testing purposes
  fs.writeFileSync('./test/temp_file1.csv',str1);
  fs.writeFileSync('./test/temp_file2.csv',str2);
  fs.writeFileSync('./test/temp_file3.csv',str3);

  const expected = [4,4,4,4];
  it('Should return an array of the differences',function(){
    return read('./test/temp_file1.csv','./test/temp_file2.csv', function(f1_line, f2_line, lineNr){
      //will read end of line as a new line so we dont want to return that
      if(f1_line != '' && f2_line !=''){
        return parseInt(f2_line) - parseInt(f1_line);
      }
    })
      .then(function(actual){
        expect(actual).toEqual(expected);
      });
  });
  //Cleanup
  after(function(){
    fs.unlinkSync('./test/temp_file1.csv');
    fs.unlinkSync('./test/temp_file2.csv');
    fs.unlinkSync('./test/temp_file3.csv');
  });
});