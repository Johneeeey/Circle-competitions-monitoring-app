class MasterPageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
        this.props = {
            requestAddress: '',
        };

    }
    loadData() {
        fetch(this.props.requestAddress).then(results => { return results.json() }).then(data => {
            this.setState({ Data: data });
        }).catch(() => {
            alert('Error');
        });
    }
    componentWillMount() {
        this.loadData();
    }
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
                            <li><a href="#">Войти/Зарегистрироваться</a></li>
                            <li><a href="#">Администрирование</a></li> 
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

ReactDOM.render(<MasterPageHeader requestAddress="/Home/GetUserInfo" />, document.getElementById('MasterHeader'))