const AuthLogin = (props) => {
  const {
    handleChange,
    handleSubmit,
    btnText,
    errMsg,
    inputs: {
      email,
      password
    }
  } = props

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>Email:</label>
      <input 
        type="email"
        value={email}
        name="email"
        onChange={handleChange}
        placeholder="example@example.com"
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
      <button>{ btnText }</button>
      {errMsg ? <p style={{color: 'red'}}>{errMsg}</p> : null}
    </form>
  )
};

export default AuthLogin