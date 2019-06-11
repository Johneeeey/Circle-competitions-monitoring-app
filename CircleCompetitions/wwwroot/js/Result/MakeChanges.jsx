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
            <table key="tbl" className="table table-hover table-bordered">
                <thead key="thd">
                    <tr key="thr">
                        <th key="th1">№ Стадии</th>
                        <th key="th2">№ Круга</th>
                        <th key="th3">ID Круга></th>
                        <th key="th4">ФИО</th>
                        <th key="th5">Время</th>
                        <th key="th6" />
                    </tr>
                </thead>
                <tbody key="tbd">
                    {this.state.Circles.map(c => {
                        var adr = "/Result/ChangeCircle?IDCircle=" + c.iD_Circle;
                        return (
                            <tr key={c.iD_Circle}>
                                <td key={"td1" + c.iD_Circle}>
                                    {this.state.Stages.map(st => {
                                        if (st.iD_Stage == c.stage_ID) {
                                            return (
                                                <b key={"b" + c.iD_Circle}>{st.stageNumber}</b>
                                            )
                                        }
                                    })
                                    }
                                </td>
                                <td key={"td2" + c.iD_Circle}>{c.circleNumber}</td>
                                <td key={"td3" + c.iD_Circle}>
                                    <input key={"tdInp1" + c.iD_Circle}
                                        name="CircleID"
                                        type="text"
                                        className="form-control"
                                        value={c.iD_Circle}
                                        readOnly></input>
                                </td>
                                <td key={"td4" + c.iD_Circle}>
                                    {this.state.Sportsmen.map(sp => {
                                        if (c.sportsman_ID == sp.iD_Sportsman) {
                                            return (
                                                <small key={"tdSm" + c.iD_Circle}>
                                                    {sp.sportsmanName}<br />
                                                    {sp.sportsmanSurname}<br />
                                                    {sp.sportsmanPatronymic}<br />
                                                </small>    
                                            )
                                        }
                                    })
                                    }
                                </td>
                                <td key={"td5" + c.iD_Circle}>
                                    <input key={"tdInp2" + c.iD_Circle}
                                        type="text"
                                        name="CircleTime"
                                        className="form-control"
                                        placeholder={c.timeOfCircle}
                                        readOnly></input>
                                </td>
                                <td key={"td6" + c.iD_Circle}>
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