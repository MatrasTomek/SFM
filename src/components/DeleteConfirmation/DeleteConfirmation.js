import { useDispatch } from "react-redux";
import { deleteSubcontractor, clearSubcontarctor } from "../../data/actions";
import {} from "../../data/actions";

import { Button, Modal } from "../../components";
import styles from "./deleteConfirmation.module.scss";

const DeleteConfirmation = ({
  isModalOpen,
  setIsModalOpen,
  id,
  setIsSave,
  setIsEdit,
  deleteItem,
}) => {
  const dispatch = useDispatch();

  const handleOnDelete = () => {
    dispatch(deleteSubcontractor(id));
    dispatch(clearSubcontarctor());
    setIsModalOpen(false);
    setIsSave(false);
    setIsEdit(false);
  };
  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <p>Czy na pewno chcesz usunać?</p>
        <div className={styles.buttons}>
          <Button name="usuń" onClick={handleOnDelete} />
          <Button name="wyjdź" onClick={handleOnClose} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
