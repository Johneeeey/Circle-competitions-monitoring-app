class RegisterCompetitionPage extends React.Component {
    render() {
        return (
            <div id="RegCompetForm">
                <form method="post">
                    
                        <div>
                            <label>Введите имя</label><br />
                            <input type="text" name="Name" />
                        </div>
                        <div>
                            <label>Введите фамилию</label><br />
                            <input type="text" name="Surname" />
                        </div>
                        <div>
                            <label>Введите отчество</label><br />
                            <input type="text" name="Patronymic" />
                        </div>
                        <div>
                            <label>Введите пол</label><br />
                            <input type="text" name="Sex" />
                        </div>
                        <div>
                            <label>Введите год рождения</label><br />
                            <input type="number" name="YearOfBirth" />
                        </div>
                        <div>
                            <label>Введите название команды</label><br />
                            <input type="text" name="Team" />
                        </div>                       
                        <div>
                            <input type="submit" value="Отправить" />
                        </div>                  
                </form>
            </div>
        )
    }
}
ReactDOM.render(<RegisterCompetitionPage />, document.getElementById('RegCompetForm'))