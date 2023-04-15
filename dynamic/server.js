const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Define the path to your proto file
const PROTO_PATH = "./protos/calculator.proto";

// Load the proto file using proto-loader
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Get the package definition from the loaded proto file
const { calculator } = grpc.loadPackageDefinition(packageDefinition);

// Create your server using the dynamically generated package definition
const server = new grpc.Server();

// Implement your server logic using the dynamically generated package definition
server.addService(calculator.Calculator.service, {
  Add: (call, callback) => {
    const { num1, num2 } = call.request;
    const result = num1 + num2;
    const response = { result };
    callback(null, response);
  },
  Multiply: (call, callback) => {
    const { num1, num2 } = call.request;
    const result = num1 * num2;
    const response = { result };
    callback(null, response);
  },
  Factorial: (call) => {
    // Implement your Factorial RPC logic here with streaming response
    const { number } = call.request;

    let result = 1;
    for (let i = 1; i <= number; i++) {
      // Calculate the factorial iteratively
      result *= i;

      // Create a response message for the intermediate result
      const response = {
        stage: i,
        result: result,
      };

      // Send the response to the client
      call.write(response);
    }

    // Signal the end of the stream
    call.end();
  },
  AddMultiple: (call) => {
    // Implement your AddMultiple RPC logic here with streaming request and response

    // Initialize the sum to 0
    let sum = 0;

    // Listen for data events on the call stream
    call.on("data", (request) => {
      // Add the received number to the sum
      const { num1, num2 } = request;

      // Create a CalculatedResponse message for the intermediate result
      const response = { result: num1 + num2 };

      // Send the response to the client
      call.write(response);
    });

    // Listen for end event on the call stream
    call.on("end", () => {
      // Signal the end of the stream
      console.log("Stream ending");
      call.end();
    });
  },
});

// Start your server
server.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
