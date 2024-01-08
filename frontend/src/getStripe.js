import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe('pk_live_51OSiwTSGNZwePlLcsMHt4EafYcN11gJ8a7le30UT1JFD17X9YwkwfO8FOx8G961Xt2HclBBrLi2SWpZVhPQAtIuD006oWORq0j');
  }

  return stripePromise;
}

export default getStripe;