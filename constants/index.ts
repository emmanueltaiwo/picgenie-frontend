const SUCCESSFUL_LOGIN_RESPONSE =
  "You've Logged in successfully, redirecting you now";

const SUCCESSFUL_SIGNUP_RESPONSE =
  "Account Created Successfully. Redirecting you to login";

const SUCCESSFUL_IMAGE_GENERATION_RESPONSE =
  "Yay! Image Generated Successfully";

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

const API_BASE_URL = "https://picgenie-backend.onrender.com";

const IMAGE_TIPS = [
  {
    id: 1,
    tip: "Avoid requesting specific characters or words, as AI may not consistently generate them accurately.",
  },
  {
    id: 2,
    tip: "Concise prompts tend to yield optimal results.",
  },
  {
    id: 4,
    tip: "Experiment with incorporating descriptive words like happy or vibrant to enhance your designs.",
  },
];

const PRICING = [
  {
    name: "50 Credits",
    id: "starter_ID",
    href: "#",
    price: 5,
    description: "1 Credit Per Image",
    bg: "#ed8045",
  },
  {
    name: "100 Credits",
    id: "pro_id",
    href: "#",
    price: 9,
    description: "1 Credit Per Image",
    bg: "#b780ff",
  },
  {
    name: "250 Credits",
    id: "business_id",
    href: "#",
    price: 20,
    description: "1 Credit Per Image",
    bg: "#7dcc5d",
  },
];

export {
  SUCCESSFUL_LOGIN_RESPONSE,
  SUCCESSFUL_SIGNUP_RESPONSE,
  IMAGE_TIPS,
  SUCCESSFUL_IMAGE_GENERATION_RESPONSE,
  PRICING,
  STRIPE_PUBLISHABLE_KEY,
  API_BASE_URL,
};
