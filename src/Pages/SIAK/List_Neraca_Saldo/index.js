import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {
  actionUpdateListAccount,
} from '../../../Redux/Reducers/Pages/SIAK/Reducer_SIAK'
import Request from 'request'
import ReactTable from 'react-table'
import 'react-table/react-table.css'



class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            local_state_neraca_saldo_kredit: [],
            local_state_neraca_saldo_debet: [],
            local_state_show_debet: true
        }
        this.handleHitAccount = this.handleHitAccount.bind(this)
        this.handleHitNeracaSaldoDebet = this.handleHitNeracaSaldoDebet.bind(this)
        this.handleHitNeracaSaldoKredit = this.handleHitNeracaSaldoKredit.bind(this)
        this.handleSwitchView = this.handleSwitchView.bind(this)
    }
    handleHitAccount(){
        console.log('Hit backend')
        this.handleHitNeracaSaldoDebet()
        this.handleHitNeracaSaldoKredit()
    }
    handleSwitchView(){
        console.log(this.state.local_state_show_debet)
        this.setState({
            local_state_show_debet: !(this.state.local_state_show_debet)
        })
    }
    handleHitNeracaSaldoDebet(){
        let localThis = this;
        
        Request.get(
            {url:'http://168.1.30.172:9000/neraca_saldo/debet'}, 
            function(err, httpResponse, body){
                if(err){
                    console.log(err)
                } else {
                    if(httpResponse.statusCode === 500){
                        alert('Duplikat Pada Form')
                    } else{
                        let currentArrayAllDetails = JSON.parse(body)
                        currentArrayAllDetails = currentArrayAllDetails.result_json
                        console.log('berhasil fetch data')
                        console.log(currentArrayAllDetails)
                        // this.props.actionUpdateListAccount(currentArrayAllDetails)
                        localThis.setState({
                            local_state_neraca_saldo_debet: currentArrayAllDetails
                        })
                    }
                }    
        })
    }
    handleHitNeracaSaldoKredit(){
        let localThis = this;
        
        Request.get(
            {url:'http://168.1.30.172:9000/neraca_saldo/kredit'}, 
            function(err, httpResponse, body){
                if(err){
                    console.log(err)
                } else {
                    if(httpResponse.statusCode === 500){
                        alert('Duplikat Pada Form')
                    } else{
                        let currentArrayAllDetails = JSON.parse(body)
                        currentArrayAllDetails = currentArrayAllDetails.result_json
                        console.log('berhasil fetch data')
                        console.log(currentArrayAllDetails)
                        // this.props.actionUpdateListAccount(currentArrayAllDetails)
                        localThis.setState({
                            local_state_neraca_saldo_kredit: currentArrayAllDetails
                        })
                    }
                }    
        })
    }
    componentDidMount(){
        this.handleHitAccount()               
    }

    render() {
        const columns = [
            {
                Header: 'Nama Rekening',
                accessor: 'nama_rekening' 
            }, 
            {
                Header: 'Kode Rekening',
                accessor: 'kode_rekening' 
            }, 
            { 
                Header: 'Total',
                accessor: 'total',
            }
        ]
         const NeracaSaldoDebit= () =>{
             return(<div>
                    <h1>Neraca Saldo Debet</h1>
                    <ReactTable
                        data={this.state.local_state_neraca_saldo_debet}
                        columns={columns}
                    />
                    </div>)
         }
         const NeracaSaldoKredit = () =>{
            return(<div>
                    <h1>Neraca Saldo Kredit</h1>
                    <ReactTable
                        data={this.state.local_state_neraca_saldo_kredit}
                        columns={columns}
                    />
                    </div>)
        }
        return (
            <div>
                <button onClick={this.props.changePageToMain}>Back To Main Page </button>
                <h1>List Neraca Saldo</h1>
                <h5>This Table Bellow Will Dynamic Change If You Press The Button</h5>
                <button onClick={this.handleSwitchView}>Switch</button>
                {
                    this.state.local_state_show_debet ? <NeracaSaldoDebit />: <NeracaSaldoKredit />
                }
                <br/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    global_state_list_account: state.Reducer_Home.result_poisson,  
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    actionUpdateListAccount,
    changePageToMain: () => push('/')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  