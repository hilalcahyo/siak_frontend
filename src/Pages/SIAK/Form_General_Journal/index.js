import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import Request from 'request'
import ShortID from 'shortid'


class Home extends React.Component {
    constructor(props){
        super(props)
        // this.handleUpdateInputForm1 = this.handleUpdateInputForm1.bind(this)
        // this.handleUpdateInputForm2 = this.handleUpdateInputForm2.bind(this)
        this.state = {
            localStateSelectedRekeningDebet : '',
            localStateJumlahRekeningDebet: '',

            localStateSelectedRekeningCredit : '',
            localStateJumlahRekeningCredit: '',            
            
            localStateSelectedKeterangan : '',

            localStateKodeJurnalUmum: '',
            
            localStateOptionKeteranganFromBackend: [],
            localStateOptionsRekeningFromBackend: [],
            localStateArrayOne: [{'name':'sapi'}],           
            localStateArrayTwo: [{'name':'joko'}],
            localStateArrayThree: []           
        }
        this.handleCatchOptionKeterangan = this.handleCatchOptionKeterangan.bind(this)
        this.handleCatchOptionRekeningDebet = this.handleCatchOptionRekeningDebet.bind(this)
        this.handleCatchOptionRekeningCredit = this.handleCatchOptionRekeningCredit.bind(this)
        this.handleInputTotalDebet = this.handleInputTotalDebet.bind(this)
        this.handleInputTotalCredit = this.handleInputTotalCredit.bind(this)
        this.handleSubmitButtonFormJournalUmum = this.handleSubmitButtonFormJournalUmum.bind(this)
        this.handleHitPOSTFormJurnalUmum = this.handleHitPOSTFormJurnalUmum.bind(this)
    }
    componentWillMount(){
        Request('http://127.0.0.1:9000/details', (error, response, body) => {
            if(error) {
                alert('Problem When Get Keterangan')
            } else {
                if(response.statusCode === 200) {
                    let tempBody = JSON.parse(body)
                    this.setState({
                        localStateOptionKeteranganFromBackend: tempBody.result_json
                    })
                } else {
                    alert('Something When Wrong On DB Server')
                }
            }
        })
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
    handleCatchOptionKeterangan(value){
        this.setState({
            localStateSelectedKeterangan: value.value
        })      
    }
    handleCatchOptionRekeningDebet(value){
        this.setState({
            localStateSelectedRekeningDebet: value.value
        })      
    }
    handleCatchOptionRekeningCredit(value){
        this.setState({
            localStateSelectedRekeningCredit: value.value
        })      
    }
    handleInputTotalCredit(event){
        this.setState({
            localStateJumlahRekeningCredit: event.target.value
        })
    }
    handleInputTotalDebet(event){
        this.setState({
            localStateJumlahRekeningDebet: event.target.value
        })
    }
    handleSubmitButtonFormJournalUmum(){
        console.log('Selected Keterangan >', this.state.localStateSelectedKeterangan)
        console.log('Selected Rekening Credit >', this.state.localStateSelectedRekeningCredit)
        console.log('Selected Jumlah Credit >', this.state.localStateJumlahRekeningCredit)
        console.log('Selected Rekening Debet >', this.state.localStateSelectedRekeningDebet)
        console.log('Selected Jumlah Debet >', this.state.localStateJumlahRekeningDebet)
        this.handleHitPOSTFormJurnalUmum()
        
    }
    handleHitPOSTFormJurnalUmum(){
        Request.post({url:'http://168.1.30.172:9000/jurnal_umum', 
        form: {
                kode_jurnal_umum : ShortID(),
                id_keterangan: this.state.localStateSelectedKeterangan,
                id_rekening_debet: this.state.localStateSelectedRekeningDebet,
                jumlah_debet: this.state.localStateJumlahRekeningDebet,
                id_rekening_credit: this.state.localStateSelectedRekeningCredit,
                jumlah_credit: this.state.localStateJumlahRekeningCredit
            }
        }, function(err, httpResponse, body){
            if(err){
                console.log(err)
            } else {
                if(httpResponse.statusCode === 500){
                    alert('Duplikat Pada Form')
                    console.log(body)
                } else{
                    alert('Berhasil')
                }
            }    
        })
    }
  render() {
    return (
        <div>
            <div>
                <button onClick={this.props.changePageToMain}>Back To Main Page </button>                                
            </div>
            <h1>Form General Journal</h1>
            <br/>
            <div>
                <label>Select Keterangan</label>
                <br/>                
                <Select
                    name="form-field-name"
                    value={this.state.localStateSelectedKeterangan}
                    options={this.state.localStateOptionKeteranganFromBackend}
                    onChange={currentValue => this.handleCatchOptionKeterangan(currentValue)}
                />
                <br/>                                
            </div>
            <div> 
                <label>Pilih Rekening Debit</label>                    
                <br/>
                <Select
                    name="form-field-name"
                    value={this.state.localStateSelectedRekeningDebet}
                    options={this.state.localStateOptionsRekeningFromBackend}
                    onChange={currentValue => this.handleCatchOptionRekeningDebet(currentValue)}
                />
                <br/>
            </div>
            <div>
                <label>Jumlah Uang Debit</label>
                <br/>
                <input type='number' onChange={this.handleInputTotalDebet} value={this.state.localStateJumlahRekeningDebet}/>
                <br/>
            </div>
            <div>
                <label>Pilih Rekening Kredit</label>
                <Select
                    name="form-field-name"
                    value={this.state.localStateSelectedRekeningCredit}
                    options={this.state.localStateOptionsRekeningFromBackend}
                    onChange={currentValue => this.handleCatchOptionRekeningCredit(currentValue)}
                />
            </div>
            <div>
                <label>Jumlah Uang Kredit</label>
                <br/>
                <input type='number' onChange={this.handleInputTotalCredit} value={this.localStateJumlahRekeningCredit}/>
                <br/>
            </div>
            <div>
                <button onClick={this.handleSubmitButtonFormJournalUmum}>Submit</button>
            </div>

            
    
        </div>
    );
  }
}


const mapStateToProps = state => ({
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    changePageToMain : () => push('/')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  