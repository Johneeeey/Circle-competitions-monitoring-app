class RegisterPageDesign extends React.Component {
    render() {
        return (
            <div id="RegisterForm">
                <form method="post">
                    <div>
                        <div>
                            <label>Введите имя</label><br />
                            <input type="text" name="Name" />
                          
                        </div>
                        <div>
                            <label>Введите Никнейм</label><br />
                            <input type="text" name="Nickname" />
                            
                        </div>
                        <div>
                            <label>Введите Email</label><br />
                            <input type="email" name="Email" />
                            
                        </div>
                        <div>
                            <label>Введите пароль</label><br />
                            <input type="password" name="Password" />
                           
                        </div>
                        <div>
                            <label>Повторите пароль</label><br />
                            <input type="password" name="ConfirmPassword" />
                           
                        </div>
                        <div>
                            <input type="submit" value="Регистрация" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
ReactDOM.render(<RegisterPageDesign />, document.getElementById('RegisterForm'))