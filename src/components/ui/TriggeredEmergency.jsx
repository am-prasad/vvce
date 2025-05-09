import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TriggeredEmergency = () => {
  const [engineNumber, setEngineNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      setError('');
      setSuccess('');
      setVerified(false);

      const response = await axios.post('/api/verify-engine-vehicle', {
        engineNumber,
        vehicleNumber,
      });

      if (response.data.valid) {
        setVerified(true);
        setSuccess('Verification successful. You may now submit.');
      } else {
        setError('Engine number and vehicle number do not match.');
      }
    } catch (err) {
      setError('Server error during verification.');
    }
  };

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess('');

      await axios.post('/api/active-ambulances', {
        engineNumber,
        vehicleNumber,
        timestamp: new Date().toISOString(),
      });

      setSuccess('Ambulance successfully marked active.');
      setVerified(false);
      setEngineNumber('');
      setVehicleNumber('');
    } catch (err) {
      setError('Failed to activate ambulance.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trigger Emergency Response</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Enter Engine Number (7 digits)</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={engineNumber}
          maxLength={7}
          onChange={(e) => setEngineNumber(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Enter Vehicle Number</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <div className="space-x-4">
        <button
          className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500"
          onClick={handleVerify}
          disabled={!engineNumber || !vehicleNumber}
        >
          Verify
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={!verified}
        >
          Submit
        </button>

        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={() => navigate('/route-optimization')}
        >
          Create Route
        </button>
      </div>
    </div>
  );
};

export default TriggeredEmergency;
