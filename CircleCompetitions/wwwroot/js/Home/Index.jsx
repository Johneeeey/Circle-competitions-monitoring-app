class MainPageDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Competitions: [],
        };
        this.props = {
            requestAddress: '',
        };
    }
    loadData() {
        fetch(this.props.requestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Competitions: data });
        }).catch(() => {
            alert('Error');
        });
    }
    componentWillMount() {
        this.loadData();
    }
    render() {
        return (
            <div className="container">
                <div className="container-fluid">
                    <h1>Предстоящие события</h1>
                    <table className="table table-hover table-bordered" id="FutureEvents">
                        <thead>
                            <tr>
                                <th>Наименование</th>                               
                                <th>Место проведения</th>
                                <th>Вид соревнования</th>
                                <th>Возрастное ограничение</th>                        
                                <th>Дата проведения</th>
                                
                                <th>                    </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Competitions.map(item => {
                                var dateOfStart = new Date(item.dateOfStart);
                                var today = new Date();
                                if (dateOfStart > today) {
                                    var adr = "/RegCompet/Index?ID_Competition=" + item.iD_Competition;
                                    return (
                                        <tr key={item.iD_Competition} >
                                            <td>{item.nameOfCompetition}</td>
                                            <td>{item.place}</td>
                                            <td>{item.typeOfCompetition}</td>
                                            <td>{item.ageLimit}</td>
                                            <td>{item.dateOfStart}</td>
                                            <td>
                                                <a href={adr}><button type="button" className="btn btn-info" id="ButtonMainPageTable">Принять участие</button></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>

                </div>
                <div className="container-fluid">
                    <h1>Завершенные события</h1>
                    <table className="table table-hover table-bordered" id="CompletedEvents">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Вид соревнования</th>
                                <th>Возрастное ограничение</th>
                                <th>Даты проведения</th>
                                <th>Результаты</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Competitions.map(item => {
                                var dateOfEnd = new Date(item.dateOfEnd);
                                var today = new Date();
                                if (dateOfEnd < today) {
                                    var adr = "/Result/Index/?IDCompetition=" + item.iD_Competition;
                                    return (
                                        <tr key={item.iD_Competition} >
                                            <td>{item.nameOfCompetition}</td>
                                            <td>{item.typeOfCompetition}</td>
                                            <td>{item.ageLimit}</td>
                                            <td>{item.dateOfStart} - {item.dateOfEnd}</td>
                                            <td>
                                                <a href={adr}><button type="button" className="btn btn-info" id="ButtonMainPageTable">Посмотреть</button></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="container-fluid">
                    <h1>Live-события</h1>
                    <table className="table table-hover table-bordered" id="LiveEvents">
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Вид соревнования</th>
                                <th>Возрастное ограничение</th>
                                <th>Даты проведения</th>
                                <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Competitions.map(item => {
                                var dateOfStart = new Date(item.dateOfStart);
                                var dateOfEnd = new Date(item.dateOfEnd);
                                var today = new Date();
                                if (dateOfStart <= today && dateOfEnd >= today) {
                                    var adr = "/Result/Index/?IDCompetition=" + item.iD_Competition;
                                    return (
                                        <tr key={item.iD_Competition} >
                                            <td>{item.nameOfCompetition}</td>
                                            <td>{item.typeOfCompetition}</td>
                                            <td>{item.ageLimit}</td>
                                            <td>Текущее (до: {item.dateOfEnd})</td>
                                            <td>
                                                <a href={adr}><button type="button" className="btn btn-danger" id="ButtonMainPageTable">Посмотреть</button></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<MainPageDesign requestAddress="/Home/GetCompetitions" />, document.getElementById('MainPageDiv'))