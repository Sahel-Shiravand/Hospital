import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import StyleHospitalListPage from "./HospitalListPage.module.css";
function HospitalListPage() {
  const navigate = useNavigate();

  const [Hospitals, setHospitals] = useState<
    {
      name: String;
      city: String;
      address: String;
      id: String;
      phone: String;
      image: ImageData;
    }[]
  >([]);

  const getHospitals = async () => {
    let response = await fetch("http://localhost:5000/api/hospitals/");
    let data = await response.json();
    console.log("data:", data);
    setHospitals(data);
  };
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <div>
      {Hospitals?.map((Hospital, i) => {
        return (
          <div key={i} className={` ${StyleHospitalListPage.body} container `}>
            <div className="card" >
              <img
                className="card-img-top"
                src={`http://localhost:5000${Hospital.image}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <div>
                    <p>{Hospital.name}</p>
                  </div>
                </h5>

                <p className="card-text"></p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{Hospital.city}</li>
                <li className="list-group-item">{Hospital.id}</li>
                <li className="list-group-item">{Hospital.phone}</li>
                <li className="list-group-item">{Hospital.address}</li>
              </ul>
              <div className="card-body">
                <button onClick={() => navigate(`/${Hospital.id}/`)}>نمایش</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default HospitalListPage;
