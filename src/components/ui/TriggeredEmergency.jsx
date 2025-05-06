import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Simulated import from AmbulancePage.jsx
const ambulanceList = [
  { id: '#103' },
  { id: '#105' },
  { id: '#113' }
];

const TriggeredEmergency = () => {
  const [selectedAmbulance, setSelectedAmbulance] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [requestId, setRequestId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccess('');

      // Step 1: Verify request ID
      const verifyResponse = await axios.post('/api/verify-emergency', {
        ambulanceId: selectedAmbulance,
        vehicleNumber,
        requestId,
      });

      if (!verifyResponse.data.valid) {
        setError('Request ID verification failed.');
        return;
      }

      // Step 2: Move to active ambulances
      await axios.post('/api/active-ambulances', {
        ambulanceId: selectedAmbulance,
        vehicleNumber,
        requestId,
        timestamp: new Date().toISOString(),
      });

      setSuccess('Ambulance successfully marked active.');
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleCreateRoute = () => {
    navigate('/route-optimization');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trigger Emergency Response</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Ambulance ID</label>
        <select
          className="w-full border rounded p-2"
          value={selectedAmbulance}
          onChange={(e) => setSelectedAmbulance(e.target.value)}
        >
          <option value="">-- Select --</option>
          {ambulanceList.map((amb) => (
            <option key={amb.id} value={amb.id}>
              {amb.id}
            </option>
          ))}
        </select>
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

      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Enter Request ID <span className="text-sm text-gray-500">(e.g. #105MH12AB1234)</span>
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="#105MH12AB1234"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <div className=" space-x-9">
        <button
          className="bg-blue-300 text-white px-12 py-2 rounded hover:bg-green-700"
          onClick={handleSubmit}
          disabled={!selectedAmbulance || !vehicleNumber || !requestId}
        >
          Submit
        </button>

        <button
          className="bg-blue-300 text-white px-12 py-2 rounded hover:bg-green-700"
          onClick={handleCreateRoute}
        >
          Create Route
        </button>
      </div>
    </div>
  );
};

export default TriggeredEmergency;
