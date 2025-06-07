function ShippingForm({ formData, handleChange, getInputClass }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className={getInputClass(formData.firstName)}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className={getInputClass(formData.lastName)}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={`${getInputClass(formData.email)} col-span-2`}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className={`${getInputClass(formData.address)} col-span-2`}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className={getInputClass(formData.city)}
        required
      />
      <input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={handleChange}
        className={getInputClass(formData.postalCode)}
        required
      />
    </div>
  );
}

export default ShippingForm;
