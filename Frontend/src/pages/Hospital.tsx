import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
function Hospital() {
  const { id } = useParams();
  const [Hospitals, setHospitals] = useState<
    {
      name: String;
      city: String;
      address: String;
      id: String;
      phone: String;
      image: ImageData;
      field: String;
      hospital: String;
    }[]
  >([]);

  const getHospitals = async () => {
    let response = await fetch(`http://localhost:5000/api/hospitals/${id}/`);
    let data = await response.json();
    console.log('data:', data);
    setHospitals(data);
  };
  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <div>
      {Hospitals?.map((Hospital, i) => {
        return (
          <div key={i} className='container'>
            <div className='card' style={{ width: '18rem' }}>
              <img
                className='card-img-top'
                src={`http://localhost:5000${Hospital.image}`}
                alt='Card image cap'
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  <div>
                    <p>{Hospital.name}</p>
                  </div>
                </h5>

                {/* <p className="card-text">

                </p> */}
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>{Hospital.phone}</li>
                <li className='list-group-item'>{Hospital.field}</li>
              </ul>
              <div className='card-body'></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Hospital;
