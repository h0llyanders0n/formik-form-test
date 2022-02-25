function useForm(initialValues){
    const [values, setValues] = React.useState(initialValues);
  
    function handleValue(e){
        if (e.target.type == 'checkbox') return e.target.checked;
        return e.target.value;
    }
  
    return [
        values,
        e => {
            if (e.type === 'change'){ 
                console.log('name:',e.target.name);
                setValues({
                    ...values,
                    [e.target.name]: (handleValue(e))
                });
            }
        }
    ];
  }
  
  function SignUp() {
    const [values, handleChange] = useForm({name: '', email: '', password: ''});
    const [errors, setError] = React.useState({nameError: '', emailError: '', passwordError: ''});
  
    function validateName() {
      if (!values.name || values.name.length < 2) {
        setError(errors => ({...errors, nameError: 'too short'}));
        console.log('ERROR: Name too short');
      } else {
        setError(errors => ({...errors, nameError: ''}));
        console.log('OK');
      }
    }
  
    function validateEmail() {
      if (!values.email || (values.email.includes('@') === false)) {
        setError(errors => ({...errors, emailError: 'not valid'}));
        console.log('ERROR: Email not valid');
      } else {
        setError(errors => ({...errors, emailError: ''}));
        console.log('OK');
      }
    }
  
    function validatePassword() {
      console.log(errors)
      if (!values.password || values.password.length < 8) {
        setError(errors => ({...errors, passwordError: 'too short'}));
        console.log('ERROR: Password too short');
      } else {
        setError(errors => ({...errors, passwordError: ''}));
        console.log('OK');
      }
    }
  
    function handle() {
      validateName();
      validateEmail();
      validatePassword();
    }
  
    return (
      <div className="container">
        <h1>Sign Up!</h1>
        <input type="text" className="form-control" placeholder="Name" name="name" value={values.name} onChange={handleChange}/>
        <div style={{color: 'red'}}>{errors.nameError}</div>
        <input type="text" className="form-control" placeholder="Email" name="email" value={values.email} onChange={handleChange}/>
        <div style={{color: 'red'}}>{errors.emailError}</div>
        <input type="password" className="form-control" placeholder="Password" name="password" value={values.password} onChange={handleChange}/>
        <div style={{color: 'red'}}>{errors.passwordError}</div>
        <br />
        <button type="button" className="btn btn-primary" onClick={handle}>Submit</button>
      </div>
    )
  }
  
  ReactDOM.render(
    <SignUp />,
    document.getElementById('root')
  )