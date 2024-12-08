import axiosInstance from "../common/axiosInstance";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const StoreContext = createContext(null);

const privateAdminRoutes = [
  "/admin/dashboard",
  "/admin/users",
  "/admin/settings",
  "/admin/orders",
  "/admin/foods",
];

const isAdminRoute = (path) => {
  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;

  return privateAdminRoutes.includes(normalizedPath);
};

const StoreContextProvider = (props) => {
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState("home");

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [foodList, setFoodList] = useState(null);
  const [currentFetchFoodUrl, setCurrentFetchFoodUrl] = useState({});
  const [categories, setCategories] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [userList, setUserList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [allFoods, setAllFoods] = useState([]);
  const [allFoodsLoading, setAllFoodsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin")
      ? JSON.parse(localStorage.getItem("isAdmin"))
      : false
  );

  const [authUser, setAuthUser] = useState(
    localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))
      : null
  );

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token && isAdminRoute(location.pathname)) {
      setShowLogin(true);
    }

    loadData();
  }, []);

  const loadData = async function () {
    await fetchFoodList();

    await fetchAllFoods();

    await fetchCategories();

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setToken(token);
      await loadCartData(localStorage.getItem("token"));
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleActiveCategory = (itemName) => {
    let newCategory = selectedCategory === itemName ? "All" : itemName;
    setSelectedCategory(newCategory);
    fetchFoodList(
      currentFetchFoodUrl.page,
      currentFetchFoodUrl.limit,
      currentFetchFoodUrl.search,
      newCategory,
      currentFetchFoodUrl.priceShort
    );

    setActiveMenu("foods");
  };

  const fetchFoodList = async (
    page = 1,
    limit = 8,
    search = "",
    category = "All",
    priceShort = "lowToHigh"
  ) => {
    setFoodsLoading(true);
    let searchQueryString = `?page=${page}&limit=${limit}&category=${category}&priceShort=${priceShort}`;
    searchQueryString += search ? `&search=${search}` : "";
    const response = await axiosInstance
      .get(`${API_BASE_URL}api/food/list${searchQueryString}`)
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    setFoodsLoading(false);

    setFoodList(response.data.data);

    setCurrentFetchFoodUrl({
      page: page,
      limit: limit,
      search: search,
      category: category,
      priceShort: priceShort,
      totalFoods: response.data.totalFoods,
      totalPages: response.data.totalPages,
    });
  };

  const fetchAllFoods = async () => {
    setAllFoodsLoading(true);
    const response = await axiosInstance
      .get(`${API_BASE_URL}api/food/all`)
      .catch((err) => {
        toast.error(err.response.data.message);
        setAllFoodsLoading(false);
      });

    setAllFoodsLoading(false);
    setAllFoods(response.data.data);
  };

  const fetchUserList = async () => {
    setUsersLoading(true);
    const response = await axiosInstance
      .get(`${API_BASE_URL}api/users`, {
        headers: {
          token,
        },
      })
      .catch((err) => {
        setUsersLoading(false);
        toast.error(err.response.data.message);
      });

    if (!response.data.success) toast.error("Failed to fetch users.");

    setUsersLoading(false);
    setUserList(response.data.data);
  };

  const fetchOrderList = async (userId = "") => {
    const queryParam = userId.length > 0 ? `?orderUserId=${userId}` : "";
    setOrderIsLoading(true);
    await axiosInstance
      .get(`${API_BASE_URL}api/order/all${queryParam}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        setOrderIsLoading(false);
        setOrderList(response.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const fetchCategories = async () => {
    const response = await axiosInstance.get(`api/categories`).catch((err) => {
      toast.error(err.response.data.message);
    });
    setCategories(response.data.data);
  };

  const loadCartData = async (token) => {
    setCartLoading(true);
    if (token) {
      await axiosInstance
        .get(`${API_BASE_URL}api/cart/get`, {
          headers: {
            token,
          },
        })
        .then((response) => {
          setCartLoading(false);
          setCartItems(response.data.data);
        })
        .catch(() => {
          setCartLoading(false);
          toast.error("Something went wrong. Please try again");
          setToken(null);
          localStorage.removeItem("token");
          setCartItems({});
          navigate("/");
        });
    } else {
      setCartItems({});
      setCartLoading(false);
    }
  };

  const addToCart = async (itemId) => {
    if (!token) {
      setShowLogin(true);
      return toast.error("Please login to add items to cart");
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      const response = await axiosInstance.post(
        `${API_BASE_URL}api/cart/add`,
        {
          itemId,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) toast.success(response.data.message);
      else toast.error(response.data.message);
    }
  };

  const removeFromCart = async (itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      Swal.fire({
        text: "Are you sure you want to remove this food item from cart?",
        showCancelButton: true,
        confirmButtonColor: "tomato",
        cancelButtonColor: "black",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosInstance
            .post(
              `${API_BASE_URL}api/cart/remove`,
              {
                itemId,
              },
              {
                headers: {
                  token,
                },
              }
            )
            .then((response) => {
              if (response.data.success) {
                setCartItems(response.data.cartData);
                toast.success(response.data.message);
              } else toast.error(response.data.message);
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        }
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allFoods.find((product) => product._id === item);

        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const contextValue = {
    foodsLoading,
    allFoodsLoading,
    allFoods,
    foodList,
    fetchFoodList,
    currentFetchFoodUrl,
    fetchUserList,
    userList,
    fetchOrderList,
    orderIsLoading,
    orderList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    API_BASE_URL,
    token,
    setToken,
    showLogin,
    setShowLogin,

    cartLoading,

    isAdmin,
    setIsAdmin,

    authUser,
    setAuthUser,

    activeMenu,
    setActiveMenu,

    categories,

    usersLoading,

    selectedCategory,
    handleActiveCategory,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
