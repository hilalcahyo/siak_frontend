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
            local_state_all_details: []
        }
        this.handleHitAccount = this.handleHitAccount.bind(this)
    }
    handleHitAccount(){
        console.log('Hit backend')
        let localThis = this;
        Request.get(
            {url:'http://localhost:9000/neraca_saldo/kredit'}, 
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
                            local_state_all_details: currentArrayAllDetails
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
         
        return (
            <div>
                <button onClick={this.props.changePageToMain}>Back To Main Page </button>
                <h1>List Neraca Saldo</h1>
                <h5>Pada table dibawah ini. akan dibagi Menjadi Kredit dan Debet</h5>
                <ReactTable
                    data={this.state.local_state_all_details}
                    columns={columns}
                />
                
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
  