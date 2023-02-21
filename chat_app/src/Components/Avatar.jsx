import React from "react";

const Avatar = ({ item, selected, setSelected, index }) => {
  return (
    <div className={`avatar ${selected === index ? "selected" : ""}`}>
      <img
        src={`data:image/svg+xml;base64,${item}`}
        alt="Avatar"
        onClick={() => {
          setSelected(index);
        }}
      />
    </div>
  );
};

export default React.memo(Avatar);
