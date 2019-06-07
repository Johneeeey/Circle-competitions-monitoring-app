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
            <div className="container">
                {this.state.Competition.map(item => {//Заголовок страницы                
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
                {this.state.Stages.map(st => {//Создаем несколько таблиц с информацией о каждой стадии в соревновании
                return (
                    <div>
                        <h4>{st.stageNumber} Стадия</h4>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
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
                                {this.state.Circles.map(c => {//Перебираем все круги текущей стадии
                                    if (c.stage_ID == st.iD_Stage) {
                                        return (
                                            this.state.Sportsmen.map(sp => {//Перебираем информацию о спорстменах для того, чтобы найти того, кто указан в ячейке
                                                if (sp.iD_Sportsman == c.sportsman_ID) {
                                                    return (
                                                        <tr>
                                                            <td>{c.circleNumber}</td>
                                                            <td>
                                                                {s.sportsmanSurname} {s.sportsmanName} {s.sportsmanPatronymic}<br />
                                                            </td>
                                                            <td>{s.team}</td>
                                                            <td>{s.iD_Sportsman}</td>
                                                            <td>{s.yearOfBirth}</td>
                                                            <td>{c.timeOfCircle}</td>
                                                            <td>{r.place}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    )
                })
                }  
            </div>    
        )
    }
}
ReactDOM.render(<CompletedResultPageDesign resultsRequestAddress="/Result/GetResults"
    sportsmenRequestAddress="/Result/GetSportsmen"
    competitionRequestAddress="/Result/GetCompetition"
    stagesRequestAddress="/Result/GetStages"
    circlesRequestAddress="/Result/GetCircles" />, document.getElementById('CompletedResultDiv'))