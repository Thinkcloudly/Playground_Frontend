import CardComponent from "../../components/CardComponent";
import coursesOffered from "../../configs/coursesOffered";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import httpServices from "../../services/http.service";
import { validateEnvironmentEndpoint, createEnvironmentEndpoint } from "../../configs/apiEndpoints";
import './playground.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { get } from "lodash";
import AwsAmplifyCongnitoAuth from '../../utils/AwsAmplifyCognitoAuth';
import { CREATE_COMPLETE, CREATE_IN_PROGRESS, generatingEnvironment, validatingEnvironment, VALIDATE_ENVIRONMENT_INTERVAL_TIME, ENV_STACK_ID } from "../../configs/constants";
import { v4 as uuid } from 'uuid';

const Playground = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(generatingEnvironment);
  const navigate = useNavigate();
  
  const handleConfirm = async (course) => {
    setShowLoader(true);

    await generatePlayground(course);
  };

  const generatePlayground = async (course) => {
    try {
      const { environment, resources } = course;
      const amplifyAuth = new AwsAmplifyCongnitoAuth();
      const userId = await amplifyAuth.getUserNameFromAmplify();
      const uniqueKey = `${userId}-${environment}-${uuid()}`;
      const tags = [{
        "Key":"Name",
        "Value": uniqueKey
      }];
      const updatedResources = resources.map(resource => {
        return {
          ...resource,
          properties: {
            ...resource.properties,
            "Tags": tags
          }
        }
      });
      const payload = {
        region: "us-east-1",
        environment,
        resources: updatedResources,
        userId
      }
      const response = await httpServices.postRequest(createEnvironmentEndpoint, payload);
      const stackId = get(response, ['data', 'StackId']);
      await validateEnvironment(stackId, uniqueKey, course.id);
    } catch (e) {
      console.error(e);
    }
  }

  const validateEnvironment = async (stackId, uniqueId, courseId) => {
    const payload = {
      stackId
    }
    setLoadingMessage(validatingEnvironment);
    const okStatus = [CREATE_IN_PROGRESS, CREATE_COMPLETE];
    const intervalId = setInterval(async () => {
      try {
        const response = await httpServices.postRequest(validateEnvironmentEndpoint, payload);
        const stackStatus = get(response, ['data', 'StackStatus']);
        if (stackStatus === CREATE_COMPLETE) {
          clearInterval(intervalId);
          setShowLoader(false);
          navigate({
            pathname: `/instructions/${courseId}`,
            search: createSearchParams({
              stackId,
              uniqueId
          }).toString()
        });
        }

        if (!okStatus.includes(stackStatus)) {
          clearInterval(intervalId);
          setShowLoader(false);
        }
   
      } catch (e) {
        console.error("Error while validating environment", e);
      }      
    }, VALIDATE_ENVIRONMENT_INTERVAL_TIME);  
  }

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
<Loader showLoader={showLoader} message={loadingMessage} />
    </>
  );
};

export default Playground;
