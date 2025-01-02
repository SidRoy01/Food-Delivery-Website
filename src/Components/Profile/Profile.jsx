import React, { useEffect, useState } from "react";
import services from "../../Appwrite/Service";
import Button from "../Button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await services.getCurrentUser();
        setUser(currentUser);
        setFormData({ name: currentUser.name, email: currentUser.email });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save Button
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (formData.name !== user.name) {
        await services.updateName(formData.name);
      }

      if (formData.email !== user.email && password) {
        await services.updateEmail(formData.email, password);
      }

      // Refresh user Data
      const updatedUser = await services.getCurrentUser();
      setUser(updatedUser);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(
        "Error updating profile. Ensure password is correct for email updates."
      );
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {user ? (
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Password (for email update)
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Button
            type="button"
            onClick={handleSave}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </form>
      ) : (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
