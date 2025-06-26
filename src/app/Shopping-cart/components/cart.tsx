"use client";

import React, { useEffect, useState } from "react";
import { FaTruck } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { FaRegStickyNote } from 'react-icons/fa';
import Link from "next/link";
import { fetchcart, fetchProducts, fetchProductImages,removeproductfromcart,fetchAddresses,createAddress,fetchAddressType,fetchpaymentmethod,fetchShippingMethods,placeOrder} from "@/app/lib/api";
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
type CartItemFromAPI = {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  size: number;
  size_name: string;
  cart_items_price: string;
  added_at: string;
};

type CartResponse = {
  id: number;
  user: number;
  cart_total_price: string;
  items: CartItemFromAPI[];
};

type ProductDetails = {
  id: number;
  product_name: string;
  price: string;
  old_price?: string;
  colour?: string;
  sleeve?: string;
  availability?: string;
  colour_name?: { colour_name: string }[];
  stock_status?: string;
};

type ProductImage = {
  product_image: number;
  product: number;
  product_image_url: string;
  product_name: string;
};
type CartDisplayItem = {
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

type AddressType = {
  id: number;
  address_type: string;
};




const CartPage = () => {

    const [addressForm, setAddressForm] = useState({
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
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
    const [addressSuccess, setAddressSuccess] = useState<string | null>(null);
    const [addressError, setAddressError] = useState<string | null>(null);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [addressTypes, setAddressTypes] = useState<{ id: number; address_type: string }[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [shippingMethod, setShippingMethod] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [paymentMethods, setPaymentMethods] = useState<{ id: number; payment_method_name: string }[]>([]);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number | null>(null);
    const [shippingMethods, setShippingMethods] = useState<{ shipping_method: number; shipping_method_name: string }[]>([]);
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<number | null>(null);








  const [message,setmessage] = useState< string | null> (null);
  const [meassageType, setmeassageTYpe] = useState< "sucess"|"error"|null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);


  const handleremove = async (id: string) => {
    const token = Cookies.get("accessToken");
    
    if (!token) {
      setmessage("Please login to remove items from the cart.");
      setmeassageTYpe("error");
      return;
    }

    try {
      // Call backend remove API
      const response = await removeproductfromcart({ cart_item_id: Number(id) }, token) as { message: string };
      
      // Update UI only after successful removal
      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);

      setmessage(response?.message || "Item removed from cart.");
      setmeassageTYpe("sucess");
    } catch (error: any) {
      console.error("Remove Error:", error);
      setmessage(error?.message || "Failed to remove item.");
      setmeassageTYpe("error");
    }
  };


  const [cartItems, setCartItems] = useState<Product[]>([]);
  const totalprice = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);


  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = Cookies.get("accessToken");
        console.log("🪙 Token from cookie:", token); 
        if (!token) return;

        const cartData = (await fetchcart({}, token)) as CartResponse;

        const loadInitialData = async () => {
          try {
            const addresses = await fetchAddresses(token);
            setSavedAddresses(addresses);
            console.log("Saved Addresses:", addresses);
            const addrTypes = await fetchAddressType() as AddressType[];
            setAddressTypes(addrTypes);
            console.log("Address Types:", addrTypes);
            const paymentMethodsData = await fetchpaymentmethod(token);
            setPaymentMethods(paymentMethodsData);
            const shippingMethodsData = await fetchShippingMethods(token);
            setShippingMethods(shippingMethodsData);

          } catch (err) {
            console.error("Failed to fetch addresses", err);
          }
        };
        loadInitialData();

        const enrichedCartItems: CartDisplayItem[] = await Promise.all(
          cartData.items.map(async (item) => {
            const productId = item.product;

            const productData = (await fetchProducts({ product: productId })) as ProductDetails[];

            const imageData = (await fetchProductImages({ product: productId })) as ProductImage[];
            const productImage = Array.isArray(imageData) ? imageData[0] : undefined;

            const productDetails = Array.isArray(productData) ? productData[0] : undefined;


            const colourData = productDetails?.colour_name?.[0]?.colour_name ?? "N/A";
            // console.log("colourData:", colourData);
            // console.log("imageData:", imageData);
            console.log("product image:",productImage);
            console.log("product details", productDetails);
            console.log("product data:", productData);
            return {
              id: item.id.toString(),
              name: item.product_name,
              price: productDetails?.price || item.cart_items_price,
              oldPrice: productDetails?.old_price || "",
              img: productImage?.product_image_url || "Product Image Not Available",
              colour: colourData,
              size: item.size_name,
              availability: productDetails?.stock_status || "In Stock",
              sleeve: productDetails?.sleeve || "Half Sleeve",
              quantity: item.quantity,
            };
          })
        );


        setCartItems(enrichedCartItems);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    loadCart();
  }, []);

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
    setAddressForm({
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

    const handlePlaceOrder = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setmessage("Please log in to place the order.");
        setmeassageTYpe("error");
        return;
      }

      if (!selectedAddressId || !selectedShippingMethodId || !selectedPaymentMethodId) {
        setmessage("Please complete all required fields.");
        setmeassageTYpe("error");
        return;
      }

      const orderData = {
        address_id: selectedAddressId,
        shipping_method_id: selectedShippingMethodId,
        payment_method_id: selectedPaymentMethodId,
        // Optional: Only include coupon if it's applied
        ...(appliedCoupon ? { coupon: appliedCoupon } : {})
      };

      console.log("📦 Sending orderData:", orderData);

      try {
        const response = await placeOrder(orderData, token);
        console.log("✅ Order placed successfully:", response);

        setmessage("✅ Order placed successfully!");
        setmeassageTYpe("sucess");

        // Optional: redirect or clear UI
        closePopup();
      } catch (error: any) {
        const errorMsg = error?.error || "❌ Failed to place order.";
        console.error("Order Error:", errorMsg);
        setmessage(errorMsg);
        setmeassageTYpe("error");
      }
    };




  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const [formStep, setFormStep] = useState(1);
  const nextStep = () => {
  if (formStep === 1 && !selectedAddressId) {
    setmessage("Please select a shipping address before continuing.");
    setmeassageTYpe("error");
    return;
  }
  setFormStep((prev) => prev + 1);
};

  const prevStep = () => setFormStep((prev) => prev - 1);

  const getSelectedPaymentMethodName = () => {
  const selected = paymentMethods.find((m) => m.id === selectedPaymentMethodId);
  return selected?.payment_method_name || "";
  };

  const getSelectedShippingMethodName = () => {
  const selected = shippingMethods.find((m) => m.shipping_method === selectedShippingMethodId);
  return selected?.shipping_method_name || "";
  };


  return (
    <div className="max-w-full mx-auto p-6">
      <div className="grid grid-cols-5 gap-10 mb-5 border-b p-5 text-xl">
        <div className="flex flex-col items-center justify-center font-bold w-1/2">
          <h2>Product</h2>
        </div>
        <div className="flex flex-col items-center justify-center font-bold w-full ">
          <h2>Product Detail</h2>
        </div>
        <div className="flex flex-col items-center justify-center font-bold w-1/2">
          <h2>Price</h2>
        </div>
        <div className="flex flex-col items-center justify-center font-bold w-1/2">
          <h2>Total Price</h2>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center font-bold mt-15">
          <p className="text-2xl font-bold text-gray-500">Your cart is currently empty</p>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-5 gap-10 border-b pb-4">
              <div className="flex flex-col items-center justify-center w-3/4 h-3/4 ml-5 mt-5">
                <img
                  src={item.img}
                  alt={item.name}
                  className="sm:w-32 h-32 object-cover rounded-lg lg:w-full h-full object-contain rounded-lg"
                />
              </div>

              <div className="flex flex-col items-start justify-center mr-10 w-full">
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p className="text-l text-black">Size: {item.size}</p>
                <p className="text-l text-black"> Colour: {item.colour} </p>
                <p className="text-l text-black">Quanity: {item.quantity}</p>
              </div>

              <div className="flex flex-col items-center justify-center w-1/2 ml-3 text-xl">
                <p>Rs. {item.price}</p>
              </div>

              {/* <div className="flex flex-col items-center justify-center w-1/2 text-xl">
                <p>{item.quantity}</p>
              </div> */}

              <div className="flex flex-col items-center justify-center w-1/2 font-bold text-xl">
                <p>RS. {Number(item.price) * item.quantity}</p>
              </div>

              <div className="flex flex-col items-center justify-center w-full">
                <button
                  onClick={() => handleremove(item.id)}
                  className="text-white font-bold mt-2  px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded full"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-end mt-20 mr-10">
            <div className="grid grid-cols-3 gap-1">
              <div className="relative group inline-block">
                <button className="border font-bold px-11 py-3 rounded-lg bg-gray-600 text-black hover:bg-black text-white">
                  <FaRegStickyNote className="mb-1 ml-3" />Note
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black font-bold text-white text-sm px-5 py-3 rounded-md whitespace-nowrap">
                    Add note for seller
                  </div>
                  <div className="w-3 h-3 bg-black transform rotate-45 -mt-1.5"></div>
                </div>
              </div>

              <div className="relative group inline-block">
                <button className="border font-bold text-black px-9 py-3 rounded-lg bg-gray-600 hover:bg-black text-white">
                  <MdLocalOffer className="mb-1 ml-5" />Coupon
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black font-bold text-white text-sm px-5 py-3 rounded-md whitespace-nowrap">
                    Add a coupon
                  </div>
                  <div className="w-3 h-3 bg-black transform rotate-45 -mt-1.5"></div>
                </div>
              </div>

              <div className="relative group inline-block">
                <button className="border foRS. 2997nt-bold text-black px-9 py-3 rounded-lg bg-gray-600 hover:bg-black text-white">
                  <FaTruck className="mb-1 ml-5" /> Shipping
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center z-10">
                  <div className="bg-black font-bold text-white text-sm px-5 py-3 rounded-md whitespace-nowrap">
                    Estimate shipping rates
                  </div>
                  <div className="w-3 h-3 bg-black transform rotate-45 -mt-1.5"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-50 mt-5 border-1 px-10 py-5 shadow-lg rounded-lg">
              <h1 className="font-bold text-l">Sub Total</h1>
              <h1 className="font-bold text-l">RS. {totalprice}</h1>
            </div>

            <div>
              <button
                className="text-white font-bold mt-5 ml-15 px-43 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg"
                onClick={openPopup}
              >
                Check out
              </button>

               {/* Popup with Multi-Step Form */}
              {isOpen && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center max-h-[90vh] overflow-y-auto relative">

                  {formStep === 1 && (
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                  )}

                  { formStep === 2 && (
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Order summary </h2>
                  )} 

                    <form>



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
                            <div className=" mt-6 pt-4"> 
                              

                              {addressSuccess && <div className="text-green-600 text-sm mb-2">✅ {addressSuccess}</div>}
                              {addressError && <div className="text-red-600 text-sm mb-2">❌ {addressError}</div>}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  name="address_line1"
                                  placeholder="Address Line 1"
                                  value={addressForm.address_line1}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                <input
                                  type="text"
                                  name="address_line2"
                                  placeholder="Address Line 2"
                                  value={addressForm.address_line2}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                <input
                                  type="text"
                                  name="zipcode"
                                  placeholder="Zip Code"
                                  value={addressForm.zipcode}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                <input
                                  type="text"
                                  name="city"
                                  placeholder="City"
                                  value={addressForm.city}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                <input
                                  type="text"
                                  name="country"
                                  placeholder="Country"
                                  value={addressForm.country}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                <input
                                  type="text"
                                  name="state_region"
                                  placeholder="State"
                                  value={addressForm.state_region}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                />
                                {/* <input
                                  type="text"
                                  name="area"
                                  placeholder="Area"
                                  value={addressForm.area}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded"
                                /> */}
                                <select
                                  name="Addresstype"
                                  value={addressForm.Addresstype}
                                  onChange={handleAddressInput}
                                  className="border p-2 rounded">
                                  <option value="">Select Address Type</option>
                                  {addressTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                      {type.address_type}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <button
                                type="button"
                                onClick={handleSaveAddress}
                                className="bg-purple-800 text-white py-2 px-4 rounded mt-4 hover:bg-purple-900"
                              >
                                Save Address
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {formStep === 2 && (
                        <>

                          {/* Cart Items List */}
                          <div className="mb-4 space-y-3 max-h-[200px] overflow-y-auto pr-1">
                            {cartItems.map((item, index) => (
                              <div key={index} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center space-x-3">
                                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                  <div className="text-left text-sm">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-gray-500 text-xs">
                                      Size: {item.size} | Qty: {item.quantity}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">₹{Number(item.price) * item.quantity}</div>
                              </div>
                            ))}
                          </div>

                          {/* Price Summary */}
                          <div className="text-sm space-y-1 mb-4 ">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>₹{totalprice}</span>
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
                              <span>
                                ₹
                                {totalprice -
                                  discountAmount +
                                  (getSelectedShippingMethodName() === "Express shipping" ? 50 : 0)}
                              </span>
                            </div>
                          </div>


                          {/* Shipping Method */}
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


                          {/* Payment Method */}
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
                                onClick={handlePlaceOrder}
                                className={`w-full py-2 px-4 rounded font-semibold ${
                                  getSelectedPaymentMethodName() === "Online payment"
                                    ? "bg-purple-500 hover:bg-purple-800"
                                    : "bg-purple-500 hover:bg-purple-800"
                                } text-white transition`}
                              >
                                {getSelectedPaymentMethodName() === "Online payment"
                                  ? `Pay : ₹${totalprice - discountAmount+(getSelectedShippingMethodName() === "Express shipping" ? 50 : 0)}`
                                  : "Place Order"}
                              </button>
                            )}

                        </>
                      )}



                    </form>
                      
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
                      

                    <button
                      onClick={closePopup}
                      className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
                    >
                      &times;
                    </button>

                  </div>
                </div>
              )}

              {message && meassageType && (
                  <ToastMessage
                    message={message}
                    type={meassageType === "sucess" ? "success" : "error"}
                    onClose={() => {
                      setmessage(null);
                      setmeassageTYpe(null);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      )}

      
    </div>
    
  );
};

export default CartPage;
