import mongoose from "mongoose";

export default () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`DB connected sucessfully!!!`))
    .catch((err) => console.log(err));
};
