import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NewProduct.css";
import {
  updateProduct,
  clearError,
  getProductDetails,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productContants";
import { useNavigate, useParams } from "react-router-dom";
// import { render } from 'react-dom'

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteProduct);

  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [description, setdescription] = useState("");
  const [Category, setCategory] = useState("");
  const [stock, setstock] = useState(0);
  const [images, setimages] = useState([]);
  const [imagePreview, setimagePreview] = useState([]);
  const [oldImages, setoldImages] = useState([]);

  const productId = id;
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "rocket",
    "Camera",
    "SmartPhones",
  ];

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", Category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("Images", image);
    });

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setimages([]);
    setimagePreview([]);
    setoldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log("image..",reader)
          setimagePreview((old) => [...old, reader.result]);
          setimages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setname(product.name);
      setCategory(product.category);
      setdescription(product.description);
      setoldImages(product.Images);
      setprice(product.price);
      setstock(product.stock);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    error,
    alert,
    isUpdated,
    productId,
    product,
    updateError,
    navigate,
  ]);

  return (
    <Fragment>
      <MetaData title={`Update Product`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="newProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>UPDATE PRODUCT</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />

              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setprice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <input
                type="text"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""> Choose Category</option>
                {categories &&
                  categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setstock(e.target.value)}
              />
            </div>
            <div className="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={updateProductImagesChange}
              />
            </div>
            {/* {console.log("okey..")} */}
            <div className="createProductFormImage">
              {oldImages && oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="old product image" width="50px" />
              ))}
            </div>

            <div className="createProductFormImage">
              {imagePreview.map((image, index) => (
                <img key={index} src={image} alt="product image" width="50px" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
          {console.log("okey..")}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
