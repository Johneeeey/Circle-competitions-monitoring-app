class MakeChangesPageDesign extends React.Component {
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
    componentWillMount() {
        this.loadData();
    }
    render() {
        return (
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>№ Стадии</th>
                        <th>№ Круга</th>
                        <th>ID Круга></th>
                        <th>ФИО</th>
                        <th>Время</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {this.state.Circles.map(c => {
                        var adr = "/Result/ChangeCircle?IDCircle=" + c.iD_Circle;
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
                                    <input name="CircleID"
                                        type="text"
                                        className="form-control"
                                        value={c.iD_Circle}
                                        readOnly></input>
                                </td>
                                <td>
                                    {this.state.Sportsmen.map(sp => {
                                        if (c.sportsman_ID == sp.iD_Sportsman) {
                                            return (
                                                <small>
                                                    {sp.sportsmanName}<br />
                                                    {sp.sportsmanSurname}<br />
                                                    {sp.sportsmanPatronymic}<br />
                                                </small>    
                                            )
                                        }
                                    })
                                    }
                                </td>
                                <td>
                                    <input type="text"
                                        name="CircleTime"
                                        className="form-control"
                                        placeholder={c.timeOfCircle}
                                        readOnly></input>
                                </td>
                                <td>
                                    <a href={adr}><button className="btn btn-secondary">Изменить</button></a>
                                </td>
                            </tr>    
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }
}

ReactDOM.render(<MakeChangesPageDesign resultsRequestAddress="/Result/GetResults"
    sportsmenRequestAddress="/Result/GetSportsmen"
    competitionRequestAddress="/Result/GetCompetition"
    stagesRequestAddress="/Result/GetStages"
    circlesRequestAddress="/Result/GetCircles" />, document.getElementById('MakeChangesRootDiv'))