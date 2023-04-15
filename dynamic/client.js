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

// Create your client using the dynamically generated package definition
const client = new calculator.Calculator(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call your RPCs using the dynamically generated package definition
client.Add({ num1: 1, num2: 2 }, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Add Response:", response);
  }
});

client.Multiply({ num1: 3, num2: 4 }, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Multiply Response:", response);
  }
});

const factorialCall = client.Factorial({ number: 5 });

factorialCall.on("data", (response) => {
  console.log("Factorial Response:", response);
});

factorialCall.on("error", (err) => {
  console.error(err);
});

factorialCall.on("end", () => {
  console.log("Factorial Streaming Complete");
});

const addMultipleCall = client.AddMultiple();

// Send multiple AddRequest messages to the server
addMultipleCall.write({ num1: 2, num2: 1 });
addMultipleCall.write({ num1: 3, num2: 4 });
addMultipleCall.write({ num1: 5, num2: 5 });

// Signal the end of the stream
addMultipleCall.end();

addMultipleCall.on("data", (response) => {
  console.log("AddMultiple Response:", response);
});

addMultipleCall.on("error", (err) => {
  console.error(err);
});

addMultipleCall.on("end", () => {
  console.log("AddMultiple streaming Complete");
});

// const addMultipleCall = client.AddMultiple((err, response) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("AddMultiple Response:", response);
//   }
// });

// addMultipleCall.write({ number: 1 });
// addMultipleCall.write({ number: 2 });
// addMultipleCall.write({ number: 4})
