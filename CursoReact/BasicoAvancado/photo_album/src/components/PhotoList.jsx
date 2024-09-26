import React from "react";
import Photo from "./Photo.jsx";

const PhotoList = ({ photos, setEnlargedPhoto }) => {
  return (
    <div className="album">
      {photos.map((photo) => (
        <Photo key={photo.id} data={photo} setEnlargedPhoto={setEnlargedPhoto} />
      ))}
    </div>
  );
};

export default PhotoList;