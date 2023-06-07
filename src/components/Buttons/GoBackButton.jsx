import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

function GoBackButton({ size }) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <RiArrowGoBackFill size={size} onClick={goBack} />
  )
}

export default GoBackButton;
