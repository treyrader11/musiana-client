import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../../features/authSlice';

const Verify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verificationToken } = useParams();

  //const { isLoading, currentUser } = useSelector(state => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    //await dispatch(RESET_AUTH());
    // await console.log('currentUser', currentUser)
    await navigate('/');
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
            <button onClick={verifyAccount} className="--btn">
                Verify Account
            </button>
        </div>
    </section>
  )
}

export default Verify;