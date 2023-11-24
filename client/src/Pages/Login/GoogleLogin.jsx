
const GoogleLogin = () => {

  const handleGoogleSignIn = () => {
    alert("Hello Google Sign In !! Comming Soon !!");
  };
  return (
    <div>
      <div className="form-control mt-2">
        <button onClick={handleGoogleSignIn} className="btn btn-secondary">
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
