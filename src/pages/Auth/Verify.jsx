import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsLoading, showModal } from '../../features/modalSlice';
import { login, verifyUser } from '../../features/userSlice';
import useFetch from '../../hooks/useFetch';
import { verifyUserService } from '../../services/authServices';

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customFetch = useFetch();
  const { verificationToken } = useParams();

  //const { isLoading, currentUser } = useSelector(state => state.auth);

  const verifyAccount = async () => {
    dispatch(setIsLoading(true));
    // if (verificationToken) {
    //   dispatch(verifyUser({ customFetch, verificationToken }));
    // }
    //await dispatch(verifyUser());
      const { isVerified, msg } = await customFetch(verifyUserService, verificationToken);
      if (isVerified) {
        dispatch(verifyUser({ isVerified }));
        dispatch(showModal({ msg }));
        navigate("/");
      }
    dispatch(setIsLoading(false));
  }; 

  // useEffect(() => {
  //   if(currentUser.isVerified) navigate('/');
  //   console.log('inside of useEffect');
  // }, [currentUser, dispatch]);

  return (
    <section>
        <div className="">
            <h2>Account Verification</h2>
            <p>To verify your account, click the button below...</p>
            <br />
            <button onClick={verifyAccount} className="btn">
                Verify Account
            </button>
        </div>
    </section>
  )
}

export default Verify;