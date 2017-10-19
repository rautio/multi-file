import fs from 'fs';
import es from 'event-stream';

export default function(file1, file2, operationFunction, callback){
  const cb = callback || function(){};
  return new Promise(function(resolve, reject){
    let f1LineNr = 0;
    let f2LineNr = 0;
    let f1_line, f2_line;
    let f1_done = false, f2_done = false;
    let result = [];

    const areWeDone = function(){
      if(f1_done && f2_done){
        resolve(result);
        return cb(null, result);
      }
    };

    const operation = function(){
      if(f1LineNr == f2LineNr){
        const comparison = operationFunction(f1_line, f2_line, f1LineNr);
        if(comparison){
          result.push(comparison);
        }
        //Resume stream to go to the next line
        s1.resume();
        s2.resume();
      }
    };

    const s1 = fs.createReadStream(file1)
      .pipe(es.split())
      .pipe(es.mapSync(function(line){
        s1.pause();
        f1_line = line;
        f1LineNr++;
        operation();
      }))
      .on('error', function(err){
        reject(err);
        return cb(err, null);
      })
      .on('end', function(){
        f1_done = true;
        areWeDone();
      });

    const s2 = fs.createReadStream(file2)
      .pipe(es.split())
      .pipe(es.mapSync(function(line){
        s2.pause();
        f2_line = line;
        f2LineNr++;
        operation();
      }))
      .on('error', function(err){
        reject(err);
        return cb(err, null);
      })
      .on('end', function(){
        f2_done = true;
        areWeDone();
      });
    });
}