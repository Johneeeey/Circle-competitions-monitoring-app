class CompletedResultPageDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Results: [],
            Sportsmen: [],
            Competition: [],
            Stages: [],
            Circles: [],
        };
        this.props = {
            resultsRequestAddress: '',
            sportsmenRequestAddress: '',
            competitionRequestAddress: '',
            stagesRequestAddress: '',
            circlesRequestAddress: '',
        };
    }
    loadData() {
        //Запрос списка результатов
        fetch(this.props.resultsRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Results: data });
        }).catch(() => {
            alert('Error results request');
            });
        //Запрос списка спортсменов
        fetch(this.props.sportsmenRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Sportsmen: data });
        }).catch(() => {
            alert('Error sportsmen request');
            });
        //Запрос соревнования
        fetch(this.props.competitionRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Competition: data });
        }).catch(() => {
            alert('Error competition request');
            });
        //Запрос списка стадий
        fetch(this.props.stagesRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Stages: data });
        }).catch(() => {
            alert('Error stages request');
            });
        //Запрос списка кругов
        fetch(this.props.circlesRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Circles: data });
        }).catch(() => {
            alert('Error circles request');
        });
    }
    componentWillMount(){
        this.loadData();
    }
    render() {
        return (
            this.state.Competition.map(item => {//Заголовок страницы                
            return (
                <div className="container">
                    <div key={item.iD_Competition}>
                        <h1 key={item.iD_Competition} id="CompetitionName">"{item.nameOfCompetition}"</h1>
                        <h3 key={item.iD_Competition} id="CompetitionDate">
                            {item.dateOfStart} - <br />
                            {item.dateOfEnd}
                        </h3>
                    </div>
                    <div>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Номер стадии</th>
                                    <th>Номер круга</th>
                                    <th>ФИО</th>
                                    <th>Команда</th>
                                    <th>Личный номер</th>
                                    <th>Год рождения</th>
                                    <th>Время круга</th>
                                    <th>Место</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Circles.map(c => {
                                    return (
                                        this.state.Sportsmen.map(sp => {
                                            if (sp.iD_Sportsman == c.sportsman_ID) {
                                                return (
                                                    <tr key={c.iD_Circle}>
                                                        <td>
                                                            {this.state.Stages.map(st => {
                                                                if (st.iD_Stage == c.stage_ID) {
                                                                    return (
                                                                        <b>{st.stageNumber}</b>
                                                                    )
                                                                }
                                                            })
                                                            }
                                                        </td>
                                                        <td>{c.circleNumber}</td>
                                                        <td>
                                                            {sp.sportsmanSurname} {sp.sportsmanName} {sp.sportsmanPatronymic}<br />
                                                        </td>
                                                        <td>{sp.team}</td>
                                                        <td>{sp.iD_Sportsman}</td>
                                                        <td>{sp.yearOfBirth}</td>
                                                        <td>{c.timeOfCircle}</td>
                                                        <td>{c.place}</td>
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
            })               
        ) 
    }
}
ReactDOM.render(<CompletedResultPageDesign resultsRequestAddress="/Result/GetResults"
    sportsmenRequestAddress="/Result/GetSportsmen"
    competitionRequestAddress="/Result/GetCompetition"
    stagesRequestAddress="/Result/GetStages"
    circlesRequestAddress="/Result/GetCircles" />, document.getElementById('CompletedResultDiv'))