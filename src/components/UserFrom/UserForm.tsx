"use client";

import { useState, useActionState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { createUser } from "@/app/actions/userActions";
import "./UserForm.css";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function UserForm() {
  const [isClient, setIsClient] = useState(false);
  const [state, formAction, pending] = useActionState(createUser, initialState);
  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [message, setMessage] = useState(initialState.message);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (state?.message === "Utilisateur créé avec succès !") {
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [state]);

  if (!isClient) {
    return null; // or loading state
  }

  return (
    <form action={formAction} className="userForm">
      <TextField
        id="name"
        name="name"
        label="Nom"
        variant="filled"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&:before": {
              borderBottomColor: "white",
            },
            "&:hover:before": {
              borderBottomColor: "white",
            },
            "& input": {
              color: "white",
            },
            "& textarea": {
              color: "white",
            },
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#fc6d36",
          },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": {
              color: "#fc6d36",
            },
          },
        }}
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        variant="filled"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&:before": {
              borderBottomColor: "white",
            },
            "&:hover:before": {
              borderBottomColor: "white",
            },
            "& input": {
              color: "white",
            },
            "& textarea": {
              color: "white",
            },
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#fc6d36",
          },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": {
              color: "#fc6d36",
            },
          },
        }}
      />

      <TextField
        id="message"
        name="message"
        label="Message"
        variant="filled"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "&:before": {
              borderBottomColor: "white",
            },
            "&:hover:before": {
              borderBottomColor: "white",
            },
            "& input": {
              color: "white",
            },
            "& textarea": {
              color: "white",
            },
          },
          "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#fc6d36",
          },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": {
              color: "#fc6d36",
            },
          },
        }}
      />

      <Button
        type="submit"
        disabled={pending}
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          bgcolor: pending ? "grey.400" : "#fc6d36",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: pending ? "grey.400" : "#d45e31",
            transform: "scale(1.02)",
          },
        }}
      >
        {pending ? "En cours..." : "Créer"}
      </Button>
      {isClient && (
        <p aria-live="polite" className="messageError">
          {state?.message}
        </p>
      )}
    </form>
  );
}
