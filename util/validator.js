import mongoose from "mongoose";
const IsvalidEmail = (value) => {
  return /^([a-z0-9\._]+){3,}@([a-zA-Z0-9])+.([a-z]){2,6}(.[a-z]+)?$/.test(
    value
  );
};

const isvalidMobileNumber = (value) => {
  return /^[6-9]\d{9}$/.test(value);
};

const isvalidObjectId = (value) => {
  if (mongoose.Types.ObjectId.isValid) return true;
  return false;
};

export { IsvalidEmail, isvalidMobileNumber, isvalidObjectId };
