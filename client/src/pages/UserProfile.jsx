import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeItem from '../components/RecipeItem';
import { Link, useNavigate } from 'react-router-dom';




const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);

            let axiosConfig = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              };
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/profile`,axiosConfig);
                setUser(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user data found.</div>;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            
    
            {user.recipesCreated.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Recipes Created</h3>
                    <ul>
                        {user.recipesCreated.map(recipe => (
                             <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
                             <RecipeItem
                               key={recipe._id} // Make sure to provide a unique key prop
                               recipe={recipe}
                               onLike={0}
                               onDislike={0}
                             />
                           </Link>
                        ))}
                    </ul>
                </div>
            )}
    
            {user.recipesCreated.length === 0 && (
                <p>No recipes created yet.</p>
            )}

{user.likedRecipes.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Recipes Liked</h3>
                    <ul>
                        {user.likedRecipes.map(recipe => (
                             <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
                             <RecipeItem
                               key={recipe._id} 
                               recipe={recipe}
                               onLike={0}
                               onDislike={0}
                             />
                           </Link>
                        ))}
                    </ul>
                </div>
            )}
    
            {user.likedRecipes.length === 0 && (
                <p>No recipes Liked yet.</p>
            )}


        </div>
    );
    
};

export default UserProfile;
