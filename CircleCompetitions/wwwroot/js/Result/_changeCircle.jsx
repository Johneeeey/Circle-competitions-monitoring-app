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
                <form method="post">
                    <table className="table table-hover table-bordered">
                        <tr>
                            <td><b>Номер стадии: </b></td>
                            <td>
                                {this.state.Stages.map(st => {
                                    if (st.iD_Stage == c.stage_ID) {
                                        return (
                                            <p>{st.stageNumber}</p>    
                                        )
                                    }
                                })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td><b>Номер круга: </b></td>
                            <td>{c.circleNumber}</td>
                        </tr>
                        <tr>
                            <td><b>ID круга: </b></td>
                            <td>
                                <input type="text"
                                    className="form-control"
                                    readOnly
                                    value={c.iD_Circle}
                                    name="CircleID"></input>
                            </td>
                        </tr>
                        <tr>
                            <td><b>ФИО</b></td>
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
                        </tr>
                        <tr>
                            <td><b>Время круга: </b></td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={c.timeOfCircle}
                                    name="CircleTime"></input>
                            </td>
                        </tr>
                    </table>
                    <button className="btn btn-secondary" type="submit">Отправить</button>
                </form>  
                )
            })
              
        )
    }
}
ReactDOM.render(<ChangeCirclePageDesign stagesRequestAddress="/Result/GetStages"
    sportsmenRequestAddress="/Result/GetSportsmen"
    circleRequestAddress="/Result/GetCircle" />, document.getElementById('root'))