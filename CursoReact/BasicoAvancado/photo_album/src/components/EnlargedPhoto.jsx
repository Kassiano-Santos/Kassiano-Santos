import React from "react";

const EnlargedPhoto = ({ photo, setEnlargedPhoto }) => {
  return (
    <div
      className="enlarged-photo-backdrop"
      onClick={() => setEnlargedPhoto(null)}
    >
      <div className="enlarged-photo-container">
        <img src={photo.urls.regular} alt={photo.alt_description} />
      </div>
    </div>
  );
};

export default EnlargedPhoto;