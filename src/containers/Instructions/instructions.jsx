import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import "./instructions.css";
import { useParams, useSearchParams } from "react-router-dom";
import httpServices from "./../../services/http.service";
import {
  deleteEnvironmentEndpoint,
  fetchInstructionsModuleEndpoint,
  validateScenerioEndpoint,
} from "../../configs/apiEndpoints";
import { get } from "lodash";
import {
  failureInValidation,
  successfullyValidatedscenario,
  snackBarAlertLevels,
} from "../../configs/constants";
import SnackBar from "../../components/SnackBar";
import { deletedEnvironmentSuccessfully } from "./../../configs/constants";
import { CircularProgress, LinearProgress, Box } from "@mui/material";
import CryptoJS from "crypto-js";
import Table from "../../components/table";
import { resourcesColumn, userNameColumn } from "./instructionsData";
import axios from "axios";

const { success, warning, error } = snackBarAlertLevels;

const Instructions = () => {
  const [instructions, setInstructions] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertLevel, setAlertLevel] = useState("");
  const [stackResources, setStackResources] = useState([]);
  const [userIamData, setUserIamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { courseId, envName } = useParams();
  const [searchParams] = useSearchParams();
  const stackId = searchParams.get("stackId");
  const uniqueId = searchParams.get("uniqueId");
  const userData = getDecodedUserCreds();
  const { userName, password } = userData;

  useEffect(() => {
    fetchMarkDownFileContent();
    showStackResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMarkDownFileContent = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_HOST_URL}${fetchInstructionsModuleEndpoint(courseId)}`
      );
      const markdown = await response.data;
      setInstructions(markdown);
    } catch (e) {
      console.error("Error while fetching mark-down component", e);
      setInstructions(`*** No Instructions found for ${courseId} ***`);
    }
  };

  const showStackResources = () => {
    const stackResources = JSON.parse(sessionStorage.getItem("stackResources"));
    if (!stackResources || !stackResources.length) return;

    const data = stackResources.map((resource) => {
      const { PhysicalResourceId, ResourceType } = resource;
      return {
        ResourceType,
        PhysicalResourceId,
      };
    });
    setStackResources(data);
    setUserIamData([
      {
        alias: 'thinkcloudly',
        userName,
        password,
        region: "US East (N.Virginia)",
      },
    ]);
  };

  const handleValidation = async () => {
    try {
      const payload = {
        stackId,
      };
      setIsLoading(true);
      const response = await httpServices.postRequest(
        validateScenerioEndpoint(envName),
        payload
      );
      if (get(response, ["data", "status"]) === "success") {
        setAlertMessage(successfullyValidatedscenario);
        setAlertLevel(success);
      } else {
        setAlertMessage(failureInValidation);
        setAlertLevel(warning);
      }
    } catch (e) {
      console.error("Error while Validating Scenerio", e);
      setAlertMessage("Error while Validating Scenerio");
      setAlertLevel(error);
    } finally {
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  function getDecodedUserCreds() {
    const userInfo = CryptoJS.AES.decrypt(
      uniqueId,
      process.env.REACT_APP_ENCRYPT_KEY
    );
    const parsedInfo = JSON.parse(userInfo.toString(CryptoJS.enc.Utf8));
    return parsedInfo;
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const payload = {
        stackId,
        iamUserId: userName,
      };
      await httpServices.postRequest(deleteEnvironmentEndpoint, payload);
      // if (get(response, ['data', 'status']) === 'success') {
      //   setAlertMessage(deletedEnvironmentSuccessfully);
      //   setAlertLevel(success);
      // }
      setAlertMessage(deletedEnvironmentSuccessfully);
      setAlertLevel(success);
    } catch (e) {
      console.error("Error while deleting scenerio", e);
      setAlertMessage("Error while deleting Scenerio");
      setAlertLevel(error);
    } finally {
      setShowAlert(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="instructions">
        <div>
          <h2>Instructions</h2>
          <hr />
          <p>
            <Table columns={userNameColumn} rowData={userIamData} />
          </p>

          <Table columns={resourcesColumn} rowData={stackResources} />
          {instructions ? (
            <Markdown children={instructions} />
          ) : (
            <Box className='progress'>
              <LinearProgress />
            </Box>
          )}
        </div>
        <div className="btns">
          <button
            disabled={isLoading}
            className="action-btn success"
            onClick={handleValidation}
          >
            Validate
          </button>
          <button
            disabled={isLoading}
            className="action-btn failure"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

        <SnackBar
          show={showAlert}
          message={alertMessage}
          level={alertLevel}
          onClose={() => setShowAlert(false)}
        />
      </div>
      <div className="center">{isLoading ? <CircularProgress /> : null}</div>
    </>
  );
};

export default Instructions;
