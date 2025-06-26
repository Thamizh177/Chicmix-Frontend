"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StarRating from "@/app/Reusable-components/Starrating";
import StarRatingfixed from "@/app/Reusable-components/FixedStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SizeChartModal from "@/app/Reusable-components/sizechart";
import { FaTape } from "react-icons/fa6";
import { addtocart as addtocartAPI, fetchProducts ,addtowishlist as addtowishlistAPI} from "@/app/lib/api";
import { fetchAddresses, fetchAddressType,fetchpaymentmethod,fetchShippingMethods,createAddress,buynow} from "@/app/lib/api";
import Cookies from "js-cookie";
import ToastMessage from "@/app/Reusable-components/Errordisplay";

type Product = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  img: string;
  colour: string;
  size: string;
  availability: string;
  sleeve: string;
  quantity: number;
};

type CartResponse = {
  detail: string;
};

type AddressType = {
  id: number;
  address_type: string;
};

const ProductDetails = () => {
  const searchParams = useSearchParams();

  const img = searchParams.get("img") || "/placeholder.jpg";
  const alt = searchParams.get("alt") || "Product Image";
  const name = searchParams.get("name") || "Unknown Product";
  const price = searchParams.get("price") || "0";
  const oldPrice = searchParams.get("oldPrice") || "";
  const colour = searchParams.get("colour") || "Unknown";
  const availability = searchParams.get("availability") || "Out of Stock";
  const sleeve = searchParams.get("sleeve") || "None";
  const productId = Number(searchParams.get("product_id"));

  const [sizeOptions, setSizeOptions] = useState<{ id: number; label: string }[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [message,setmessage] = useState< string | null> (null);
  const [messageType, setmessageType] = useState< "success"|"error"|null>(null);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [addressForm, setAddressForm] = useState({ address_line1: "", address_line2: "", zipcode: "", city: "", state: "", area: "", country: "", state_region: "", Addresstype: "" });
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [addressTypes, setAddressTypes] = useState<{ id: number; address_type: string }[]>([]);
  const [addressSuccess, setAddressSuccess] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<{ id: number; payment_method_name: string }[]>([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number | null>(null);
  const [shippingMethods, setShippingMethods] = useState<{ shipping_method: number; shipping_method_name: string }[]>([]);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const nextStep = () => {
  if (formStep === 1 && !selectedAddressId) {
    setmessage("Please select a shipping address before continuing.");
    setmessageType("error");
    return;
  }
  setFormStep((prev) => prev + 1);
  };

  const prevStep = () => setFormStep((prev) => prev - 1);
  
  



useEffect(() => {
  const token = Cookies.get("accessToken");
  if (!token) return;

  const fetchFormData = async () => {
    try {
      const addresses = await fetchAddresses(token);
      const addrTypes = await fetchAddressType() as AddressType [];
      const payMethods = await fetchpaymentmethod(token);
      const shipMethods = await fetchShippingMethods(token);

      setSavedAddresses(addresses);
      setAddressTypes(addrTypes);
      setPaymentMethods(payMethods);
      setShippingMethods(shipMethods);
    } catch (err) {
      console.error("Buy Now form data fetch failed:", err);
    }
  };

  fetchFormData();
}, []);






  // ✅ Fetch size options from API
  useEffect(() => {
    const loadSizes = async () => {
      if (!productId || isNaN(productId)) return;

      try {
        const products = await fetchProducts({ product_id: productId });
        const product = Array.isArray(products) ? products[0] : products;

        const sizes =
          product?.size_name?.map((s: any) => ({
            id: Number(s.size),
            label: s.size_name,
          })) || [];

        setSizeOptions(sizes);
        setSelectedSizeId(sizes[0]?.id || null);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
      }
    };

    loadSizes();

  }, [productId]);

    useEffect(() => {
      if (message) {
        const timeout = setTimeout(() => {
          setmessage(null);
          setmessageType(null);
        }, 4000);
        return () => clearTimeout(timeout);
      }
    }, [message]);

  type CartResponse = {
    detail: string;
  };

  const addtocart = async () => {
    if (!selectedSizeId) {
      setmessage("Please select a size before adding to cart.");
      setmessageType("error");
      return;
    }

    if (!productId || isNaN(productId)) {
      setmessage("Invalid product ID. Please try again.");
      setmessageType("error");
      return;
    }

    try {
      const cartData = {
        product_id: productId,
        quantity,
        size_id: selectedSizeId,
      };

      const token = Cookies.get("accessToken");
      if (!token) {
        setmessage("You're not logged in. Please login and try again.");
        setmessageType("error");
        return;
      }

      const response = await addtocartAPI(cartData, token) as CartResponse;

      if (response?.detail) {
        setmessage(response.detail);
        setmessageType("success");
      }
    } catch (error: any) {
      // ✅ Handle cleanly without throwing console error
      const backendDetail = error?.detail;
      const fallback = error?.message || "Something went wrong.";
      setmessage(backendDetail || fallback);
      setmessageType("error");
    }
  };

  const addToWishlist = async () => {
  if (!productId || isNaN(productId)) {
    setmessage("Invalid product ID. Please try again.");
    setmessageType("error");
    return;
  }

  try {
    const wishlistData = {
      product_id: productId,
    };

    const token = Cookies.get("accessToken");
    if (!token) {
      setmessage("You're not logged in. Please login and try again.");
      setmessageType("error");
      return;
    }

    const response = await addtowishlistAPI(wishlistData, token);

    if (response?.detail) {
      setmessage(response.detail);
      setmessageType("success");
    }
  } catch (error: any) {
    const backendDetail = error?.detail;
    const fallback = error?.message || "Something went wrong.";
    setmessage(backendDetail || fallback);
    setmessageType("error");
  }
};


const handleAddressInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
};

const handleSaveAddress = async () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    setAddressError("Please log in again.");
    return;
  }

  const requiredFields = ["address_line1", "zipcode", "city", "country", "state_region", "Addresstype"];
  const missingFields = requiredFields.filter(field => !addressForm[field as keyof typeof addressForm]);

  if (missingFields.length > 0) {
    setAddressError("Missing fields: " + missingFields.join(", "));
    return;
  }

  try {
    await createAddress({
      address_line_1: addressForm.address_line1,
      address_line_2: addressForm.address_line2,
      state: addressForm.state_region,
      city: addressForm.city,
      country: addressForm.country,
      zipcode: addressForm.zipcode,
      address_type: addressForm.Addresstype,
      area: addressForm.area,
    }, token);

    setAddressSuccess("Address saved successfully.");
    setAddressForm({ address_line1: "", address_line2: "", zipcode: "", city: "", state: "", area: "", country: "", state_region: "", Addresstype: "" });

    const refreshed = await fetchAddresses(token);
    setSavedAddresses(refreshed);
  } catch (err: any) {
    setAddressError(err?.response?.data?.error || "Failed to save address.");
  } finally {
    setTimeout(() => {
      setAddressSuccess(null);
      setAddressError(null);
    }, 4000);
  }
};

const handleBuyNowOrder = async () => {
  const token = Cookies.get("accessToken");
  if (!token) {
    setmessage("You're not logged in. Please login and try again.");
    setmessageType("error");
    return;
  }

  if (!selectedAddressId || !selectedShippingMethodId || !selectedSizeId) {
    setmessage("Please fill all required fields (address, size, shipping).");
    setmessageType("error");
    return;
  }

  try {
    const orderPayload = {
      product_id: productId,
      size_id: selectedSizeId,
      quantity: quantity,
      address_id: selectedAddressId,
      shipping_method_id: selectedShippingMethodId,
      coupon_code: appliedCoupon || "", // optional
    };

    const res = await buynow(orderPayload, token);

    if (res?.detail || res?.message) {
      setmessage(res.detail || res.message);
      setmessageType("success");
      setIsBuyNowOpen(false); // close popup
    } else {
      setmessage("Order placed successfully.");
      setmessageType("success");
      setIsBuyNowOpen(false);
    }
  } catch (err: any) {
    const backendDetail = err?.detail || err?.message || "Failed to place order.";
    setmessage(backendDetail);
    setmessageType("error");
  }
};


  const getSelectedPaymentMethodName = () => {
  const selected = paymentMethods.find((m) => m.id === selectedPaymentMethodId);
  return selected?.payment_method_name || "";
  };

  const getSelectedShippingMethodName = () => {
  const selected = shippingMethods.find((m) => m.shipping_method === selectedShippingMethodId);
  return selected?.shipping_method_name || "";
  };




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 max-w-6xl mx-auto">
      {message && (
        <div
          className={`col-span-2 text-center mb-5 px-4 py-3 rounded-lg font-semibold ${
            messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {message}
        </div>
      )}
      {/* Left Side - Product Images */}
      <div>
        <img
          src={img}
          alt={alt}
          className="w-full sm:h-[600px] lg:h-[600px] object-contain rounded-lg mb-5"
        />
      </div>

      {/* Right Side - Product Details */}
      <div>
        <h1 className="text-3xl font-bold my-2">{name}</h1>
        <div className="flex items-center space-x-2 mt-5 mb-5">
          <StarRatingfixed totalStars={5} rating={3} />
        </div>
        <div className="mt-4">
          <p className="text-xl font-semibold">
            Rs. {price}{" "}
            {oldPrice && <span className="text-red-500 line-through ml-2">{oldPrice}</span>}
          </p>
        </div>
        <div className="mt-4 mb-5">
          <p className={`text-lg font-bold ${availability === "Out of Stock" ? "text-red-500" : "text-green-600"}`}>
            {availability}
          </p>
          <p className="text-xl font-bold my-4">
            Colour: <span className="font-bold" style={{ color: colour === 'White' ? 'black' : colour }}>{colour}</span>
          </p>
        </div>
        <div className="flex flex-cols items-center ">
          <h2 className="text-xl font-bold my-2">Size:</h2>
          <button
            className="flex flex-cols text-Black font-bold hover:text-red-500 transition ml-4"
            onClick={() => setOpenModal(true)}
          >
            <FaTape className="text-base mt-1 mr-2" /> Size Chart
          </button>
          <SizeChartModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-5 p-5">
          {sizeOptions.length > 0 ? (
            sizeOptions.map((option, index) => (
              <button
                key={`${option.id}-${index}`}
                className={`sm:w-[5%] lg:w-[60%] font-bold px-5 py-2 border rounded-lg ${
                  selectedSizeId === Number(option.id) ? "bg-purple-700 text-white" : "bg-gray-100"
                }`}
                onClick={() => setSelectedSizeId(Number(option.id))}
              >
                {option.label}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No sizes available</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block font-bold text-lg mb-4">Quantity:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(e) => setquantity(Number(e.target.value))}
            className="border px-2 py-1 w-18 rounded-lg"
            aria-label="Quantity"
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <button
            className="bg-purple-700 text-white font-bold px-6 py-2 rounded-md hover:bg-purple-500"
            onClick={addtocart}
          >
            Add to Cart
          </button>
          <button
            className="bg-purple-700 text-white font-bold px-6 py-2 rounded-md hover:bg-purple-500"
            onClick={() => {
              const token = Cookies.get("accessToken");
              if (!token) {
                setmessage("Please login before placing an order.");
                setmessageType("error");
                return;
              }
              setIsBuyNowOpen(true);
              setFormStep(1); // reset to step 1 on open
            }}
          >
            Buy Now
          </button>


          <button className="bg-purple-700 text-white font-bold px-6 py-2 rounded-md hover:bg-purple-500"
            onClick={addToWishlist}>
            Add to Wishlist
          </button>
        </div>
        <div className="mt-6 border p-4 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-5">Product Description</h2>

          <h2 className="text-black font-bold">Product Highlights</h2>
          <ul className="list-disc pl-5 mb-5">
            <li>Fabric - 240 GSM Heavy Gauge, Bio-Washed Cotton </li>
            <li>Pattern - Printed</li>
            <li>Sleeves - {sleeve}</li>
            <li>Fit - Relaxed Fit</li>
            <li>Style - Casual Wear</li>
          </ul>
          <h2 className="text-black font-bold">About Product</h2>
          <ul className="list-disc pl-5 mb-5">
            <li>Heavy Gauge 100% Bio-washed Cotton – makes the fabric extra soft & silky</li>
            <li>Precisely stitched with no pilling & no fading</li>
            <li>Screen Print - for long-lasting print quality</li>
            <li>Cool Graphic - that looks trendy & matches your vibe</li>
          </ul>
          <h2 className="text-black font-bold">Wash Care</h2>
          <ul className="list-disc pl-5">
            <li>Gentle machine wash</li>
            <li>Don't use bleach</li>
            <li>Don't iron directly on the print</li>
          </ul>
        </div>
      </div>

      {isBuyNowOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center max-h-[90vh] overflow-y-auto relative">
            {formStep === 1 && (
              <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
            )}
            {formStep === 2 && (
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            )}

            {/* Form */}
            <form>
                    {/* {message && (
                      <div
                        className={`col-span-2 text-center mb-5 px-4 py-3 rounded-lg font-semibold ${
                          messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                        {message}
                      </div>
                    )} */}
              {formStep === 1 && (
                <>
                            {/* Scrollable Address List */}
                            <div className="max-h-50 overflow-y-auto pr-1 mb-4">
                              {savedAddresses.map((addr, index) => (
                                <div
                                  key={`addr-${addr.address_id}`}
                                  className={`flex items-start space-x-2 mb-3 cursor-pointer p-2 border rounded-lg ${
                                    selectedAddressId === addr.address_id
                                      ? 'border-purple-600 bg-purple-50'
                                      : 'border-gray-300'
                                  }`}
                                  onClick={() => setSelectedAddressId(addr.address_id)}
                                >
                                  <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={addr.address_id}
                                    checked={selectedAddressId === addr.address_id}
                                    onChange={() => setSelectedAddressId(addr.address_id)}
                                    className="mt-1 accent-purple-600"
                                  />
                                  <div className="text-left text-sm">
                                    <div className="text-red-700 font-medium text-xs">
                                      Type: {addr.address_type_name}
                                    </div>
                                    <div>
                                      {addr.address_line_1}
                                      {addr.address_line_2 && `, ${addr.address_line_2}`}
                                    </div>
                                    <div>
                                      {addr.city}, {addr.state}, {addr.country} - {addr.zipcode}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                  <div className="mb-4 ">
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm((prev) => !prev)}
                      className="text-sm text-purple-800 font-bold"
                    >
                      {showNewAddressForm ? " - Hide Address Form" : "+ Add New Address"}
                    </button>
                  </div>

                  {showNewAddressForm && (
                    <div className="mt-6 pt-4">
                      {addressSuccess && <div className="text-green-600 text-sm mb-2">✅ {addressSuccess}</div>}
                      {addressError && <div className="text-red-600 text-sm mb-2">❌ {addressError}</div>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" name="address_line1" placeholder="Address Line 1" value={addressForm.address_line1} onChange={handleAddressInput} className="border p-2 rounded" />
                        <input type="text" name="address_line2" placeholder="Address Line 2" value={addressForm.address_line2} onChange={handleAddressInput} className="border p-2 rounded" />
                        <input type="text" name="zipcode" placeholder="Zip Code" value={addressForm.zipcode} onChange={handleAddressInput} className="border p-2 rounded" />
                        <input type="text" name="city" placeholder="City" value={addressForm.city} onChange={handleAddressInput} className="border p-2 rounded" />
                        <input type="text" name="country" placeholder="Country" value={addressForm.country} onChange={handleAddressInput} className="border p-2 rounded" />
                        <input type="text" name="state_region" placeholder="State" value={addressForm.state_region} onChange={handleAddressInput} className="border p-2 rounded" />
                        <select name="Addresstype" value={addressForm.Addresstype} onChange={handleAddressInput} className="border p-2 rounded">
                          <option value="">Select Address Type</option>
                          {addressTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.address_type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button type="button" onClick={handleSaveAddress} className="bg-purple-800 text-white py-2 px-4 rounded mt-4 hover:bg-purple-900">
                        Save Address
                      </button>
                    </div>
                  )}
                </>
              )}

              {formStep === 2 && (
                <>
                  <div className="mb-4 space-y-3 max-h-[200px] overflow-y-auto pr-1">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <img src={img} alt={name} className="w-12 h-12 rounded object-cover" />
                        <div className="text-left text-sm">
                          <div className="font-semibold">{name}</div>
                          <div className="text-gray-500 text-xs">Size: {selectedSizeId} | Qty: {quantity}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">₹{Number(price) * quantity}</div>
                    </div>
                  </div>

                  <div className="text-sm space-y-1 mb-4">

                    <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>₹{Number(price) * quantity}</span>
                    </div>

                            {discountAmount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>- ₹{discountAmount}</span>
                              </div>
                            )}

                            {appliedCoupon && (
                              <div className="flex justify-between text-blue-500">
                                <span>Coupon</span>
                                <span>{appliedCoupon}</span>
                              </div>
                            )}


                      {getSelectedShippingMethodName() === "Express shipping" && (
                              <div className="flex justify-between text-red-600">
                                <span>Express Shipping Fee</span>
                                <span>+ ₹50</span>
                              </div>
                      )}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>₹{Number(price) * quantity + (getSelectedShippingMethodName() === "Express shipping" ? 50 : 0)}</span>
                    </div>
                  </div>



                  

                  <div className="mb-4">
                    <label className="block text-left mb-1 font-medium">Shipping Method</label>
                    <select
                      onChange={(e) => setSelectedShippingMethodId(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      value={selectedShippingMethodId || ""}
                    >
                      <option value="">Select Shipping</option>
                      {shippingMethods.map((method) => (
                        <option key={method.shipping_method} value={method.shipping_method}>
                          {method.shipping_method_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-left mb-1 font-medium">Payment Method</label>
                    <select
                      onChange={(e) => setSelectedPaymentMethodId(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      value={selectedPaymentMethodId || ""}
                    >
                      <option value="">Select Payment</option>
                      {paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.payment_method_name}
                        </option>
                      ))}
                    </select>
                  </div>

                            {selectedPaymentMethodId && (
                              <button
                                type="button"
                                onClick={handleBuyNowOrder}
                                className={`w-full py-2 px-4 rounded font-semibold ${
                                  getSelectedPaymentMethodName() === "Online payment"
                                    ? "bg-purple-500 hover:bg-purple-800"
                                    : "bg-purple-500 hover:bg-purple-800"
                                } text-white transition`}
                              >
                                {getSelectedPaymentMethodName() === "Online payment"
                                  ? `Pay : ₹${Number(price) * quantity  - discountAmount+(getSelectedShippingMethodName() === "Express shipping" ? 50 : 0)}`
                                  : "Place Order"}
                              </button>
                            )}
                </>
              )}
            </form>

            {/* Next/Back Step Buttons */}
                        {formStep === 1 && (
                          <button
                            onClick={nextStep}
                            className="w-[200px] mt-6 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition"
                          >
                            Next
                          </button>
                        )}
                        {formStep === 2 && (
                        <button
                          onClick={prevStep}
                          className="w-[200px] mt-6 px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          Go back
                        </button>
                        )}

            {/* Close Button */}
            <button
              onClick={() => setIsBuyNowOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
          </div>
                        {message && messageType && (
                  <ToastMessage
                    message={message}
                    type={messageType === "success" ? "success" : "error"}
                    onClose={() => {
                      setmessage(null);
                      setmessageType(null);
                    }}
                  />
                )}
        </div>
        
      )}

    </div>
  );
};

export default ProductDetails;
