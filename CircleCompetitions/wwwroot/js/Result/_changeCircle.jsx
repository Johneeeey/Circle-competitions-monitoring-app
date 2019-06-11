class ChangeCirclePageDesign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Stages: [],
            Circle: [],
            Sportsmen: [],
        };
        this.props = {
            sportsmenRequestAddress: '',
            circleRequestAddress: '',
            stagesRequestAddress: '',
        };
    }
    loadData() {
        //Запрос списка стадий
        fetch(this.props.stagesRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Stages: data });
        }).catch(() => {
            alert('Error stages request');
        });
        //Запрос списка кругов
        fetch(this.props.circleRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Circle: data });
        }).catch(() => {
            alert('Error circles request');
        });
        //Запрос списка спортсменов
        fetch(this.props.sportsmenRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Sportsmen: data });
        }).catch(() => {
            alert('Error sportsmen request');
        });
    }
    componentWillMount() {
        this.loadData();
    }
    render() {
        return (
            this.state.Circle.map(c => {
                return (
                    <form key={"f" + c.iD_Circle} method="post">
                        <table key={"t" + c.iD_Circle} className="table table-hover table-bordered">
                            <tbody key={"tb" + c.iD_Circle}>
                                <tr key={"tr1" + c.iD_Circle}>
                                    <td key={"td1" + c.iD_Circle}><b>Номер стадии: </b></td>
                                    <td key={"td2" + c.iD_Circle}>
                                    {this.state.Stages.map(st => {
                                        if (st.iD_Stage == c.stage_ID) {
                                            return (
                                                <p key={"f" + c.iD_Circle}>{st.stageNumber}</p>    
                                            )
                                        }
                                    })
                                    }
                                    </td>
                                </tr>
                                <tr key={"tr2" + c.iD_Circle}>
                                    <td key={"td3" + c.iD_Circle}><b>Номер круга: </b></td>
                                    <td key={"td4" + c.iD_Circle}>{c.circleNumber}</td>
                                </tr>
                                <tr key={"tr3" + c.iD_Circle}>
                                    <td key={"td5" + c.iD_Circle}><b>ID круга: </b></td>
                                    <td key={"td6" + c.iD_Circle}>
                                        <input key={"tdInp1" + c.iD_Circle}
                                            type="text"
                                            className="form-control"
                                            readOnly
                                            value={c.iD_Circle}
                                            name="CircleID"></input>
                                    </td>
                                </tr>
                                <tr key={"tr4" + c.iD_Circle}>
                                    <td key={"td7" + c.iD_Circle}><b>ФИО</b></td>
                                    <td key={"td8" + c.iD_Circle}>
                                    {this.state.Sportsmen.map(sp => {
                                        if (c.sportsman_ID == sp.iD_Sportsman) {
                                            return (
                                                <small key={"tdSM" + c.iD_Circle}>
                                                    {sp.sportsmanName}<br />
                                                    {sp.sportsmanSurname}<br />
                                                    {sp.sportsmanPatronymic}<br />
                                                </small>    
                                            )
                                        }
                                    })
                                    }
                                    </td>
                                </tr>
                                <tr key={"tr5" + c.iD_Circle}>
                                    <td key={"td9" + c.iD_Circle}><b>Время круга: </b></td>
                                    <td key={"td10" + c.iD_Circle}>
                                        <input key={"tdInp2" + c.iD_Circle}
                                            type="text"
                                            className="form-control"
                                            placeholder={c.timeOfCircle}
                                            name="CircleTime"></input>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <button key={"b" + c.iD_Circle} className="btn btn-secondary" type="submit">Отправить</button>
                    </form>  
                )
            })
              
        )
    }
}
ReactDOM.render(<ChangeCirclePageDesign stagesRequestAddress="/Result/GetStages"
    sportsmenRequestAddress="/Result/GetSportsmen"
    circleRequestAddress="/Result/GetCircle" />, document.getElementById('root'))