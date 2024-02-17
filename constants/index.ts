const SUCCESSFUL_LOGIN_RESPONSE =
  "You've Logged in successfully, redirecting you now";

const SUCCESSFUL_SIGNUP_RESPONSE =
  "Account Created Successfully. Redirecting you to login";

const SUCCESSFUL_IMAGE_GENERATION_RESPONSE =
  "Yay! Image Generated Successfully";

const STRIPE_PUBLISHABLE_KEY =
  process.env.STRIPE_PUBLISHABLE_KEY ??
  "pk_test_51Ok73nLAGvm2x2Z7p3XVdqW0qv1d4A6YueZicOCcXjwscNfBnh3mOSa1ctARfIWswLM7wMfG6kCPUlR6eKJCx7Wr003ssR3rYc";

const API_BASE_URL = "http://localhost:8000";

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
    id: 3,
    tip: "Once you discover an initial icon you favor, explore its variants.",
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
