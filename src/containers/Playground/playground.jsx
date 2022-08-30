import CardComponent from "../../components/CardComponent";
import coursesOffered from "../../configs/coursesOffered";
import Loader from "../../components/loader";
import { useState } from "react";
import httpServices from "../../services/http.service";
import { validateEnvironmentEndpoint, createEnvironmentEndpoint } from "../../configs/apiEndpoints";
import './playground.css';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { get } from "lodash";
import AwsAmplifyCongnitoAuth from '../../utils/AwsAmplifyCognitoAuth';
import { CREATE_COMPLETE, CREATE_IN_PROGRESS, generatingEnvironment, validatingEnvironment, VALIDATE_ENVIRONMENT_INTERVAL_TIME, snackBarAlertLevels } from "../../configs/constants";
import { v4 as uuid } from 'uuid';
import SnackBar from "../../components/SnackBar";
import CryptoJS from 'crypto-js';

const Playground = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(generatingEnvironment);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
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
      const iamUser = get(response, ['data', 'iamUser']);
      await validateEnvironment(stackId, course.id, iamUser);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
      setAlertMessage("Error while Creating Environment: ", e.message);
      setShowLoader(false);
    }
  }

  const validateEnvironment = async (stackId, courseId, iamUser) => {
    const payload = {
      stackId
    }
    const userData = CryptoJS.AES.encrypt(JSON.stringify(iamUser), process.env.REACT_APP_ENCRYPT_KEY).toString();
    setLoadingMessage(validatingEnvironment);
    const okStatus = [CREATE_IN_PROGRESS, CREATE_COMPLETE];
    const intervalId = setInterval(async () => {
      try {
        const response = await httpServices.postRequest(validateEnvironmentEndpoint, payload);
        const stackStatus = get(response, ['data', 'StackStatus']);
        const stackResources = get(response, ['data', 'StackResources']);
        if (stackStatus === CREATE_COMPLETE) {
          sessionStorage.setItem('stackResources', JSON.stringify(stackResources));
          clearInterval(intervalId);
          setShowLoader(false);
          navigate({
            pathname: `/instructions/${courseId}/`,
            search: createSearchParams({
              stackId,
              uniqueId: userData
          }).toString()
        });
        return;
        }

        if (!okStatus.includes(stackStatus)) {
          setAlertMessage(`Error while Validating environment. Current Status:  ${stackStatus}`);
          setShowAlert(true);
          clearInterval(intervalId);
          setShowLoader(false);
          return;
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
<SnackBar
  show={showAlert}
  message={alertMessage}
  level={snackBarAlertLevels.error}
  onClose={() => setShowAlert(false)}
/>
    </>
  );
};

export default Playground;
