class MasterPageHeader extends React.Component {
    
    render() {
        return (
            <nav className="navbar navbar-default" id="CommonMasterNavbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <p className="navbar-brand">Круговые соревнования</p>
                    </div>
                    <div id="MasterNavbarMenu"></div>
                </div>
            </nav>
        )
    }
}

ReactDOM.render(<MasterPageHeader />, document.getElementById('MasterHeader'))