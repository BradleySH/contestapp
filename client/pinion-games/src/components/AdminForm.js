const AuthForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    inputs: {

      email,
      password
    }
  } = props

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
        type="text"
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <label>Password:</label>
      <input 
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        placeholder="Password"
        minLength="5"
        required
      />
      <button>Login</button>
    </form>
  )
};

export default AuthForm