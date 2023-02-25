import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Avatar from "./Avatar";
import styles from "./styles/avatar.module.css";
import Button from "react-bootstrap/Button";

function AvatarModel() {
  const [avatar, setAvatar] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const getData = async () => {
    let { data } = await axios.get(`http://localhost:5000/avatars`);
    setAvatar(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Button
        onClick={() => setLgShow(true)}
        className={`w-100 ${styles.btn} mb-4`}
      >
        Select Avatar
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className={styles.form_title}>
          <Modal.Title id="example-modal-sizes-title-lg">
            Select Your Avatar Image
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.form_modal}>
          <div className={styles.avatars}>
            {avatar.map((item, index) => {
              return (
                <Avatar
                  key={item._id}
                  src={item.src}
                  index={index}
                  setLgShow={setLgShow}
                />
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AvatarModel;
