import React, { useState } from 'react';
// import { button, input, label } from '@/components/ui'; 
const VehicleRegistrationForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    ambulanceId: '',
    driverName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.ambulanceId || !formData.driverName) {
      setMessage('Please fill in all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/vehicles/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Vehicle registered successfully!');
        setFormData({ ambulanceId: '', driverName: '' });
        // Close modal after success (optional)
        // setTimeout(() => handleClose(), 2000);
      } else {
        setMessage(`Registration failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Register Button */}
      <button 
        onClick={handleOpen}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Register New Vehicle
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Register New Vehicle</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="ambulanceId">
                  Ambulance ID
                </label>
                <input
                  type="text"
                  id="ambulanceId"
                  name="ambulanceId"
                  value={formData.ambulanceId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ambulance ID"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="driverName">
                  Driver Name
                </label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter driver name"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistrationForm;