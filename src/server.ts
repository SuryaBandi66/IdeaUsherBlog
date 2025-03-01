import app from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
