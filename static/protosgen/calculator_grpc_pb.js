// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var calculator_pb = require("./calculator_pb.js");

function serialize_calculator_AddRequest(arg) {
  if (!(arg instanceof calculator_pb.AddRequest)) {
    throw new Error("Expected argument of type calculator.AddRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_AddRequest(buffer_arg) {
  return calculator_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_CalculatedResponse(arg) {
  if (!(arg instanceof calculator_pb.CalculatedResponse)) {
    throw new Error("Expected argument of type calculator.CalculatedResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_CalculatedResponse(buffer_arg) {
  return calculator_pb.CalculatedResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_calculator_FactorialRequest(arg) {
  if (!(arg instanceof calculator_pb.FactorialRequest)) {
    throw new Error("Expected argument of type calculator.FactorialRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FactorialRequest(buffer_arg) {
  return calculator_pb.FactorialRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_calculator_FactorialResponse(arg) {
  if (!(arg instanceof calculator_pb.FactorialResponse)) {
    throw new Error("Expected argument of type calculator.FactorialResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FactorialResponse(buffer_arg) {
  return calculator_pb.FactorialResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_calculator_MultiplyRequest(arg) {
  if (!(arg instanceof calculator_pb.MultiplyRequest)) {
    throw new Error("Expected argument of type calculator.MultiplyRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_MultiplyRequest(buffer_arg) {
  return calculator_pb.MultiplyRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var CalculatorService = (exports.CalculatorService = {
  add: {
    path: "/calculator.Calculator/Add",
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.AddRequest,
    responseType: calculator_pb.CalculatedResponse,
    requestSerialize: serialize_calculator_AddRequest,
    requestDeserialize: deserialize_calculator_AddRequest,
    responseSerialize: serialize_calculator_CalculatedResponse,
    responseDeserialize: deserialize_calculator_CalculatedResponse,
  },
  multiply: {
    path: "/calculator.Calculator/Multiply",
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.MultiplyRequest,
    responseType: calculator_pb.CalculatedResponse,
    requestSerialize: serialize_calculator_MultiplyRequest,
    requestDeserialize: deserialize_calculator_MultiplyRequest,
    responseSerialize: serialize_calculator_CalculatedResponse,
    responseDeserialize: deserialize_calculator_CalculatedResponse,
  },
  factorial: {
    path: "/calculator.Calculator/Factorial",
    requestStream: false,
    responseStream: true,
    requestType: calculator_pb.FactorialRequest,
    responseType: calculator_pb.FactorialResponse,
    requestSerialize: serialize_calculator_FactorialRequest,
    requestDeserialize: deserialize_calculator_FactorialRequest,
    responseSerialize: serialize_calculator_FactorialResponse,
    responseDeserialize: deserialize_calculator_FactorialResponse,
  },
  addMultiple: {
    path: "/calculator.Calculator/AddMultiple",
    requestStream: true,
    responseStream: true,
    requestType: calculator_pb.AddRequest,
    responseType: calculator_pb.CalculatedResponse,
    requestSerialize: serialize_calculator_AddRequest,
    requestDeserialize: deserialize_calculator_AddRequest,
    responseSerialize: serialize_calculator_CalculatedResponse,
    responseDeserialize: deserialize_calculator_CalculatedResponse,
  },
});

exports.CalculatorClient = grpc.makeGenericClientConstructor(CalculatorService);
