"use client";

import React, { useState, useEffect,useRef } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import {
  fetchAddressType,
  fetchGender,
  createAddress,
  updateUserDetails,
  fetchUserProfile,
  fetchAddresses,
  uploadProfileImage
} from "@/app/lib/api";
import Cookies from "js-cookie";
import ToastMessage from "./Errordisplay";





interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: FormData) => void;
}

interface Gender {
  id: number;
  gender_name: string;
}

interface AddressType {
  id: number;
  address_type: string;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
const [formData, setFormData] = useState<{
  first_name: string;
  surname: string;
  email: string;
  gender: string | null;
}>({
  first_name: "",
  surname: "",
  email: "",
  gender: null,
});


  const [addressFormData, setAddressFormData] = useState({
    address_line1: "",
    address_line2: "",
    zipcode: "",
    city: "",
    state: "",
    area: "",
    country: "",
    state_region: "",
    Addresstype: "",
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [genderOptions, setGenderOptions] = useState<Gender[]>([]);
  const [addressTypeOptions, setAddressTypeOptions] = useState<AddressType[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  let didUpdate = false;





  const token = Cookies.get("accessToken");

    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }


  useEffect(() => {
    const getGenders = async () => {
      try {
        const data = await fetchGender();
        setGenderOptions(data as Gender[]);
      } catch (error) {
        console.error("Failed to fetch genders:", error);
      }
    };
    getGenders();
  }, []);

  useEffect(() => {
    const getAddressType = async () => {
      try {
        const data = await fetchAddressType();
        setAddressTypeOptions(data as AddressType[]);
      } catch (error) {
        console.error("Failed to fetch address types:", error);
      }
    };
    getAddressType();
  }, []);

  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) return;
        const profileData = await fetchUserProfile(token);
        const addresses = await fetchAddresses(token);
        setSavedAddresses(addresses);

        const user = profileData[0] as any;
        setUserId(user.id);
        setFormData({
          first_name: user.user_first_name || "",
          surname: user.user_last_name || "",
          email: user.email || "",
          gender: user.gender?.toString() || "",
        });
        if (user.user_profile_image) {
          setPreviewUrl(user.user_profile_image);
        }

      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, [token]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddressFormData({ ...addressFormData, [e.target.name]: e.target.value });
  };

const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setProfileImage(file); // optional for preview

  const imageUrl = await uploadProfileImage(file,token);

  if (imageUrl) {
    await updateUserDetails({ user_profile_image: imageUrl },token);
    alert("Profile image updated!");
  } else {
    alert("Failed to upload image.");
  }
};



