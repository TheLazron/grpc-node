const grpc = require("@grpc/grpc-js");

const calculator = require("./protosgen/calculator_pb");
const service = require("./protosgen/calculator_grpc_pb");
const { response, request } = require("express");

const client = new service.CalculatorClient(
  "127.0.0.1:8081",
  grpc.credentials.createInsecure()
);

const requestAddition = () => {
  const request = new calculator.AddRequest();
  request.setNum1(6);
  request.setNum2(6);

  client.add(request, (err, response) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("res", response.getResult());
    }
  });
};

const requestMultiplication = () => {
  const request = new calculator.MultiplyRequest();
  request.setNum1(10);
  request.setNum2(4);

  client.multiply(request, (err, response) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("res", response.getResult());
    }
  });
};

const requestFactorial = () => {
  const request = new calculator.FactorialRequest();
  request.setNumber(5); // Set the number for which you want to calculate the factorial

  const call = client.factorial(request); // Call the 'factorial' RPC

  call.on("data", (response) => {
    console.log(
      "[ Partial Result: ",
      response.getResult(),
      "Result Stage: ",
      response.getStage(),
      " ]"
    ); // Handle partial results
  });

  call.on("end", () => {
    // Handle end of stream
    console.log("End of Factorial");
  });

  call.on("error", (err) => {
    // Handle errors
    console.error("Error: ", err);
  });
};

const requestAddMultiple = () => {
  const call = client.addMultiple(); // Call the 'addMultiple' RPC

  // Add multiple requests to the writable stream
  const requests = [
    { number1: 2, number2: 3 },
    { number1: 5, number2: 5 },
    { number1: 2, number2: 7 },
  ];

  //Request Steeams from Client
  requests.forEach((request) => {
    const addRequest = new calculator.AddRequest();
    addRequest.setNum1(request.number1);
    addRequest.setNum2(request.number2);
    console.log(
      "Sending Request for numbers:",
      request.number1,
      " and ",
      request.number2
    );
    call.write(addRequest);
  });

  call.end(); // Signal the end of the writable stream

  //Code for handling incoming stream
  call.on("data", (response) => {
    console.log("Partial Result: ", response.getResult()); // Handle partial results
  });

  call.on("end", () => {
    // Handle end of stream
    console.log("End of Stream");
  });

  call.on("error", (err) => {
    // Handle errors
    console.error("err: ", err);
  });
};

// requestAddition();
// requestMultiplication();
// requestFactorial();
requestAddMultiple();
