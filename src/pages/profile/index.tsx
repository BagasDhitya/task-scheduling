import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { RootState } from "../../utils/redux/store";
import Loading from "../../components/Loading";
import { setUser, setProfilePhoto } from "../../utils/redux/authSlice";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          dispatch(setProfilePhoto(reader.result as string));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateProfile = () => {
    setLoading({ status: true, message: "Updating Profile..." });
    setTimeout(() => {
      dispatch(
        setUser({
          username,
          password,
          email: user?.email || "",
          profilePhoto: user?.profilePhoto || "",
        })
      );
      setLoading({ status: false, message: "" });
      setShowModal(false);
    }, 2000);
  };

  if (!isMounted || loading.status) {
    return (
      <Loading message={loading.message ? loading.message : "Loading..."} />
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-md my-20 mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          {user ? (
            <div>
              <div className="mb-4 text-center">
                <img
                  src={user.profilePhoto || "/path/to/profile-placeholder.png"}
                  alt="Profile Photo"
                  className="w-32 h-32 rounded-full mx-auto"
                />
              </div>
              <div className="mb-4">
                <p className="text-xl">
                  <strong>Username:</strong> {user.username}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xl">
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              <Button onClick={() => setShowModal(true)} className="w-full">
                Edit Profile
              </Button>
            </div>
          ) : (
            <p>No user information available</p>
          )}
        </div>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Edit Profile"
        >
          <div>
            <div className="mb-4 text-center">
              <img
                src={user?.profilePhoto || "/path/to/profile-placeholder.png"}
                alt="Profile Photo"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <Button onClick={handleUpdateProfile} className="w-full">
              Update Profile
            </Button>
          </div>
        </Modal>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
