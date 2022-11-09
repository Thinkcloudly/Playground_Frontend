import { LinearProgress, CircularProgress } from "@mui/material";
import AccordianFlash from "../AccordianFlash/accordianFlash";
import "./user.css";
import Avatar from "../../static/images/avatar.jpg";

import { useRef, useState } from "react";
import TabSection from "../Tabs";
import { getWallpaper, getSummary, courseStatusTabs } from "./userUtils";

const UserProfile = ({
  selectedTab,
  handleTabChange,
  studentData,
  showCourseDataLoader,
  showUi,
}) => {
  const selectedWallpaper = useRef(getWallpaper());
  const { name, email, courseData, heading, courses, payment } = studentData;

  const getCourseDetailsView = () => {
    if (!courseData || courseData.length === 0) {
      return (
        <div className="center-1">
          <h3>User Data not found</h3>
        </div>
      );
    }
    return courseData.map((course, i) => (
      <AccordianFlash
        title={courses[i]}
        summary={getSummary(course, heading)}
        payment={payment[i]}
      />
    ));
  };

  return (
    <>
      {!showUi ? (
        <LinearProgress color="secondary" />
      ) : (
        <div className="full-profile">
          <div className="profile-container">
            <img
              className="bg"
              alt="dashboard"
              src={selectedWallpaper.current}
            />
            <section className="profile-section">
              <div>
                <img src={Avatar} className="profile-img" alt="profile-Image" />
              </div>
              <div className="personal-profile">
                <div className="name">{name}</div>
                <div className="email">Email: {email}</div>
              </div>
            </section>
          </div>

          <section className="courses">
            <div className="course-details">
              <TabSection
                selectedTab={selectedTab}
                labels={Object.values(courseStatusTabs)}
                handleChange={handleTabChange}
              />

              {showCourseDataLoader ? (
                <div className="center-1">
                  <CircularProgress />
                </div>
              ) : (
                getCourseDetailsView()
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default UserProfile;
