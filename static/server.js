// Import the necessary dependencies
const grpc = require("@grpc/grpc-js");
const calculator = require("./protosgen/calculator_pb");
const services = require("./protosgen/calculator_grpc_pb");

// Create a new gRPC server
const server = new grpc.Server();

// Implementation of the 'add' gRPC method
const addImplementation = (call, callback) => {
  const num1 = call.request.getNum1();
  const num2 = call.request.getNum2();

  // Calculate the sum
  const result = num1 + num2;

  // Create a CalculatedResponse message for the sum
  const response = new calculator.CalculatedResponse();
  response.setResult(result);

  //Send calculated result back to client with no error
  callback(null, response);
};

// Implementation of the 'multiply' gRPC method
const multiplyImplementation = (call, callback) => {
  const { num1, num2 } = call.request;
  const result = num1 + num2;
  const response = { result };
  callback(null, response);
};

// Implementation of the 'factorial' gRPC method
const factorialImplementation = (call) => {
  const number = call.request.getNumber();

  let result = 1;
  for (let i = 1; i <= number; i++) {
    // Calculate the factorial iteratively
    result *= i;

    // Create a CalculatedResponse message for the intermediate result
    const response = new calculator.FactorialResponse();
    response.setStage(i);
    response.setResult(result);

    // Send the response to the client
    call.write(response);
  }

  // Signal the end of the stream
  call.end();
};

// Implementation of the 'addMultiple' gRPC method
const addMultipleImplementation = (call) => {
  // Set up a stream for reading AddRequest messages from the client
  call.on("data", (request) => {
    const num1 = request.getNum1();
    const num2 = request.getNum2();

    // Calculate the sum
    const sum = num1 + num2;

    // Create a CalculatedResponse message for the sum
    const calculatedResponse = new calculator.CalculatedResponse();
    calculatedResponse.setResult(sum);

    // Send the CalculatedResponse message to the client
    call.write(calculatedResponse);
  });

  // Signal the end of the stream
  call.on("end", () => {
    console.log("Ending Stream");
    call.end();
  });
};

// Add the implemented methods to the gRPC server
server.addService(services.CalculatorService, {
  add: addImplementation,
  multiply: multiplyImplementation,
  factorial: factorialImplementation,
  addMultiple: addMultipleImplementation,
});

// Bind the gRPC server to a specific address and port, and start the server
server.bindAsync(
  "127.0.0.1:8081",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (!err) {
      console.log("Server started on port", port);
      server.start();
    } else {
      console.log("Error:", err);
    }
  }
);
