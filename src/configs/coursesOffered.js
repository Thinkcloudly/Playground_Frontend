import azure from "./../static/images/azure.jpg";
import aws from "./../static/images/aws.png";

const coursesOffered = [
  {
    id: "azure",
    name: "Microsoft Azure -Scenerio-1",
    description:
      "Take a top-rated Microsoft Azure course on Udemy ",
    image: azure,
    environment: "testEnv1",
    "resources":[
      {
        "type":"AWS::EC2::Instance",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "ImageId":"ami-090fa75af13c156b4",
          "InstanceType": "t2.micro"
         }
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
    name: "Amazon Web Services - Scenerio-2",
    description:
      "Take a top-rated Microsoft Azure course on Udemy to get a primer",
    image: aws,
    environment: "testEnv2",
    "resources":[
      {
        "id":"vpc",
        "type": "AWS::EC2::VPC",
        "properties": {
          "CidrBlock": "172.31.0.0/16",
          "EnableDnsSupport": true,
          "EnableDnsHostnames": true,
          "InstanceTenancy": "default",
          "Tags": [ { "Key": "Name", "Value": "vpc" } ]
        }
      },
      {
        "id":"InternetGateway",
        "dependsOn": "vpc",
        "type": "AWS::EC2::InternetGateway"
      },
      {
        "id":"GatewayToInternet",
        "type": "AWS::EC2::VPCGatewayAttachment",
        "dependsOn": "InternetGateway",
        "properties": {
          "InternetGatewayId": { "Ref": "InternetGateway" },
          "VpcId": { "Ref": "vpc" }
        }
      },
      {
        "id":"PublicSubnetRouteTable",
        "type": "AWS::EC2::RouteTable",
        "dependsOn": "vpc",
        "properties": {
          "VpcId": { "Ref": "vpc" },
          "Tags": [
            { "Key" : "Name", "Value" :  { "Fn::Sub": "${AWS::StackName}-public" } }
          ]
        }
      },
      {
        "id":"PublicSubnetRoute",
        "type": "AWS::EC2::Route",
        "dependsOn": "GatewayToInternet",
        "properties": {
          "RouteTableId": { "Ref": "PublicSubnetRouteTable" },
          "DestinationCidrBlock": "0.0.0.0/0",
          "GatewayId": { "Ref": "InternetGateway" }
        }
      },
      {
        "id":"PublicSubnet",
        "dependsOn": "PublicSubnetRouteTable",
        "type": "AWS::EC2::Subnet",
        "properties": {
            "VpcId": {
                "Ref": "vpc"
            },
            "CidrBlock": "172.31.0.0/16",
            "AvailabilityZone": "us-east-1a"
        }
      },
      {
        "id":"PublicSubnetRouteTableAssociation",
        "type": "AWS::EC2::SubnetRouteTableAssociation",
        "dependsOn": "PublicSubnet",
        "properties": {
          "RouteTableId": { "Ref" : "PublicSubnetRouteTable" },
          "SubnetId": { "Ref" : "PublicSubnet" }
        }
      },
      {
        "id":"sg",
        "type": "AWS::EC2::SecurityGroup",
        "dependsOn": "vpc",
        "properties": {
          "GroupDescription": "vpc tester sg",
          "VpcId": { "Ref": "vpc" },
          "SecurityGroupIngress": [
              {
                  "CidrIp": "0.0.0.0/0",
                  "FromPort": 8,
                  "IpProtocol": "tcp",
                  "ToPort": 8
              }
          ]
        }
      },
      {
        "id":"ec2",
        "dependsOn":"PublicSubnet",
        "type":"AWS::EC2::Instance",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "ImageId":"ami-090fa75af13c156b4",
          "InstanceType": "t2.micro",
          "NetworkInterfaces": [
              {
                  "SubnetId": {"Ref": "PublicSubnet"},
                  "AssociatePublicIpAddress": "true",
                  "DeviceIndex": "0",
                  "GroupSet": [{ "Ref" : "sg" }]
              }
          ],
          "Tags":[{
            "Key":"Name",
            "Value":"user123-testEnv"
          }],
          "UserData": {
                      "Fn::Base64": {
                          "Fn::Sub": "#!/bin/bash\nyum update -y\nyum install -y httpd.x86_64\nsystemctl start httpd.service\nsystemctl enable httpd.service\necho ?Hello World from $(hostname -f)? > /var/www/html/index.html\n"
                      }
                  }
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
    "resources":[
      {
        "type":"AWS::EC2::Instance",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "ImageId":"ami-090fa75af13c156b4",
          "InstanceType": "t2.micro"
         }
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
    "resources":[
      {
        "type":"AWS::EC2::Instance",
        "properties":{
          "AvailabilityZone" : "us-east-1a",
          "ImageId":"ami-090fa75af13c156b4",
          "InstanceType": "t2.micro"
         }
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
