import { useHistory } from "react-router";

const BackButton = ({ name, type, onClick }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button type="button" onClick={handleGoBack}>
      wstecz
    </button>
  );
};

export default BackButton;