const hasAddressData = Object.values(addressFormData).some((val) => val !== "");



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!token || !userId) {
    setErrorMessage("Session expired. Please log in again.");
    return;
  }

  setSuccessMessage(null);
  setErrorMessage(null);
  setLoading(true);
  let updated = false;

  try {
    const userForm = new FormData();
    if (formData.first_name) userForm.append("user_first_name", formData.first_name);
    if (formData.surname) userForm.append("user_last_name", formData.surname);
    if (formData.email) userForm.append("email", formData.email);
    if (formData.gender !== null) userForm.append("gender_id", formData.gender);
    if (profileImage) {
    const imageUrl = await uploadProfileImage(profileImage,token);
      if (profileImage) {
        const imageUrl = await uploadProfileImage(profileImage, token);
        if (imageUrl) {
          userForm.append("user_profile_image", imageUrl); // ✅ correct field
        } else {
          setErrorMessage("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }
  }

    if (Array.from(userForm.entries()).length > 0) {
      await updateUserDetails(userForm, token);
      updated = true;
    }

    const requiredFields = ["address_line1", "zipcode", "city", "country", "state_region", "Addresstype"];
    const missingFields = requiredFields.filter(
      (field) => !addressFormData[field as keyof typeof addressFormData]
    );

    if (hasAddressData && missingFields.length === 0) {
      await createAddress(
        {
          address_line_1: addressFormData.address_line1,
          address_line_2: addressFormData.address_line2,
          state: addressFormData.state_region,
          city: addressFormData.city,
          country: addressFormData.country,
          zipcode: addressFormData.zipcode,
          address_type: addressFormData.Addresstype,
          area: addressFormData.area,
        },
        token
      );
      updated = true;
    } else if (hasAddressData) {
      setErrorMessage(`Address not added. Missing fields: ${missingFields.join(", ")}`);
    }

    if (updated) {
      setSuccessMessage("Profile updated successfully!");
    }

    // Reset fields only if update happened
    if (updated) {
      setEditMode(false);
      setShowAddressForm(false);
      setAddressFormData({
        address_line1: "",
        address_line2: "",
        zipcode: "",
        city: "",
        state: "",
        area: "",
        country: "",
        state_region: "",
        Addresstype: "",
      });
      const updatedAddresses = await fetchAddresses(token);
      setSavedAddresses(updatedAddresses);
    }
  } catch (error: any) {
    const message = error?.response?.data?.error || error?.message || "An unexpected error occurred.";
    setErrorMessage(message);
  } finally {
    setLoading(false);
    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 4000);
  }
};




  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-gray-100 w-full max-w-4xl max-h-[100vh] overflow-y-auto rounded-lg shadow-lg flex flex-row md:flex-row relative items-center justify-center">

        {/* Profile Image and Info */}
        <div className="bg-gray-100 w-full md:w-1/3 p-4 sm:p-6 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 mb-4 relative">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
            )}
            {editMode && (
              <label className="absolute bottom-0 left-20 translate-x-1/4 translate-y-1/4 bg-white shadow rounded-full p-1 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition z-50 border">
                <CiSquarePlus className="text-base" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            )}
          </div>
          <h2 className="text-lg font-semibold break-words">{formData.first_name || "Unnamed"}</h2>
          <p className="text-sm text-gray-600 break-words">{formData.email || "No email"}</p>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 text-sm bg-purple-800 text-white py-1 px-3 rounded hover:bg-purple-900 flex items-center gap-2"
            >
              <FaPen /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Form */}
        {editMode && (
          <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-4 sm:p-6 border-t md:border-l md:border-t-0 border-gray-200">
            <div >
              {successMessage && (
                <ToastMessage
                  message={successMessage}
                  type="success"
                  onClose={() => setSuccessMessage(null)}
                />
              )}

              {errorMessage && (
                <ToastMessage
                  message={errorMessage}
                  type="error"
                  onClose={() => setErrorMessage(null)}
                />
              )}

            </div>

            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-2">
              <input type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
              <input type="text" name="surname" placeholder="Last name" value={formData.surname} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full sm:col-span-2" />
              <div className="mb-4">
                  <select
                    name="gender"
                    value={formData.gender ?? ""}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        gender: e.target.value === "" ? null : e.target.value,
                      })
                    }
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (
                      <option key={g.id} value={g.id.toString()}>
                        {g.gender_name}
                      </option>
                    ))}
                  </select>

              </div>
            </div>



            {/* Saved Addresses */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Saved Addresses</h4>
              {savedAddresses.length > 0 ? (
                <div className="max-h-25 overflow-y-auto pr-1"> {/* Add scrollable container */}
                  <ul className="text-sm text-gray-800 space-y-2">
                    {savedAddresses.map((addr, index) => (
                      <li
                        key={addr.id || `address-${index}`}
                        className="border p-2 rounded shadow-sm bg-white"
                      >
                        <div className="text-sm text-red-500">
                          Type: {addr.address_type_name}
                        </div>
                        <div>
                          {addr.address_line_1}, {addr.address_line_2}
                        </div>
                        <div>
                          {addr.area}, {addr.city}, {addr.state}, {addr.country} -{" "}
                          {addr.zipcode}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-sm text-gray-600 italic">No saved addresses</div>
              )}
            </div>


            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowAddressForm((prev) => !prev)}
                className="text-sm text-purple-800 font-semibold"
              >
                {showAddressForm ? "Hide Address Form" : "+ Add New Address"}
              </button>
            </div>

            {showAddressForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                <input type="text" name="address_line1" placeholder="Address Line 1" value={addressFormData.address_line1} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <input type="text" name="address_line2" placeholder="Address Line 2" value={addressFormData.address_line2} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <input type="text" name="zipcode" placeholder="Zip Code" value={addressFormData.zipcode} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <input type="text" name="city" placeholder="City" value={addressFormData.city} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <input type="text" name="country" placeholder="Country" value={addressFormData.country} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <input type="text" name="state_region" placeholder="State" value={addressFormData.state_region} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full" />
                <select name="Addresstype" value={addressFormData.Addresstype} onChange={handleAddressChange} className="border border-gray-300 p-2 rounded w-full">
                  <option value="">Select Address Type</option>
                  {addressTypeOptions.map((type) => (
                    <option key={type.id} value={type.id}>{type.address_type}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-6">
              <button type="button" onClick={() => setEditMode(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 w-full sm:w-auto">Cancel</button>
              <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-900 w-full sm:w-auto">Save Profile</button>
            </div>
          </form>
        )}

        <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl">&times;</button>
      </div>
      
    </div>
  );
}
