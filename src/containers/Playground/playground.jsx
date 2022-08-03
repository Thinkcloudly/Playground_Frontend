import CardComponent from "../../components/CardComponent";
import coursesOffered from "../../configs/coursesOffered";
import BasicMessageModal from "../../components/Modal";
import { useState } from "react";
import httpServices from "../../services/http.service";
import { generatePlaygroundEndpoint } from "../../configs/apiEndpoints";
import './playground.css';
import { useNavigate } from 'react-router-dom';

const Playground = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  const handleConfirm = async (courseId) => {
    handleSetShowModal(true);

    await generatePlayground(courseId);
    handleSetShowModal(false);
    navigate(`/instructions/${courseId}`);
  };

  const generatePlayground = async (courseId) => {
    try {
      const response = await httpServices.getRequest(generatePlaygroundEndpoint(courseId));
    } catch (e) {
      console.error(e);
    }
  }

  const handleSetShowModal = (value) => {
    setShowModal(value);
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
            />
          );
        })}
      </div>
      <BasicMessageModal
        showModal={showModal}
        message="Playground is being created. This may take sometime. Please wait..."
        handleClose={() => handleSetShowModal(false)}
      />
    </>
  );
};

export default Playground;
