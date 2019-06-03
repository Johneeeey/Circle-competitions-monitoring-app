class MasterPageHeader extends React.Component {
    
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <p className="navbar-brand">Круговые соревнования</p>
                    </div>
                    <div>
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Главная</a></li>
                            <li><a href="Home/Login">Профиль</a></li>
                            <li><a href="#">Администрирование</a></li> 
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

ReactDOM.render(<MasterPageHeader />, document.getElementById('MasterHeader'))