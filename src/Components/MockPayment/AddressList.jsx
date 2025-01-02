import React, { useState, useEffect } from "react";
import services from "../../Appwrite/Service";
import addressService from "../../Appwrite/AddressService";
import { Button } from "../Index";

const AddressList = ({ onAddressSelect, hideActions }) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ name: "", address: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await services.getCurrentUser();
        const userAddresses = await addressService.getUserAddresses(user.$id);
        setAddresses(userAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      await addressService.deleteAddress(addressId);
      setAddresses((prev) => prev.filter((addr) => addr.$id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setNewAddress({ name: address.name, address: address.address });
    setShowForm(true);
  };

  const handleSaveAddress = async () => {
    if (!newAddress.name || !newAddress.address) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const user = await services.getCurrentUser();

      if (editingAddress) {
        await addressService.updateAddress(editingAddress.$id, newAddress);
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.$id === editingAddress.$id ? { ...addr, ...newAddress } : addr
          )
        );
      } else {
        const savedAddress = await addressService.saveAddress(
          user.$id,
          newAddress.name,
          newAddress.address
        );
        setAddresses((prev) => [...prev, savedAddress]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again!");
    }
  };

  const resetForm = () => {
    setNewAddress({ name: "", address: "" });
    setEditingAddress(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[500px] m-auto p-4 mt-5 border-[1px] border-slate-400  bg-white rounded-lg">
      {addresses.length > 0 ? (
        addresses.map((addr) => (
          <div
            key={addr.$id}
            className="p-4 mb-2 border rounded-md"
            onClick={() => onAddressSelect && onAddressSelect(addr)}
          >
            <div className="font-semibold">{addr.name}</div>
            <div>{addr.address}</div>
            {!hideActions && (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="text-blue-500 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(addr);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(addr.$id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No saved addresses found. Please add one!</div>
      )}

      {showForm && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold mb-2">
            {editingAddress ? "Edit" : "Add"} Address
          </h3>
          <input
            type="text"
            className="border mb-2 p-2 w-full"
            placeholder="Name"
            value={newAddress.name}
            onChange={(e) =>
              setNewAddress((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <textarea
            className="border p-2 w-full"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <div className="flex justify-end gap-2">
            <Button onClick={resetForm} className="bg-gray-500">
              Cancel
            </Button>
            <Button onClick={handleSaveAddress} className="bg-blue-500">
              Save
            </Button>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="text-center mt-4">
          <Button
            onClick={() => setShowForm(true)}
            className="w-full bg-orange-500"
          >
            + Add New Address +
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddressList;
