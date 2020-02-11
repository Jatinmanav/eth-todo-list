export const address = "0x66ebD2Cf14dE52f07c18a0e2F35B8684bF8C95E5";

export const abi = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "completed",
        type: "bool"
      }
    ],
    name: "taskCompleted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "comleted",
        type: "bool"
      }
    ],
    name: "taskCreated",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "taskCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "tasks",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "content",
        type: "string"
      },
      {
        internalType: "bool",
        name: "completed",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string"
      }
    ],
    name: "createTask",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256"
      }
    ],
    name: "completeTask",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];
