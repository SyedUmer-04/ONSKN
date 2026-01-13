export const endpoints = {
  auth: {
    signup: 'auth/register',
    login: 'auth/login',
    about: 'wp/v2/pages?slug=about',
    userProfile: 'wp/v2/users/me',

    forgotPasswordMail: 'bdpwr/v1/reset-password',
    resetPassword: 'bdpwr/v1/set-password',
    verifyPassword: 'bdpwr/v1/validate-code',
    termsConditions: 'wp/v2/pages?slug=terms',
    privacyPolicy: 'wp/v2/pages?slug=privacy',
    registration: 'registration',
  },

  products: {
    getProducts: 'products',
    getProductsCategories: 'products/categories',
    getProductDetails: 'products/',
    getRelatedProducts: 'products',
    getRelatedProductsInclude: 'include=',
    getSearchedProduct: '/products?search=',
    getCoupon: 'coupons',
    entertainment: 'entertainment',
  },

  reviews: {
    createReview: 'products/reviews',
  },

  homeData: {
    banner: 'custom-mobile-app/v1/banners',
  },

  checkout: {
    createOrder: 'orders',
    makePayment: 'charge_payment',
  },

  contact: {
    contactUs: 'custom/v1/queries',
  },

  orders: {
    orders: 'orders',
  },
};

export default endpoints;