import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useContext(AuthContext);

 
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [imgError, setImgError] = useState(false);


  const displayName = user?.displayName || "MD:JUBAYER ISLAM JUBO";
  const userEmail = user?.email || "mdjubayerislamjubo60@gmail.com";
  
  
  const firstLetter = displayName ? displayName.charAt(0).toUpperCase() : "M";

  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      if (user) {
        await updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        });

        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setImgError(false); 
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
       
        <div className="h-36 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-900"></div>

       
        <div className="relative px-6 pb-8">
          
          
          <div className="flex justify-between items-end -mt-16 mb-6">
            <div className="ring-4 ring-slate-900 rounded-full w-28 h-28 bg-slate-800 shadow-2xl border-2 border-emerald-400 flex items-center justify-center overflow-hidden">
              
              
              {user?.photoURL && !imgError ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)} 
                />
              ) : (
                
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-4xl font-black text-white select-none">
                  {firstLetter}
                </div>
              )}

            </div>

          
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setName(user?.displayName || "");
                setPhotoURL(user?.photoURL || "");
                setMessage("");
                setErrorMsg("");
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition duration-200"
            >
              {isEditing ? "Cancel" : "✏️ Edit Profile"}
            </button>
          </div>

          
          {message && (
            <p className="mb-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
              {message}
            </p>
          )}

          {errorMsg && (
            <p className="mb-4 text-xs font-semibold text-rose-400 bg-rose-500/10 p-2.5 rounded border border-rose-500/20">
              {errorMsg}
            </p>
          )}

         
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 mb-6">
              <h3 className="text-lg font-bold text-emerald-400">Edit Profile Details</h3>
              
              <div>
                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Image Link / Photo URL</label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                  placeholder="Paste direct image url (e.g. https://...)"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                {displayName}
              </h2>
              <p className="text-emerald-400 text-sm font-medium mt-0.5">
                {userEmail}
              </p>
            </div>
          )}

          <hr className="my-6 border-slate-800" />

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                Full Name
              </p>
              <p className="text-slate-200 font-semibold text-sm">
                {displayName}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                Email Address
              </p>
              <p className="text-slate-200 font-semibold text-sm truncate">
                {userEmail}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                Email Verification
              </p>
              <p className="text-slate-200 font-semibold text-sm">
                {user?.emailVerified ? (
                  <span className="text-emerald-400 font-medium">✓ Verified</span>
                ) : (
                  <span className="text-amber-400 font-medium">Unverified</span>
                )}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                Account Status
              </p>
              <p className="text-emerald-400 font-semibold text-sm">
                Verified Fitness Enthusiast
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;