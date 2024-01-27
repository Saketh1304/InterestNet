
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';



const RecommendedUsersWidget = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {users.map(user => (
        <Box key={user._id} >
          <Typography variant="body1">{user.name}</Typography>
        
        </Box>
      ))}
    </Box>
  );
};

export default RecommendedUsersWidget;
