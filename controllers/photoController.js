const axios = require("axios");
const dotenv = require("dotenv").config();
const BASE_URL = process.env.BASE_URL;
const ACCESS_KEY = process.env.ACCESS_KEY;

const authorizationHeader = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};

const getRawPhotos = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/photos/`, {
      headers: authorizationHeader,
    });
    const photos = response.data;
    const rawPhotoURLs = photos.map(({ urls }) => urls.raw);
    return res.status(200).json(rawPhotoURLs);
  } catch (err) {
    return res
      .status(err.response.status)
      .json({ message: err.response.data?.errors[0] });
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/photos/${id}`, {
      headers: authorizationHeader,
    });
    const photo = response.data;
    return res.status(200).json(photo);
  } catch (err) {
    return res
      .status(err.response.status)
      .json({ message: err.response.data?.errors[0] });
  }
};

module.exports = {
  getRawPhotos,
  getPhotoById,
};
