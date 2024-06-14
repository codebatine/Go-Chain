// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const register = async (req, res, next) => {
  const { username, password, role } = req.body;
  try {
    const user = await registerUser(username, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await authenticateUser(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get user profile
// @route GET /api/register
// @access Public
export const getMe = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
