import { useParams } from "react-router-dom";

const Detail = () => {
  const { id = '' } = useParams();

  return (
    <div>
      Detail Page for ID: {id}
    </div>
  );
};

export default Detail;
