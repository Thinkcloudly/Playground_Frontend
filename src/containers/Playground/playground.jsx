import CardComponent from "../../components/CardComponent";
import coursesOffered from "../../configs/coursesOffered";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import httpServices from "../../services/http.service";
import { validateEnvironmentEndpoint, createEnvironmentEndpoint } from "../../configs/apiEndpoints";
import './playground.css';
import { useNavigate } from 'react-router-dom';
import { Auth } from "aws-amplify";
import { get } from "lodash";
import AwsAmplifyCongnitoAuth from '../../utils/AwsAmplifyCognitoAuth';

const Playground = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // removing stacktraceId from localStorage
    localStorage.removeItem("stacktraceId");
  }, [])
  
  const handleConfirm = async (course) => {
    handleSetShowLoader(true);

    await generatePlayground(course);
    handleSetShowLoader(false);
    navigate(`/instructions/${course.id}`);
  };

  const generatePlayground = async (course) => {
    try {
      const { environment, resources } = course;
      const amplifyAuth = new AwsAmplifyCongnitoAuth();
      const userName = await amplifyAuth.getUserNameFromAmplify();
      const payload = {
        region: "us-east-1",
        environment,
        resources,
        userName
      }
      const response = await httpServices.postRequest(createEnvironmentEndpoint, payload);
      const stackId = get(response, 'data', 'stackTraceId');
      localStorage.setItem('stackTraceId', stackId);
      await validateEnvironment(stackId, course.id);
    } catch (e) {
      console.error(e);
    }
  }

  const validateEnvironment = async (stackId, courseId) => {
    const payload = {
      stackId
    }
    const intervalId = setInterval(async () => {
      try {
        const response = await httpServices.postRequest(validateEnvironmentEndpoint, payload);
        if (get(response, ['data', 'status']) === 'success') {
          clearInterval(intervalId);
          navigate(`/instruction/${courseId}`);
        }
   
      } catch (e) {
        console.error("Error while validating environment", e);
      }      
    }, 10000);  

  }

  const handleSetShowLoader = (value) => {
    setShowLoader(value);
  };

  return (
    <>
      <div className="cont">
        {coursesOffered.map((course) => {
          const { id, name, image, description } = course;
          return (
            <CardComponent
              key={id}
              id={id}
              description={description}
              title={name}
              handleConfirm={handleConfirm}
              image={image}
              course={course}
            />
          );
        })}
      </div>
<Loader showLoader={showLoader} message="Generating Playground..." />
    </>
  );
};

export default Playground;
