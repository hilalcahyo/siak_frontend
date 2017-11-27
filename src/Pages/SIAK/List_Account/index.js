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
            local_state_all_account: []
        }
        this.handleHitAccount = this.handleHitAccount.bind(this)
    }
    handleHitAccount(){
        console.log('Hit backend')
        let localThis = this;
        Request.get(
            {url:'http://localhost:9000/accounts/table'}, 
            function(err,httpResponse,body){
                if(err){
                    console.log(err)
                } else {
                    if(httpResponse.statusCode === 500){
                        alert('Duplikat Pada Form')
                    } else{
                        let currentArrayAllAccount = JSON.parse(body)
                        currentArrayAllAccount = currentArrayAllAccount.result_json
                        console.log('berhasil fetch data')
                        console.log(currentArrayAllAccount)
                        // this.props.actionUpdateListAccount(currentArrayAllAccount)
                        localThis.setState({
                            local_state_all_account: currentArrayAllAccount
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
                Header: 'Id Rekening',
                accessor: 'id_rekening' 
            }, 
            { 
                Header: 'Nama Rekening',
                accessor: 'nama_rekening',
            },
            { 
                Header: 'Kode Rekening',
                accessor: 'kode_rekening',
            },
        ]
         
        return (
            <div>
            <h1>List Nomer Rekening</h1>
            <ReactTable
                data={this.state.local_state_all_account}
                columns={columns}
            />
            <button onClick={this.props.changePageToMain}>Back To Main Page </button>
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
  