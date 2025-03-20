// 模拟用户数据库
let users = [];
// 当前登录用户
let currentUser = null;

// 购物车数组
let cart = [];
// 购物车数量元素
const cartCount = document.getElementById('cart-count');
// 购物车商品列表元素
const cartItems = document.getElementById('cart-items');
// 购物车总价元素
const totalPrice = document.getElementById('total-price');
// 购物车详情元素
const cartDetails = document.getElementById('cart-details');

// 显示用户名和隐藏登录注册按钮
function showUserInfo() {
  const userInfo = document.getElementById('user-info');
  const loginRegisterButtons = document.getElementById('login-register-buttons');
  const usernameDisplay = document.getElementById('username-display');

  userInfo.style.display = 'block';
  loginRegisterButtons.style.display = 'none';
  usernameDisplay.textContent = currentUser.username;
}

// 隐藏用户名和显示登录注册按钮
function hideUserInfo() {
  const userInfo = document.getElementById('user-info');
  const loginRegisterButtons = document.getElementById('login-register-buttons');

  userInfo.style.display = 'none';
  loginRegisterButtons.style.display = 'block';
}

// 加入购物车函数
function addToCart(productId) {
  if (!currentUser) {
    alert('请先登录');
    return;
  }
  cart.push(productId);
  cartCount.textContent = cart.length;
  updateCartDetails();
}

// 更新购物车详情函数
function updateCartDetails() {
  cartItems.innerHTML = '';
  let total = 0;

  // 遍历购物车中的商品
  cart.forEach(productId => {
    let productName = '';
    let price = 0;

    // 根据商品 ID 设置商品名称和价格
    if (productId === 1) {
      productName = '时尚 T 恤';
      price = 50;
    } else if (productId === 2) {
      productName = '休闲牛仔裤';
      price = 200;
    }

    // 创建购物车商品列表项
    const li = document.createElement('li');
    li.textContent = `${productName} - ￥${price}`;
    cartItems.appendChild(li);

    // 累加总价
    total += price;
  });

  // 更新总价显示
  totalPrice.textContent = `￥${total}`;
  cartDetails.style.display = 'block';
}

// 结算函数
function checkout() {
  if (!currentUser) {
    alert('请先登录');
    return;
  }
  alert(`结算成功！总价: ￥${totalPrice.textContent.slice(1)}`);
  cart = [];
  cartCount.textContent = 0;
  cartItems.innerHTML = '';
  totalPrice.textContent = '￥0';
  cartDetails.style.display = 'none';
}

// 注册函数
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (username && password) {
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      alert('用户名已存在，请选择其他用户名');
    } else {
      users.push({ username, password });
      alert('注册成功，请登录');
      closeRegisterModal();
    }
  } else {
    alert('请输入用户名和密码');
  }
}

// 登录函数
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    currentUser = user;
    alert('登录成功');
    closeLoginModal();
    showUserInfo();
  } else {
    alert('用户名或密码错误');
  }
}

// 退出登录函数
function logout() {
  currentUser = null;
  cart = [];
  cartCount.textContent = 0;
  cartItems.innerHTML = '';
  totalPrice.textContent = '￥0';
  cartDetails.style.display = 'none';
  hideUserInfo();
  alert('已退出登录');
}