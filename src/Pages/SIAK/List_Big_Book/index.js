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
import Select from 'react-select'
import 'react-select/dist/react-select.css'


class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            local_state_all_jurnal_umum: [],
            localStateSelectedRekening : '',
            localStateOptionsRekeningFromBackend: []
        }
        this.handleHitAccount = this.handleHitAccount.bind(this)
        this.handleCatchSubmitButton = this.handleCatchSubmitButton.bind(this)
    }
    handleCatchSubmitButton(){
        this.handleHitAccount()  
        console.log(this.state.localStateSelectedRekening)             
        
    }
    handleHitAccount(){
        console.log('Hit backend')
        let localThis = this;
        Request.get(
            {url:'http://localhost:9000/jurnal_umum/table/'+this.state.localStateSelectedRekening}, 
            function(err,httpResponse,body){
                if(err){
                    console.log(err)
                } else {
                    if(httpResponse.statusCode === 500){
                        alert('Duplikat Pada Form')
                    } else{
                        let currentArrayAllJurnalUmum = JSON.parse(body)
                        currentArrayAllJurnalUmum = currentArrayAllJurnalUmum.result_json
                        console.log('berhasil fetch data')
                        console.log(currentArrayAllJurnalUmum)
                        localThis.setState({
                            local_state_all_jurnal_umum: currentArrayAllJurnalUmum
                        })
                    }
                }    
        })
    }
    handleCatchOptionRekening(value){
        this.setState({
            localStateSelectedRekening: value.value
        })      
    }
    componentDidMount(){
        // this.handleHitAccount()               
        Request('http://127.0.0.1:9000/accounts', (error, response, body) => {
            if(error) {
                alert('Problem When Get Nomer Rekening')
            } else {
                if(response.statusCode === 200) {
                    let tempBody = JSON.parse(body)
                    this.setState({
                        localStateOptionsRekeningFromBackend: tempBody.result_json
                    })
                } else {
                    alert('Something When Wrong On DB Server')
                }
            }
        })
    }

    render() {
        const columns = [
            {
                Header: 'Id Jurnal Umum',
                accessor: 'kode_jurnal_umum' 
            }, 
            { 
                Header: 'Keterangan',
                accessor: 'deskripsi_keterangan',
            },
            { 
                Header: 'Nama Rekening Debet',
                accessor: 'nama_rekening_debet',
            },
            { 
                Header: 'Kode Rekening Debet',
                accessor: 'kode_rekening_debet',
            },
            { 
                Header: 'Jumlah Rekening Debet',
                accessor: 'jumlah_debet',
            },
            { 
                Header: 'Nama Rekening Kredit',
                accessor: 'nama_rekening_kredit',
            },
            { 
                Header: 'Kode Rekening Kredit',
                accessor: 'kode_rekening_kredit',
            },
            { 
                Header: 'Jumlah Rekening Kredit',
                accessor: 'jumlah_kredit',
            },
        ]
         
        return (
            <div>
            <h1>List Jurnal Umum</h1>
            <Select
                    name="form-field-name"
                    value={this.state.localStateSelectedRekening}
                    options={this.state.localStateOptionsRekeningFromBackend}
                    onChange={currentValue => this.handleCatchOptionRekening(currentValue)}
                />
            <button onClick={this.handleCatchSubmitButton}>Submit </button>
            <ReactTable
                data={this.state.local_state_all_jurnal_umum}
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
  