const Button = ({ name, type, onClick, id }) => {
  return (
    <button type={type} id={id} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
