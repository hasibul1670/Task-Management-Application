import { Triangle } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="py-20 text-center">
      <span className="flex justify-center">
        <Triangle
          height="150"
          width="150"
          color="#40E0D0"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </span>
    </div>
  );
};

export default LoadingSpinner;
