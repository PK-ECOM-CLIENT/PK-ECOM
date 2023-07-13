import "./categories.css";
import React, { useEffect } from "react";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoriesAction } from "../../slices/categories/categoriesAction";
import { getProductsAction } from "../../slices/products/productsAction";
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
  console.log(_cid);
  const handleOnProductClick = (_pid) => {
    navigate(`/categories/${_cid}/products/${_pid}`);
  };
  return (
    <AppLayOut>
      <div className="categories_content">
        <div className="categories_content__wrapper">
          <div className="categories_content_row">
            {subCategories.map((item, i) => (
              <div className="categories_content_row-item">
                <h6 className="subcategory">{item.name}</h6>
                <div className="categories_ul">
                  {products.map(
                    (product, i) =>
                      product.subCatId === item._id && (
                        <div
                          className="products"
                          onClick={() => handleOnProductClick(product._id)}
                        >
                          {product.name}
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
