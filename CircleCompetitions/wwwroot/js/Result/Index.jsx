class ResultIndexPageDesign extends React.Component {
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
            });//Запрос соревнования
        fetch(this.props.competitionRequestAddress).then(result => { return result.json() }).then(data => {
            this.setState({ Competition: data });
        }).catch(() => {
            alert('Error competition request');
        });
    }
    componentWillMount() {
        this.loadData();
    }
    render() {
        return (
            this.state.Competition.map(c => {
                var adr = "/Result/Detail/?IDCompetition=" + c.iD_Competition;
                return (
                    <div key={"rDiv" + c.iD_Competition} className="container">
                        <div key={"hDiv" + c.iD_Competition}>
                            <h1 key={"h1"+c.iD_Competition} id="CompetitionName">"{c.nameOfCompetition}"</h1>
                            <h3 key={"h3"+c.iD_Competition} id="CompetitionDate">
                                {c.dateOfStart} - <br />
                                {c.dateOfEnd}
                            </h3>
                        </div>
                        <table key={"t" + c.iD_Competition} className="table table-hover table-bordered">
                            <thead key={"th" + c.iD_Competition}>
                                <tr key={"trh" + c.iD_Competition}>
                                    <th key={"th1" + c.iD_Competition}>ФИО Участника</th>
                                    <th key={"th2" + c.iD_Competition}>Место</th>
                                </tr>
                            </thead>
                            <tbody key={"tb" + c.iD_Competition}>
                                {this.state.Results.map(r => {
                                    return (
                                        <tr key={"tr" + r.iD_Result}>
                                            <td key={"td1" + c.iD_Competition}>
                                                {this.state.Sportsmen.map(sp => {
                                                    if (sp.iD_Sportsman == r.sportsman_ID) {
                                                        return (
                                                            <b key={"b" + c.iD_Competition}>
                                                                {sp.sportsmanSurname}<br />
                                                                {sp.sportsmanName}<br />
                                                                {sp.sportsmanPatronymic}<br />
                                                            </b>
                                                        )
                                                    }
                                                })
                                                }
                                            </td>
                                            <td key={"td2" + c.iD_Competition}>{r.place}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                        <a href={adr}><button className="btn btn-primary">Подробнее</button></a>
                    </div>
                )
            })
        )
    }
}

ReactDOM.render(<ResultIndexPageDesign resultsRequestAddress="/Result/GetResults"
    sportsmenRequestAddress="/Result/GetSportsmen"
    competitionRequestAddress="/Result/GetCompetition" />, document.getElementById('ResIdxRootDiv'))