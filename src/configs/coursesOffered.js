import azure from "./../static/images/azure.jpg";
import aws from "./../static/images/aws.png";

const coursesOffered = [
  {
    id: "azure",
    name: "Microsoft Azure -Scenerio-1",
    description: "Take a top-rated Microsoft Azure course on Udemy ",
    image: azure,
    environment: "testEnv1",
    resources: [
      {
        id: "1",
        type: "AWS::EC2::Instance",
        properties: {
          AvailabilityZone: "us-east-1a",
          ImageId: process.env.REACT_APP_LINUX_IMAGE_ID,
          InstanceType: "t2.micro",
        },
      },
      {
        id: "2",
        type: "AWS::EC2::Volume",
        properties: {
          AvailabilityZone: "us-east-1a",
          Size: 30,
        },
      },
    ],
  },
  {
    id: "aws",
    name: "Amazon Web Services - Scenerio-2",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer",
    image: aws,
    environment: "testEnv2",
    resources: [
      {
        id: "sg",
        type: "AWS::EC2::SecurityGroup",
        properties: {
          GroupDescription: "vpc tester sg",
          VpcId: process.env.REACT_APP_AWS_VPC_ID,
          SecurityGroupIngress: [
            {
              CidrIp: "0.0.0.0/0",
              FromPort: 8,
              IpProtocol: "tcp",
              ToPort: 8,
            },
          ],
        },
      },
      {
        id: "ec2",
        type: "AWS::EC2::Instance",
        properties: {
          AvailabilityZone: "us-east-1a",
          ImageId: process.env.REACT_APP_LINUX_IMAGE_ID,
          InstanceType: "t2.micro",
          NetworkInterfaces: [
            {
              SubnetId: process.env.REACT_APP_AWS_SUBNET_ID,
              AssociatePublicIpAddress: "true",
              DeviceIndex: "0",
              GroupSet: [{ Ref: "sg" }],
            },
          ],
          Tags: [
            {
              Key: "Name",
              Value: "user123-testEnv",
            },
          ],
          UserData: {
            "Fn::Base64": {
              "Fn::Sub":
                "#!/bin/bash\nyum update -y\nyum install -y httpd.x86_64\nsystemctl start httpd.service\nsystemctl enable httpd.service\necho ?Hello World from $(hostname -f)? > /var/www/html/index.html\n",
            },
          },
        },
      },
    ],
  },
  {
    id: "aws-2",
    name: "Amazon Super Services",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer.",
    image: aws,
    environment: "testEnv",
    resources: [
      {
        type: "AWS::EC2::Instance",
        properties: {
          AvailabilityZone: "us-east-1a",
          ImageId: process.env.REACT_APP_LINUX_IMAGE_ID,
          InstanceType: "t2.micro",
        },
      },
      {
        type: "AWS::EC2::Volume",
        properties: {
          AvailabilityZone: "us-east-1a",
          Size: 30,
        },
      },
    ],
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer.",
    image: aws,
    environment: "testEnv",
    resources: [
      {
        type: "AWS::EC2::Instance",
        properties: {
          AvailabilityZone: "us-east-1a",
          ImageId:process.env.REACT_APP_LINUX_IMAGE_ID,
          InstanceType: "t2.micro",
        },
      },
      {
        type: "AWS::EC2::Volume",
        properties: {
          AvailabilityZone: "us-east-1a",
          Size: 30,
        },
      },
    ],
  },
];

export default coursesOffered;
