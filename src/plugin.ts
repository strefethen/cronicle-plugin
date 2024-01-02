import JSONStream from 'pixl-json-stream';

// setup stdin / stdout streams 
process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

var stream = new JSONStream( process.stdin, process.stdout );

stream.on('json', function(job) {
  let update = { code: 0, description: "Basic description", complete: 1, table: {}, html: {} };
  try {
    console.log("Got job: ", job);
    stream.write(update);  
  } catch (error) {
    stream.write({ code: 1, description: "Error: " + error, complete: 1 })
  }
});