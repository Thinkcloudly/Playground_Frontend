import aws from "./../static/images/aws.png";
import aws_1 from "./../static/images/aws-1.jpg";
import aws_2 from "./../static/images/aws-2.jpg";

const coursesOffered = [
  {
    id: "aws-1",
    name: "EBS & EC2",
    description: "Learn how to attach EBS to EC2 in 4 simple steps",
    image: aws_1,
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
    id: "aws-2",
    name: "EC2 Website Access",
    description:
      "Troubleshoot & Fix Website Access Issue on EC2",
    image: aws_2,
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
  }
];

export default coursesOffered;
