"use client";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface FormProps {
  mode: "login" | "register";
}

interface AuthFormValues {
  phoneNumber: string;
  phoneCode?: string;
  username?: string;
  password: string;
  confirmPassword?: string;
  mode: "login" | "register";
}

export function AuthForm({ mode }: FormProps) {
  const router = useRouter();
  const currentMode = mode === "register" ? "register" : "login";

  const initialValues: AuthFormValues = {
    phoneNumber: "",
    phoneCode: "+57",
    username: "",
    password: "",
    confirmPassword: "",
    mode: currentMode,
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .min(7, "Phone number must be at least 7 digits")
      .max(15, "Phone number must be at most 15 digits"),
    username: Yup.string().when("mode", {
      is: "register",
      then: (schema) =>
        schema
          .required("Username is required")
          .min(3, "Username must be at least 3 characters")
          .max(20, "Username must be at most 20 characters")
          .matches(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
          ),
    }),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().when(["mode", "password"], {
      is: (mode: "login" | "register", password: string) =>
        mode === "register" && password,
      then: (schema) =>
        schema
          .required("You must confirm your password")
          .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
  });

  const onSubmit = async (values: AuthFormValues) => {
    delete values.confirmPassword;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${values.mode}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to authenticate", error);
    }
  };

  return (
    <div className="bg-opacity-80 p-8 rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount={true} // Add this to trigger validation on mount
      >
        {({ handleSubmit, values, errors, touched }) => {
          return (
            <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col">
                <Field
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                  className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="span"
                  className="text-red-500 text-sm ml-2"
                />
              </div>

              {currentMode === "register" && (
                <div className="flex flex-col">
                  <Field
                    name="username"
                    placeholder="Username"
                    className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                  />
                  <ErrorMessage
                    name="username"
                    component="span"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>
              )}

              <div className="flex flex-col">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-500 text-sm ml-2"
                />
              </div>

              {currentMode === "register" && (
                <div className="flex flex-col">
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className="w-96 h-12 bg-blue-100 rounded-lg p-2"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className="text-red-500 text-sm ml-2"
                  />
                </div>
              )}
              <Field type="hidden" name="mode" value={currentMode} />

              <button
                type="submit"
                className="bg-blue-700 h-12 rounded-xl text-white font-semibold flex justify-center items-center"
                disabled={
                  Object.keys(errors).length > 0 || // Disable submit button if there are validation errors
                  Object.keys(touched).length === 0
                }
              >
                {currentMode === "login" ? "Login" : "Register"}
              </button>

              <div className="flex justify-center gap-10 mt-4 font-semibold">
                {currentMode === "login" ? (
                  <span>
                    Don’t have an account?{" "}
                    <a
                      href="?mode=register"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      Register here
                    </a>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <a
                      href="?mode=login"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      Login here
                    </a>
                  </span>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
