export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(
    {
      body: req.body,
      params: req.params,
      query: req.query,
    },
    {
      error: (iss) => {
        if (iss.code === "invalid_type" && iss.input === undefined) {
          return `${
            iss.path[1].charAt(0).toUpperCase() + iss.path[1].slice(1)
          } is required`;
        }
        return `Invalid value for ${iss.path[1].toLowerCase()}`;
      },
    }
  );

  if (!result.success) {
    console.log("Validation errors:", result.error);
    const messages = result.error.issues.map((iss) => iss.message);
    return next({ status: 422, message: messages.join(", ") });
  }

  next();
};
