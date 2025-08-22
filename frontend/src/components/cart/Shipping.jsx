import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from "countries-list";
import { saveShippingInfo } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill the shipping information", {
    });
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const countryList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps shipping />

      <div className="flex justify-center mt-8 px-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Shipping Info
            </h1>

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label
                htmlFor="city_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            {/* Postal Code */}
            <div className="mb-4">
              <label
                htmlFor="postal_code_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            {/* Country */}
            <div className="mb-4">
              <label
                htmlFor="country_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryList.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div className="mb-6">
              <label
                htmlFor="state_field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                id="state_field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              id="shipping_btn"
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
