import React, { useState } from 'react';

import User from './../Types/user';

interface CreateUserComponentProps {
  onBack: () => void;
  onSuccess: (name: string) => void;
}

// Keep track of any errors on the user fields
interface FormErrors {
  name?: string;
  age?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const CreateUserComponent = ({onBack, onSuccess}:CreateUserComponentProps) => {

  // Manage form fields state
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');

  // Manage state request lifecycle
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const currentErrors: FormErrors = {};

    if (!name.trim()) {
      currentErrors.name = 'Name is required.';
    } else if (name.trim().length < 2) {
      currentErrors.name = 'Name must be at least 2 characters long.';
    } else if (name.trim().length > 100) {
      currentErrors.name = 'Name must be less than 100 characters long.';
    }

    if (!age.trim()) {
      currentErrors.age = 'Age is required.';
    } else {
        const ageValue:number = Number(age.trim());
        if (isNaN(ageValue)) {
            currentErrors.age = 'Age must be a number.';
        } else if (ageValue < 0 || ageValue > 120) {
            currentErrors.age = 'Age must be between 0 and 120.';
        }    
    }    

    if (!city.trim()) {
      currentErrors.city = 'City is required.';
    } 

    if (!state.trim()) {
      currentErrors.state = 'State is required.';
    } 

    if (!pincode.trim()) {
      currentErrors.pincode = 'Pincode is required.';
    } else if (pincode.trim().length < 4 || pincode.trim().length > 10) {
      currentErrors.pincode = 'Pincode must be between 4 and 10 characters.';
    }

    setErrors(currentErrors);
    
    // Form is completely valid if the generated object contains no keys
    return Object.keys(currentErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError(null);
    setSuccess(false);
    
    // Validate the input fields
    const isValid = validateForm();
    if (!isValid) {
      return
    }; 

    setIsSubmitting(true);

    const payload: User = { id, name, age, city, state, pincode };

    try {
      const request = new Request('http://localhost:5259/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const response = await fetch(request);

      if (!response.ok) {
        throw new Error(`Failed to create user. Status: ${response.status}`);
      }

      setSuccess(true);
    
      // Return to user list and display success toaster
      onSuccess(name);

    } catch (err: any) {
      setApiError('An error occurred while creating the user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      
      <h2>Create New User</h2>

      {success && <p style={{ color: 'green' }}>User created successfully!</p>}
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ marginBottom: '5px' }}>Name:</label>
          {errors.name && <span style={{ color: 'red' }}> {errors.name}</span>}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="age" style={{ marginBottom: '5px' }}>Age:</label>
          {errors.age && <span style={{ color: 'red' }}> {errors.age}</span>}
          <input
            id="age"
            type="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="city" style={{ marginBottom: '5px' }}>City:</label>
          {errors.city && <span style={{ color: 'red' }}> {errors.city}</span>}
          <input
            id="city"
            type="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="state" style={{ marginBottom: '5px' }}>State:</label>
          {errors.state && <span style={{ color: 'red' }}> {errors.state}</span>}
          <input
            id="state"
            type="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="pincode" style={{ marginBottom: '5px' }}>Pincode:</label>
          {errors.pincode && <span style={{ color: 'red' }}> {errors.pincode}</span>}
          <input
            id="pincode"
            type="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          style={{ width: '50%', padding: '10px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'Creating User...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserComponent;