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
                    <div key={"rDiv" + item.iD_Competition} className="container">
                    <div key={"hDiv" + item.iD_Competition}>
                        <h1 key="h1" id="CompetitionName">"{item.nameOfCompetition}"</h1>
                        <h3 key="h3" id="CompetitionDate">
                            {item.dateOfStart} - <br />
                            {item.dateOfEnd}
                        </h3>
                    </div>
                    <div key={"bDiv" + item.iD_Competition}>
                        <table key={"t" + item.iD_Competition} className="table table-hover table-bordered">
                            <thead key={"th" + item.iD_Competition}>
                                <tr key={"trh" + item.iD_Competition}>
                                    <th key={"th1" + item.iD_Competition}>Номер стадии</th>
                                    <th key={"th2" + item.iD_Competition}>Номер круга</th>
                                    <th key={"th3" + item.iD_Competition}>ФИО</th>
                                    <th key={"th4" + item.iD_Competition}>Команда</th>
                                    <th key={"th5" + item.iD_Competition}>Личный номер</th>
                                    <th key={"th6" + item.iD_Competition}>Год рождения</th>
                                    <th key={"th7" + item.iD_Competition}>Время круга</th>
                                    <th key={"th8" + item.iD_Competition}>Место</th>
                                </tr>
                            </thead>
                            <tbody key={"tb" + item.iD_Competition}>
                                {this.state.Circles.map(c => {
                                    return (
                                        this.state.Sportsmen.map(sp => {
                                            if (sp.iD_Sportsman == c.sportsman_ID) {
                                                return (
                                                    <tr key={"trb" + item.iD_Competition}>
                                                        <td key={"td1" + item.iD_Competition}>
                                                            {this.state.Stages.map(st => {
                                                                if (st.iD_Stage == c.stage_ID) {
                                                                    return (
                                                                        <b key={"b" + item.iD_Competition} > { st.stageNumber }</b>
                                                                    )
                                                                }
                                                            })
                                                            }
                                                        </td>
                                                        <td key={"td2" + item.iD_Competition}>{c.circleNumber}</td>
                                                        <td key={"td3" + item.iD_Competition}>
                                                            {sp.sportsmanSurname} {sp.sportsmanName} {sp.sportsmanPatronymic}<br />
                                                        </td>
                                                        <td key={"td4" + item.iD_Competition}>{sp.team}</td>
                                                        <td key={"td5" + item.iD_Competition}>{sp.iD_Sportsman}</td>
                                                        <td key={"td6" + item.iD_Competition}>{sp.yearOfBirth}</td>
                                                        <td key={"td7" + item.iD_Competition}>{c.timeOfCircle}</td>
                                                        <td key={"td8" + item.iD_Competition}>{c.place}</td>
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