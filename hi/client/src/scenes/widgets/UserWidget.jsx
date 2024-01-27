import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InterestPosts from './InterestPosts';

const UserWidget = ({ userId, picturePath,onToggleInterests }) => {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]); 
  const [showInterestPosts, setShowInterestPosts] = useState(false);
  const [isEditingTwitter, setIsEditingTwitter] = useState(false);
const [twitterInput, setTwitterInput] = useState('');
const toggleInterestPosts = () => {
  
  onToggleInterests(); 
};
  const [linkedInHandle, setLinkedInHandle] = useState('');
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId, token]); 

  if (!user) {
    return null;
  }
  
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;
  // const fetchInterests = async () => {
   
  // };

  

const handleEditTwitter = async () => {
  const newTwitterHandle = prompt("Please enter your new Twitter handle:");
  if (newTwitterHandle === null) return;

  try {
    const response = await fetch(`http://localhost:3001/api/users/${userId}/twitter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ twitter: newTwitterHandle })
    });

    if (!response.ok) throw new Error('Failed to update Twitter handle');

    const updatedUser = await response.json();
    setUser(updatedUser); 
    alert('Twitter handle updated successfully!');
  } catch (error) {
    console.error('Failed to update Twitter handle:', error);
    alert('Failed to update Twitter handle. Please try again.');
  }
};

const handleEditLinkedIn = async () => {
  const newLinkedInHandle = prompt("Please enter your new LinkedIn profile URL:");
  if (newLinkedInHandle === null) return;

  try {
    const response = await fetch(`http://localhost:3001/api/users/${userId}/linkedin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ linkedin: newLinkedInHandle })
    });

    if (!response.ok) throw new Error('Failed to update LinkedIn profile URL');

    const updatedUser = await response.json();
    setUser(updatedUser); 
    alert('LinkedIn profile updated successfully!');
  } catch (error) {
    console.error('Failed to update LinkedIn profile:', error);
    alert('Failed to update LinkedIn profile. Please try again.');
  }
};


  return (
    <WidgetWrapper>
     
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> 
      <WidgetWrapper>
        
      </WidgetWrapper>

    
      {showInterestPosts && (
        <Box sx={{ flex: '1', marginLeft: '1rem' }}> 
          <InterestPosts userInterests={interests} />
        </Box>
      )}
    </Box>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

    
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

     
      <Box p="1rem 0">
  <FlexBetween mb="0.5rem">
    <Button
      variant="outlined"
      startIcon={<EditOutlined />}
      onClick={() => navigate(`/interests`)}
    >
      Edit your interests
    </Button>
  </FlexBetween>
  
        <Box p="1rem 0">
        <Button
          variant="contained"
          
          onClick={onToggleInterests}
        >
          Show Interests
        </Button>
      </Box>
      </Box>

      <Divider />

     
      <FlexBetween gap="1rem" mb="0.5rem">
  <FlexBetween gap="1rem">
    <img src="../assets/twitter.png" alt="twitter" />
    <Box>
      <Typography color={main} fontWeight="500">
        Twitter
      </Typography>
      <Typography color={medium}>Social Network</Typography>
    </Box>
  </FlexBetween>
  <EditOutlined sx={{ color: main }} onClick={handleEditTwitter} />
</FlexBetween>

<FlexBetween gap="1rem">
  <FlexBetween gap="1rem">
    <img src="../assets/linkedin.png" alt="linkedin" />
    <Box>
      <Typography color={main} fontWeight="500">
        Linkedin
      </Typography>
      <Typography color={medium}>Network Platform</Typography>
    </Box>
  </FlexBetween>
  <EditOutlined sx={{ color: main }} onClick={handleEditLinkedIn} />
</FlexBetween>
      
    </WidgetWrapper>
  );
};

const toggleInterestPosts = () => {
  //fetchInterests();
 // setShowInterestPosts(!showInterestPosts); 
};

export default UserWidget;
