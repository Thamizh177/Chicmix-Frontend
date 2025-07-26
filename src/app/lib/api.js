import axios from 'axios';

// ✅ General base URL
const BASE_URL = 'http://192.168.0.153:8000/api/';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true

});
export default api;

// // Attach access token to all requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// === Auto-refresh token logic ===
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(({ resolve, reject }) => {
//     if (error) reject(error);
//     else resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         });
//       }

//       isRefreshing = true;
//       const refreshToken = localStorage.getItem('refresh_token');

//       if (!refreshToken) return Promise.reject(error);

//       try {
//         const response = await axios.post(`${BASE_URL}refresh/token/`, {
//           refresh: refreshToken,
//         });

//         const newAccess = response.data.access;
//         localStorage.setItem('access_token', newAccess);
//         api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
//         originalRequest.headers.Authorization = `Bearer ${newAccess}`;
//         processQueue(null, newAccess);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export const fetchSubcategories = async (filters = {}) => {
  try {
    const response = await api.get('sub-catagories/', {
      params: filters,  // Filters like { name: 'shirt', catagory: 2 }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

// ➕ Create a new subcategory
export const createSubcategory = async (subcategoryData) => {
  try {
    const response = await api.post('sub-catagories/', subcategoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating subcategory:', error);
    throw error;
  }
};

export const fetchPopularCategories = async () => {
  try {
    const response = await api.get('popular-categories/');
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Error fetching popular categories:", error);
    return [];
  }
};


export const createPopularCategories = async (data) => {
  try {
    const response = await api.post('popular-categories/', data);
    return response.data;
  } catch (error) {
    console.error("Error creating popular categories:", error.response?.data || error.message);
    throw error;
  }
};



/**
 * Fetch products from public endpoint with optional filters.
 * 
 * @param {Object} filters - Optional query params (e.g., { sub_catagory: 2, min_price: 500 })
 * @returns {Promise<Object>} - Response data from API
 * @returns {Promise<T>}
 */
export const fetchProducts = async (filters = {}) => {
  try {
    const response = await api.get('public/products/', {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching public products:', error);
    throw error;
  }
};

/**
 * Create a new product.
 *
 * @param {Object} productData - The product details to send (e.g., { sub_catagory: 2, price: 500, ... })
 * @returns {Promise<Object>} - Response data from API
 */
export const createProduct = async (productData) => {
  try {
    const response = await api.post('products/', productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};


/**
 * Fetch product images from the API with optional filters.
 *
 * @param {Object} filters - Optional query params (e.g., { product: 1, product_name: "shirt" })
 * @returns {Promise<Object>} - API response data
 */
export const fetchProductImages = async (filters = {}) => {
  try {
    const response = await api.get('public-product-images/', {
      params: filters,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};

/**
 * Create a new product image.
 *
 * @param {Object} imageData - The image data to send (e.g., { product: 1, product_image_url: "https://..." })
 * @returns {Promise<Object>} - Response data from API
 */
export const createProductImage = async (imageData) => {
  try {
    const response = await api.post('product-images/', imageData);
    return response.data;
  } catch (error) {
    console.error('Error creating product image:', error);
    throw error;
  }
};

export const fetchSizes = async () => {
  try {
    const response = await api.get('public/sizes/');

    // Extract only the size_name from each object
    const sizeNames = response.data.map((item) => item.size_name);
    console.log(response)
    return response?.data ?? [];
  } catch (error) {
    console.error('Error fetching sizes:', error);
    throw error;
  }
};

export const fetchColours = async () => {
  try {
    const response = await api.get('public/colours/');

    // Extract only the colour name from each object
    const colourNames = response.data.map((item) => item.name);

    return response?.data ?? [];
  } catch (error) {
    console.error('Error fetching colours:', error);
    throw error;
  }
};


export const fetchSizeCharts = async () => {
  try {
    const response = await api.get('public/size-charts/');

    // Extract and map relevant fields from nested serializer
    const charts = response.data.map((item) => ({
      id: item.id,
      size: item.size?.size_name || null,
      size_id: item.size?.id || null,
      chest: item.chest,
      shoulder: item.shoulder,
      sleeve: item.sleeve
    }));

    return charts;
  } catch (error) {
    console.error('Error fetching size charts:', error);
    throw error;
  }
};


export const requestOTP = async (mobileNumber, countryCode = "+91") => {
  try {
    const response = await api.post("auth/request-otp/", {
      mobile_number: mobileNumber,
      country_code: countryCode,
    });

    return response?.data || {};
  } catch (error) {
    //  Return the raw backend error directly
    if (error?.response?.data) {
      throw error.response.data;
    }

    //  Fallback for unknown errors (e.g., network/server crash)
    throw { detail: "Something went wrong. Please try again later." };
  }
};




export const verifyOTP = async (mobileNumber, otp) => {
  try {
    const response = await api.post('auth/verify-otp/', {
      mobile_number: mobileNumber,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to verify OTP" };
  }
};

export const logoutUser = async (refreshToken, accessToken) => {
  try {
    const response = await api.post(
      "logout/",
      { refresh: refreshToken },
      {
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to logout" };
  }
};


/**
 * Fetch gender form the gender table.
 * 
 * @returns {Promise<Object>} - Response data from API
 */
export const fetchGender = async () => {
  try {
    const response = await api.get("/public/gender/");
    return response.data;
  } catch (error) {
    console.error("Error fetching gender:", error);
    throw error;
  }
};


/**
 * Fetch Address type.
 * 
 * @returns {Promise<Object>} - Response data from API
 */
export const fetchAddressType = async () => {
  try {
    const response = await api.get("/public/addresstypes/");
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Error fetching Address type:", error);
    throw error;
  }
};


/**
 * Fetch addresses for the logged-in user.
 * 
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object[]>} - List of addresses
 */
export const fetchAddresses = async (token) => {
  try {
    const response = await api.get("addresses/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

/**
 * Create a new address.
 * 
 * @param {Object} addressData - Address fields like { address_line_1, city, state, zipcode, ... }
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - The created address data
 */
export const createAddress = async (addressData, token) => {
  try {
    const response = await api.post("addresses/", addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating address:", error);
    throw error;
  }
};

export const updateUserDetails = async (userData, token) => {
  try {
    const isFormData = userData instanceof FormData;

    const headers = {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    };

    const response = await api.patch("/user/update/", userData, { headers });

    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error.response?.data || error);
    throw error;
  }
};


export const uploadProfileImage = async (file, token) => {
  const formData = new FormData();
  formData.append("image", file); // 🔑 key must match backend `request.FILES.get("image")`

  try {
    const response = await api.post("/upload-profile-image/", formData, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ correct
        // ⚠️ DO NOT manually set Content-Type — let Axios do it
      },
    });

    return response.data.url; // ✅ returns Cloudinary secure_url
  } catch (error) {
    console.error("Image upload failed:", error.response?.data || error.message);
    return null;
  }
};


/**
 * Fetch the profile of the logged-in user.
 * 
 * @param {string} token - JWT access token for authentication
 * @returns {Promise<Object[]>} - List containing the user's profile
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await api.get("/user/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};


/**
 * Create a new cart.
 * 
 * @param {Object} cartdata - cart fields like { product_id,quantity,size, ... }
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - The created address data
 */

export const addtocart = async (cartdata, token) => {
  try {
    const response = await api.post("cart/add/", cartdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error.response?.data || error;

  }
};

/**
 * Remove from the cart.
 * 
 * @param {Object} producttoremove - remove fields like { cart_item_id, ... }
 * @param {string} token - JWT token for authentication
 * @returns {Promise<Object>} - returns an success meassage once product removed
 */

export const removeproductfromcart = async (producttoremove, token) => {
  try {
    const response = await api.post("cart/remove/", producttoremove, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing the product from the cart:", error);
    throw error.response?.data || error;
  }
}


export const fetchcart = async (cartitems = {}, token) => {
  try {
    console.log("Fetching cart items with:", cartitems, token);
    const response = await api.get("cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: cartitems, // Optional query params (you can remove this if not used)
    });
    console.log("Cart items fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error showing the cart items:", error);
    throw error.response?.data || error;
  }
};


export const addtowishlist = async (wishlistdata, token) => {
  try {
    const response = await api.post("wishlist/add/", wishlistdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to the wishlist:", error);
    throw error.response?.data || error;
  }
};


export const fetchwishlistdata = async (wishlistitems = {}, token) => {
  try {
    const response = await api.get("wishlist/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: wishlistitems, // Optional query params (you can remove this if not used)
    });
    console.log("Wishlist API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error.response?.data || error;
  }
}


export const removeproductsfromwishlist = async (product, token) => {
  try {
    const response = await api.delete("wishlist/remove/", {
      data: product,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log("Product removed from wishlist successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting the product from wishlist:", error);
    throw error.response?.data || error;
  }
}

export const placeOrder = async (orderData, token) => {
  try {
    const response = await api.post("placeorder/", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Place order failed:", error.response?.data || error.message);
    throw error.response?.data || { error: "Unknown error occurred." };
  }
};

export const fetchpaymentmethod = async (token) => {
  try {
    const response = await api.get("payment-methods/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error.response?.data || { error: "Failed to fetch payment methods" };
  }
};

export const fetchShippingMethods = async (token) => {
  try {
    const response = await api.get("shipping-methods/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    throw error.response?.data || { error: "Failed to fetch shipping methods" };
  }
};


export const buynow = async (buyNowData, token) => {
  try {
    const response = await api.post("buy-now/", buyNowData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Buy now failed:", error.response?.data || error.message);
    throw error.response?.data || { error: "Unknown error occurred." };
  }
}
