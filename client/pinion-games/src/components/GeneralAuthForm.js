const AuthForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: {
      firstName,
      lastName,
      email,
      password,
      access
    }
  } = props

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input 
        type="text"
        value={firstName}
        name="firstName"
        onChange={handleChange}
        placeholder="First Name"
      />
      <label>Last Name:</label>
      <input 
        type="text"
        value={lastName}
        name="lastName"
        onChange={handleChange}
        placeholder="Last Name"
      />
      <label>Email:</label>
      <input 
        type="email"
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="example@example.com"
        required
      />
      <label>Password (5 characters minimum):</label>
      <input 
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
        minLength="5"
        required
      />
      <label>Access Code (Case Sensitive)</label>
      <input 
        type="text"
        value={access}
        name="access"
        onChange={handleChange}
        placeholder="Access Code"
        minLength="6"
        maxLength="6"
        required
      />
      <button>{ btnText }</button>
      {errMsg ? <p style={{color: 'red'}}>{errMsg}</p> : null}
    </form>
  )
};

export default AuthForm