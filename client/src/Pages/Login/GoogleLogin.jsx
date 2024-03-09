
const GoogleLogin = () => {

  const handleGoogleSignIn = () => {
    alert("Hello Google Sign In !! Comming Soon !!");
  };
  return (
    <div>
      <div className="form-control mt-2">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-cyan-950  text-white rounded-lg"
        >
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
