const zod = require("zod");
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const inputValidation = (req, res, next) => {
  const { email, password } = req.body;
  const usernameResponse = emailSchema.safeParse(email);
  const passwordResponse = passwordSchema.safeParse(password);
  if (!usernameResponse.success || !passwordResponse.success) {
    return res
      .status(400)
      .json({ customError: "enter valid email, pwd - min 6 char" });
  }
  next();
};

module.exports = { inputValidation };
