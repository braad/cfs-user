import { useState, useEffect } from "react";
import User from '../Types/user';


export default function UserList() {
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Effect with no dependency so it runs once when the page is loaded
  useEffect(() => {
    // Create an AbortController to cancel the request if the component unmounts
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = 'http://localhost:5259/api/Users';

        const response = await fetch(apiUrl, {
          signal: controller.signal // Link the abort signal to this fetch
        });

        // Handle the response.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // No error so parse the json into an array of users
        const data: User[] = await response.json();
        
        // Update users state
        setUsers(data);
        
      } catch (err: any) {
        // Ignore the error if the request was intentionally aborted
          // setError("Something went wrong when retrieving the list of users.");
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // 4. Cleanup function to abort fetch if component unmounts before completion
    return () => {
      controller.abort();
    };
  }, []); 

  // Handle loading and error state
  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Display list of users in a crude table
  return (
    <div>
      <h2>User List</h2>

        <table>
            <thead><tr><th style={{width:100, textAlign:'left'}}>Name</th><th style={{width:100, textAlign:'left'}}>Age</th><th style={{width:100, textAlign:'left'}}>City</th><th style={{width:100, textAlign:'left'}}>State</th><th style={{width:100, textAlign:'left'}}>Pincode</th></tr></thead><tbody>

            {users.length === 0 ? (
                <tr><th colSpan={5}><span>No users exist</span></th></tr>
            ) : (
                users.map ((user) => {
                    return <tr key={user.id}><td>{user.name}</td><td>{user.age}</td><td>{user.city}</td><td>{user.state}</td><td>{user.pincode}</td></tr>
                })
            )}

        </tbody></table>

    </div>
  );
}