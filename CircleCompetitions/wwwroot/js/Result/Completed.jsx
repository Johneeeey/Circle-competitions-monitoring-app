class CompletedResultPageDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Results: [],
            Sportsmen: [],
            Competition: [],
        };
        this.props = {
            resultsRequestAddress: '',
            sportsmenRequestAddress: '',
            competitionRequestAddress: '',
        };
    }
    loadData() {
        fetch(this.props.resultsRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Results: data });
        }).catch(() => {
            alert('Error results request');
            });
        fetch(this.props.sportsmenRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Sportsmen: data });
        }).catch(() => {
            alert('Error sportsmen request');
            });
        fetch(this.props.competitionRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Competition: data });
        }).catch(() => {
            alert('Error competition request');
        });
    }
    componentWillMount(){
        this.loadData();
    }
    render() {
        return (
            <div className="container">
                {this.state.Competition.map(item => {
                    return (
                        <div>
                            <h1 id="CompetitionName">"{item.nameOfCompetition}"</h1>
                            <h3 id="CompetitionDate">
                                {item.dateOfStart} - <br />
                                {item.dateOfEnd}
                            </h3>
                        </div>
                    )
                })
                }
                <div>                    
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Команда</th>
                                <th>Личный номер</th>
                                <th>Год рождения</th>
                                <th>Место</th>
                                <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Results.map(r => { 
                                return (
                                        this.state.Sportsmen.map(s => {
                                            if (s.iD_Sportsman == r.sportsman_ID) {
                                                return (
                                                    <tr key={r.iD_Result}>
                                                        <td>
                                                            {s.sportsmanSurname} {s.sportsmanName} {s.sportsmanPatronymic}<br />
                                                        </td>    
                                                        <td>{s.team}</td>
                                                        <td>{s.iD_Sportsman}</td>
                                                        <td>{s.yearOfBirth}</td>
                                                        <td>{r.place}</td>
                                                        <td>
                                                        <a href="#"><button type="button" className="btn btn-info" id="ButtonCompletedPageTable">Подробнее</button></a>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>    
        )
    }
}
ReactDOM.render(<CompletedResultPageDesign resultsRequestAddress="/Result/GetResults"
    sportsmenRequestAddress="/Result/GetSportsmen"
    competitionRequestAddress="/Result/GetCompetition" />, document.getElementById('CompletedResultDiv'))