import star from "../assets/star.png";
import React from "react";
const ProductReviews = () => {
  return (
    <div className="bg-white px-5 py-3 ">
      <div className="flex items-center gap-2">
        <div className="w-[60px] h-[60px] bg-blue-300 rounded-full"></div>
        <div className="text-left">
          <h1 className="font-semibold ml-1">Full Name</h1>
          <div className="flex items-center">
            <img src={star} className="w-[20px]" />
            <img src={star} className="w-[20px]" />
            <img src={star} className="w-[20px]" />
            <img src={star} className="w-[20px]" />
            <img src={star} className="w-[20px]" />
            <p className="ml-1 font-semibold">4.5</p>
          </div>
        </div>
      </div>
      <p className="text-left max-h-[100px] overflow-auto mt-2">
        valid href, but still need the element to resemble a link, use a button
        and change it with appropriate styles. Learn more:
        https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
        jsx-a11y/anchor-is-valid Line 182:13: The href attribute requires a
        valid value to be accessible. Provide a valid, navigable address as the
        href value. If you cannot provide a asdfasdfasdfasfasdfvalid href, but still need the
        element to resemble a link, use a button and change it with appropriate
        styles. Learn more:
        https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/
      </p>
    </div>
  );
};

export default ProductReviews;
