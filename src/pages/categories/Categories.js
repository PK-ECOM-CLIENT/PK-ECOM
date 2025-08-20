import "./categories.css";
import React, { useEffect } from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesAction } from "../../slices/categories/categoriesAction";
import { getProductsAction } from "../../slices/products/productsAction";
import BackButton from "../../components/backbutton/BackButton";
const Categories = () => {
  const { _cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const subCategories = categories.filter((item) => item.catId === _cid);
  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    !products.length && dispatch(getProductsAction());
    window.scrollTo(0, 0);
  }, [_cid, dispatch, categories.length, products.length]);
  const handleOnProductClick = (_pid) => {
    navigate(`/categories/${_cid}/products/${_pid}`);
  };
  return (
    <AppLayOut>
      <BackButton></BackButton>
      <div className="categories_content">
        <div className="-util-back_btn_wraper"></div>
        <div className="categories_content__wrapper">
          <div className="categories_grid">
            {subCategories.map((item) => (
              <div key={item._id} className="subcategory_card">
                <h6 className="subcategory_title">{item.name}</h6>
                <div className="subcategory_products">
                  {products.map(
                    (product) =>
                      product.subCatId === item._id && (
                        <div
                          key={product._id}
                          className="product_item"
                          onClick={() => handleOnProductClick(product._id)}
                        >
                          {product.name === "Sheets" ? (
                            <span>
                              {product.name}
                              <span className="-util-nav">*</span>
                            </span>
                          ) : (
                            product.name
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayOut>
  );
};

export default Categories;
