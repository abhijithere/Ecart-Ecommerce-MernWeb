import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader";
const NewProduct = () => {
    const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error,navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
        {
            loading?<Loader/>:(
                <div className="dashboard">
                <SideBar />
                <div className="newProductContainer bg-slate-100  absolute right-0  min-h-[140vh] pb-24   top-0 z-5 w-[calc(100%-288px)] flex flex-col justify-center items-center">
                    <h1 className="text-center mt-28 mb-8 text-3xl text-slate-400 font-semibold ">Create <span className="text-teal-500">Product</span></h1>
                  <form
                    className="createProductForm flex flex-col  justify-center items-center  gap-4 min-h-[120vh] w-[80%] bg-white rounded-lg shadow-xl"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                  >
        
                    <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <SpellcheckIcon className="text-slate-500 hover:text-teal-200" />
                      <input
                        type="text"
                        placeholder="Product Name "
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
                      />
                    </div>
                    <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <AttachMoneyIcon className="text-slate-500 hover:text-teal-200" />
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
                      />
                    </div>
        
                    <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <DescriptionIcon  className="text-slate-500 hover:text-teal-200"/>
        
                      <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                        className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
        
                      ></textarea>
                    </div>
        
                    <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <AccountTreeIcon  className="text-slate-500 hover:text-teal-200"/>
                      <select onChange={(e) => setCategory(e.target.value)}
                    className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
        
                      >
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                          <option key={cate} value={cate}>
                            {cate}
                          </option>
                        ))}
                      </select>
                    </div>
        
                    <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <StorageIcon className="text-slate-500 hover:text-teal-200" />
                      <input
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                        className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
        
                      />
                    </div>
        
                    <div id="createProductFormFile" className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200 ">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                        className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "
        
                      />
                    </div>
        
                    <div id="createProductFormImage " className="imgscroll flex gap-4   overflow-x-auto px-10 py-10 w-[90%]">
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" className="h-24 rounded-xl" />
                      ))}
                    </div>
        
                    <button
                      id="createProductBtn"
                      type="submit"
                      disabled={loading ? true : false}
                      className="w-[60%]  h-14 bg-teal-400 hover:bg-teal-500 text-white   font-semibold rounded-lg"
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            )
        }
     
    </Fragment>
  );
};

export default NewProduct;