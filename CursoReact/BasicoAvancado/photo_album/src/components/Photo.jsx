import React from "react";

const Photo = ({ data, setEnlargedPhoto }) => {
  return (
    <div className="photo" onClick={() => setEnlargedPhoto(data)}>
      <img src={data.urls.small} alt={data.alt_description} />
    </div>
  );
};

export default Photo;