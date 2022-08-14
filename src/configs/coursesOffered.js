import azure from "./../static/images/azure.jpg";
import aws from "./../static/images/aws.png";

const coursesOffered = [
  {
    id: "azure",
    name: "Microsoft Azure",
    description:
      "Take a top-rated Microsoft Azure course on Udemy ",
    image: azure,
    environment: "testEnv",
    resources:[
      {
        "type":"AWS::EC2::EIP"
      },
      {
        "type":"AWS::EC2::Volume",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "Size":30
         }
      }
    ]
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer",
    image: aws,
    environment: "testEnv",
    resources:[
      {
        "type":"AWS::EC2::EIP"
      },
      {
        "type":"AWS::EC2::Volume",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "Size":30
         }
      }
    ]
  },
  {
    id: "aws-2",
    name: "Amazon Super Services",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer.",
    image: aws,
    environment: "testEnv",
    resources:[
      {
        "type":"AWS::EC2::EIP"
      },
      {
        "type":"AWS::EC2::Volume",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "Size":30
         }
      }
    ]
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer.",
    image: aws,
    environment: "testEnv",
    resources:[
      {
        "type":"AWS::EC2::EIP"
      },
      {
        "type":"AWS::EC2::Volume",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "Size":30
         }
      }
    ]
  },
];

export default coursesOffered;
