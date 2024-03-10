import React, { useState, useEffect } from "react";
import axios from "axios";
import remove from "../../assets/remove.png";

const SellProduct = ({
  setAddProducts,
  setMessage,
  upProduct,
  setUpProduct,
}) => {
  const [categories, setCategories] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [tags, setTags] = useState(null);
  const [img, setImg] = useState(null);
  const [newCategory, setNewCategory] = useState(false);

  useEffect(() => {
    setImg(upProduct?.image);
    axios
      .get("http://localhost/product_project/server/index.php?q=get_categories")
      .then((res) => {
        setCategories(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost/product_project/server/index.php?q=get_tags")
      .then((res) => {
        setTags(res.data);
      });
  }, []);

  const HandleUpload = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;
    fileReader.onload = () => {
      setImg(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const HandleForm = (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData(e.target);
    for (const [name, value] of formData.entries()) {
      if (value == "") {
        alert(name + " empty");
      }
      data[name] = value;
    }
    if (!img) {
      alert("image required");
      return;
    }
    data["image"] = img;
    if(!newCategory){
      data["category_id"] = e.target.tag_id[e.target.tag_id.selectedIndex].id
    }
    data["product_id"] = upProduct?.id || null;
    if (!upProduct) {
      axios
        .post(
          "http://localhost/product_project/server/userarticles.php?q=add_product",
          data
        )
        .then((res) => {
          if (res.data.check) {
            setMessage(res.data.message);
            setAddProducts(false);
            // setUpProduct(null)
            e.target.reset();
            setImg(null);
          }
        });
    } else {
      axios
        .put(
          `http://localhost/product_project/server/userarticles.php?q=update_product&id=${upProduct.product_id}`,
          data
        )
        .then((res) => {
          if (res.data.check) {
            setMessage(res.data.message);
            setUpProduct(null);
            setAddProducts(false);
          }
        });
    }
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/4 flex items-center justify-center z-10">
      <button
        onClick={() => {
          setAddProducts(false);
          setUpProduct(null);
        }}
        className="absolute right-2 top-2"
      >
        <img src={remove} className="w-[35px]" />
      </button>
      <form
        onSubmit={HandleForm}
        className=' px-6 py-6 ring-2 bg-slate-200 ring-gray-400 rounded-lg className="font-semibold text-xl" shadow-md'
      >
        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold text-xl">Product Name</label>
          <input
            type="text"
            name="designation"
            placeholder="Product Name"
            className="p-2 rounded ring-1 ring-black"
            required
            defaultValue={upProduct?.designation}
          />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-xl">Prix HorTax:</label>
            <input
              type="number"
              name="prix_ht"
              placeholder="Prix HorTax"
              className="p-2 rounded ring-1 ring-black"
              required
              defaultValue={upProduct?.prix_ht}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-xl">TVA:</label>
            <input
              type="number"
              name="tva"
              placeholder="TVA %"
              className="p-2 rounded ring-1 ring-black"
              required
              defaultValue={upProduct?.tva}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-xl">Stock:</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              className="p-2 rounded ring-1 ring-black"
              required
              defaultValue={upProduct?.stock}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold text-xl">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="p-2 rounded ring-1 ring-black"
            required
            defaultValue={upProduct?.description}
          />
        </div>
        <div className="mb-3">
          {!newCategory && (
            <>
              <label className="font-semibold text-xl">Categories:</label>
              <select
                className="p-2 block w-[1 mb-330px] mt-2"
                name="tag_id"
                required
              >
                <option value="" hidden>
                  --Choise Category--
                </option>
                {categories?.map((ct) => {
                  return (
                    <optgroup key={ct.id} label={ct.famille}>
                      {tags
                        ?.filter((tag) => tag.category_id == ct.id)[0]
                        ["tags"].map((tag) => {
                          return (
                            <option
                              id={ct.id}
                              key={tag.id}
                              value={tag.id}
                              selected={upProduct?.tag_id == tag.id}
                            >
                              {tag.tag}
                            </option>
                          );
                        })}
                    </optgroup>
                  );
                })}
              </select>
            </>
          )}
          {newCategory && (
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 mb-3">
                <label className="font-semibold text-xl">Category:</label>
                <input
                  type="text"
                  placeholder="category..."
                  name="category"
                  className="p-2 rounded ring-1 ring-black"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-xl">Tag:</label>
                <input
                  type="text"
                  placeholder="tag..."
                  name="tag"
                  className="p-2 rounded ring-1 ring-black"
                />
              </div>
            </div>
          )}
          {!newCategory && (
            <button
              type="button"
              onClick={() => {
                setNewCategory(true);
              }}
              className="text-sm ml-1 text-slate-500 hover:underline hover:slate-400 transition"
            >
              new category
            </button>
          )}
          {newCategory && (
            <button
              type="button"
              onClick={() => {
                setNewCategory(false);
              }}
              className="text-sm ml-1 text-slate-500 hover:underline hover:slate-400 transition"
            >
              select category
            </button>
          )}
          <div class="flex items-center justify-center w-full mt-2">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 transition-all duration-300"
            >
              {!img && (
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              {img && <img src={img} className="max-w-[200px]" />}
              <input
                id="dropzone-file"
                type="file"
                onChange={HandleUpload}
                name="image"
                class="hidden"
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="w-[120px] m-auto ring-1 py-1 px-1 ring-green-300 rounded-md bg-green-200 cursor-pointer active:scale-95 transition-all duration-300"
        />
        {/* <button className="w-[120px] m-auto ring-1 py-1 px-1 ring-red-300 rounded-md bg-red-200 cursor-pointer active:scale-95 transition-all duration-300 ml-3">Reset</button> */}
      </form>
    </div>
  );
};

export default SellProduct;
