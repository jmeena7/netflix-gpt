export const ValidateUser = (email, password) => {
  // Email regex
  const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (regexEmail.test(email)) {
    alert("✅ Valid email");
  } else {
    alert("❌ Invalid email");
  }

  // Strong password rule
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (regexPassword.test(password)) {
    alert("✅ Strong password");
  } else {
    alert(
      "❌ Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special char."
    );
  }
};
