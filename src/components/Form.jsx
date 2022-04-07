import { useEffect, useState } from "react";
import cogoToast from "cogo-toast";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);

  const onValidate = () => {
    if (name === "" && email === "" && password === "" && date === "") {
      return true;
    }
    return false;
  };

  const checkStrengthPassword = () => {
    let strongPassword = new RegExp(
      "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
      "g"
    );
    let mediumPassword = new RegExp(
      "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
      "g"
    );
    let enoughPassword = new RegExp("(?=.{8,}).*", "g");
    if (password.length === 0) {
      setValue(password.length);
      setType("lack of password");
      return false;
    } else if (false === enoughPassword.test(password)) {
      setValue(password.length);
      setType("more");
      return false;
    } else if (strongPassword.test(password)) {
      setType("strong");
      setValue(password.length);
      return true;
    } else if (mediumPassword.test(password)) {
      setType("medium");
      setValue(password.length);
      return true;
    } else {
      setValue(password.length);
      setType("low");
      return false;
    }
  };

  useEffect(() => {
    checkStrengthPassword();
  });

  const onChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setDate(e.target.value);
    }
  };

  const errorPassword = {
    lack: "lack of password",
    more: "More of characters",
    strong: "Strong",
    medium: "Medium",
    type: type,
    low: "Low",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onValidate();
    if (type === "medium" || type === "strong") {
      cogoToast.success("Sended successful");
    } else {
      cogoToast.error("This password is too weak");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          aria-label="Name"
          type="text"
          required
          onChange={onChange}
          minLength="3"
          name="name"
          value={name}
          placeholder="Enter your Name"
        />
        <input
          aria-label="Email"
          type="email"
          pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Enter your email"
        />
        <input
          aria-label="Password"
          onChange={onChange}
          name="password"
          required
          value={password}
          placeholder="Enter your password"
          type="password"
        />
        <span>{type}</span>
        <progress
          className={value < 0 ? "progress" : "initial"}
          value={value}
          max="50"
        ></progress>
        <input
          aria-label="Date of birth"
          onChange={onChange}
          name="date"
          required
          value={date}
          placeholder="Enter your date of birth"
          type="date"
        />
        <button>Wyślij</button>
      </form>
    </div>
  );
};
export default Form;
