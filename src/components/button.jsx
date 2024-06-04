
const Button = (props) => {
  const { nombre } = props;
  return (
    <button className="rounded-full bg-red-500 text-white p-5">{nombre}</button>
  );
};

export default Button;