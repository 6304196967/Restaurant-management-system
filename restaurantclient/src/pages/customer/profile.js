import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import Swal from "sweetalert2";
import Navbar from "./navbarcustomer";

const Profile = () => {
  // ✅ Initial state with empty profile data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contact: "",
    profilePic: "https://placehold.co/150",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [selectedFile, setSelectedFile] = useState(null); // ✅ For image upload
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // ✅ Fetch User Details on Page Load
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const userEmail = localStorage.getItem("email"); // Get email from local storage

    if (!userEmail) {
      Swal.fire({
        icon: "error",
        title: "No email found! 😢",
        text: "Please login again.",
        timer: 2000,
      });
      window.location.href = "/signin"; // Redirect if no email found
      return;
    }

    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/user/getdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfileData(data);
        setFormData(data); // Set initial form data to fetched data
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Fetching Profile! 😞",
          text: data.message || "Failed to load user data.",
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error! 💥",
        text: "Please try again later.",
      });
    }
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle Profile Pic Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePic: reader.result, // ✅ Show preview
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Save Profile
  const handleSave = async () => {
    setLoading(true); // ✅ Show loading animation
  
    let updatedProfilePic = profileData.profilePic; // Default if no change
  
    // ✅ If a new profile pic is selected
    if (selectedFile) {
      const formDataPic = new FormData();
      formDataPic.append("profilePic", selectedFile);
      formDataPic.append("email", formData.email);
  
      try {
        const uploadResponse = await fetch(
          "https://restaurant-management-backend-1.onrender.com/api/user/uploadpic",
          {
            method: "POST",
            body: formDataPic,
          }
        );
        const uploadResult = await uploadResponse.json();
  
        if (uploadResponse.ok) {
          updatedProfilePic = uploadResult.profilePicUrl;
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Upload Image! 😞",
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error uploading profile pic:", error);
        Swal.fire({
          icon: "error",
          title: "Server Error! 💥",
          text: "Please try again later.",
        });
        setLoading(false);
        return;
      }
    }
  
    // ✅ Save profile details
    try {
      const response = await fetch(
        "hhttps://restaurant-management-backend-1.onrender.com/api/user/updatedetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            profilePic: updatedProfilePic,
          }),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        // ✅ Fetch latest details after update
        await fetchUserDetails(); // ✅ Get the latest profile data
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "Profile Updated Successfully! 🎉",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Update Profile! 😞",
          text: result.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error! 💥",
        text: "Please try again later.",
      });
    }
  
    setLoading(false); // ✅ Hide loading animation
  };
  
  

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    Swal.fire({
      icon: "info",
      title: "Logged out successfully! 👋",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.href = "/signin"; // Redirect to login page
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">👤 My Profile</h2>

          <div className="profile-pic-container">
            <img
              src={profileData.profilePic}
              alt="Profile"
              className="profile-pic"
              onError={(e) => (e.target.src = "https://placehold.co/150")}
            />
            {isEditing && ( // ✅ Show ➕ button only when editing
              <>
                <label htmlFor="fileInput" className="profile-upload-btn">
                  ➕
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>

          {isEditing ? (
            <div className="profile-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled // Prevent changing email
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact"
              />
              <button className="save-btn" onClick={handleSave} disabled={loading}>
                {loading ? <span className="spinner"></span> : "Save ✅"}
              </button>
            </div>
          ) : (
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {profileData.name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email || "N/A"}
              </p>
              <p>
                <strong>Contact:</strong> {profileData.contact || "N/A"}
              </p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit ✏️
              </button>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
