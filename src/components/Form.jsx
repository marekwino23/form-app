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
    if (name === "" || email === "" || password === "" || date === "") {
      cogoToast.error("Please fill this form");
    } else if (type === "low" || type === "more") {
      cogoToast.error("This password is too weak");
    } else {
      cogoToast.success("Sended successful");
      setDate("");
      setEmail("");
      setName("");
      setPassword("");
    }
  };

  // const checkStrengthPassword = () => {
  //   let strongPassword = new RegExp(
  //     "^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
  //     "g"
  //   );
  //   let mediumPassword = new RegExp(
  //     "^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
  //     "g"
  //   );
  //   let enoughPassword = new RegExp("(?=.{8,}).*", "g");
  //   if (password.length === 0) {
  //     setValue(password.length);
  //     setType("lack of password");
  //     return false;
  //   } else if (false === enoughPassword.test(password)) {
  //     setValue(password.length);
  //     setType("more");
  //     return false;
  //   } else if (strongPassword.test(password)) {
  //     setType("strong");
  //     setValue(password.length);
  //     return true;
  //   } else if (mediumPassword.test(password)) {
  //     setType("medium");
  //     setValue(password.length);
  //     return true;
  //   } else {
  //     setValue(password.length);
  //     setType("low");
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   checkStrengthPassword();
  // });

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

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      // onValidate();
      const response = await fetch("http://localhost:4000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email }),
      });

      const result = await response.json();
      console.log("Success:", result);
      cogoToast.success("Sended successful");
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label for="fname">Imie i nazwisko</label>
      <input
        type="text"
        id="fname"
        onChange={onChange}
        name="name"
        value={name}
        required
        placeholder="Podaj swoje imię i nazwisko.."
      />
      <label for="lemail">E-mail</label>
      <input
        type="email"
        id="lemail"
        onChange={onChange}
        required
        name="email"
        value={email}
        placeholder="Podaj swojego maila.."
      />
      {/* <label for="password">Password</label>
      <input
        type="password"
        id="password"
        onChange={onChange}
        name="password"
        required
        value={password}
        placeholder="Your password.."
      /> */}
      {/* <progress max="25" value={value}></progress>
      <br></br>
      <span>{type}</span>
      <br></br>
      <br></br> */}
      {/* <label for="date">Date of birth</label>
      <input
        type="date"
        id="date"
        required
        onChange={onChange}
        name="date"
        value={date}
        placeholder="Your date of birth.."
      /> */}
      <input style={{ cursor: "pointer" }} type="submit" value="Wyślij" />
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      ></div>
    </form>
  );
};
export default Form;
