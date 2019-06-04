class LoginForm extends React.Component {
    render() {
        return (
            <div className="container-fluid" id="LoginForm">
                <form method="post">
                    <div className="form-group">
                        <label>E-mail адрес</label>
                        <input type="email" name="EMail" className="form-control" placeholder="Введите E-mail"></input>
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" name="Password" className="form-control" placeholder="Введите пароль"></input>
                    </div>
                    <small id="ErrorMessage"></small>
                    <button type="submit" className="btn btn-primary">Войти</button>
                </form>
            </div>
        )
    }

}
ReactDOM.render(<LoginForm />, document.getElementById('LoginPageForm'))