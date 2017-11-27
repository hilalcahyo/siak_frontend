import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import {
  actionUpdateResultPoisson,
  actionUpdateResultCumulativePoisson,
  actionUpdateInputForm1,
  actionUpdateInputForm2
} from '../../../Redux/Reducers/Pages/Reducer_Home'
import Request from 'request'



class Home extends React.Component {
    constructor(props){
        super(props)
        // this.handleUpdateInputForm1 = this.handleUpdateInputForm1.bind(this)
        // this.handleUpdateInputForm2 = this.handleUpdateInputForm2.bind(this)
        this.state = {
            localStateOptionsRekening : [   { value: '15c518fb-4bb0-4e91-9b70-b80bdf543cfa', label: 'BCA 2' },
                                            { value: '7fb5c02b-2ed5-4daa-a731-747bf1cd0062', label: 'Kas'}],
            localStateOptionKeterangan : [  { value: '883b1178-9e0f-4574-a2e8-4b2d157149d1', label: 'Modal Usaha(Setoran Tunai)' },
                                            { value: '222ba568-9ef1-4db6-96f6-86109a357ea5', label: 'Beli Peralatan(Komputer,Rak, Kursi, Meja, Printer) Tunai'}],
            localStateSelectedRekeningDebet : '',
            localStateSelectedRekeningCredit : '',
            localStateSelectedKeterangan : '',
            localStateOptionKeteranganFromBackend: [],
            localStateOptionsRekeningDebetFromBackend: []           
        }
        this.handleCatchOptionDebet = this.handleCatchOptionDebet.bind(this)
        this.handleCatchOptionCredit = this.handleCatchOptionCredit.bind(this)
        this.handleCatchOptionKeterangan = this.handleCatchOptionKeterangan.bind(this)
        this.handleCatchOptionRekeningDebet = this.handleCatchOptionRekeningDebet.bind(this)
    }
    componentWillMount(){
        console.log('>>> Hallo')
        Request('http://127.0.0.1:9000/details', (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            let tempBody = JSON.parse(body)
            console.log("tempBody >>", tempBody.result_json)
            this.setState({
                localStateOptionKeteranganFromBackend: tempBody.result_json
            })  
            console.log(this.state.localStateOptionKeteranganFromBackend)
        });

        Request('http://127.0.0.1:9000/accounts', (error, response, body) => {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            let tempBody = JSON.parse(body)
            console.log("tempBody >>", tempBody.result_json)
            this.setState({
                localStateOptionsRekeningDebetFromBackend: tempBody.result_json
            })  
            console.log(this.state.localStateOptionKeteranganFromBackend)
        });
    

    }
    handleCatchOptionDebet(value){
        console.log("handleCatchOptionDebet >>>", value)
    }
    handleCatchOptionCredit(value){
        console.log("handleCatchOptionCredit >>>", value)
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

  render() {
    return (
        <div>
            <h1>Form Genera Journal</h1>
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
            </div>
            <div>
                <label>Select Debet</label>
                <br/>
                <Select
                name="form-field-name"
                value={this.state.localStateSelectedRekeningDebet}
                options={this.state.localStateOptionsRekeningDebetFromBackend}
                onChange={currentValue => this.handleCatchOptionRekeningDebet(currentValue)}
                />
            </div>
            <br/>
            <button onClick={this.props.changePageToMain}>Back To Main Page </button>
        </div>
    );
  }
}


const mapStateToProps = state => ({
    result_poisson: state.Reducer_Home.result_poisson,
    result_cumulative_poisson: state.Reducer_Home.result_cumulative_poisson,
    inputForm1: state.Reducer_Home.inputForm1,
    inputForm2: state.Reducer_Home.inputForm2
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    actionUpdateResultPoisson,
    actionUpdateResultCumulativePoisson,
    actionUpdateInputForm1,
    actionUpdateInputForm2,
    changePageToMain : () => push('/')
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  