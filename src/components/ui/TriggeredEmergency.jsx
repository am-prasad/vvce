import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TriggeredEmergency = () => {
  const [engineNumber, setEngineNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess('');

      const response = await axios.post('/api/verify-engine-vehicle', {
        engineNumber,
        vehicleNumber,
      });

      if (response.data.valid) {
        await axios.post('/api/active-ambulances', {
          engineNumber,
          vehicleNumber,
          timestamp: new Date().toISOString(),
        });

        setSuccess('Ambulance successfully marked active.');
        setEngineNumber('');
        setVehicleNumber('');
      } else {
        alert('Wrong user has entered the data.');
      }
    } catch (err) {
      setError('Failed to activate ambulance.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trigger Emergency Response</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Engine Number</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Enter last 7 digits of Engine number"
          value={engineNumber}
          maxLength={7}
          onChange={(e) => setEngineNumber(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Vehicle Number</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <div className="space-x-4">
        <button
          className={`px-6 py-2 rounded text-white ${
            engineNumber && vehicleNumber
              ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
              : 'bg-blue-300 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!engineNumber || !vehicleNumber}
        >
          Submit
        </button>

        <button
          className={`px-6 py-2 rounded text-white ${
            engineNumber && vehicleNumber
              ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
              : 'bg-green-300 cursor-not-allowed'
          }`}
          onClick={() =>
            navigate('/route-optimization', {
              state: { engineNumber, vehicleNumber },
            })
          }
          disabled={!engineNumber || !vehicleNumber}
        >
          Create Route
        </button>
      </div>
    </div>
  );
};

export default TriggeredEmergency;
