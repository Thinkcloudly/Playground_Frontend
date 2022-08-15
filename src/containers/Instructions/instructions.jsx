import React, { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx';
import './instructions.css';
import { useParams, useSearchParams } from 'react-router-dom';
import httpServices from './../../services/http.service';
import { deleteEnvironmentEndpoint, validateScenerioEndpoint } from '../../configs/apiEndpoints';
import { get } from 'lodash';
import { failureInValidation, successfullyValidatedscenario, snackBarAlertLevels } from '../../configs/constants';
import SnackBar from '../../components/SnackBar';
import { deletedEnvironmentSuccessfully } from './../../configs/constants';
import { CircularProgress } from '@mui/material';

const { success, warning, error } = snackBarAlertLevels;

const Instructions = () => {

  const [instructions, setInstructions] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertLevel, setAlertLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const [searchParams, ] = useSearchParams();
  const stackId = searchParams.get('stackId');
  const uniqueId = searchParams.get('uniqueId');


  useEffect(() => {
    fetchMarkDownFileContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMarkDownFileContent = async () => {
    try {
      const file = require(`../../static/instructions/${courseId}.md`);
      const response = await fetch(file);
      const markdown = await response.text()
       setInstructions(markdown)
    } catch (e) {
      console.error("Error while fetching mark-down component", e);
      setInstructions(`*** No Instructions found for ${courseId} ***`);

    }
  }

  const handleValidation = async () => {
    try {
      const payload = {
        stackId
      }
      setIsLoading(true);
      const response = await httpServices.postRequest(validateScenerioEndpoint, payload);
      if (get(response, ['data', 'status']) === 'success') {
        setAlertMessage(successfullyValidatedscenario);
        setAlertLevel(success);
      } else {
        setAlertMessage(failureInValidation);
        setAlertLevel(warning);
      }
    } catch (e) {
      console.error("Error while Validating Scenerio", e);
      setAlertMessage('Error while Validating Scenerio');
      setAlertLevel(error);
    } finally {
      setShowAlert(true);
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const payload = {
        stackId
      }
      await httpServices.postRequest(deleteEnvironmentEndpoint, payload);
      // if (get(response, ['data', 'status']) === 'success') {
      //   setAlertMessage(deletedEnvironmentSuccessfully);
      //   setAlertLevel(success);
      // } 
        setAlertMessage(deletedEnvironmentSuccessfully);
        setAlertLevel(success);
    } catch (e) {
      console.error("Error while deleting Scenerio", e);
      setAlertMessage('Error while deleting Scenerio');
      setAlertLevel(error);
    } finally {
      setShowAlert(true);
      setIsLoading(false);
    }
  }

  return (
    <>
    <div className='instructions'>
      <div>

    <h2>Instructions</h2>
    <hr/>
    <h3>{`User Unique-ID: ${uniqueId.toString()}`}</h3>
    <Markdown children={instructions}/>
      </div>
      <div className='btns'>

    <button disabled={isLoading}  className='btn success' onClick={handleValidation}>Validate</button>
    <button  disabled={isLoading} className='btn failure' onClick={handleDelete}>Delete</button>
      </div>
  
      <SnackBar 
        show={showAlert}
        message={alertMessage}
        level={alertLevel}
        onClose={() => setShowAlert(false)}
      />
</div>
    <div className='center'>
    {isLoading ? <CircularProgress /> : null}
      </div>
      </>
  )
}

export default Instructions;